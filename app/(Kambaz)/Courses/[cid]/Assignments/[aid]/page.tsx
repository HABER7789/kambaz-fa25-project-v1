// app/(Kambaz)/Courses/[cid]/Assignments/[aid]/page.tsx
"use client";

import Link from "next/link";
import { useParams, redirect } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";

import type { RootState } from "../../../../store";
import {
    addAssignment,
    updateAssignment as updateAssignmentAction,
    setAssignments,
} from "../reducer";
import * as client from "../../../client";

export default function AssignmentEditor() {
    const { cid, aid } = useParams() as { cid: string; aid: string };
    const dispatch = useDispatch();

    const currentUser = useSelector(
        (s: RootState) => s.account.currentUser
    ) as { role?: string } | null;

    const canEdit =
        !!currentUser &&
        (currentUser.role === "FACULTY" ||
            currentUser.role === "TA" ||
            currentUser.role === "ADMIN");

    const existing = useSelector((s: RootState) =>
        s.assignments.assignments.find(
            (x) => x._id === aid && x.course === cid
        )
    );

    const isNew = aid === "New";

    // Have we tried to load assignments for this course from the server?
    const [loaded, setLoaded] = useState(false);

    // If Redux doesn't have the assignment yet (e.g. hard refresh on editor),
    // fetch assignments for this course once.
    useEffect(() => {
        const ensureAssignmentLoaded = async () => {
            if (isNew) {
                setLoaded(true);
                return;
            }
            if (existing) {
                setLoaded(true);
                return;
            }
            try {
                const data = await client.findAssignmentsForCourse(cid);
                dispatch(setAssignments(data));
            } catch (err) {
                console.error("Failed to load assignments for editor", err);
            } finally {
                setLoaded(true);
            }
        };

        ensureAssignmentLoaded();
    }, [cid, isNew, existing, dispatch]);

    // Redirect students away from /New if they somehow hit the URL directly
    useEffect(() => {
        if (isNew && !canEdit) {
            redirect(`/Courses/${cid}/Assignments`);
        }
    }, [isNew, canEdit, cid]);

    // Form state
    const [assignees, setAssignees] = useState<string[]>(["Everyone"]);
    const [title, setTitle] = useState("New Assignment");
    const [description, setDescription] = useState("");
    const [points, setPoints] = useState<number>(100);
    const [due, setDue] = useState<string>(
        new Date().toISOString().slice(0, 16)
    );
    const [availableFrom, setAvailableFrom] = useState<string>("");

    // When we are editing an existing assignment and it becomes available,
    // sync the form fields from it.
    useEffect(() => {
        if (!isNew && existing) {
            setTitle(existing.title);
            setDescription(existing.description ?? "");
            setPoints(existing.points ?? 100);
            setDue(
                (existing.due ?? new Date().toISOString()).slice(0, 16)
            );
            setAvailableFrom((existing.availableFrom ?? "").slice(0, 16));
        }
    }, [isNew, existing]);

    const disabled = useMemo(() => !canEdit, [canEdit]);

    const handleAssigneesChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => setAssignees(Array.from(e.target.selectedOptions, (o) => o.value));

    const onSave = async () => {
        if (!canEdit) return;

        const payload = {
            course: cid,
            title,
            description,
            points,
            due: new Date(due).toISOString(),
            availableFrom: availableFrom
                ? new Date(availableFrom).toISOString()
                : undefined,
        };

        if (isNew) {
            const created = await client.createAssignmentForCourse(
                cid,
                payload
            );
            dispatch(addAssignment(created));
        } else if (existing) {
            const updatedToSend = { _id: existing._id, ...payload };
            const updatedFromServer =
                await client.updateAssignmentOnServer(updatedToSend);
            dispatch(updateAssignmentAction(updatedFromServer));
        }

        redirect(`/Courses/${cid}/Assignments`);
    };

    // Decide what to show based on loaded / existing
    let content: React.ReactNode;
    if (!loaded) {
        content = <div className="text-muted">Loading assignment…</div>;
    } else if (!isNew && !existing) {
        content = <div className="text-muted">Assignment not found.</div>;
    } else {
        content = (
            <>
                {/* Assignment Name */}
                <div className="row mb-3 align-items-start">
                    <div className="col-sm-3 text-sm-end">
                        <label
                            htmlFor="wd-name"
                            className="col-form-label"
                        >
                            Assignment Name
                        </label>
                    </div>
                    <div className="col-sm-9">
                        <input
                            id="wd-name"
                            className="form-control"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            disabled={disabled}
                        />
                    </div>
                </div>

                {/* Description */}
                <div className="row mb-4 align-items-start">
                    <div className="col-sm-3 text-sm-end">
                        <label
                            htmlFor="wd-description"
                            className="col-form-label"
                        >
                            Description
                        </label>
                    </div>
                    <div className="col-sm-9">
                        <textarea
                            id="wd-description"
                            className="form-control"
                            rows={6}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            disabled={disabled}
                        />
                    </div>
                </div>

                {/* Points */}
                <div className="row mb-3 align-items-start">
                    <div className="col-sm-3 text-sm-end">
                        <label
                            htmlFor="wd-points"
                            className="col-form-label"
                        >
                            Points
                        </label>
                    </div>
                    <div className="col-sm-9">
                        <input
                            id="wd-points"
                            type="number"
                            className="form-control"
                            value={points}
                            onChange={(e) =>
                                setPoints(parseInt(e.target.value || "0", 10))
                            }
                            disabled={disabled}
                        />
                    </div>
                </div>

                {/* Assignment Group */}
                <div className="row mb-3 align-items-start">
                    <div className="col-sm-3 text-sm-end">
                        <label
                            htmlFor="wd-assignment-group"
                            className="col-form-label"
                        >
                            Assignment Group
                        </label>
                    </div>
                    <div className="col-sm-9">
                        <select
                            id="wd-assignment-group"
                            className="form-select"
                            defaultValue="ASSIGNMENTS"
                            disabled={disabled}
                        >
                            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                            <option value="QUIZZES">QUIZZES</option>
                            <option value="EXAMS">EXAMS</option>
                        </select>
                    </div>
                </div>

                {/* Display Grade as */}
                <div className="row mb-3 align-items-start">
                    <div className="col-sm-3 text-sm-end">
                        <label
                            htmlFor="wd-display-grade"
                            className="col-form-label"
                        >
                            Display Grade as
                        </label>
                    </div>
                    <div className="col-sm-9">
                        <select
                            id="wd-display-grade"
                            className="form-select"
                            defaultValue="Percentage"
                            disabled={disabled}
                        >
                            <option>Percentage</option>
                            <option>Points</option>
                            <option>Complete/Incomplete</option>
                            <option>Letter Grade</option>
                        </select>
                    </div>
                </div>

                {/* Submission Type & online options */}
                <div className="row mb-3 align-items-start">
                    <div className="col-sm-3 text-sm-end">
                        <label
                            htmlFor="wd-submission-type"
                            className="col-form-label"
                        >
                            Submission Type
                        </label>
                    </div>
                    <div className="col-sm-9">
                        <div className="border rounded p-3">
                            <select
                                id="wd-submission-type"
                                className="form-select mb-3"
                                defaultValue="Online"
                                disabled={disabled}
                            >
                                <option>Online</option>
                                <option>On Paper</option>
                                <option>No Submission</option>
                            </select>

                            <div className="fw-semibold mb-2">
                                Online Entry Options
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="wd-entry-text"
                                    disabled={disabled}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="wd-entry-text"
                                >
                                    Text Entry
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="wd-entry-url"
                                    defaultChecked
                                    disabled={disabled}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="wd-entry-url"
                                >
                                    Website URL
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="wd-entry-media"
                                    disabled={disabled}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="wd-entry-media"
                                >
                                    Media Recordings
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="wd-entry-annotation"
                                    disabled={disabled}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="wd-entry-annotation"
                                >
                                    Student Annotation
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="wd-entry-files"
                                    disabled={disabled}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="wd-entry-files"
                                >
                                    File Uploads
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Assign card */}
                <div className="row mb-3 align-items-start">
                    <div className="col-sm-3 text-sm-end">
                        <div className="col-form-label">Assign</div>
                    </div>
                    <div className="col-sm-9">
                        <div className="border rounded p-3">
                            <div className="mb-3">
                                <label
                                    htmlFor="wd-assign-to"
                                    className="form-label"
                                >
                                    Assign to
                                </label>
                                <select
                                    id="wd-assign-to"
                                    className="form-select"
                                    multiple
                                    value={assignees}
                                    onChange={handleAssigneesChange}
                                    disabled={disabled}
                                >
                                    <option value="Everyone">Everyone</option>
                                    <option value="Section A">Section A</option>
                                    <option value="Section B">Section B</option>
                                    <option value="Section C">Section C</option>
                                </select>
                                <div className="mt-2">
                                    {assignees.map((x) => (
                                        <span
                                            key={x}
                                            className="badge bg-light text-dark me-2"
                                        >
                                            {x}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label
                                        htmlFor="wd-due-dt"
                                        className="form-label"
                                    >
                                        Due
                                    </label>
                                    <input
                                        id="wd-due-dt"
                                        type="datetime-local"
                                        className="form-control"
                                        value={due}
                                        onChange={(e) =>
                                            setDue(e.target.value)
                                        }
                                        disabled={disabled}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-6">
                                            <label
                                                htmlFor="wd-available-from"
                                                className="form-label"
                                            >
                                                Available from
                                            </label>
                                            <input
                                                id="wd-available-from"
                                                type="datetime-local"
                                                className="form-control"
                                                value={availableFrom}
                                                onChange={(e) =>
                                                    setAvailableFrom(
                                                        e.target.value
                                                    )
                                                }
                                                disabled={disabled}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <label
                                                htmlFor="wd-available-until"
                                                className="form-label"
                                            >
                                                Until
                                            </label>
                                            <input
                                                id="wd-available-until"
                                                type="datetime-local"
                                                className="form-control"
                                                disabled
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* /card */}
                    </div>
                </div>

                {/* Actions */}
                <div className="row mt-4">
                    <div className="col-sm-9 offset-sm-3 d-flex gap-2">
                        <Link
                            href={`/Courses/${cid}/Assignments`}
                            className="btn btn-light"
                        >
                            Cancel
                        </Link>
                        {canEdit && (
                            <button
                                onClick={onSave}
                                className="btn btn-danger"
                            >
                                Save
                            </button>
                        )}
                    </div>
                </div>
            </>
        );
    }

    return (
        <div
            id="wd-assignments-editor"
            className="p-3"
            style={{ maxWidth: 720, margin: "0 auto" }}
        >
            {content}
        </div>
    );
}

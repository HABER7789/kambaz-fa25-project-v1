// app/(Kambaz)/Courses/[cid]/Assignments/page.tsx
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Button, Form, InputGroup, Badge } from "react-bootstrap";
import { FiSearch } from "react-icons/fi";
import { BsGripVertical } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus, FaCaretDown } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";

import GreenCheckmark from "../Modules/GreenCheckmark";
import type { RootState } from "../../../store";

import {
    deleteAssignment as deleteAssignmentAction,
    setAssignments,
} from "./reducer";
import * as client from "../../client";

export default function Assignments() {
    const { cid } = useParams() as { cid: string };
    const dispatch = useDispatch();

    const currentUser = useSelector(
        (s: RootState) => s.account.currentUser
    ) as { role?: string } | null;

    const canEdit =
        !!currentUser &&
        (currentUser.role === "FACULTY" || currentUser.role === "TA" || currentUser.role === "ADMIN");

    const list = useSelector((s: RootState) =>
        s.assignments.assignments.filter((a) => a.course === cid)
    );

    // Load assignments from server when course changes
    useEffect(() => {
        const fetchAssignments = async () => {
            const data = await client.findAssignmentsForCourse(cid);
            dispatch(setAssignments(data));
        };
        fetchAssignments();
    }, [cid, dispatch]);

    const onDelete = async (id: string) => {
        if (!canEdit) return;
        if (
            typeof window !== "undefined" &&
            !window.confirm("Delete this assignment?")
        ) {
            return;
        }
        await client.deleteAssignment(id);
        dispatch(deleteAssignmentAction(id));
    };

    return (
        <div id="wd-assignments">
            <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="flex-grow-1" style={{ maxWidth: 420 }}>
                    <InputGroup>
                        <InputGroup.Text className="bg-white">
                            <FiSearch />
                        </InputGroup.Text>
                        <Form.Control
                            id="wd-search-assignment"
                            placeholder="Search..."
                        />
                    </InputGroup>
                </div>
                <div className="ms-3">
                    {canEdit && (
                        <>
                            <Button
                                id="wd-add-assignment-group"
                                variant="secondary"
                                className="me-2"
                            >
                                <FaPlus className="me-1" /> Group
                            </Button>
                            <Link
                                id="wd-add-assignment"
                                href={`/Courses/${cid}/Assignments/New`}
                                className="btn btn-danger"
                            >
                                <FaPlus className="me-1" /> Assignment
                            </Link>
                        </>
                    )}
                </div>
            </div>

            <div className="border rounded mb-3">
                <div className="bg-secondary px-3 py-2 d-flex align-items-center border-bottom">
                    <BsGripVertical className="wd-grip me-2" />
                    <FaCaretDown className="me-2 fs-5 text-dark" />
                    <h3
                        id="wd-assignments-title"
                        className="m-0 me-auto fw-semibold"
                    >
                        ASSIGNMENTS
                    </h3>
                    <Badge bg="light" text="dark" className="me-2 border">
                        40% of Total
                    </Badge>
                    {canEdit && (
                        <Button
                            size="sm"
                            variant="light"
                            className="border me-1"
                        >
                            <FaPlus />
                        </Button>
                    )}
                    <IoEllipsisVertical className="fs-5 text-secondary" />
                </div>

                <div className="border-start border-4 border-success bg-white">
                    <ul
                        id="wd-assignment-list"
                        className="list-unstyled m-0"
                    >
                        {list.length === 0 && (
                            <li className="p-3 text-muted">
                                No assignments for this course yet.
                            </li>
                        )}

                        {list.map((a) => (
                            <li
                                key={a._id}
                                className="wd-assignment-list-item p-3 border-bottom"
                            >
                                <div className="d-flex align-items-start">
                                    <BsGripVertical className="wd-grip me-2" />
                                    <div className="flex-grow-1">
                                        <Link
                                            href={`/Courses/${cid}/Assignments/${a._id}`}
                                            className="wd-assignment-link fw-semibold text-decoration-none text-dark"
                                        >
                                            {a.title}
                                        </Link>
                                        <div className="text-muted small mt-1">
                                            <span className="text-danger fw-semibold">
                                                Multiple Modules
                                            </span>
                                            &nbsp;|&nbsp;{" "}
                                            {a.availableFrom
                                                ? `Not available until ${new Date(
                                                    a.availableFrom
                                                ).toLocaleString()}`
                                                : "Available now"}
                                            &nbsp;|&nbsp;{" "}
                                            <strong>Due</strong>{" "}
                                            {new Date(
                                                a.due
                                            ).toLocaleString()}
                                            &nbsp;|&nbsp; {a.points} pts
                                        </div>
                                    </div>
                                    <div className="ms-2 d-inline-flex align-items-center gap-2">
                                        <GreenCheckmark />
                                        {canEdit && (
                                            <FaTrash
                                                className="text-danger"
                                                onClick={() =>
                                                    onDelete(a._id)
                                                }
                                                title="Delete"
                                            />
                                        )}
                                        <IoEllipsisVertical className="fs-5" />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

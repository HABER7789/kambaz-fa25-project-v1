"use client";

import React, { useEffect, useState } from "react";
import * as client from "./client";
import { FormControl } from "react-bootstrap";

type Assignment = {
    id?: number;
    title?: string;
    description?: string;
    due?: string;        
    completed?: boolean;
};

export default function WorkingWithObjectsAsynchronously() {
    const [assignment, setAssignment] = useState<Assignment>({});

    const fetchAssignment = async () => {
        const a = await client.fetchAssignment();
        setAssignment(a);
    };

    const updateTitle = async (title: string) => {
        const updated = await client.updateTitle(title);
        setAssignment(updated);
    };

    useEffect(() => {
        fetchAssignment();
    }, []);

    const onChangeStr = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        key: keyof Assignment
    ) => setAssignment({ ...assignment, [key]: e.target.value });

    return (
        <div id="wd-asynchronous-objects">
            <h3>Working with Objects Asynchronously</h3>
            <h4>Assignment</h4>

            {/* title */}
            <FormControl
                className="mb-2"
                value={assignment.title ?? ""}
                onChange={(e) => onChangeStr(e, "title")}
            />

            {/* description – textarea needs `as="textarea"` to use `rows` */}
            <FormControl
                as="textarea"
                rows={3}
                className="mb-2"
                value={assignment.description ?? ""}
                onChange={(e) => onChangeStr(e, "description")}
            />

            {/* due date */}
            <FormControl
                type="date"
                className="mb-2"
                value={assignment.due ?? ""}
                onChange={(e) => onChangeStr(e, "due")}
            />

            {/* completed */}
            <div className="form-check form-switch">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="wd-completed"
                    checked={!!assignment.completed}
                    onChange={(e) =>
                        setAssignment({ ...assignment, completed: e.target.checked })
                    }
                />
                <label className="form-check-label" htmlFor="wd-completed">
                    Completed
                </label>
            </div>

            <button
                className="btn btn-primary me-2"
                onClick={() => updateTitle(assignment.title ?? "")}
            >
                Update Title
            </button>

            <pre>{JSON.stringify(assignment, null, 2)}</pre>
            <hr />
        </div>
    );
}

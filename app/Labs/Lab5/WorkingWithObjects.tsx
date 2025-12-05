"use client";

import React, { useState } from "react";
import { FormControl, Button, FormCheck } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER!;

export default function WorkingWithObjects() {
    // existing assignment state (used to update title earlier)
    const [assignment, setAssignment] = useState({
        id: 1,
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10",
        completed: false,
        score: 0,
    });

    // ✨ NEW module state
    const [moduleState, setModuleState] = useState({
        id: "m01",
        name: "HTTP & Express",
        description: "Intro to building servers with Express",
        course: "CS5610",
    });

    const ASSIGNMENT = `${HTTP_SERVER}/lab5/assignment`;
    const MODULE = `${HTTP_SERVER}/lab5/module`;

    return (
        <div id="wd-working-with-objects">
            <h3>Working With Objects</h3>

            {/* ---- Retrieve existing things ---- */}
            <h4>Retrieving Objects</h4>
            <Button id="wd-retrieve-assignments" className="me-2" href={ASSIGNMENT}>
                Get Assignment
            </Button>
            <Button id="wd-retrieve-module" variant="secondary" href={MODULE}>
                Get Module
            </Button>
            <hr />

            <h4>Retrieving Properties</h4>
            <Button
                id="wd-retrieve-assignment-title"
                className="me-2"
                href={`${ASSIGNMENT}/title`}
            >
                Get Title
            </Button>
            <Button
                id="wd-retrieve-module-name"
                variant="secondary"
                href={`${MODULE}/name`}
            >
                Get Module Name
            </Button>
            <hr />

            {/* ---- Modify assignment fields ---- */}
            <h4>Modify Assignment</h4>

            {/* Update title (you already had this earlier) */}
            <Button
                id="wd-update-assignment-title"
                className="float-end"
                href={`${ASSIGNMENT}/title/${encodeURIComponent(assignment.title)}`}
            >
                Update Title
            </Button>
            <FormControl
                id="wd-assignment-title"
                className="w-75 mb-2"
                value={assignment.title}
                onChange={(e) =>
                    setAssignment({ ...assignment, title: e.target.value })
                }
            />

            {/* ✨ NEW: update score */}
            <Button
                id="wd-update-assignment-score"
                className="float-end"
                href={`${ASSIGNMENT}/score/${assignment.score}`}
            >
                Update Score
            </Button>
            <FormControl
                id="wd-assignment-score"
                className="w-25 mb-2"
                type="number"
                value={assignment.score}
                onChange={(e) =>
                    setAssignment({ ...assignment, score: Number(e.target.value) })
                }
            />

            {/* ✨ NEW: update completed */}
            <div className="d-flex align-items-center gap-2 mb-3">
                <FormCheck
                    id="wd-assignment-completed"
                    type="checkbox"
                    checked={assignment.completed}
                    onChange={(e) =>
                        setAssignment({ ...assignment, completed: e.target.checked })
                    }
                    label="Completed"
                />
                <Button
                    id="wd-update-assignment-completed"
                    variant="outline-primary"
                    href={`${ASSIGNMENT}/completed/${assignment.completed}`}
                >
                    Update Completed
                </Button>
            </div>

            <hr />

            {/* ---- Module editing ---- */}
            <h4>Modify Module</h4>

            {/* --- Module Name --- */}
            <div className="d-flex align-items-center gap-2 mb-3">
                <FormControl
                    id="wd-module-name"
                    className="w-75"
                    value={moduleState.name}
                    onChange={(e) =>
                        setModuleState({ ...moduleState, name: e.target.value })
                    }
                />
                <Button
                    id="wd-update-module-name"
                    className="btn btn-primary"
                    href={`${MODULE}/name/${encodeURIComponent(moduleState.name)}`}
                >
                    Update Module Name
                </Button>
            </div>

            {/* --- Module Description --- */}
            <div className="d-flex align-items-start gap-2 mb-3">
                <FormControl
                    id="wd-module-description"
                    as="textarea"
                    rows={3}
                    className="w-75"
                    value={moduleState.description}
                    onChange={(e) =>
                        setModuleState({ ...moduleState, description: e.target.value })
                    }
                />
                <Button
                    id="wd-update-module-description"
                    className="btn btn-secondary align-self-start"
                    href={`${MODULE}/description/${encodeURIComponent(
                        moduleState.description
                    )}`}
                >
                    Update Module Description
                </Button>
            </div>

            <hr />
        </div>
    );
}

"use client";

import React, { useState } from "react";
import { Button } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER!;
export default function WorkingWithArrays() {
    const API = `${HTTP_SERVER}/lab5/todos`;

    // separate state per section
    const [deleteId, setDeleteId] = useState("2");

    const [updateId, setUpdateId] = useState("2");
    const [todoTitle, setTodoTitle] = useState("Updated Task");

    const [completedId, setCompletedId] = useState("2");
    const [todoCompleted, setTodoCompleted] = useState(false);

    const [descId, setDescId] = useState("2");
    const [todoDescription, setTodoDescription] = useState("Describe me");

    return (
        <div id="wd-working-with-arrays">
            <h3>Working with Arrays</h3>

            <h4>Retrieving Arrays</h4>
            <Button id="wd-retrieve-todos" className="me-2" href={API}>
                Get Todos
            </Button>
            <hr />

            <h3>Filtering Array Items</h3>
            <Button id="wd-retrieve-completed-todos" className="me-2" href={`${API}?completed=true`}>
                Get Completed Todos
            </Button>
            <Button href={`${API}?completed=false`}>Get Incomplete Todos</Button>
            <hr />

            <h3>Creating new Items in an Array</h3>
            <Button id="wd-create-todo" href={`${API}/create`}>
                Create Todo
            </Button>
            <hr />

            {/* Delete */}
            <h3>Removing from an Array</h3>
            <div className="d-flex align-items-center gap-2">
                <input
                    id="wd-todo-id"
                    className="form-control w-25"
                    type="number"
                    value={deleteId}
                    onChange={(e) => setDeleteId(e.target.value)}
                />
                <Button id="wd-remove-todo" href={`${API}/${deleteId}/delete`}>
                    Remove Todo with ID = {deleteId}
                </Button>
            </div>
            <hr />

            {/* Update title */}
            <h3>Updating an Item in an Array</h3>
            <div className="d-flex align-items-center gap-2">
                <input
                    id="wd-update-todo-id"
                    className="form-control w-25"
                    type="number"
                    value={updateId}
                    onChange={(e) => setUpdateId(e.target.value)}
                />
                <input
                    id="wd-update-todo-title"
                    className="form-control w-50"
                    type="text"
                    value={todoTitle}
                    onChange={(e) => setTodoTitle(e.target.value)}
                />
                <Button
                    id="wd-update-todo"
                    href={`${API}/${updateId}/title/${encodeURIComponent(todoTitle)}`}
                >
                    Update Todo
                </Button>
            </div>
            <hr />

            {/* Update completed */}
            <h3>Update Completed</h3>
            <div className="d-flex align-items-center gap-2">
                <input
                    id="wd-update-completed-id"
                    className="form-control w-25"
                    type="number"
                    value={completedId}
                    onChange={(e) => setCompletedId(e.target.value)}
                />
                <input
                    id="wd-update-completed-checkbox"
                    type="checkbox"
                    className="form-check-input"
                    checked={todoCompleted}
                    onChange={(e) => setTodoCompleted(e.target.checked)}
                />
                <label htmlFor="wd-update-completed-checkbox" className="form-check-label">
                    Completed
                </label>
                <Button
                    id="wd-update-completed"
                    href={`${API}/${completedId}/completed/${todoCompleted}`}
                >
                    Update Completed
                </Button>
            </div>
            <hr />

            {/* Update description */}
            <h3>Update Description</h3>
            <div className="d-flex align-items-center gap-2">
                <input
                    id="wd-update-description-id"
                    className="form-control w-25"
                    type="number"
                    value={descId}
                    onChange={(e) => setDescId(e.target.value)}
                />
                <input
                    id="wd-update-description-text"
                    className="form-control w-50"
                    type="text"
                    value={todoDescription}
                    onChange={(e) => setTodoDescription(e.target.value)}
                />
                <Button
                    id="wd-update-description"
                    href={`${API}/${descId}/description/${encodeURIComponent(
                        todoDescription
                    )}`}
                >
                    Update Description
                </Button>
            </div>
            <hr />
        </div>
    );
}

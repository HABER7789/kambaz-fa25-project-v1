"use client";

import React, { useEffect, useState } from "react";
import { FaPlusCircle, FaPencilAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { TiDelete } from "react-icons/ti";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import * as client from "./client";
import type { Todo } from "./client";

type HttpErrorShape = {
    response?: { data?: { message?: string } };
};

const extractMessage = (err: unknown, fallback: string): string => {
    const maybe = err as HttpErrorShape;
    return maybe.response?.data?.message ?? fallback;
};

export default function WorkingWithArraysAsynchronously() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fetchTodos = async () => setTodos(await client.fetchTodos());

    useEffect(() => {
        fetchTodos();
    }, []);

    const createNewTodo = async () => setTodos(await client.createNewTodo());

    const postNewTodo = async () => {
        const created = await client.postNewTodo({
            id: 0,
            title: "New Posted Todo",
            completed: false,
        });
        setTodos((prev) => [...prev, created]);
    };

    const removeTodo = async (todo: Todo) => {
        try {
            const updated = await client.removeTodo(todo); // GET .../:id/delete
            setTodos(updated);
            setErrorMessage(null);
        } catch (err: unknown) {
            setErrorMessage(extractMessage(err, "Delete failed"));
        }
    };

    const deleteTodo = async (todo: Todo) => {
        try {
            await client.deleteTodo(todo); // DELETE .../:id
            setTodos((prev) => prev.filter((t) => t.id !== todo.id));
            setErrorMessage(null);
        } catch (err: unknown) {
            setErrorMessage(extractMessage(err, "Delete failed"));
        }
    };

    const updateTodo = async (todo: Todo) => {
        try {
            await client.updateTodo(todo); // PUT .../:id
            setTodos((prev) =>
                prev.map((t) =>
                    t.id === todo.id ? { ...todo, editing: false } : t,
                ),
            );
            setErrorMessage(null);
        } catch (err: unknown) {
            setErrorMessage(extractMessage(err, "Update failed"));
        }
    };

    const startEdit = (todo: Todo) =>
        setTodos((prev) =>
            prev.map((t) =>
                t.id === todo.id
                    ? { ...t, editing: true, draftTitle: t.title }
                    : t,
            ),
        );

    const changeDraft = (todoId: number, value: string) =>
        setTodos((prev) =>
            prev.map((t) =>
                t.id === todoId ? { ...t, draftTitle: value } : t,
            ),
        );

    const saveTitle = async (todo: Todo) => {
        const newTitle = todo.draftTitle ?? todo.title;
        await updateTodo({ ...todo, title: newTitle });
        setTodos((prev) =>
            prev.map((t) =>
                t.id === todo.id
                    ? {
                        ...t,
                        title: newTitle,
                        editing: false,
                        draftTitle: undefined,
                    }
                    : t,
            ),
        );
    };

    const cancelEdit = (todoId: number) =>
        setTodos((prev) =>
            prev.map((t) =>
                t.id === todoId
                    ? { ...t, editing: false, draftTitle: undefined }
                    : t,
            ),
        );

    return (
        <div id="wd-asynchronous-arrays">
            <h3>Working with Arrays Asynchronously</h3>
            <button
                className="btn btn-outline-danger btn-sm mb-2"
                onClick={() =>
                    deleteTodo({ id: 12345, title: "", completed: false })
                }
            >
                Simulate 404 Delete
            </button>
            {errorMessage && (
                <div
                    id="wd-todo-error-message"
                    className="alert alert-danger mb-2 mt-2"
                >
                    {errorMessage}
                </div>
            )}

            <h4 className="mb-3">
                Todos
                <FaPlusCircle
                    onClick={createNewTodo}
                    className="text-success float-end fs-3"
                    title="Create (GET /create)"
                />
                <FaPlusCircle
                    onClick={postNewTodo}
                    className="text-primary float-end fs-3 me-3"
                    id="wd-post-todo"
                    title="Post (POST /todos)"
                />
            </h4>

            <ListGroup>
                {todos.map((todo) => (
                    <ListGroupItem key={todo.id}>
                        <FaTrash
                            onClick={() => removeTodo(todo)}
                            className="text-danger float-end mt-1"
                            id="wd-remove-todo"
                            title="Remove (GET /:id/delete)"
                        />
                        <TiDelete
                            onClick={() => deleteTodo(todo)}
                            className="text-danger float-end me-2 fs-3"
                            id="wd-delete-todo"
                            title="Delete (DELETE /:id)"
                        />

                        <FaPencilAlt
                            onClick={() => startEdit(todo)}
                            className="text-primary float-end me-2 mt-1"
                            title="Edit"
                        />

                        <input
                            type="checkbox"
                            className="form-check-input me-2"
                            checked={!!todo.completed}
                            onChange={(e) =>
                                updateTodo({
                                    ...todo,
                                    completed: e.target.checked,
                                })
                            }
                        />

                        {todo.editing ? (
                            <input
                                className="form-control w-50 float-start"
                                value={todo.draftTitle ?? ""}
                                onChange={(e) =>
                                    changeDraft(todo.id, e.target.value)
                                }
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") saveTitle(todo);
                                    if (e.key === "Escape") cancelEdit(todo.id);
                                }}
                                onBlur={() => saveTitle(todo)}
                                autoFocus
                            />
                        ) : (
                            <span
                                style={{
                                    textDecoration: todo.completed ? "line-through" : "none",
                                }}
                            >
                                {todo.title}
                            </span>
                        )}
                    </ListGroupItem>
                ))}
            </ListGroup>

            <hr />
        </div>
    );
}

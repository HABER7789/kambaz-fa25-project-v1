"use client";

import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
import { ListGroupItem, Button } from "react-bootstrap";
import type { Todo } from "./todosReducer";

type Props = { todo: Todo };

export default function TodoItem({ todo }: Props) {
    const dispatch = useDispatch();

    return (
        <ListGroupItem className="d-flex justify-content-between align-items-center py-2">
            <span className="fs-5">{todo.title}</span>

            <div className="d-flex gap-2">
                <Button
                    variant="primary"
                    id="wd-set-todo-click"
                    className="fw-semibold"
                    onClick={() => dispatch(setTodo(todo))}
                >
                    Edit
                </Button>

                <Button
                    variant="danger"
                    id="wd-delete-todo-click"
                    className="fw-semibold"
                    onClick={() => dispatch(deleteTodo(todo.id))}
                >
                    Delete
                </Button>
            </div>
        </ListGroupItem>
    );
}

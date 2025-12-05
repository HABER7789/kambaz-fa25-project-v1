"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { LabRootState } from "../../store";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { ListGroupItem, Button, FormControl } from "react-bootstrap";
import type { Todo } from "./todosReducer";

export default function TodoForm() {
    const { todo } = useSelector((state: LabRootState) => state.todosReducer) as {
        todo: Todo;
    };
    const dispatch = useDispatch();

    return (
        <ListGroupItem className="d-flex align-items-center gap-2 py-3">
            <FormControl
                className="me-auto"
                placeholder="Learn Mongo"
                value={todo.title ?? ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch(setTodo({ ...todo, title: e.target.value }))
                }
            />

            <Button
                variant="warning"
                id="wd-update-todo-click"
                className="fw-semibold"
                onClick={() => dispatch(updateTodo(todo))}
            >
                Update
            </Button>

            <Button
                variant="success"
                id="wd-add-todo-click"
                className="fw-semibold"
                onClick={() => dispatch(addTodo(todo))}
            >
                Add
            </Button>
        </ListGroupItem>
    );
}

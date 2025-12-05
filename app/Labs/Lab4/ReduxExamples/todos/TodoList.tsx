"use client";

import React from "react";
import { useSelector } from "react-redux";
import type { LabRootState } from "../../store";
import { Card, ListGroup } from "react-bootstrap";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import type { Todo } from "./todosReducer";

export default function TodoList() {
    const { todos } = useSelector((state: LabRootState) => state.todosReducer) as {
        todos: Todo[];
    };

    return (
        <Card className="my-4 shadow-sm border-0">
            <Card.Body>
                <h2 className="fw-bold mb-3">Todo List</h2>
                <ListGroup variant="flush">
                    <TodoForm />
                    {todos.map((t) => (
                        <TodoItem key={t.id} todo={t} />
                    ))}
                </ListGroup>
            </Card.Body>
        </Card>
    );
}

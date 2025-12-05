// app/Labs/Lab4/ArrayStateVariable.tsx
import React, { useState } from "react";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";

export default function ArrayStateVariable() {
    const [array, setArray] = useState([1, 2, 3, 4, 5]);

    const addElement = () => {
        setArray([...array, Math.floor(Math.random() * 100)]);
    };

    const deleteElement = (index: number) => {
        setArray(array.filter((_, i) => i !== index));
    };

    return (
        <div id="wd-array-state-variables" className="my-4">
            <h2 className="fw-bold mb-3">Array State Variable</h2>
            <Button
                variant="success"
                className="mb-3 fw-semibold"
                onClick={addElement}
            >
                Add Element
            </Button>

            <ListGroup>
                {array.map((item, index) => (
                    <ListGroupItem
                        key={index}
                        className="d-flex justify-content-between align-items-center fs-5"
                    >
                        {item}
                        <Button
                            variant="danger"
                            size="sm"
                            className="fw-semibold"
                            onClick={() => deleteElement(index)}
                        >
                            Delete
                        </Button>
                    </ListGroupItem>
                ))}
            </ListGroup>
        </div>
    );
}

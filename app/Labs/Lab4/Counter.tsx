import React, { useState } from "react";
import { Button } from "react-bootstrap";

export default function Counter() {
    const [count, setCount] = useState(7);

    return (
        <div className="my-4">
            <h2 className="fw-bold mb-3">Counter: {count}</h2>
            <div className="d-flex gap-3">
                <Button
                    variant="success"
                    id="wd-counter-up-click"
                    className="fw-semibold px-4"
                    onClick={() => setCount(count + 1)}
                >
                    Up
                </Button>
                <Button
                    variant="danger"
                    id="wd-counter-down-click"
                    className="fw-semibold px-4"
                    onClick={() => setCount(count - 1)}
                >
                    Down
                </Button>
            </div>
        </div>
    );
}

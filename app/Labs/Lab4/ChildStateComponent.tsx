"use client";

import { Button, ButtonGroup } from "react-bootstrap";

export default function ChildStateComponent({
    counter,
    setCounter,
}: {
    counter: number;
    setCounter: (counter: number) => void;
}) {
    return (
        <div id="wd-child-state" className="mb-3">
            <h3>Counter {counter}</h3>
            <ButtonGroup className="gap-2">
                <Button
                    variant="primary"
                    onClick={() => setCounter(counter + 1)}
                    id="wd-increment-child-state-click"
                >
                    Increment
                </Button>
                <Button
                    variant="danger"
                    onClick={() => setCounter(counter - 1)}
                    id="wd-decrement-child-state-click"
                >
                    Decrement
                </Button>
            </ButtonGroup>
        </div>
    );
}

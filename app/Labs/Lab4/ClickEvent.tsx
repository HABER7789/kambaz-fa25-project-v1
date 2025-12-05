"use client";

import { Button, ButtonGroup } from "react-bootstrap";

const hello = () => {
    alert("Hello World!");
};

const lifeIs = (good: string) => {
    alert(`Life is ${good}`);
};

export default function ClickEvent() {
    return (
        <div id="wd-click-event" className="mb-3">
            <h2>Click Event</h2>
            <ButtonGroup className="mb-2 gap-2">
                <Button variant="secondary" onClick={hello} id="wd-hello-world-click">
                    Hello World!
                </Button>
                <Button
                    variant="secondary"
                    onClick={() => lifeIs("Good!")}
                    id="wd-life-is-good-click"
                >
                    Life is Good!
                </Button>
                <Button
                    variant="secondary"
                    onClick={() => {
                        hello();
                        lifeIs("Great!");
                    }}
                    id="wd-life-is-great-click"
                >
                    Life is Great!
                </Button>
            </ButtonGroup>
            <hr />
        </div>
    );
}

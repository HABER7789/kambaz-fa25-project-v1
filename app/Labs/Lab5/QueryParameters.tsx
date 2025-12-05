"use client";

import React, { useState } from "react";
import { FormControl, Button } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function QueryParameters() {
    const [a, setA] = useState("34");
    const [b, setB] = useState("23");

    return (
        <div id="wd-query-parameters">
            <h3>Query Parameters</h3>

            <FormControl
                id="wd-query-parameter-a"
                className="mb-2"
                type="number"
                value={a}
                onChange={(e) => setA(e.target.value)}
            />
            <FormControl
                id="wd-query-parameter-b"
                className="mb-3"
                type="number"
                value={b}
                onChange={(e) => setB(e.target.value)}
            />

            <div className="d-flex flex-wrap gap-2">
                <Button
                    id="wd-query-parameter-add"
                    variant="primary"
                    href={`${HTTP_SERVER}/lab5/calculator?operation=add&a=${a}&b=${b}`}
                >
                    Add {a} + {b}
                </Button>

                <Button
                    id="wd-query-parameter-subtract"
                    variant="danger"
                    href={`${HTTP_SERVER}/lab5/calculator?operation=subtract&a=${a}&b=${b}`}
                >
                    Subtract {a} - {b}
                </Button>

                <Button
                    id="wd-query-parameter-multiply"
                    variant="success"
                    href={`${HTTP_SERVER}/lab5/calculator?operation=multiply&a=${a}&b=${b}`}
                >
                    Multiply {a} × {b}
                </Button>

                <Button
                    id="wd-query-parameter-divide"
                    variant="warning"
                    href={`${HTTP_SERVER}/lab5/calculator?operation=divide&a=${a}&b=${b}`}
                >
                    Divide {a} ÷ {b}
                </Button>
            </div>

            <hr />
        </div>
    );
}

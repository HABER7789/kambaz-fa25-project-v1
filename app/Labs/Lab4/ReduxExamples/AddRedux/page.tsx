"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { LabRootState } from "../../store";
import { add } from "./addReducer";
import { Button, FormControl } from "react-bootstrap";

export default function AddRedux() {
    const [a, setA] = useState<number>(12);
    const [b, setB] = useState<number>(23);
    const { sum } = useSelector((state: LabRootState) => state.addReducer);
    const dispatch = useDispatch();

    return (
        <div id="wd-add-redux" className="my-4 w-25">
            <h2 className="fw-bold mb-3">Add Redux</h2>
            <h4 className="mb-3">
                {a} + {b} = {sum}
            </h4>

            <FormControl
                type="number"
                value={a}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setA(parseInt(e.target.value || "0", 10))
                }
                className="mb-2"
            />
            <FormControl
                type="number"
                value={b}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setB(parseInt(e.target.value || "0", 10))
                }
                className="mb-3"
            />

            <Button
                variant="primary"
                id="wd-add-redux-click"
                className="fw-semibold w-100"
                onClick={() => dispatch(add({ a, b }))}
            >
                Add Redux
            </Button>
        </div>
    );
}

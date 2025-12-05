"use client";

import { useSelector, useDispatch } from "react-redux";
import type { LabRootState } from "../../store";
import { increment, decrement } from "./counterReducer";
import { Button, ButtonGroup } from "react-bootstrap";

export default function CounterRedux() {
    const { count } = useSelector((state: LabRootState) => state.counterReducer);
    const dispatch = useDispatch();

    return (
        <div id="wd-counter-redux" className="mb-3">
            <h2>Counter Redux</h2>
            <h3 className="mb-2">{count}</h3>

            <ButtonGroup className="mb-2 gap-2">
                <Button
                    variant="primary"
                    onClick={() => dispatch(increment())}
                    id="wd-counter-redux-increment-click"
                >
                    Increment
                </Button>
                <Button
                    variant="danger"
                    onClick={() => dispatch(decrement())}
                    id="wd-counter-redux-decrement-click"
                >
                    Decrement
                </Button>
            </ButtonGroup>

            <hr />
        </div>
    );
}

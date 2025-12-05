"use client";

import { useSelector } from "react-redux";
import type { LabRootState } from "../../store";

export default function HelloRedux() {
    const { message } = useSelector((state: LabRootState) => state.helloReducer);

    return (
        <div id="wd-hello-redux">
            <h3>Hello Redux</h3>
            <h4>{message}</h4>
            <hr />
        </div>
    );
}

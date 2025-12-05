"use client";
import { useState } from "react";

export default function EventObject() {

    const [event, setEvent] = useState<Record<string, unknown> | null>(null);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {

        const clone: Record<string, unknown> = { ...e };


        clone.target = (e.target as HTMLElement)?.outerHTML;
        delete (clone as { view?: unknown }).view;

        setEvent(clone);
    };

    return (
        <div>
            <h2>Event Object</h2>
            <button
                onClick={handleClick}
                className="btn btn-primary"
                id="wd-display-event-obj-click"
            >
                Display Event Object
            </button>
            <pre>{JSON.stringify(event, null, 2)}</pre>
            <hr />
        </div>
    );
}

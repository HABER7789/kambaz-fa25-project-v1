"use client";
import { useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";

export default function DateStateVariable() {
    const [startDate, setStartDate] = useState<Date | null>(null);

    useEffect(() => {
        setStartDate(new Date());
    }, []);

    const dateObjectToHtmlDateString = (date: Date) => {
        return `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? 0 : ""}${date.getMonth() + 1
            }-${date.getDate() < 10 ? 0 : ""}${date.getDate()}`;
    };

    return (
        <div id="wd-date-state-variables">
            <h2>Date State Variables</h2>
            <h3 suppressHydrationWarning>
                {startDate ? JSON.stringify(startDate) : "—"}
            </h3>
            <h3 suppressHydrationWarning>
                {startDate ? dateObjectToHtmlDateString(startDate) : "—"}
            </h3>
            <FormControl
                type="date"
                defaultValue={startDate ? dateObjectToHtmlDateString(startDate) : ""}
                onChange={(e) => setStartDate(new Date(e.target.value))}
            />
            <hr />
        </div>
    );
}

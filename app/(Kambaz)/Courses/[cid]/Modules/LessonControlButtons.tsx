"use client";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";

export default function LessonControlButtons() {
    return (
        <div className="d-flex align-items-center gap-1 ms-auto">
            <GreenCheckmark />
            <IoEllipsisVertical className="fs-4" />
        </div>
    );
}
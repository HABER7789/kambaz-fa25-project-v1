"use client";
import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import { FaTrash, FaPencil } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";

export default function ModuleControlButtons({
    moduleId,
    deleteModule,
    editModule,
}: {
    moduleId: string;
    deleteModule: (moduleId: string) => void;
    editModule: (moduleId: string) => void;
}) {
    return (
        <span className="d-inline-flex align-items-center gap-2 float-end">
            <FaPencil
                onClick={() => editModule(moduleId)}
                className="text-primary me-3"
            />
            <FaTrash
                className="text-danger me-2 mb-1"
                onClick={() => deleteModule(moduleId)}
            />
            <GreenCheckmark />
            <BsPlus className="fs-4" />
            <IoEllipsisVertical className="fs-4" />
        </span>
    );
}

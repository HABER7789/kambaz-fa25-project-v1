"use client";

import { useState } from "react";
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import { MdDoNotDisturbAlt } from "react-icons/md";
import ModuleEditor from "./ModuleEditor";

export default function ModulesControls({
    moduleName,
    setModuleName,
    addModule,
}: {
    moduleName: string;
    setModuleName: (name: string) => void;
    addModule: () => void;
}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div id="wd-modules-controls" className="text-nowrap">
            <Button variant="secondary" size="lg" id="wd-collapse-all">
                Collapse All
            </Button>{" "}
            <Button variant="secondary" size="lg" id="wd-view-progress">
                View Progress
            </Button>{" "}
            <Dropdown className="d-inline-block">
                <DropdownToggle
                    variant="secondary"
                    size="lg"
                    id="wd-publish-all-btn"
                    className="d-inline-flex align-items-center"
                >
                    <GreenCheckmark /> <span className="ms-1">Publish All</span>
                </DropdownToggle>
                <DropdownMenu id="wd-publish-all">
                    <DropdownItem id="wd-publish-all-modules-and-items">
                        <GreenCheckmark /> Publish all modules and items
                    </DropdownItem>
                    <DropdownItem id="wd-publish-modules-only">
                        <GreenCheckmark /> Publish modules only
                    </DropdownItem>
                    <DropdownItem id="wd-unpublish-all-modules-and-items">
                        <MdDoNotDisturbAlt className="me-2 fs-5" />
                        Unpublish all modules and items
                    </DropdownItem>
                    <DropdownItem id="wd-unpublish-modules-only">
                        <MdDoNotDisturbAlt className="me-2 fs-5" />
                        Unpublish modules only
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>{" "}
            <Button
                variant="danger"
                size="lg"
                className="float-end"
                id="wd-add-module-btn"
                onClick={handleShow}
            >
                <FaPlus className="me-2 position-relative" style={{ bottom: "1px" }} /> Module
            </Button>

            <ModuleEditor
                show={show}
                handleClose={handleClose}
                dialogTitle="Add Module"
                moduleName={moduleName}
                setModuleName={setModuleName}
                addModule={() => {
                    addModule();
                    handleClose();
                }}
            />
        </div>
    );
}

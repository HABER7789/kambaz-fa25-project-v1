"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import {
    editModule,
    updateModule as updateModuleAction,
    setModules,
    type Module,
    type Lesson,
} from "./reducer";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import * as client from "../../client";

type User = { role?: "STUDENT" | "FACULTY" | "TA" | "ADMIN" } | null;

export default function Modules() {
    const { cid } = useParams() as { cid: string };

    const [moduleName, setModuleName] = useState<string>("");
    const dispatch = useAppDispatch();

    const modules = useAppSelector((s) => s.modules.modules) as Module[];
    const currentUser = useAppSelector((s) => s.account.currentUser) as User;

    const isStaff =
        !!currentUser &&
        (currentUser.role === "FACULTY" ||
            currentUser.role === "TA" ||
            currentUser.role === "ADMIN");

    // Fetch modules for this course from the server
    useEffect(() => {
        const fetchModules = async () => {
            const modsFromServer = await client.findModulesForCourse(cid);

            // Server modules don't have `course` or `lesson.module`,
            // so we adapt them to our Redux Module/Lesson shape.
            const mods: Module[] = (modsFromServer || []).map((m: Module) => ({
                _id: m._id,
                name: m.name,
                description: m.description,
                course: cid, // required by reducer's Module
                lessons: (m.lessons || []).map(
                    (l: Lesson): Lesson => ({
                        _id: l._id,
                        name: l.name,
                        description: l.description,
                        module: m._id, // required by reducer's Lesson
                    })
                ),
            }));

            dispatch(setModules(mods));
        };
        fetchModules();
    }, [cid, dispatch]);

    // Create module for this course via server
    const onCreateModuleForCourse = async () => {
        if (!moduleName.trim()) return;
        const toCreate = {
            name: moduleName.trim(),
            description: "",
        };
        const created = await client.createModuleForCourse(cid, toCreate);

        const newModule: Module = {
            _id: created._id,
            name: created.name,
            description: created.description,
            course: cid,
            lessons: (created.lessons || []).map(
                (l: Lesson): Lesson => ({
                    _id: l._id,
                    name: l.name,
                    description: l.description,
                    module: created._id,
                })
            ),
        };

        dispatch(setModules([...modules, newModule]));
        setModuleName("");
    };

    // Delete module on server + update store
    const onRemoveModule = async (moduleId: string) => {
        await client.deleteModule(cid, moduleId);
        dispatch(setModules(modules.filter((m) => m._id !== moduleId)));
    };

    // Update module on server + update store
    const onUpdateModule = async (module: Module) => {
        await client.updateModule(cid, module);
        const newModules = modules.map((m) =>
            m._id === module._id ? module : m
        );
        dispatch(setModules(newModules));
    };

    return (
        <div>
            {/* Add module controls ONLY for staff */}
            {isStaff && (
                <ModulesControls
                    moduleName={moduleName}
                    setModuleName={setModuleName}
                    addModule={onCreateModuleForCourse}
                />
            )}

            <br />
            <br />
            <br />

            <ListGroup className="rounded-0" id="wd-modules">
                {modules.map((module: Module, mIdx: number) => (
                    <ListGroupItem
                        key={module._id}
                        className="wd-module p-0 mb-5 fs-5 border-gray"
                    >
                        <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
                            <BsGripVertical className="me-2 fs-3" />

                            {!module.editing && (
                                <span className="flex-grow-1">
                                    {mIdx + 1}. {module.name}
                                </span>
                            )}

                            {module.editing && (
                                <FormControl
                                    className="w-50 d-inline-block flex-grow-1"
                                    value={module.name}
                                    disabled={!isStaff}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) =>
                                        isStaff &&
                                        dispatch(
                                            updateModuleAction({
                                                ...module,
                                                name: e.target.value,
                                            })
                                        )
                                    }
                                    onKeyDown={(
                                        e: React.KeyboardEvent<HTMLInputElement>
                                    ) => {
                                        if (e.key === "Enter" && isStaff) {
                                            onUpdateModule({
                                                ...module,
                                                editing: false,
                                            });
                                        }
                                    }}
                                />
                            )}

                            {/* Edit/Delete buttons ONLY for staff */}
                            {isStaff && (
                                <ModuleControlButtons
                                    moduleId={module._id}
                                    deleteModule={onRemoveModule}
                                    editModule={(id) =>
                                        dispatch(editModule(id))
                                    }
                                />
                            )}
                        </div>

                        {module.lessons && module.lessons.length > 0 && (
                            <ListGroup className="wd-lessons rounded-0">
                                {module.lessons.map((lesson, lIdx) => (
                                    <ListGroupItem
                                        key={lesson._id}
                                        className="wd-lesson p-3 ps-1 d-flex align-items-center"
                                    >
                                        <BsGripVertical className="me-2 fs-3" />
                                        <span className="flex-grow-1">
                                            {mIdx + 1}.{lIdx + 1}{" "}
                                            {lesson.name}
                                        </span>

                                        {/* Lesson controls ONLY for staff */}
                                        {isStaff && <LessonControlButtons />}
                                    </ListGroupItem>
                                ))}
                            </ListGroup>
                        )}
                    </ListGroupItem>
                ))}
            </ListGroup>
        </div>
    );
}

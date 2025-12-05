"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Row, Col, Card, Button, FormControl, ButtonGroup } from "react-bootstrap";
import {
    addNewCourse,
    deleteCourse as deleteCourseAction,
    updateCourse as updateCourseAction,
    setCourses,
} from "../Courses/reducer";
import { useAppDispatch, useAppSelector } from "../hooks";
// OLD

import { setEnrollments, enroll, unenroll } from "../Enrollments/reducer";
import * as client from "../Courses/client";

type Course = {
    _id: string;
    number: string;
    name: string;
    description: string;
    img: string;
};

type User = { _id: string; role?: "STUDENT" | "FACULTY" | "TA" | "ADMIN" } | null;

const NEW_COURSE_TEMPLATE: Course = {
    _id: "0",
    number: "New Number",
    name: "New Course",
    description: "New Description",
    img: "/images/react.png",
};

export default function Dashboard() {
    const dispatch = useAppDispatch();
    const list = useAppSelector((s) => s.courses.courses) as Course[];
    const currentUser = useAppSelector((s) => s.account.currentUser) as User;
    const enrollState = useAppSelector((s) => s.enrollments);

    const isStaff =
        !!currentUser && (currentUser.role === "FACULTY" || currentUser.role === "TA" || currentUser.role === "ADMIN");

    const [showOnlyMyEnrollments, setShowOnlyMyEnrollments] =
        useState<boolean>(true);

    // -------- Enrollments persistence in localStorage --------

    useEffect(() => {
        const loadEnrollments = async () => {
            if (!currentUser) return;
            try {
                const data = await client.fetchMyEnrollments();
                dispatch(
                    setEnrollments(
                        (data as { user: string; course: string }[]).map((e) => ({
                            user: e.user,
                            course: e.course,
                        })),
                    ),
                );
            } catch (e) {
                console.error("Failed to load enrollments from server", e);
            }
        };
        loadEnrollments();
    }, [currentUser, dispatch]);


    // -------- Course being edited/created --------
    const [course, setCourse] = useState<Course>({ ...NEW_COURSE_TEMPLATE });

    // -------- Load courses from SERVER on mount / refresh --------
    useEffect(() => {
        const loadCourses = async () => {
            try {
                // Minimal version: always fetch ALL courses
                const data = await client.fetchAllCourses();
                dispatch(setCourses(data));
            } catch (e) {
                console.error("Failed to load courses from server", e);
            }
        };
        loadCourses();
    }, [dispatch]);

    // -------- Add / Update / Delete --------
    const onAdd = async () => {
        const { number, name, description, img } = course;
        try {
            // create on server (also auto-enrolls current user on backend)
            const newCourse = await client.createCourse({
                number,
                name,
                description,
                img,
            });

            // store the server's version (with real _id) in Redux
            dispatch(addNewCourse(newCourse));
            setCourse({ ...NEW_COURSE_TEMPLATE });
        } catch (e) {
            console.error("Failed to create course", e);
        }
    };

    const onUpdate = async () => {
        try {
            const updated = await client.updateCourse(course);
            dispatch(updateCourseAction(updated));
        } catch (e) {
            console.error("Failed to update course", e);
        }
    };

    const onDelete = async (courseId: string) => {
        try {
            await client.deleteCourse(courseId);
            dispatch(deleteCourseAction(courseId));
        } catch (e) {
            console.error("Failed to delete course", e);
        }
    };

    // -------- Visible courses (still using your local enrollments filter) --------
    const visible = useMemo(() => {
        if (!currentUser) return list; // guests see all
        if (!showOnlyMyEnrollments) return list; // show all

        return list.filter((c) =>
            enrollState.items.some(
                (e) => e.user === currentUser._id && e.course === c._id
            )
        );
    }, [list, enrollState.items, currentUser, showOnlyMyEnrollments]);

    const isEnrolled = (courseId: string) =>
        !!currentUser &&
        enrollState.items.some(
            (e) => e.user === currentUser._id && e.course === courseId
        );

    return (
        <div id="wd-dashboard">
            <div className="d-flex align-items-center justify-content-between">
                <h1 id="wd-dashboard-title" className="mb-0">
                    Dashboard
                </h1>

                {currentUser && (
                    <Button
                        variant="primary"
                        onClick={() => setShowOnlyMyEnrollments((v) => !v)}
                        id="wd-enrollments-toggle"
                    >
                        {showOnlyMyEnrollments ? "Show All Courses" : "Enrollments"}
                    </Button>
                )}
            </div>
            <hr />

            {isStaff && (
                <>
                    <h5 className="d-flex align-items-center justify-content-between">
                        <span>New Course</span>
                        <span>
                            <ButtonGroup className="gap-2">
                                <Button
                                    id="wd-update-course-click"
                                    variant="warning"
                                    onClick={onUpdate}
                                >
                                    Update
                                </Button>
                                <Button
                                    id="wd-add-new-course-click"
                                    variant="primary"
                                    onClick={onAdd}
                                >
                                    Add
                                </Button>
                            </ButtonGroup>
                        </span>
                    </h5>

                    <FormControl
                        className="mb-2"
                        placeholder="Course title"
                        value={course.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setCourse({
                                ...course,
                                name: e.target.value,
                            })
                        }
                    />
                    <FormControl
                        as="textarea"
                        rows={3}
                        className="mb-3"
                        placeholder="Course description"
                        value={course.description}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                            setCourse({
                                ...course,
                                description: e.target.value,
                            })
                        }
                    />
                </>
            )}

            <h2 id="wd-dashboard-published">Published Courses ({visible.length})</h2>
            <hr />

            <Row className="g-4" xs={1} md={5}>
                {visible.map((c) => {
                    const enrolled = isEnrolled(c._id);
                    return (
                        <Col
                            key={c._id}
                            className="wd-dashboard-course"
                            style={{ width: 300 }}
                        >
                            <Link
                                href={`/Courses/${c._id}/Home`}
                                className="wd-dashboard-course-link text-decoration-none text-dark"
                                onClick={(e) => {
                                    if (currentUser && !isStaff && !enrolled) {
                                        e.preventDefault();
                                    }
                                }}
                            >
                                <Card className="h-100">
                                    {c.img ? (
                                        <Image
                                            src={c.img}
                                            alt={
                                                c.number
                                                    ? `${c.number} ${c.name}`
                                                    : c.name
                                            }
                                            width={600}
                                            height={320}
                                            style={{
                                                width: "100%",
                                                height: 160,
                                                objectFit: "cover",
                                            }}
                                        />
                                    ) : (
                                        <div
                                            style={{
                                                height: 160,
                                                background: "#c7d5e0",
                                            }}
                                        />
                                    )}

                                    <Card.Body>
                                        <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                            {c.name}
                                        </Card.Title>
                                        <Card.Text
                                            className="wd-dashboard-course-description overflow-hidden"
                                            style={{ height: 100 }}
                                        >
                                            {c.description}
                                        </Card.Text>

                                        <div className="d-flex justify-content-between align-items-center">
                                            <Button variant="primary">Go</Button>

                                            {isStaff ? (
                                                <ButtonGroup className="gap-2">
                                                    <Button
                                                        id="wd-edit-course-click"
                                                        variant="warning"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setCourse(c);
                                                        }}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        id="wd-delete-course-click"
                                                        variant="danger"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            onDelete(c._id);
                                                        }}
                                                    >
                                                        Delete
                                                    </Button>
                                                </ButtonGroup>
                                            ) : currentUser ? (
                                                <Button
                                                    id={
                                                        enrolled
                                                            ? "wd-unenroll-click"
                                                            : "wd-enroll-click"
                                                    }
                                                    variant={
                                                        enrolled ? "danger" : "success"
                                                    }
                                                    onClick={async (e) => {
                                                        e.preventDefault();
                                                        if (!currentUser) return;

                                                        try {
                                                            if (enrolled) {
                                                                // Unenroll
                                                                await client.unenrollFromCourse(c._id);
                                                                dispatch(unenroll({ user: currentUser._id, course: c._id }));
                                                            } else {
                                                                // Enroll
                                                                await client.enrollInCourse(c._id);
                                                                dispatch(enroll({ user: currentUser._id, course: c._id }));
                                                            }
                                                        } catch (err) {
                                                            console.error("Failed to toggle enrollment", err);
                                                        }
                                                    }}

                                                >
                                                    {enrolled ? "Unenroll" : "Enroll"}
                                                </Button>
                                            ) : null}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
}

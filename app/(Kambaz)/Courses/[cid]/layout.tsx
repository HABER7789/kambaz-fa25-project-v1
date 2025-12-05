"use client";

import { ReactNode, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { FaAlignJustify } from "react-icons/fa";
import CourseNavigation from "./Navigation";
import Breadcrumb from "./Breadcrumb";
import type { RootState } from "../../store";

type Course = {
    _id: string;
    number?: string;
    name: string;
    description: string;
    img?: string;
};

export default function CoursesLayout({
    children,
}: Readonly<{ children: ReactNode }>) {
    const { cid } = useParams<{ cid: string }>();

    const courses = useSelector(
        (s: RootState) => s.courses.courses
    ) as Course[];

    const course = courses.find((c) => c._id === cid);
    const [showNav, setShowNav] = useState(true);

    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <FaAlignJustify
                    className="me-4 fs-4 mb-1"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowNav((v) => !v)}
                />
                <Breadcrumb courseName={course?.name} />
            </h2>
            <hr />
            <div className="d-flex">
                {showNav && (
                    <div className="d-none d-md-block">
                        <CourseNavigation />
                    </div>
                )}
                <div className="flex-fill">{children}</div>
            </div>
        </div>
    );
}

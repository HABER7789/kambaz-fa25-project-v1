"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";

export default function CourseNavigation() {
    const pathname = usePathname();
    const { cid } = (useParams() as { cid?: string }) ?? {};

    
    const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"] as const;

    
    const idOf = (name: (typeof links)[number]) => `wd-course-${name.toLowerCase()}-link`;
    const hrefOf = (name: (typeof links)[number]) =>
        `/Courses/${encodeURIComponent(cid ?? "")}/${name === "People" ? "People/Table" : name}`;
    const matchOf = (name: (typeof links)[number]) =>
        `/Courses/${encodeURIComponent(cid ?? "")}/${name === "People" ? "People" : name}`;

    return (
        <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
            {links.map((name) => {
                const href = hrefOf(name);
                const match = matchOf(name);
                const isActive = pathname.startsWith(match);
                return (
                    <Link
                        key={name}
                        id={idOf(name)}
                        href={href}
                        className={`list-group-item border-0 ${isActive ? "active" : "text-danger"}`}
                    >
                        {name}
                    </Link>
                );
            })}
        </div>
    );
}

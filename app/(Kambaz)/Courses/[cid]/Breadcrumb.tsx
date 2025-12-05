"use client";

import { usePathname } from "next/navigation";

export default function Breadcrumb({ courseName }: { courseName?: string }) {
    const pathname = usePathname() || "";


    const parts = pathname.split("/").filter(Boolean);
    const last = parts[parts.length - 1];
    const prev = parts[parts.length - 2];
    const cid = parts[parts.indexOf("Courses") + 1];


    let section = "Home";
    if (last && last !== cid) {
        section = last;

        if (section === "Table" && prev === "People") section = "People";
    }


    section = section.slice(0, 1).toUpperCase() + section.slice(1);

    return (
        <span>
            {courseName ?? `Course ${cid ?? ""}`} &gt; {section}
        </span>
    );
}

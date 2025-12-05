"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks";

export default function AccountNavigation() {
    const pathname = usePathname();
    const currentUser = useAppSelector((s) => s.account.currentUser);

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    type Item = { id: string; label: string; href: string };

    // default: guest links
    let items: Item[] = [
        { id: "wd-account-signin-link", label: "Signin", href: "/Account/Signin" },
        { id: "wd-account-signup-link", label: "Signup", href: "/Account/Signup" },
    ];

    if (mounted && currentUser) {
        items = [
            {
                id: "wd-account-profile-link",
                label: "Profile",
                href: "/Account/Profile",
            },
        ];
        if (currentUser.role === "ADMIN") {
            items.push({
                id: "wd-account-users-link",
                label: "Users",
                href: "/Account/Users",
            });
        }
    }

    return (
        <div
            id="wd-account-navigation"
            className="wd list-group fs-5 rounded-0"
        >
            {items.map((it) => {
                const active = pathname.startsWith(it.href);
                return (
                    <Link
                        key={it.id}
                        id={it.id}
                        href={it.href}
                        className={`list-group-item border-0 ${active ? "active" : "text-danger"
                            }`}
                    >
                        {it.label}
                    </Link>
                );
            })}
        </div>
    );
}

"use client";

import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { AiOutlineDashboard } from "react-icons/ai";
import { BsPersonCircle, BsFillInboxFill, BsCalendar3 } from "react-icons/bs";
import { LiaBookSolid } from "react-icons/lia";
import { FaFlask } from "react-icons/fa6";
import Image from "next/image";

export default function KambazNavigation() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // helper: check path AND (optionally) a tab query param
    const isActive = (path: string, opts?: { tab?: string }) => {
        const pathMatches = pathname === path || pathname.startsWith(path + "/");
        if (!pathMatches) return false;
        if (opts?.tab === undefined) return true;
        return searchParams.get("tab") === opts.tab;
    };

    type ItemProps = {
        href: string;
        id: string;
        label: string;
        Icon: React.ComponentType<{ className?: string }>;
        variant?: "account" | "default";
        // new: how to compute active state for this item
        activeWhen?: () => boolean;
    };

    const Item = ({ href, id, label, Icon, variant = "default", activeWhen }: ItemProps) => {
        if (variant === "account") {
            return (
                <ListGroupItem className="bg-black border-0 text-center">
                    <Link href={href} id={id} className="text-white text-decoration-none d-inline-block w-100">
                        <Icon className="fs-1 text-white" />
                        <br />
                        <span className="fs-6">{label}</span>
                    </Link>
                </ListGroupItem>
            );
        }

        const active = activeWhen ? activeWhen() : isActive(href);
        const itemCls = "border-0 text-center " + (active ? "bg-white border-start border-3 border-dark" : "bg-black");
        const linkCls = "text-decoration-none d-inline-block w-100 " + (active ? "text-danger" : "text-white");
        const iconCls = "fs-1 text-danger";

        return (
            <ListGroupItem className={itemCls}>
                <Link href={href} id={id} className={linkCls}>
                    <Icon className={iconCls} />
                    <br />
                    <span className="fs-6">{label}</span>
                </Link>
            </ListGroupItem>
        );
    };

    const links: ItemProps[] = [
        { href: "/Account", id: "wd-account-link", label: "Account", Icon: BsPersonCircle, variant: "account" },

        // Dashboard tab
        {
            href: "/Dashboard?tab=dashboard",
            id: "wd-dashboard-link",
            label: "Dashboard",
            Icon: AiOutlineDashboard,
            activeWhen: () => isActive("/Dashboard", { tab: "dashboard" }),
        },

        // Courses tab (same page, different tab)
        {
            href: "/Dashboard?tab=courses",
            id: "wd-course-link",
            label: "Courses",
            Icon: LiaBookSolid,
            activeWhen: () => isActive("/Dashboard", { tab: "courses" }),
        },

        { href: "/Calendar", id: "wd-calendar-link", label: "Calendar", Icon: BsCalendar3 },
        { href: "/Inbox", id: "wd-inbox-link", label: "Inbox", Icon: BsFillInboxFill },
        { href: "/Labs", id: "wd-labs-link", label: "Labs", Icon: FaFlask },
    ];

    return (
        <ListGroup
            id="wd-kambaz-navigation"
            className="rounded-0 position-fixed bottom-0 top-0 bg-black z-2"
            style={{ width: 115 }}
        >
            <ListGroupItem
                className="bg-black border-0 text-center"
                as="a"
                target="_blank"
                href="https://www.northeastern.edu/"
                id="wd-neu-link"
            >
                <Image src="/images/neu.png" height={55} width={75} alt="Northeastern University" />
            </ListGroupItem>

            {links.map((link) => (
                <Item key={link.id} {...link} />
            ))}
        </ListGroup>
    );
}

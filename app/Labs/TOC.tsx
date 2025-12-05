"use client";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TOC() {
    const pathname = usePathname();

    return (
        <Nav variant="pills" id="wd-toc">
            <NavItem>
                <NavLink as={Link} href="/Labs" active={pathname === "/Labs"}>
                    Labs
                </NavLink>
            </NavItem>

            <NavItem>
                <NavLink as={Link} href="/Labs/Lab1" active={pathname?.includes("/Labs/Lab1")}>
                    Lab 1
                </NavLink>
            </NavItem>

            <NavItem>
                <NavLink as={Link} href="/Labs/Lab2" active={pathname?.includes("/Labs/Lab2")}>
                    Lab 2
                </NavLink>
            </NavItem>

            <NavItem>
                <NavLink as={Link} href="/Labs/Lab3" active={pathname?.includes("/Labs/Lab3")}>
                    Lab 3
                </NavLink>
            </NavItem>

            <NavItem>
                <NavLink as={Link} href="/Labs/Lab4" active={pathname?.includes("/Labs/Lab4")}>
                    Lab 4
                </NavLink>
            </NavItem>

            <NavItem>
                <NavLink as={Link} href="/Labs/Lab5" active={pathname?.includes("/Labs/Lab5")}>
                    Lab 5
                </NavLink>
            </NavItem>

            <NavItem>
                <NavLink as={Link} href="/" active={pathname === "/"}>
                    Kambaz
                </NavLink>
            </NavItem>

            <NavItem>
                <NavLink
                    href="https://github.com/haber7789"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    My GitHub
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                    href="https://github.com/HABER7789/kambaz-node-server-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Server GitHub
                </NavLink>
            </NavItem>
        </Nav>
    );
}

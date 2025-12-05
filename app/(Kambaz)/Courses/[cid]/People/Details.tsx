"use client";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { FaPencilAlt, FaCheck } from "react-icons/fa";
import { FormControl, FormSelect } from "react-bootstrap";
import * as client from "../../../Account/client";

type Props = {
    uid: string;
    onClose: () => void;
};

type User = {
    _id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: string;
    loginId?: string;
    section?: string;
    totalActivity?: string | number | null;
};

export default function PeopleDetails({ uid, onClose }: Props) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // local editing state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("STUDENT");
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            if (!uid) return;
            setLoading(true);
            try {
                const u = await client.findUserById(uid);
                setUser(u);

                setName(`${u.firstName ?? ""} ${u.lastName ?? ""}`.trim());
                setEmail(u.email ?? "");
                setRole(u.role ?? "STUDENT");
            } catch (e) {
                console.error("Failed to load user details", e);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [uid]);

    if (!uid || (!loading && !user)) {
        return null;
    }

    const handleDelete = async () => {
        try {
            await client.deleteUser(uid);
        } catch (e) {
            console.error("Failed to delete user", e);
        } finally {
            onClose();
        }
    };

    const saveUser = async () => {
        if (!user) return;

        const trimmed = name.trim();
        if (!trimmed) {
            setEditing(false);
            return;
        }

        const parts = trimmed.split(" ");
        const firstName = parts[0];
        const lastName = parts.slice(1).join(" ");

        try {
            const updated = await client.updateUser(user._id, {
                firstName,
                lastName,
                email,
                role,
            });

            setUser(updated);
            setName(`${updated.firstName ?? ""} ${updated.lastName ?? ""}`.trim());
            setEmail(updated.email ?? "");
            setRole(updated.role ?? "STUDENT");
            setEditing(false);

            // close so parent table can refresh
            onClose();
        } catch (e) {
            console.error("Failed to update user", e);
        }
    };

    return (
        <div
            className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25"
            style={{ zIndex: 1050 }}
        >
            {/* big X on the top right */}
            <button
                onClick={onClose}
                className="btn position-fixed end-0 top-0 wd-close-details"
                style={{ zIndex: 1051 }}
            >
                <IoCloseSharp className="fs-1" />
            </button>

            {loading || !user ? (
                <div className="mt-5 text-center text-muted">Loading…</div>
            ) : (
                <>
                    <div className="text-center mt-2">
                        <FaUserCircle className="text-secondary me-2 fs-1" />
                    </div>

                    {/* name line with pencil/check */}
                    <div className="text-danger fs-4 mt-2">
                        {!editing && (
                            <FaPencilAlt
                                className="float-end fs-5 mt-2 wd-edit"
                                style={{ cursor: "pointer" }}
                                onClick={() => setEditing(true)}
                            />
                        )}
                        {editing && (
                            <FaCheck
                                className="float-end fs-5 mt-2 me-2 wd-save"
                                style={{ cursor: "pointer" }}
                                onClick={saveUser}
                            />
                        )}

                        {!editing && (
                            <div
                                className="wd-name"
                                style={{ cursor: "pointer" }}
                                onClick={() => setEditing(true)}
                            >
                                {user.firstName} {user.lastName}
                            </div>
                        )}

                        {editing && (
                            <FormControl
                                className="w-75 wd-edit-name"
                                defaultValue={name}
                                onChange={(e) => setName(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") saveUser();
                                }}
                            />
                        )}
                    </div>

                    <hr />

                    {/* details block */}
                    <div>
                        <b>Roles:</b>{" "}
                        {!editing ? (
                            <span className="wd-roles">{user.role}</span>
                        ) : (
                            <FormSelect
                                className="wd-edit-role mt-1"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="STUDENT">STUDENT</option>
                                <option value="TA">TA</option>
                                <option value="FACULTY">FACULTY</option>
                                <option value="ADMIN">ADMIN</option>
                            </FormSelect>
                        )}
                        <br />
                        <b>Login ID:</b>{" "}
                        <span className="wd-login-id">{user.loginId}</span>
                        <br />
                        <b>Section:</b>{" "}
                        <span className="wd-section">{user.section}</span>
                        <br />
                        <b>Total Activity:</b>{" "}
                        <span className="wd-total-activity">
                            {user.totalActivity || "N/A"}
                        </span>
                        <br />
                        <b>Email:</b>{" "}
                        {!editing ? (
                            <span className="wd-email">{user.email}</span>
                        ) : (
                            <FormControl
                                type="email"
                                className="wd-edit-email mt-1"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") saveUser();
                                }}
                            />
                        )}
                    </div>

                    <hr />
                    <button
                        onClick={handleDelete}
                        className="btn btn-danger float-end wd-delete"
                    >
                        Delete
                    </button>
                    <button
                        onClick={onClose}
                        className="btn btn-secondary float-end me-2 wd-cancel"
                    >
                        Cancel
                    </button>
                </>
            )}
        </div>
    );
}

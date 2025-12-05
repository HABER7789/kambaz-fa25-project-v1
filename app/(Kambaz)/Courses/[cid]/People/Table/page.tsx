"use client";

import PeopleDetails from "../Details";
import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { Table, Button, FormControl, FormSelect } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { FaTrash, FaPencilAlt, FaSave, FaTimes, FaPlus } from "react-icons/fa";

import type { RootState } from "../../../../store";
import * as courseClient from "../../../client";
import * as accountClient from "../../../../Account/client";

type User = {
    _id: string;
    username?: string;
    password?: string;
    firstName: string;
    lastName: string;
    loginId: string;
    section: string;
    role: string;
    lastActivity?: string;   // ← Changed to optional
    totalActivity?: string;  // ← Changed to optional
};

const EMPTY_NEW_USER: Partial<User> = {
    username: "",
    password: "changeme",
    firstName: "",
    lastName: "",
    loginId: "",
    section: "",
    role: "STUDENT",
    lastActivity: new Date().toISOString().slice(0, 10),  // ← Added
    totalActivity: "00:00:00",  // ← Added
};

type Props = {
    users?: User[];
    fetchUsers?: () => void;
};

export default function PeopleTable({ users, fetchUsers }: Props) {
    const { cid } = useParams() as { cid: string };

    const currentUser = useSelector(
        (s: RootState) => s.account.currentUser
    ) as { _id: string; role?: string } | null;

    const canOpenDetails = useMemo(
        () =>
            !!currentUser &&
            ["ADMIN", "FACULTY", "TA"].includes(currentUser.role ?? ""),
        [currentUser]
    );

    const canManageCourseRoster = useMemo(
        () =>
            !!currentUser &&
            ["ADMIN", "FACULTY", "TA"].includes(currentUser.role ?? ""),
        [currentUser]
    );

    const [roster, setRoster] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const [editingId, setEditingId] = useState<string | null>(null);
    const [draft, setDraft] = useState<Partial<User> | null>(null);

    const [newUser, setNewUser] = useState<Partial<User>>({ ...EMPTY_NEW_USER });
    const [creating, setCreating] = useState(false);

    const [showDetails, setShowDetails] = useState(false);
    const [showUserId, setShowUserId] = useState<string | null>(null);

    const usingExternalUsers = Array.isArray(users);
    const rows: User[] = usingExternalUsers ? users! : roster;

    const canManage = usingExternalUsers ? false : canManageCourseRoster;
    const canCreate = canManage && !usingExternalUsers;

    useEffect(() => {
        if (usingExternalUsers) {
            setLoading(false);
            return;
        }
        const load = async () => {
            setLoading(true);
            try {
                const data = await courseClient.findPeopleForCourse(cid);
                setRoster(data);
            } catch (e) {
                console.error("Failed to load people for course", e);
                setRoster([]);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [cid, usingExternalUsers]);

    const onCreate = async () => {
        if (!canCreate) return;
        if (!newUser.username || !newUser.firstName || !newUser.lastName) return;

        try {
            setCreating(true);
            const created = await accountClient.createUser({
                username: newUser.username,
                password: newUser.password || "changeme",
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                loginId: newUser.loginId || newUser.username,
                section: newUser.section || "S101",
                role: newUser.role || "STUDENT",
                lastActivity: new Date().toISOString().slice(0, 10),
                totalActivity: "00:00:00",
            });

            await courseClient.enrollUserInCourse(cid, created._id);

            setRoster((r) => [...r, created]);
            setNewUser({ ...EMPTY_NEW_USER });
        } catch (e) {
            console.error("Failed to create user", e);
        } finally {
            setCreating(false);
        }
    };

    const startEdit = (u: User) => {
        if (!canManage) return;
        setEditingId(u._id);
        setDraft({ ...u });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setDraft(null);
    };

    const onSaveEdit = async () => {
        if (!editingId || !draft) return;
        try {
            const updated = await accountClient.updateUser(editingId, draft);
            setRoster((r) => r.map((u) => (u._id === updated._id ? updated : u)));
            cancelEdit();
        } catch (e) {
            console.error("Failed to update user", e);
        }
    };

    const onDelete = async (u: User) => {
        if (!canManage) return;
        if (
            typeof window !== "undefined" &&
            !window.confirm(
                `Remove ${u.firstName} ${u.lastName} from system and course?`
            )
        ) {
            return;
        }
        try {
            await accountClient.deleteUser(u._id);
            await courseClient.unenrollUserFromCourse(cid, u._id);
            setRoster((r) => r.filter((x) => x._id !== u._id));
        } catch (e) {
            console.error("Failed to delete user", e);
        }
    };

    const handleOpenDetails = (id: string) => {
        if (!canOpenDetails) return;
        setShowUserId(id);
        setShowDetails(true);
    };

    const handleCloseDetails = () => {
        setShowDetails(false);
        setShowUserId(null);

        if (fetchUsers) {
            fetchUsers();
        } else if (!usingExternalUsers) {
            (async () => {
                try {
                    const data = await courseClient.findPeopleForCourse(cid);
                    setRoster(data);
                } catch (e) {
                    console.error("Failed to refresh roster", e);
                }
            })();
        }
    };

    const renderRow = (u: User) => {
        const isEditing = editingId === u._id;

        if (!isEditing || !draft || !canManage) {
            // normal (non-editing) row; name is clickable for details
            return (
                <tr key={u._id}>
                    <td className="wd-full-name text-nowrap">
                        <span
                            className={canOpenDetails ? "text-danger text-decoration-none" : ""}
                            style={{
                                cursor: canOpenDetails ? "pointer" : "default",
                                transition: "opacity 0.2s"
                            }}
                            onMouseEnter={(e) => {
                                if (canOpenDetails) e.currentTarget.style.opacity = "0.7";
                            }}
                            onMouseLeave={(e) => {
                                if (canOpenDetails) e.currentTarget.style.opacity = "1";
                            }}
                            onClick={() => handleOpenDetails(u._id)}
                        >
                            <FaUserCircle className="me-2 fs-1 text-secondary" />
                            <span className="wd-first-name">{u.firstName}</span>{" "}
                            <span className="wd-last-name">{u.lastName}</span>
                        </span>
                    </td>
                    <td className="wd-login-id">{u.loginId}</td>
                    <td className="wd-section">{u.section}</td>
                    <td className="wd-role">{u.role}</td>
                    <td className="wd-last-activity">{u.lastActivity || "N/A"}</td>
                    <td className="wd-total-activity">{u.totalActivity || "N/A"}</td>
                    {canManage && !usingExternalUsers && (
                        <td className="text-nowrap">
                            <Button
                                size="sm"
                                variant="outline-primary"
                                className="me-2"
                                onClick={() => startEdit(u)}
                            >
                                <FaPencilAlt />
                            </Button>
                            <Button
                                size="sm"
                                variant="outline-danger"
                                onClick={() => onDelete(u)}
                            >
                                <FaTrash />
                            </Button>
                        </td>
                    )}
                </tr>
            );
        }

        // editing mode (course roster only)
        return (
            <tr key={u._id}>
                <td className="wd-full-name text-nowrap">
                    <FaUserCircle className="me-2 fs-1 text-secondary" />
                    <div className="d-inline-block">
                        <FormControl
                            className="mb-1"
                            value={draft.firstName ?? ""}
                            onChange={(e) =>
                                setDraft({ ...draft, firstName: e.target.value })
                            }
                        />
                        <FormControl
                            value={draft.lastName ?? ""}
                            onChange={(e) =>
                                setDraft({ ...draft, lastName: e.target.value })
                            }
                        />
                    </div>
                </td>
                <td>
                    <FormControl
                        value={draft.loginId ?? ""}
                        onChange={(e) =>
                            setDraft({ ...draft, loginId: e.target.value })
                        }
                    />
                </td>
                <td>
                    <FormControl
                        value={draft.section ?? ""}
                        onChange={(e) =>
                            setDraft({ ...draft, section: e.target.value })
                        }
                    />
                </td>
                <td>
                    <FormSelect
                        value={draft.role ?? "STUDENT"}
                        onChange={(e) =>
                            setDraft({ ...draft, role: e.target.value })
                        }
                    >
                        <option value="STUDENT">STUDENT</option>
                        <option value="TA">TA</option>
                        <option value="FACULTY">FACULTY</option>
                        <option value="ADMIN">ADMIN</option>
                    </FormSelect>
                </td>
                <td>{u.lastActivity || "N/A"}</td>
                <td>{u.totalActivity || "N/A"}</td>
                <td className="text-nowrap">
                    <Button
                        size="sm"
                        variant="success"
                        className="me-2"
                        onClick={onSaveEdit}
                    >
                        <FaSave />
                    </Button>
                    <Button size="sm" variant="secondary" onClick={cancelEdit}>
                        <FaTimes />
                    </Button>
                </td>
            </tr>
        );
    };

    return (
        <div id="wd-people-table">
            {showDetails && showUserId && (
                <PeopleDetails uid={showUserId} onClose={handleCloseDetails} />
            )}

            {!usingExternalUsers && <h3 className="mb-3">People</h3>}

            {canCreate && (
                <div className="mb-4 border rounded p-3">
                    <h5 className="mb-3 d-flex align-items-center">
                        <FaPlus className="me-2" /> Add User to Course
                    </h5>
                    <div className="row g-2">
                        <div className="col-md-3">
                            <FormControl
                                placeholder="Username"
                                value={newUser.username ?? ""}
                                onChange={(e) =>
                                    setNewUser({ ...newUser, username: e.target.value })
                                }
                            />
                        </div>
                        <div className="col-md-3">
                            <FormControl
                                placeholder="First name"
                                value={newUser.firstName ?? ""}
                                onChange={(e) =>
                                    setNewUser({ ...newUser, firstName: e.target.value })
                                }
                            />
                        </div>
                        <div className="col-md-3">
                            <FormControl
                                placeholder="Last name"
                                value={newUser.lastName ?? ""}
                                onChange={(e) =>
                                    setNewUser({ ...newUser, lastName: e.target.value })
                                }
                            />
                        </div>
                        <div className="col-md-2">
                            <FormSelect
                                value={newUser.role ?? "STUDENT"}
                                onChange={(e) =>
                                    setNewUser({ ...newUser, role: e.target.value })
                                }
                            >
                                <option value="STUDENT">STUDENT</option>
                                <option value="TA">TA</option>
                                <option value="FACULTY">FACULTY</option>
                                <option value="ADMIN">ADMIN</option>
                            </FormSelect>
                        </div>
                        <div className="col-md-1 d-grid">
                            <Button
                                variant="primary"
                                disabled={creating}
                                onClick={onCreate}
                            >
                                Add
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <Table striped>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Login ID</th>
                        <th>Section</th>
                        <th>Role</th>
                        <th>Last Activity</th>
                        <th>Total Activity</th>
                        {canManage && !usingExternalUsers && <th />}
                    </tr>
                </thead>
                <tbody>
                    {loading && !usingExternalUsers && (
                        <tr>
                            <td colSpan={canManage ? 7 : 6} className="text-muted">
                                Loading roster...
                            </td>
                        </tr>
                    )}

                    {!loading && rows.map(renderRow)}

                    {!loading && rows.length === 0 && (
                        <tr>
                            <td colSpan={canManage ? 7 : 6} className="text-muted">
                                {usingExternalUsers
                                    ? "No users found."
                                    : "No people enrolled in this course."}
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
}
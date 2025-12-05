"use client";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks";
import { FormControl, FormSelect } from "react-bootstrap";
import * as client from "../client";
import PeopleTable from "../../Courses/[cid]/People/Table/page";
import { FaPlus } from "react-icons/fa6";



type User = {
    _id: string;
    username?: string;
    password?: string;
    firstName: string;
    lastName: string;
    loginId: string;
    section: string;
    role: string;
    lastActivity?: string;  // Make optional
    totalActivity?: string; // Make optional
};

export default function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const [role, setRole] = useState("");
    const [name, setName] = useState("");
    const createUser = async () => {
        const user = await client.createUser({
            firstName: "New",
            lastName: `User${users.length + 1}`,
            username: `newuser${Date.now()}`,
            password: "password123",
            email: `email${users.length + 1}@neu.edu`,
            section: "S101",
            role: "STUDENT",
        });
        setUsers([...users, user]);
    };
    const currentUser = useAppSelector((s) => s.account.currentUser);

    const fetchUsers = async () => {
        const data = await client.findAllUsers();
        setUsers(data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const filterUsersByRole = async (newRole: string) => {
        setRole(newRole);
        if (!newRole) {
            if (name) {
                const data = await client.findUsersByPartialName(name);
                setUsers(data);
            } else {
                fetchUsers();
            }
            return;
        }
        const data = await client.findUsersByRole(newRole);
        setUsers(data);
    };

    const filterUsersByName = async (newName: string) => {
        setName(newName);
        if (!newName) {
            if (role) {
                const data = await client.findUsersByRole(role);
                setUsers(data);
            } else {
                fetchUsers();
            }
            return;
        }
        const data = await client.findUsersByPartialName(newName);
        setUsers(data);
    };

    if (!currentUser || currentUser.role !== "ADMIN") {
        return <div>Not authorized.</div>;
    }

    return (
        <div>
            <button onClick={createUser} className="float-end btn btn-danger wd-add-people">
                <FaPlus className="me-2" />
                Users
            </button>
            <h3>Users</h3>
            <FormControl
                value={name}
                onChange={(e) => filterUsersByName(e.target.value)}
                placeholder="Search people"
                className="float-start w-25 me-2 wd-filter-by-name"
            />
            <FormSelect
                value={role}
                onChange={(e) => filterUsersByRole(e.target.value)}
                className="form-select float-start w-25 wd-select-role"
            >
                <option value="">All Roles</option>
                <option value="STUDENT">Students</option>
                <option value="TA">Assistants</option>
                <option value="FACULTY">Faculty</option>
                <option value="ADMIN">Administrators</option>
            </FormSelect>
            <div className="clearfix mb-3" />

            {/* Use PeopleTable component instead of rendering table directly */}
            <PeopleTable users={users} fetchUsers={fetchUsers} />
        </div>
    );
}
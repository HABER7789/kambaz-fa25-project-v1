"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, FormControl, Spinner, Alert } from "react-bootstrap";
import { useAppDispatch } from "../../hooks";
import { setCurrentUser } from "../reducer";
import * as client from "../client";

type User = {
    _id?: string;
    username?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    dob?: string;
    email?: string;
    role?: string;
};

type HttpErrorShape = {
    response?: { data?: { message?: string } };
};

export default function Profile() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [profile, setProfile] = useState<User | null>(null);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const saveProfile = async () => {
        if (!profile || !profile._id) return;
        setBusy(true);
        setError(null);
        setSuccess(false);
        try {
            const updated = await client.updateUser(profile._id, profile);
            setProfile(updated);
            dispatch(setCurrentUser(updated));
            setSuccess(true);
        } catch (err: unknown) {
            const maybe = err as HttpErrorShape;
            const message = maybe.response?.data?.message ?? "Failed to update profile";
            setError(message);
        } finally {
            setBusy(false);
        }
    };

    const signout = async () => {
        await client.signout();
        dispatch(setCurrentUser(null));
        router.push("/Account/Signin");
    };

    useEffect(() => {
        let cancelled = false;

        const fetchProfile = async () => {
            try {
                const user = await client.profile();
                if (!cancelled) {
                    setProfile(user);
                    dispatch(setCurrentUser(user));
                }
            } catch {
                if (!cancelled) {
                    router.push("/Account/Signin");
                }
            }
        };

        fetchProfile();

        return () => {
            cancelled = true;
        };
    }, [dispatch, router]);

    if (!profile) return <div className="p-3">Loading...</div>;

    return (
        <div id="wd-profile-screen" className="p-3" style={{ maxWidth: 420 }}>
            <h3 className="mb-3">Profile</h3>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">Profile saved</Alert>}

            <FormControl
                id="wd-username"
                className="mb-2"
                value={profile.username || ""}
                onChange={(e) =>
                    setProfile({ ...profile, username: e.target.value })
                }
            />
            <FormControl
                id="wd-password"
                className="mb-2"
                type="password"
                value={profile.password || ""}
                onChange={(e) =>
                    setProfile({ ...profile, password: e.target.value })
                }
            />
            <FormControl
                id="wd-firstname"
                className="mb-2"
                value={profile.firstName || ""}
                onChange={(e) =>
                    setProfile({ ...profile, firstName: e.target.value })
                }
            />
            <FormControl
                id="wd-lastname"
                className="mb-2"
                value={profile.lastName || ""}
                onChange={(e) =>
                    setProfile({ ...profile, lastName: e.target.value })
                }
            />
            <FormControl
                id="wd-dob"
                className="mb-2"
                type="date"
                value={profile.dob || ""}
                onChange={(e) =>
                    setProfile({ ...profile, dob: e.target.value })
                }
            />
            <FormControl
                id="wd-email"
                className="mb-2"
                value={profile.email || ""}
                onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                }
            />
            <select
                id="wd-role"
                className="form-control mb-3"
                value={profile.role || "STUDENT"}
                onChange={(e) =>
                    setProfile({ ...profile, role: e.target.value })
                }
            >
                <option value="ADMIN">Admin</option>
                <option value="FACULTY">Faculty</option>
                <option value="TA">TA</option>
                <option value="STUDENT">Student</option>
            </select>

            <Button
                id="wd-update-profile"
                onClick={saveProfile}
                className="w-100 mb-2"
                disabled={busy}
            >
                {busy ? <Spinner animation="border" size="sm" /> : "Save"}
            </Button>

            <Button
                onClick={signout}
                className="w-100"
                variant="danger"
                id="wd-signout-btn"
            >
                Sign Out
            </Button>
        </div>
    );
}

"use client";

import { useState } from "react";
import { Alert, Button, FormControl, Spinner } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../../hooks";
import { setCurrentUser } from "../reducer";
import * as client from "../client";

type SignupPayload = {
    username: string;
    password: string;
};

type HttpErrorShape = {
    response?: { data?: { message?: string } };
};

export default function Signup() {
    const [form, setForm] = useState<SignupPayload>({
        username: "",
        password: "",
    });
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const dispatch = useAppDispatch();

    const doSignup = async () => {
        setBusy(true);
        setError(null);
        try {
            const user = await client.signup(form);
            dispatch(setCurrentUser(user));
            router.push("/Account/Profile");
        } catch (err: unknown) {
            const maybe = err as HttpErrorShape;
            const message = maybe.response?.data?.message ?? "Unable to sign up";
            setError(message);
        } finally {
            setBusy(false);
        }
    };

    return (
        <div id="wd-signup-screen" className="p-3" style={{ maxWidth: 360 }}>
            <h3 className="mb-3">Sign Up</h3>

            {error && (
                <Alert variant="danger" className="mb-3">
                    {error}
                </Alert>
            )}

            <FormControl
                id="wd-new-username"
                placeholder="username"
                className="mb-2"
                value={form.username}
                onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                }
            />
            <FormControl
                id="wd-new-password"
                placeholder="password"
                type="password"
                className="mb-3"
                value={form.password}
                onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                }
            />

            <Button
                id="wd-signup-btn"
                className="w-100 mb-2"
                disabled={busy}
                onClick={doSignup}
            >
                {busy ? <Spinner animation="border" size="sm" /> : "Sign Up"}
            </Button>

            <a href="/Account/Signin" id="wd-back-to-signin">
                Signin
            </a>
        </div>
    );
}

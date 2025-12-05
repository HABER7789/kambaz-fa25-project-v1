"use client";

import { useState } from "react";
import { Alert, Button, FormControl, Spinner } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../../hooks";
import { setCurrentUser } from "../reducer";
import * as client from "../client";

type HttpErrorShape = {
    response?: { data?: { message?: string } };
};

export default function Signin() {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [busy, setBusy] = useState(false);
    const router = useRouter();
    const dispatch = useAppDispatch();

    const doSignin = async () => {
        setBusy(true);
        setError(null);
        try {
            const user = await client.signin(credentials);
            dispatch(setCurrentUser(user));
            router.push("/Dashboard");
        } catch (err: unknown) {
            const maybe = err as HttpErrorShape;
            const message = maybe.response?.data?.message ?? "Unable to sign in";
            setError(message);
        } finally {
            setBusy(false);
        }
    };

    return (
        <div id="wd-signin-screen" className="p-3" style={{ maxWidth: 360 }}>
            <h3 className="mb-3">Sign In</h3>

            {error && (
                <Alert
                    id="wd-signin-error"
                    variant="danger"
                    className="mb-3"
                >
                    {error}
                </Alert>
            )}

            <FormControl
                className="mb-2"
                placeholder="username"
                id="wd-username"
                value={credentials.username}
                onChange={(e) =>
                    setCredentials({ ...credentials, username: e.target.value })
                }
            />
            <FormControl
                className="mb-3"
                placeholder="password"
                type="password"
                id="wd-password"
                value={credentials.password}
                onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                }
            />

            <Button
                id="wd-signin-btn"
                className="w-100 mb-2"
                onClick={doSignin}
                disabled={busy}
            >
                {busy ? <Spinner animation="border" size="sm" /> : "Sign In"}
            </Button>

            <a href="/Account/Signup" id="wd-signup-link">
                Sign Up
            </a>
        </div>
    );
}

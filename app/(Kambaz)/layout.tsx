"use client";

import { ReactNode, Suspense, useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store";
import KambazNavigation from "./Navigation";
import "./styles.css";

import { useAppDispatch } from "./hooks";
import { setCurrentUser } from "./Account/reducer";
import * as accountClient from "./Account/client";


function SessionBootstrap({ children }: { children: ReactNode }) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        let cancelled = false;

    

        const loadProfile = async () => {
            try {
                const user = await accountClient.profile();
                if (!cancelled) {
                    dispatch(setCurrentUser(user));
                }
            } catch {
                if (!cancelled) {
                    dispatch(setCurrentUser(null));
                }
            }
        };


        loadProfile();

        return () => {
            cancelled = true;
        };
    }, [dispatch]);

    return <>{children}</>;
}

export default function KambazLayout({
    children,
}: Readonly<{ children: ReactNode }>) {
    return (
        <Provider store={store}>
            <div id="wd-kambaz">
                <div className="d-flex">
                    <div>
                        <Suspense fallback={null}>
                            <KambazNavigation />
                        </Suspense>
                    </div>
                    <div className="wd-main-content-offset p-3 flex-fill">
                        <SessionBootstrap>{children}</SessionBootstrap>
                    </div>
                </div>
            </div>
        </Provider>
    );
}

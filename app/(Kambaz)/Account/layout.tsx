import { Suspense } from "react";
import AccountNavigation from "./Navigation";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="d-flex">
            <div className="me-4" style={{ width: 220 }}>
                <Suspense fallback={null}>
                    <AccountNavigation />
                </Suspense>
            </div>
            <div className="flex-fill">{children}</div>
        </div>
    );
}

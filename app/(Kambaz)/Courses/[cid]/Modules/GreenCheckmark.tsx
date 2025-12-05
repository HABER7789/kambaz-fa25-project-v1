import { FaCheckCircle, FaCircle } from "react-icons/fa";
export default function GreenCheckmark() {
    return (
        <span className="d-inline-flex align-items-center position-relative" style={{ width: "20px", height: "20px" }}>
            <FaCheckCircle className="text-success position-absolute fs-5" style={{ left: 0, top: "50%", transform: "translateY(-50%)" }} />
            <FaCircle className="text-white fs-6" style={{ position: "relative", zIndex: -1 }} />
        </span>
    );
}
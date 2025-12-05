"use client";

import { Button } from "react-bootstrap";
import { MdDoNotDisturbAlt, MdHome, MdOutlineDynamicFeed, MdAnnouncement, MdAnalytics, MdNotifications } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";

export default function CourseStatus() {
    return (
        <div id="wd-course-status" style={{ width: "350px" }}>
            <h2>Course Status</h2>

            {/* top actions */}
            <div className="d-flex">
                <div className="w-50 pe-1">
                    <Button variant="secondary" size="lg" className="w-100 text-nowrap">
                        <MdDoNotDisturbAlt className="me-2 fs-5" /> Unpublish
                    </Button>
                </div>
                <div className="w-50 ps-1">
                    <Button variant="success" size="lg" className="w-100">
                        <FaCheckCircle className="me-2 fs-5" /> Publish
                    </Button>
                </div>
            </div>

            {/* sidebar buttons */}
            <br />
            <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
                <BiImport className="me-2 fs-5" /> Import Existing Content
            </Button>
            <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
                <LiaFileImportSolid className="me-2 fs-5" /> Import from Commons
            </Button>
            <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
                <MdHome className="me-2 fs-5" /> Choose Home Page
            </Button>
            <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
                <MdOutlineDynamicFeed className="me-2 fs-5" /> View Course Stream
            </Button>
            <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
                <MdAnnouncement className="me-2 fs-5" /> New Announcement
            </Button>
            <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
                <MdAnalytics className="me-2 fs-5" /> New Analytics
            </Button>
            <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
                <MdNotifications className="me-2 fs-5" /> View Course Notifications
            </Button>
        </div>
    );
}

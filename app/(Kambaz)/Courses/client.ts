import axios from "axios";

// Same pattern as Account/client.ts
const HTTP_SERVER =
    process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

// Single axios instance that always talks to the Node server + sends cookies
const axiosWithCredentials = axios.create({
    baseURL: HTTP_SERVER,
    withCredentials: true,
});

// Now use relative paths instead of repeating the full URL
const COURSES_API = "/api/courses";
const USERS_API = "/api/users";
// const MODULES_API = "/api/modules"; // removed because unused
const ASSIGNMENTS_API = "/api/assignments";
const ENROLLMENTS_API = "/api/users/current/enrollments";

export type CoursePayload = {
    _id?: string;
    number: string;
    name: string;
    description: string;
    img: string;
};

export type ModulePayload = {
    _id?: string;
    name: string;
    description: string;
};

export type AssignmentPayload = {
    _id?: string;
    course?: string;
    title: string;
    points: number;
    due: string;
    availableFrom?: string;
    description?: string;
};

export type EnrollmentDto = {
    _id: string;
    user: string;
    course: string;
};

// ---------- Courses ----------
export const fetchAllCourses = async () => {
    const { data } = await axiosWithCredentials.get(COURSES_API);
    return data;
};

export const findMyCourses = async () => {
    const { data } = await axiosWithCredentials.get(
        `${USERS_API}/current/courses`,
    );
    return data;
};

export const createCourse = async (course: CoursePayload) => {
    const { data } = await axiosWithCredentials.post(
        `${USERS_API}/current/courses`,
        course,
    );
    return data;
};

export const deleteCourse = async (id: string) => {
    const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${id}`);
    return data;
};

export const updateCourse = async (course: CoursePayload & { _id: string }) => {
    const { data } = await axiosWithCredentials.put(
        `${COURSES_API}/${course._id}`,
        course,
    );
    return data;
};

// ---------- Modules ----------
export const findModulesForCourse = async (courseId: string) => {
    const { data } = await axiosWithCredentials.get(
        `${COURSES_API}/${courseId}/modules`,
    );
    return data;
};

export const createModuleForCourse = async (
    courseId: string,
    module: ModulePayload,
) => {
    const { data } = await axiosWithCredentials.post(
        `${COURSES_API}/${courseId}/modules`,
        module,
    );
    return data;
};

export const deleteModule = async (courseId: string, moduleId: string) => {
    const { data } = await axiosWithCredentials.delete(
        `${COURSES_API}/${courseId}/modules/${moduleId}`,
    );
    return data;
};

export const updateModule = async (
    courseId: string,
    module: ModulePayload & { _id: string },
) => {
    const { data } = await axiosWithCredentials.put(
        `${COURSES_API}/${courseId}/modules/${module._id}`,
        module,
    );
    return data;
};


// ---------- Assignments ----------
export const findAssignmentsForCourse = async (courseId: string) => {
    const { data } = await axiosWithCredentials.get(
        `${COURSES_API}/${courseId}/assignments`,
    );
    return data;
};

export const createAssignmentForCourse = async (
    courseId: string,
    assignment: AssignmentPayload,
) => {
    const { data } = await axiosWithCredentials.post(
        `${COURSES_API}/${courseId}/assignments`,
        assignment,
    );
    return data;
};

export const deleteAssignment = async (assignmentId: string) => {
    const { data } = await axiosWithCredentials.delete(
        `${ASSIGNMENTS_API}/${assignmentId}`,
    );
    return data;
};

export const updateAssignmentOnServer = async (
    assignment: AssignmentPayload & { _id: string },
) => {
    const { data } = await axiosWithCredentials.put(
        `${ASSIGNMENTS_API}/${assignment._id}`,
        assignment,
    );
    return data;
};

// ---------- Enrollments ----------
export const fetchMyEnrollments = async (): Promise<EnrollmentDto[]> => {
    const { data } = await axiosWithCredentials.get(ENROLLMENTS_API);
    return data;
};

export const enrollInCourse = async (courseId: string) => {
    const { data } = await axiosWithCredentials.post(
        `${ENROLLMENTS_API}/${courseId}`,
    );
    return data;
};

export const unenrollFromCourse = async (courseId: string) => {
    const { data } = await axiosWithCredentials.delete(
        `${ENROLLMENTS_API}/${courseId}`,
    );
    return data;
};

// ---------- People / Enrollments for People screen ----------
export const findPeopleForCourse = async (courseId: string) => {
    const { data } = await axiosWithCredentials.get(
        `${COURSES_API}/${courseId}/people`,
    );
    return data;
};

export const enrollUserInCourse = async (courseId: string, userId: string) => {
    const { data } = await axiosWithCredentials.post(
        `${COURSES_API}/${courseId}/enrollments`,
        { userId },
    );
    return data;
};

export const unenrollUserFromCourse = async (
    courseId: string,
    userId: string,
) => {
    const { data } = await axiosWithCredentials.delete(
        `${COURSES_API}/${courseId}/enrollments/${userId}`,
    );
    return data;
};

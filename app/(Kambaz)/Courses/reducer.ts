// app/(Kambaz)/Courses/reducer.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Course {
    _id: string;
    number: string;
    name: string;
    description: string;
    img: string;
}

interface CoursesState {
    courses: Course[];
}

// When talking to the server, the server generates _id
// and we just store whatever it sends us.
type AddCoursePayload = Course;
type UpdateCoursePayload = Course;

const initialState: CoursesState = {
    // IMPORTANT: start empty and let the server fill it
    courses: [],
};

const coursesSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {
        // Replace the list with data from the server
        setCourses: (state, { payload }: PayloadAction<Course[]>) => {
            state.courses = payload;
        },

        // Add a single course (typically the one just created on server)
        addNewCourse: (state, { payload }: PayloadAction<AddCoursePayload>) => {
            state.courses.push(payload);
        },

        deleteCourse: (state, { payload: courseId }: PayloadAction<string>) => {
            state.courses = state.courses.filter((course) => course._id !== courseId);
        },

        updateCourse: (state, { payload }: PayloadAction<UpdateCoursePayload>) => {
            state.courses = state.courses.map((c) =>
                c._id === payload._id ? payload : c
            );
        },
    },
});

export const { setCourses, addNewCourse, deleteCourse, updateCourse } =
    coursesSlice.actions;

export default coursesSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Enrollment = { user: string; course: string };

type EnrollmentsState = {
    items: Enrollment[];
};

const initialState: EnrollmentsState = {
    items: [],   // start empty, will be populated from server
};

const enrollmentsSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
        setEnrollments: (state, action: PayloadAction<Enrollment[]>) => {
            state.items = action.payload;
        },
        enroll: (state, action: PayloadAction<Enrollment>) => {
            const { user, course } = action.payload;
            const exists = state.items.some(
                (e) => e.user === user && e.course === course
            );
            if (!exists) {
                state.items.push({ user, course });
            }
        },
        unenroll: (state, action: PayloadAction<Enrollment>) => {
            const { user, course } = action.payload;
            state.items = state.items.filter(
                (e) => !(e.user === user && e.course === course)
            );
        },
    },
});

export const { setEnrollments, enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;

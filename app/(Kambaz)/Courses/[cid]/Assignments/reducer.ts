import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Assignment = {
    _id: string;
    course: string;
    title: string;
    points: number;
    due: string;
    availableFrom?: string;
    description?: string;
};

type AssignmentsState = {
    assignments: Assignment[];
};

type UpdateAssignmentPayload = Assignment;

const initialState: AssignmentsState = {
    assignments: [],
};

const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        setAssignments: (state, action: PayloadAction<Assignment[]>) => {
            state.assignments = action.payload;
        },

        // We now expect a **full** Assignment from the server
        addAssignment: (state, action: PayloadAction<Assignment>) => {
            state.assignments.unshift(action.payload);
        },

        updateAssignment: (
            state,
            action: PayloadAction<UpdateAssignmentPayload>
        ) => {
            const updated = action.payload;
            state.assignments = state.assignments.map((a) =>
                a._id === updated._id ? updated : a
            );
        },

        deleteAssignment: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            state.assignments = state.assignments.filter((a) => a._id !== id);
        },
    },
});

export const {
    setAssignments,
    addAssignment,
    updateAssignment,
    deleteAssignment,
} = assignmentsSlice.actions;
export default assignmentsSlice.reducer;

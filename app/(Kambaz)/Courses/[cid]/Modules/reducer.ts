import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";


export interface Lesson {
    _id: string;
    name: string;
    description: string;
    module: string; // module id
}

export interface Module {
    _id: string;
    name: string;
    description: string;
    course: string;   // course id
    lessons: Lesson[];
    editing?: boolean;
}

interface ModulesState {
    modules: Module[];
}

type AddModulePayload = {
    name: string;
    course: string;
    description?: string;
};

type UpdateModulePayload = Module;

// ---- Initial state: now EMPTY, server will populate
const initialState: ModulesState = {
    modules: [],
};

// ---- Slice
const modulesSlice = createSlice({
    name: "modules",
    initialState,
    reducers: {
        // hydrate from server
        setModules: (state, { payload }: PayloadAction<Module[]>) => {
            state.modules = payload;
        },

        addModule: (state, { payload }: PayloadAction<AddModulePayload>) => {
            const newModule: Module = {
                _id: uuidv4(),
                name: payload.name,
                description: payload.description ?? "",
                course: payload.course,
                lessons: [],
            };
            state.modules.push(newModule);
        },

        deleteModule: (state, { payload: moduleId }: PayloadAction<string>) => {
            state.modules = state.modules.filter((m) => m._id !== moduleId);
        },

        updateModule: (state, { payload }: PayloadAction<UpdateModulePayload>) => {
            state.modules = state.modules.map((m) =>
                m._id === payload._id ? payload : m
            );
        },

        editModule: (state, { payload: moduleId }: PayloadAction<string>) => {
            state.modules = state.modules.map((m) =>
                m._id === moduleId ? { ...m, editing: true } : m
            );
        },
    },
});

export const {
    setModules,
    addModule,
    deleteModule,
    updateModule,
    editModule,
} = modulesSlice.actions;

export default modulesSlice.reducer;

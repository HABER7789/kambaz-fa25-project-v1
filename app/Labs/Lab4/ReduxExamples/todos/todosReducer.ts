
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Todo = { id: string; title: string };

interface TodosState {
    todos: Todo[];
    todo: Todo;
}

const initialState: TodosState = {
    todos: [
        { id: "1", title: "Learn React" },
        { id: "2", title: "Learn Node" },
    ],
    todo: { id: "-1", title: "Learn Mongo" },
};

const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<Todo>) => {
            state.todos.push({
                ...action.payload,
                id: new Date().getTime().toString(),
            });
            state.todo = { id: "-1", title: "" };
        },
        deleteTodo: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter((t) => t.id !== action.payload);
        },
        updateTodo: (state, action: PayloadAction<Todo>) => {
            state.todos = state.todos.map((t) =>
                t.id === action.payload.id ? action.payload : t
            );
            state.todo = { id: "-1", title: "" };
        },
        setTodo: (state, action: PayloadAction<Todo>) => {
            state.todo = action.payload;
        },
    },
});

export const { addTodo, deleteTodo, updateTodo, setTodo } = todosSlice.actions;
export default todosSlice.reducer;

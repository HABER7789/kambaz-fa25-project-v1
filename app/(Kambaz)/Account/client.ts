// app/(Kambaz)/Account/client.ts
"use client";

import axios from "axios";

export const HTTP_SERVER =
    process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

export const USERS_API = "/api/users";

const axiosWithCredentials = axios.create({
    baseURL: HTTP_SERVER,
    withCredentials: true,
});

export type Credentials = { username: string; password: string };
export type UserUpdates = Record<string, unknown>;
export type NewUserPayload = Record<string, unknown>;

export const signin = async (credentials: Credentials) =>
    (await axiosWithCredentials.post(`${USERS_API}/signin`, credentials)).data;

export const signup = async (user: NewUserPayload) =>
    (await axiosWithCredentials.post(`${USERS_API}/signup`, user)).data;

export const signout = async () => {
    await axiosWithCredentials.post(`${USERS_API}/signout`);
};

export const profile = async () =>
    (await axiosWithCredentials.post(`${USERS_API}/profile`)).data;

export const findAllUsers = async () =>
    (await axiosWithCredentials.get(USERS_API)).data;

// 6.2.6.3: by role
export const findUsersByRole = async (role: string) =>
    (
        await axiosWithCredentials.get(
            `${USERS_API}?role=${encodeURIComponent(role)}`
        )
    ).data;

// 6.2.6.4: by partial first/last name
export const findUsersByPartialName = async (name: string) =>
    (
        await axiosWithCredentials.get(
            `${USERS_API}?name=${encodeURIComponent(name)}`
        )
    ).data;

// 6.2.6.4: by ID (for PeopleDetails)
export const findUserById = async (id: string) =>
    (await axiosWithCredentials.get(`${USERS_API}/${id}`)).data;

export const updateUser = async (id: string, updates: UserUpdates) =>
    (await axiosWithCredentials.put(`${USERS_API}/${id}`, updates)).data;

export const createUser = async (user: NewUserPayload) =>
    (await axiosWithCredentials.post(USERS_API, user)).data;


export const deleteUser = async (id: string) =>
    (await axiosWithCredentials.delete(`${USERS_API}/${id}`)).data;


import axios from "axios";

const API = import.meta.env.VITE_API_URL;
const client = axios.create({
    baseURL: API,
    headers: {
        "Content-Type": "application/json"
    }
});

// Posts Endpoints
export const PostsAPI = {
    list: async (params = {}) => {
        const res = await client.get(`/api/posts`, { params });
        return res.data;
    },

    getById: async (id) => {
        const res = await client.get(`/api/posts/${id}`);
        return res.data;
    },

    create: async (payload) => {
        const res = await client.post(`/api/posts`, payload);
        return res.data;
    },

    update: async (id, payload) => {
        const res = await client.put(`/api/posts/${id}`, payload);
        return res.data;
    },

    remove: async (id) => {
        const res = await client.delete(`/api/posts/${id}`);
        return res.data;
    },

    addComment: async (id, payload) => {
        const res = await client.post(`/api/posts/${id}/comments`, payload);
        return res.data;
    },

    deleteComment: async (postId, commentId) => {
        const res = await client.delete(`/api/posts/${postId}/comments/${commentId}`);
        return res.data;
    },

    like: async (id) => {
        const res = await client.post(`/api/posts/${id}/like`);
        return res.data;
    }
};

// Categories Endpoints
export const CategoriesAPI = {
    list: async () => {
        const res = await client.get(`/api/categories`);
        return res.data;
    },

    getById: async (id) => {
        const res = await client.get(`/api/categories/${id}`);
        return res.data;
    },

    create: async (payload) => {
        const res = await client.post(`/api/categories`, payload);
        return res.data;
    },

    update: async (id, payload) => {
        const res = await client.put(`/api/categories/${id}`, payload);
        return res.data;
    },

    remove: async (id) => {
        const res = await client.delete(`/api/categories/${id}`);
        return res.data;
    }
};

// Auth Endpoints
export const AuthAPI = {
    register: async (payload) => {
        const res = await client.post(`/api/auth/register`, payload);
        return res.data;
    },

    login: async (payload) => {
        const res = await client.post(`/api/auth/login`, payload);
        return res.data;
    }
};

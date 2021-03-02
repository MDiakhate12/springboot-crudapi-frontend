import axios from 'axios';

export default axios.create({
    baseURL: process.env.BACKEND_BASE_URL || "http://localhost:8080",
    headers: {
        "Content-Type": "application/json"
    }
});

// const api = 'http://localhost:8080'; // Local development
const api = 'https://todo-list-backend-z0zq.onrender.com'; // Production
const apiURL = `${api}/api`;
const loginApiUrl = `${apiURL}/auth/login`;
const userApiUrl = `${apiURL}/users`;

export { apiURL, loginApiUrl, userApiUrl };

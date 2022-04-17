const APP_NAME = "react-api";

export const BASE_URL_KEY = `${APP_NAME}:baseURL`;
export const USERNAME_KEY = `${APP_NAME}:uername`;
export const PASSWORD_KEY = `${APP_NAME}:password`;

export const BASE_URL = localStorage.getItem(BASE_URL_KEY) || "http://localhost:8080";
export const USERNAME = localStorage.getItem(USERNAME_KEY) || "test";
export const PASSWORD = localStorage.getItem(PASSWORD_KEY) || "passw0rd";
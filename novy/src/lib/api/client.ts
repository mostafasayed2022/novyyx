import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { ApiError } from "./types";

/**
 * ==============================================================================
 * NOVYX CENTRALIZED API CLIENT
 * Axios client for the NOVYX Next.js API layer (or an optional external API override).
 * ==============================================================================
 */

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "/api/";

/**
 * Extracts a specific cookie value (such as Django's standard csrftoken) in browser environments.
 */
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(^|;\\s*)(${name})=([^;]*)`));
  return match ? decodeURIComponent(match[3]) : null;
}

/**
 * Centralized Axios instance
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Client-Version": "1.0.0",
  },
  withCredentials: true,
});

// Request Interceptor: Injects Django CSRF Token and Bearer authorization if available
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      // 1. Django CSRF Token from Cookie
      const csrfToken = getCookie("csrftoken");
      if (csrfToken && config.headers) {
        config.headers["X-CSRFToken"] = csrfToken;
      }

      // 2. JWT / Token Auth from Storage if applicable
      const authToken = window.localStorage.getItem("novyx_auth_token");
      if (authToken && config.headers && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Normalizes Django REST Framework errors into a strongly-typed ApiError
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    const statusCode = error.response?.status;
    const responseData = error.response?.data as Record<string, unknown> | undefined;

    let fieldErrors: Record<string, string[]> | undefined = undefined;
    let message = "An unexpected error occurred.";

    if (responseData && typeof responseData === "object") {
      // Handle Django DRF 'detail' standard message
      if (typeof responseData.detail === "string") {
        message = responseData.detail;
      } else if (Array.isArray(responseData.non_field_errors)) {
        message = responseData.non_field_errors.join(" ");
      } else {
        // Parse Django DRF field errors: { [field]: string[] | string }
        const parsedFieldErrors: Record<string, string[]> = {};
        const messages: string[] = [];

        for (const [key, val] of Object.entries(responseData)) {
          if (Array.isArray(val)) {
            const stringArr = val.map(String);
            parsedFieldErrors[key] = stringArr;
            messages.push(`${key}: ${stringArr.join(", ")}`);
          } else if (typeof val === "string") {
            parsedFieldErrors[key] = [val];
            messages.push(`${key}: ${val}`);
          }
        }

        if (Object.keys(parsedFieldErrors).length > 0) {
          fieldErrors = parsedFieldErrors;
          message = messages.join(" | ");
        }
      }
    }

    // Default status messages if not overridden by DRF response
    if (statusCode) {
      if (statusCode === 400 && message === "An unexpected error occurred.") {
        message = "Invalid request parameters. Please verify input data.";
      } else if (statusCode === 401) {
        message = "Authentication required or credentials expired.";
      } else if (statusCode === 403) {
        message = "Access restricted: insufficient scientific clearance level.";
      } else if (statusCode === 404) {
        message = "The requested biological entity or resource could not be found.";
      } else if (statusCode === 429) {
        message = "API rate limit exceeded. Please wait before retrying.";
      } else if (statusCode >= 500) {
        message = "NOVYX laboratory service encountered an internal error.";
      }
    } else if (error.request) {
      message = "Network error: Unable to communicate with NOVYX laboratory API.";
    }

    const apiError: ApiError = {
      code: error.code || `HTTP_${statusCode || "NETWORK_ERROR"}`,
      message,
      fieldErrors,
      details: responseData,
      statusCode,
    };

    return Promise.reject(apiError);
  }
);

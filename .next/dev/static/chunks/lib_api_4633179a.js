(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/api.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ApiError",
    ()=>ApiError,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const API_BASE_URL = (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');
/**
 * Centralized API client for backend communication
 */ class ApiClient {
    async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;
        console.log(`[ApiClient] Requesting: ${url}`);
        try {
            let response;
            try {
                response = await fetch(url, {
                    ...options,
                    headers: {
                        'Content-Type': 'application/json',
                        ...options.headers
                    }
                });
            } catch (netErr) {
                console.error("[ApiClient] Network Fetch Error:", netErr);
                throw new ApiError('Network connection failed', 'NETWORK_ERROR', 0);
            }
            console.log(`[ApiClient] Response Status: ${response.status} ${response.statusText}`);
            const responseText = await response.text();
            console.log("[ApiClient] Raw Response Body:", responseText);
            let data;
            try {
                // Handle empty response gracefully
                if (!responseText || responseText.trim() === "") {
                    // If status is not ok but body is empty, we must create an error object
                    data = {
                        error: response.statusText,
                        code: `HTTP_${response.status}`
                    };
                } else {
                    data = JSON.parse(responseText);
                }
            } catch (parseError) {
                console.error("[ApiClient] JSON Parse Error. Response body:", responseText);
                throw new ApiError(`Invalid server response (${response.status})`, 'PARSE_ERROR', response.status);
            }
            if (!response.ok) {
                console.error("[ApiClient] API Error:", data);
                throw new ApiError(data.error || 'Request failed', data.code, response.status);
            }
            return data;
        } catch (error) {
            if (error instanceof ApiError) throw error;
            console.error("[ApiClient] Unexpected Error:", error);
            throw new ApiError(error.message || 'Network error. Please check your connection.', 'UNKNOWN_ERROR', 0);
        }
    }
    // Payment verification
    async verifyPayment(reference) {
        return this.request('/api/payments/verify', {
            method: 'POST',
            body: JSON.stringify({
                reference
            })
        });
    }
    // Tickets
    async createTicket(ticketData) {
        return this.request('/api/tickets/create', {
            method: 'POST',
            body: JSON.stringify(ticketData)
        });
    }
    async getTicket(ticketId) {
        return this.request(`/api/tickets/${ticketId}`);
    }
    async validateTicket(ticketId) {
        return this.request('/api/tickets/validate', {
            method: 'POST',
            body: JSON.stringify({
                ticketId
            })
        });
    }
    // Bookings
    async createBooking(bookingData) {
        return this.request('/api/bookings/create', {
            method: 'POST',
            body: JSON.stringify(bookingData)
        });
    }
}
/**
 * Custom API Error class
 */ class ApiError extends Error {
    constructor(message, code, status){
        super(message);
        this.name = 'ApiError';
        this.code = code;
        this.status = status;
    }
}
// Export singleton instance
const api = new ApiClient();
const __TURBOPACK__default__export__ = api;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=lib_api_4633179a.js.map
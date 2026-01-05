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
"[project]/components/CheckoutModal.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CheckoutModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-client] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$paystack$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-paystack/dist/index.es.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
// Ticket creation state constants
const TicketStatus = {
    IDLE: 'idle',
    PAYING: 'paying',
    GENERATING: 'generating',
    SUCCESS: 'success',
    FAILED: 'failed'
};
const ErrorMessages = {
    TICKET_CREATION_FAILED: "Failed to generate ticket. Please try again.",
    PAYMENT_FAILED: "Payment was not successful. Please try again.",
    NETWORK_ERROR: "Network error. Please check your connection and try again."
};
function CheckoutModal({ isOpen, onClose, ticket, onComplete }) {
    _s();
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        fullName: '',
        email: '',
        phone: ''
    });
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(TicketStatus.IDLE);
    const [errorMessage, setErrorMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // Paystack Configuration
    const [reference, setReference] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isConfigReady, setIsConfigReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Safety Refs to handle callback closures and race conditions
    const isSuccessRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CheckoutModal.useEffect": ()=>{
            if (isOpen) {
                // Reset state on open
                setReference('');
                setIsConfigReady(false);
                setStatus(TicketStatus.IDLE);
                setErrorMessage('');
                isSuccessRef.current = false;
                // Fetch strict server-side reference immediately when modal opens
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].request('/api/payments/reference').then({
                    "CheckoutModal.useEffect": (data)=>{
                        console.log("Got reference:", data.reference);
                        setReference(data.reference);
                    }
                }["CheckoutModal.useEffect"]).catch({
                    "CheckoutModal.useEffect": (err)=>{
                        console.error("Failed to get reference", err);
                        setErrorMessage("Connection failed. Please reopen.");
                    }
                }["CheckoutModal.useEffect"]);
            }
        }
    }["CheckoutModal.useEffect"], [
        isOpen
    ]);
    // Paystack Configuration - Memoized
    const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CheckoutModal.useMemo[config]": ()=>{
            return {
                reference: reference || 'pending_ref',
                email: formData.email,
                amount: (ticket.price || 0) * 100,
                publicKey: ("TURBOPACK compile-time value", "pk_test_d96e04b83fe2aa7577fe6faa723ea76a320eb10b") || '',
                metadata: {
                    fullName: formData.fullName,
                    phone: formData.phone,
                    ticketType: ticket.name
                }
            };
        }
    }["CheckoutModal.useMemo[config]"], [
        reference,
        formData.email,
        formData.fullName,
        formData.phone,
        ticket.price,
        ticket.name
    ]);
    // Initialize hook. It updates when config updates.
    const initializePayment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$paystack$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePaystackPayment"])(config);
    // Update ready state
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CheckoutModal.useEffect": ()=>{
            if (reference && ("TURBOPACK compile-time value", "pk_test_d96e04b83fe2aa7577fe6faa723ea76a320eb10b") && config.publicKey) {
                setIsConfigReady(true);
            } else {
                setIsConfigReady(false);
            }
        }
    }["CheckoutModal.useEffect"], [
        reference,
        config
    ]);
    // Lock body scroll when modal is open
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CheckoutModal.useEffect": ()=>{
            if (isOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'unset';
                setStatus(TicketStatus.IDLE);
            }
            return ({
                "CheckoutModal.useEffect": ()=>{
                    document.body.style.overflow = 'unset';
                }
            })["CheckoutModal.useEffect"];
        }
    }["CheckoutModal.useEffect"], [
        isOpen
    ]);
    const handleCreateTicket = async (ref)=>{
        setStatus(TicketStatus.GENERATING);
        try {
            const ticketId = 'AS2026-' + Date.now().toString(36).toUpperCase();
            const ticketData = {
                ...formData,
                ticketType: ticket.name,
                ticketPrice: ticket.price || 0,
                ticketId,
                reference: ref || 'DIRECT-' + ticketId,
                paymentVerified: true,
                purchaseDate: new Date().toLocaleDateString()
            };
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createTicket(ticketData);
            setStatus(TicketStatus.SUCCESS);
            setTimeout(()=>onComplete(ticketData), 1000);
        } catch (error) {
            console.error("❌ Ticket Creation Error:", error);
            setErrorMessage(error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"] && error.code === 'NETWORK_ERROR' ? ErrorMessages.NETWORK_ERROR : ErrorMessages.TICKET_CREATION_FAILED);
            setStatus(TicketStatus.FAILED);
        }
    };
    // Callbacks must be stable or handle refs to avoid stale closures
    const onSuccess = (reference)=>{
        console.log("✅ Paystack onSuccess triggered!", reference);
        isSuccessRef.current = true;
        // Show success state briefly before redirect
        setStatus(TicketStatus.SUCCESS);
        // Redirect to verification page
        const params = new URLSearchParams({
            reference: reference.reference,
            email: formData.email,
            ticketType: ticket.name,
            fullName: formData.fullName,
            phone: formData.phone || ''
        });
        // Forced Redirect after short delay
        setTimeout(()=>{
            window.location.href = `/payment-verification?${params.toString()}`;
        }, 300);
    };
    const onClosePayment = ()=>{
        // Check ref to see if we already succeeded
        if (isSuccessRef.current) {
            console.log("❌ Paystack onClose triggered BUT ignored success");
            return;
        }
        console.log("❌ Paystack onClose triggered - User cancelled");
        setStatus(TicketStatus.IDLE);
        setErrorMessage("Payment cancelled.");
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        isSuccessRef.current = false; // Reset
        if (!formData.fullName || !formData.email) {
            alert('Please fill in all required fields');
            return;
        }
        // Free Ticket
        if (ticket.price === 0) {
            await handleCreateTicket('FREE-' + Date.now());
            return;
        }
        if (!isConfigReady) {
            alert("Payment system initializing... please wait a moment.");
            return;
        }
        // We set status to PAYING to show the "Redirecting..." UI
        setStatus(TicketStatus.PAYING);
        // Call Paystack
        initializePayment(onSuccess, onClosePayment);
    };
    const handleRetry = ()=>{
        setStatus(TicketStatus.IDLE);
        setErrorMessage('');
    };
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-midnight-black border border-white/10 rounded-[40px] max-w-md w-full relative shadow-[0_0_100px_rgba(210,164,120,0.2)] animate-fade-in-up max-h-[85vh] flex flex-col overflow-hidden",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-grow overflow-y-auto p-8 md:p-10 custom-scrollbar",
                children: [
                    status === TicketStatus.PAYING && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-20 relative z-10 animate-fade-in",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                className: "w-24 h-24 mx-auto mb-8 text-primary-copper animate-spin"
                            }, void 0, false, {
                                fileName: "[project]/components/CheckoutModal.js",
                                lineNumber: 203,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-3xl font-black italic mb-4",
                                children: "Complete Payment"
                            }, void 0, false, {
                                fileName: "[project]/components/CheckoutModal.js",
                                lineNumber: 204,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-text-muted mb-6",
                                children: "Processing your payment in the popup..."
                            }, void 0, false, {
                                fileName: "[project]/components/CheckoutModal.js",
                                lineNumber: 205,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-3 items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>onSuccess({
                                                reference
                                            }),
                                        className: "btn btn-primary px-8 py-3 font-bold text-sm tracking-wider animate-pulse",
                                        children: "I HAVE COMPLETED PAYMENT"
                                    }, void 0, false, {
                                        fileName: "[project]/components/CheckoutModal.js",
                                        lineNumber: 208,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: onClosePayment,
                                        className: "text-xs text-white/40 hover:text-white underline mt-2",
                                        children: "Cancel Transaction"
                                    }, void 0, false, {
                                        fileName: "[project]/components/CheckoutModal.js",
                                        lineNumber: 215,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/CheckoutModal.js",
                                lineNumber: 207,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/CheckoutModal.js",
                        lineNumber: 202,
                        columnNumber: 25
                    }, this),
                    status === TicketStatus.GENERATING && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                className: "w-24 h-24 mx-auto mb-8 text-primary-copper animate-spin"
                            }, void 0, false, {
                                fileName: "[project]/components/CheckoutModal.js",
                                lineNumber: 224,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-3xl font-black italic mb-4",
                                children: "Generating Ticket..."
                            }, void 0, false, {
                                fileName: "[project]/components/CheckoutModal.js",
                                lineNumber: 225,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-text-muted",
                                children: "Creating your unique ticket credentials"
                            }, void 0, false, {
                                fileName: "[project]/components/CheckoutModal.js",
                                lineNumber: 226,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/CheckoutModal.js",
                        lineNumber: 223,
                        columnNumber: 25
                    }, this),
                    status === TicketStatus.SUCCESS && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                className: "w-24 h-24 mx-auto mb-8 text-green-500"
                            }, void 0, false, {
                                fileName: "[project]/components/CheckoutModal.js",
                                lineNumber: 232,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-3xl font-black italic mb-4 text-green-500",
                                children: "Success!"
                            }, void 0, false, {
                                fileName: "[project]/components/CheckoutModal.js",
                                lineNumber: 233,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-text-muted",
                                children: "Redirecting to your ticket..."
                            }, void 0, false, {
                                fileName: "[project]/components/CheckoutModal.js",
                                lineNumber: 234,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/CheckoutModal.js",
                        lineNumber: 231,
                        columnNumber: 25
                    }, this),
                    status === TicketStatus.FAILED && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                className: "w-24 h-24 mx-auto mb-8 text-red-500"
                            }, void 0, false, {
                                fileName: "[project]/components/CheckoutModal.js",
                                lineNumber: 240,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-3xl font-black italic mb-4 text-red-500",
                                children: "Processing Failed"
                            }, void 0, false, {
                                fileName: "[project]/components/CheckoutModal.js",
                                lineNumber: 241,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-text-muted mb-8 whitespace-pre-line",
                                children: errorMessage
                            }, void 0, false, {
                                fileName: "[project]/components/CheckoutModal.js",
                                lineNumber: 242,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-4 justify-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleRetry,
                                        className: "btn btn-primary px-8 font-black italic",
                                        children: "Try Again"
                                    }, void 0, false, {
                                        fileName: "[project]/components/CheckoutModal.js",
                                        lineNumber: 244,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: onClose,
                                        className: "btn bg-white/5 px-8 font-black italic",
                                        children: "Close"
                                    }, void 0, false, {
                                        fileName: "[project]/components/CheckoutModal.js",
                                        lineNumber: 245,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/CheckoutModal.js",
                                lineNumber: 243,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/CheckoutModal.js",
                        lineNumber: 239,
                        columnNumber: 25
                    }, this),
                    status === TicketStatus.IDLE && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                className: "absolute top-8 right-8 w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/20 rounded-full transition-all text-white border border-white/10 shadow-lg z-10",
                                title: "Close",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    size: 20
                                }, void 0, false, {
                                    fileName: "[project]/components/CheckoutModal.js",
                                    lineNumber: 257,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/CheckoutModal.js",
                                lineNumber: 252,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center mb-10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "inline-block px-6 py-2 rounded-full bg-primary-copper/10 border border-primary-copper/20 mb-6",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-primary-copper font-black text-sm tracking-widest uppercase",
                                            children: ticket.name
                                        }, void 0, false, {
                                            fileName: "[project]/components/CheckoutModal.js",
                                            lineNumber: 262,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/CheckoutModal.js",
                                        lineNumber: 261,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-4xl font-black italic tracking-tighter mb-4",
                                        children: "Ticket Registration"
                                    }, void 0, false, {
                                        fileName: "[project]/components/CheckoutModal.js",
                                        lineNumber: 264,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-5xl font-black text-primary-copper italic",
                                        children: [
                                            "₦",
                                            ticket.price.toLocaleString()
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/CheckoutModal.js",
                                        lineNumber: 265,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/CheckoutModal.js",
                                lineNumber: 260,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                onSubmit: handleSubmit,
                                className: "space-y-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-[10px] font-black uppercase tracking-widest text-text-muted mb-3",
                                                children: "Full Name *"
                                            }, void 0, false, {
                                                fileName: "[project]/components/CheckoutModal.js",
                                                lineNumber: 270,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                required: true,
                                                className: "w-full h-14 bg-white/5 border border-white/10 rounded-xl px-6 outline-none text-white focus:border-primary-copper/50 transition-all font-medium",
                                                value: formData.fullName,
                                                onChange: (e)=>setFormData({
                                                        ...formData,
                                                        fullName: e.target.value
                                                    }),
                                                placeholder: "John Doe"
                                            }, void 0, false, {
                                                fileName: "[project]/components/CheckoutModal.js",
                                                lineNumber: 271,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/CheckoutModal.js",
                                        lineNumber: 269,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-[10px] font-black uppercase tracking-widest text-text-muted mb-3",
                                                children: "Email Address *"
                                            }, void 0, false, {
                                                fileName: "[project]/components/CheckoutModal.js",
                                                lineNumber: 277,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "email",
                                                required: true,
                                                className: "w-full h-14 bg-white/5 border border-white/10 rounded-xl px-6 outline-none text-white focus:border-primary-copper/50 transition-all font-medium",
                                                value: formData.email,
                                                onChange: (e)=>setFormData({
                                                        ...formData,
                                                        email: e.target.value
                                                    }),
                                                placeholder: "john@example.com"
                                            }, void 0, false, {
                                                fileName: "[project]/components/CheckoutModal.js",
                                                lineNumber: 278,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/CheckoutModal.js",
                                        lineNumber: 276,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-[10px] font-black uppercase tracking-widest text-text-muted mb-3",
                                                children: "Phone Number"
                                            }, void 0, false, {
                                                fileName: "[project]/components/CheckoutModal.js",
                                                lineNumber: 284,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "tel",
                                                className: "w-full h-14 bg-white/5 border border-white/10 rounded-xl px-6 outline-none text-white focus:border-primary-copper/50 transition-all font-medium",
                                                value: formData.phone,
                                                onChange: (e)=>setFormData({
                                                        ...formData,
                                                        phone: e.target.value
                                                    }),
                                                placeholder: "+234 XXX XXX XXXX"
                                            }, void 0, false, {
                                                fileName: "[project]/components/CheckoutModal.js",
                                                lineNumber: 285,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/CheckoutModal.js",
                                        lineNumber: 283,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        disabled: !isConfigReady,
                                        className: "btn btn-primary w-full h-16 text-lg font-black uppercase tracking-widest flex items-center justify-center gap-3 disabled:opacity-50 italic",
                                        children: isConfigReady ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"], {
                                                    size: 24
                                                }, void 0, false, {
                                                    fileName: "[project]/components/CheckoutModal.js",
                                                    lineNumber: 295,
                                                    columnNumber: 45
                                                }, this),
                                                "PAY & GET TICKET"
                                            ]
                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                    className: "animate-spin",
                                                    size: 24
                                                }, void 0, false, {
                                                    fileName: "[project]/components/CheckoutModal.js",
                                                    lineNumber: 300,
                                                    columnNumber: 45
                                                }, this),
                                                "INITIALIZING..."
                                            ]
                                        }, void 0, true)
                                    }, void 0, false, {
                                        fileName: "[project]/components/CheckoutModal.js",
                                        lineNumber: 290,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] text-center text-text-muted font-medium uppercase tracking-widest opacity-50",
                                        children: "Secured by Paystack"
                                    }, void 0, false, {
                                        fileName: "[project]/components/CheckoutModal.js",
                                        lineNumber: 306,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/CheckoutModal.js",
                                lineNumber: 268,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/components/CheckoutModal.js",
                lineNumber: 199,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/CheckoutModal.js",
            lineNumber: 198,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/CheckoutModal.js",
        lineNumber: 197,
        columnNumber: 9
    }, this);
}
_s(CheckoutModal, "aBVXl1yqmZ5WpEt19mWe4/ef6b4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$paystack$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePaystackPayment"]
    ];
});
_c = CheckoutModal;
var _c;
__turbopack_context__.k.register(_c, "CheckoutModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/CheckoutModal.js [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/components/CheckoutModal.js [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=_58e58d2c._.js.map
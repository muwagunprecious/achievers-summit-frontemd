module.exports = [
"[project]/lib/prisma.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
;
const prismaClientSingleton = ()=>{
    return new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]();
};
const globalForPrisma = /*TURBOPACK member replacement*/ __turbopack_context__.g;
const prisma = globalForPrisma.prisma ?? prismaClientSingleton();
const __TURBOPACK__default__export__ = prisma;
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = prisma;
}),
"[project]/app/admin/dashboard/tickets/actions.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"400fca7827e4083089eac87d78bc6bdea57ee39dd6":"toggleTicketCategoryStatus","4052a9b69c02349a2fc0a3a1e05bbc9804cec25419":"updateTicketCategory","407beb82289e504309d883c463e814eddcad0fdcea":"deleteTicketCategory","40b226fed082b7cbddf739e14a1ee4e7316eb3f8f2":"addTicketCategory"},"",""] */ __turbopack_context__.s([
    "addTicketCategory",
    ()=>addTicketCategory,
    "deleteTicketCategory",
    ()=>deleteTicketCategory,
    "toggleTicketCategoryStatus",
    ()=>toggleTicketCategoryStatus,
    "updateTicketCategory",
    ()=>updateTicketCategory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function toggleTicketCategoryStatus(formData) {
    const id = formData.get("id");
    const currentState = formData.get("currentState") === "true";
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].ticketCategory.update({
            where: {
                id
            },
            data: {
                isEnabled: !currentState,
                status: !currentState ? 'ACTIVE' : 'CLOSED' // Sync status with enabled state for now
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/dashboard/tickets");
    } catch (error) {
        console.error("Failed to toggle ticket category:", error);
    }
}
async function updateTicketCategory(formData) {
    const id = formData.get("id");
    const name = formData.get("name");
    const price = parseFloat(formData.get("price"));
    const capacity = parseInt(formData.get("capacity"));
    const status = formData.get("status");
    const features = formData.getAll("features").filter((f)=>f.trim() !== "");
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].ticketCategory.update({
            where: {
                id
            },
            data: {
                name,
                price,
                capacity,
                status,
                features,
                isEnabled: status === 'ACTIVE'
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/dashboard/tickets");
        return {
            success: true
        };
    } catch (error) {
        console.error("Failed to update ticket category:", error);
        return {
            success: false,
            error: "Failed to update ticket category"
        };
    }
}
async function addTicketCategory(formData) {
    const name = formData.get("name");
    const price = parseFloat(formData.get("price"));
    const capacity = parseInt(formData.get("capacity"));
    const description = formData.get("description") || "";
    const features = formData.getAll("features").filter((f)=>f.trim() !== "");
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].ticketCategory.create({
            data: {
                id: Math.random().toString(36).substring(2, 10),
                name,
                price,
                capacity,
                description,
                features,
                status: 'ACTIVE',
                isEnabled: true,
                updatedAt: new Date()
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/dashboard/tickets");
        return {
            success: true
        };
    } catch (error) {
        console.error("Failed to add ticket category:", error);
        return {
            success: false,
            error: "Failed to add ticket category"
        };
    }
}
async function deleteTicketCategory(id) {
    try {
        // Check if there are tickets sold for this category
        const soldCount = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].ticket.count({
            where: {
                ticketCategoryId: id
            }
        });
        if (soldCount > 0) {
            return {
                success: false,
                error: "Cannot delete category with sold tickets. Close it instead."
            };
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].ticketCategory.delete({
            where: {
                id
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/dashboard/tickets");
        return {
            success: true
        };
    } catch (error) {
        console.error("Failed to delete ticket category:", error);
        return {
            success: false,
            error: "Failed to delete ticket category"
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    toggleTicketCategoryStatus,
    updateTicketCategory,
    addTicketCategory,
    deleteTicketCategory
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(toggleTicketCategoryStatus, "400fca7827e4083089eac87d78bc6bdea57ee39dd6", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateTicketCategory, "4052a9b69c02349a2fc0a3a1e05bbc9804cec25419", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addTicketCategory, "40b226fed082b7cbddf739e14a1ee4e7316eb3f8f2", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteTicketCategory, "407beb82289e504309d883c463e814eddcad0fdcea", null);
}),
"[project]/.next-internal/server/app/admin/dashboard/tickets/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/admin/dashboard/tickets/actions.js [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f$dashboard$2f$tickets$2f$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/admin/dashboard/tickets/actions.js [app-rsc] (ecmascript)");
;
;
;
;
}),
"[project]/.next-internal/server/app/admin/dashboard/tickets/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/admin/dashboard/tickets/actions.js [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "400fca7827e4083089eac87d78bc6bdea57ee39dd6",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f$dashboard$2f$tickets$2f$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toggleTicketCategoryStatus"],
    "4052a9b69c02349a2fc0a3a1e05bbc9804cec25419",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f$dashboard$2f$tickets$2f$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTicketCategory"],
    "407beb82289e504309d883c463e814eddcad0fdcea",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f$dashboard$2f$tickets$2f$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteTicketCategory"],
    "40b226fed082b7cbddf739e14a1ee4e7316eb3f8f2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f$dashboard$2f$tickets$2f$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addTicketCategory"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f$dashboard$2f$tickets$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$admin$2f$dashboard$2f$tickets$2f$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/admin/dashboard/tickets/page/actions.js { ACTIONS_MODULE0 => "[project]/app/admin/dashboard/tickets/actions.js [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f$dashboard$2f$tickets$2f$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/admin/dashboard/tickets/actions.js [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_20419235._.js.map
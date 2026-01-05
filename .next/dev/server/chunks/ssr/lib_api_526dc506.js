module.exports = [
"[project]/lib/api.js [app-ssr] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/lib_api_7c19a9fc.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/lib/api.js [app-ssr] (ecmascript)");
    });
});
}),
];
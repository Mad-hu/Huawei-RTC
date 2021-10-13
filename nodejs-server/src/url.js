export const URL = {
    "/api_dev": {
        "target": "http://test-admin.tedus.cn",
        "pathRewrite": {
            "^/api_dev": ""
        },
        "secure": false,
        "changeOrigin": true
    },
    "/api_test": {
        "target": "http://test-admin.tedus.cn",
        "pathRewrite": {
            "^/api_test": ""
        },
        "secure": false,
        "changeOrigin": true
    },
    "/api_prod": {
        "target": "http://api.aicoders.cn",
        "pathRewrite": {
            "^/api_prod": ""
        },
        "secure": false,
        "changeOrigin": true
    }
}
const routers = [
    {
        path: "/setting",
        name: "setting",
        component: () => import("@/pages/setting/setting.vue"),
        children:[
            {
                name: 'video_set',
                path: 'video',
                component: () => import("@/pages/setting/video.vue")
            }
        ]
    },
    {
                name: 'video_set',
                path: '/video',
                component: () => import("@/pages/setting/video.vue")

    },
]
export default routers
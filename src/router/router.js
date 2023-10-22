//对外暴露路由配置


export const constRoute=[
    {
        path:'/',
        name:'login',
        component:()=>import('@/views/Login/index.vue')
    },
]
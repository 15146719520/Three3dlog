import {defineStore} from "pinia";
import {ElMessage} from "element-plus";


let useUserStore = defineStore('user',{
    persist:true,
    state: () => {
        return {
            token:String //用户表示
        }
    },
    actions: {

    },
    getters: {

    }
})
export default useUserStore
import {createRouter,createWebHistory} from "vue-router";
import {constRoute} from "./router";


let router= createRouter({
  history:createWebHistory(),
  routes:constRoute,
  //滚动行为
  scrollBehavior(){
    return{
      left:0,
      top:0
    }
  }
})


export default router
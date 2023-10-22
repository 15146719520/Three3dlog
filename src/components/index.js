import SvgIcons from "../components/SvgIcons/index.vue"
import Pangination from "../components/Pangination/index.vue";
const allGloablComponent={SvgIcons,Pangination}
export default {
    install(app){
        console.log('自定义组件安装',app)
        Object.keys(allGloablComponent).forEach((key,index)=>{
            console.log(key)
            app.component(key,allGloablComponent[key])
        });
    }
}
<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"> 左侧 </el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_from">
          <div>
            <h1>xxxxx</h1>
            <h2>欢迎进入</h2>
          </div>
          <el-form-item>
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              type="password"
              :prefix-icon="CopyDocument"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              type="primary"
              size="default"
              @click="Login"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, CopyDocument } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const loginForm = reactive({ username: "admin", password: "1111" });
const router = useRouter();
const loading = ref(false);

import * as THREE from "three";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"; //控制组件
//引入

//--****Three

//1
const renderer = new THREE.WebGLRenderer({ antialias: true }); //创建渲染器
renderer.pixelRatio = window.devicePixelRatio; //创建分辨率（拿取窗口分辨率）
renderer.setSize(window.innerWidth, window.innerHeight); //设置渲染的尺寸
document.body.append(renderer.domElement); //添加到dom中

//2
const scene = new THREE.Scene(); //创建场景
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
); //创建相机
camera.position.set(5, 5, 10); //设置相机初始化距离 以原点为中心进行计算
camera.lookAt(0, 0, 0); //设置视角 可理解为第一人称的视角方向
//↑设置视野角度 75 相机的纵横比宽/高  近平面距离 远屏面距离

//3
const axis = new THREE.AxesHelper(5); //创建坐标线（可加可不加） X Y Z 5

//4
// const geometry = new THREE.BoxGeometry(4, 4, 4); //创建一个立方几何体盒子物体
// const material = new THREE.MeshBasicMaterial({ color: 'pink' });  //填补材质颜色 格式不限
// const cube = new THREE.Mesh(geometry, material); //将物体和颜色结合
// scene.add(axis,cube);//所有的物体相机环境灯 最后都需要添加到场景中并渲染

new RGBELoader()
  .setPath("src/assets/images/")
  .load("quarry_01_1k.hdr", function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;

    scene.background = texture; // 设置背景
    scene.environment = texture; // 设置环境
  });

import floor from "../../assets/images/地板.jpg";
const planeGeometry = new THREE.PlaneGeometry(20, 20); //创建添加地板
// const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff }); //地板颜色
let textloader = new THREE.TextureLoader();
const planeMaterial = new THREE.MeshStandardMaterial({
  map: textloader.load(floor),
}); //添加颜色就不能添加纹理

import font from "../../assets/images/font.png"; //添加图片
const geometry = new THREE.BoxGeometry(4, 4, 4); //创建一个立方几何体盒子物体
const material = [
  new THREE.MeshBasicMaterial({
    map: textloader.load(font),
  }),
  new THREE.MeshBasicMaterial({
    map: textloader.load(font),
  }),
  new THREE.MeshBasicMaterial({
    map: textloader.load(font),
  }),
  new THREE.MeshBasicMaterial({
    map: textloader.load(font),
  }),
  new THREE.MeshBasicMaterial({
    map: textloader.load(font),
  }),
  new THREE.MeshBasicMaterial({
    map: textloader.load(font),
  }),
]; //添加物体纹理 每个边都要设置
const cube = new THREE.Mesh(geometry, material);
scene.add(axis, cube); //所有的物体相机环境灯 最后都需要添加到场景中并渲染

//5
let clock = new THREE.Clock();
function animate() {
  //一个简单的事件
  requestAnimationFrame(animate); //递归回调函数
  const elapsedTime = clock.getElapsedTime(); // 返回已经过去的时间, 以秒为单位
  cube.rotation.y = elapsedTime * Math.PI; // 两秒自转一圈

  cube.position.x = 1 + a;
  cube.position.z = 1 + d;

  renderer.render(scene, camera); //重复渲染
}

//6
const ambientLight = new THREE.AmbientLight("#ffffff", 0.4); //环境光
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight("#ffffff", 1); //方向光
directionalLight.position.set(7, 10, 7); //位置
scene.add(directionalLight);

renderer.shadowMap.enabled = true; //阴影效果
directionalLight.castShadow = true; //阴影效果
cube.castShadow = true; //开启阴影效果

const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial); //和添加物体类似 要创建一个mesh对象
planeMesh.rotation.x = -0.5 * Math.PI; //位置
planeMesh.position.set(0, -3, 0);
planeMesh.receiveShadow = true; //是否开启阴影投射
scene.add(planeMesh);

// 7. 方向光的辅助线
const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight
);
scene.add(directionalLightHelper); // 辅助线

//8 添加纹理

const controls = new OrbitControls(camera, renderer.domElement); //增加物理控制
controls.update(); //更新 ！注意要在渲染后生效 原理等同于 dom没用渲染完无法操作

let a = 0;
let w = 0;
let s = 0;
let d = 0;
window.addEventListener("keydown", (e) => {
  switch (e.keyCode) {
    case 65:
      a += 0.1;
      break;
    case 87:
      w++;
      break;
    case 83:
      s++;
      break;
    case 68:
      d += 0.1;
      break;
  }
});

animate();

const Login = () => {
  console.log("登录 ");
  console.log(loginForm, "loginForm");
  loading.value = true;
};
</script>

<style scoped lang="scss">
.login_container {
  position: fixed;
  .login_from {
    width: 300px;
    height: 270px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: relative;
    top: 30vh;
    background: rgba(100, 87, 43, 0.6);
    border-radius: 30px;
    padding: 15px;
    h1 {
      color: #ffffff;
    }
    h2 {
      color: silver;
    }
  }
}
</style>

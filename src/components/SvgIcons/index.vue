<template>

  <svg :style="{width,height}">
    <use :xlink:href="prefix+icon_name" :fill="icon_color"></use>
  </svg>

</template>

<script setup>

defineProps({
  prefix:{
    type:String,
    default:'#icon-'
  },
  icon_name:String,
  icon_color:{
    type:String,
    default:''
  },
  width:{
    type:String,
    default:'16px'
  },
  height:{
    type:String,
    default:'16px'
  }
})

</script>

<style scoped>

</style>
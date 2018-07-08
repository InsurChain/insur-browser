<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
   return {
     isRouterAlive: true
   }
 },
 methods: {
   reload () {
     this.isRouterAlive = false
     this.$nextTick(() => (this.isRouterAlive = true))
   }   
 }
}
</script>

<style  lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body{
    // position: relative;
    text-align: left;
    margin: 0;
    padding: 0;
    width: 100%;
    overflow-x: hidden;
    
}
html{
  position: relative;
}
html,body{
  min-height: 100%;
  // position: relative;
}
#app{
  min-height: 100%;
}
</style>

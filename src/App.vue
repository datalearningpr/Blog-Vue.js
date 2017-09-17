<template>
  <div>
  <NavBar></NavBar>
    <div id="app">
      <router-view :key="$route.path"></router-view>
    </div>
  <div class='footer'><p>© 2017 - Simple Vue.js Blog Application</p></div>
  </div>
</template>

<script>

import NavBar from '@/components/NavBar';

export default {
  name: 'app',
  components: {
    NavBar,
  },
};
</script>

<style>
#app {
  margin-top: 60px;
  display: block;
  overflow: auto;
  padding-bottom: 50px;
}

.footer {
  display: block;
  box-sizing: border-box;
  text-align: center;
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 1000;
  margin-top: 50px;
}
</style>

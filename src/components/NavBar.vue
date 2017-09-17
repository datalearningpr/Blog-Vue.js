<template>
<div>
  <div class="navbar">
    <div class="container">
      <div class="navbar-head">
        <a class="navbar-brand">Simple Blog</a>
      </div>
      <div class="navbar-body">
        <ul class="navbar-list">
            <li><router-link to="/" replace>Home</router-link></li>
            <li><router-link to="/" replace>About</router-link></li>
            <li><router-link to="/register">Register</router-link></li>
            <li v-if="isAuthenticated"><router-link to="/submitPost">Write Blog</router-link></li>
            <li v-if="!isAuthenticated"><router-link to="/login">Login</router-link></li>
            <li v-else><a v-on:click="logout">Logout</a></li>
        </ul>
      </div>
    </div>
  </div>

</div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  computed: {
    isAuthenticated() {
      let value = false;
      this.$store.commit('setToken', localStorage.getItem('token'));
      if (this.$store.state.token) {
        value = true;
      }
      return value;
    },
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$store.commit('setToken', null);
      this.$store.commit('setIsAuthenticated', false);
      this.$router.replace('/');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
    box-sizing: border-box;
}

div {
    display: block;
}

.navbar {
    font-family: "Helvetica Neue";
    min-height: 50px;
    margin-bottom: 20px;
    border: 1px solid transparent;
    position: fixed;
    right: 0;
    left: 0;
    z-index: 1030;
    top: 0;
    border-width: 0 0 1px;
    background-color: #222;
    border-color: #080808;
}

.container {
    position: relative;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
}



.navbar-head {
    float: left;
    height: 50px;
    padding: 15px 15px;
    font-size: 18px;
    line-height: 20px;
}

.navbar-brand {
    color: #9d9d9d;
    font-size: 18px;
}

.navbar-body {
    position: relative;
    float: left;
}


li {
  float: left;
  list-style: none;
  padding-right: 30px;
}

li a {
  font-size: 14px;
  color: #9d9d9d;  
  text-decoration: none
}

.navbar a:hover {
  color: white;
}



</style>

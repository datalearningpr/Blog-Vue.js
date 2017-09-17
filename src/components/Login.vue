<template>
  <div>
    <form @submit.prevent>
        <dl>
            <label><b>Username: </b></label>
            <input name="username" type="text" placeholder="username" v-model="username"/>
            <label><b>Password: </b></label>
            <input name="password" type="password" placeholder="password" v-model="password"/>
        </dl>
            <small>{{message}}</small>
            <input type="submit" value="login" @click="login()">
    </form>
</div>
</template>

<script>

import BlogService from '@/service/blogService';

const Blog = new BlogService();

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      message: '',
    };
  },
  components: {
  },
  created() {
  },
  methods: {
    login() {
      Blog.loginUser(this.username, this.password).then((d) => {
        if (d.status !== 200) {
          this.message = 'username or password wrong!';
        } else {
          this.message = '';
          localStorage.setItem('token', d.data.access_token);
          this.$store.commit('setToken', localStorage.getItem('token'));
          this.$store.commit('setIsAuthenticated', true);
        }
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  margin: auto;
  width: 50%;
  padding-top:50px;
}

input {
  display: block;
  width: 300px;
}

input[type="submit"] {
  width: 100px;
}


label {
  display: block;
}
</style>

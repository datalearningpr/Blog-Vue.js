<template>
  <div>
    <form @submit.prevent>
        <dl>
            <label><b>Username: </b></label>
            <input name="username" type="text" placeholder="username" v-model="username"/>
            <label><b>Password: </b></label>
            <input name="password" type="password" placeholder="password" v-model="password"/>
            <label><b>Confirm Password: </b></label>
            <input name="password_confirm" type="password" placeholder="confirm password" v-model="passwordConfirm"/>
        </dl>
            <small>{{message}}</small>
            <input type="submit" value="register" @click="register()">
    </form>
</div>
</template>

<script>

import BlogService from '@/service/blogService';

const Blog = new BlogService();

export default {
  name: 'Register',
  data() {
    return {
      username: '',
      password: '',
      passwordConfirm: '',
      message: '',
    };
  },
  components: {
  },
  created() {
  },
  methods: {
    register() {
      Blog.registerUser(this.username, this.password).then((d) => {
        if (d.data.status === 'success') {
          this.username = '';
          this.password = '';
          this.passwordConfirm = '';
          this.message = '';
          alert('registered!');
        } else {
          this.password = '';
          this.passwordConfirm = '';
          this.message = d.data.msg;
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

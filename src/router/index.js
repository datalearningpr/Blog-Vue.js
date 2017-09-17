import Vue from 'vue';
import Router from 'vue-router';
import PostPlace from '@/components/PostPlace';
import Register from '@/components/Register';
import Login from '@/components/Login';
import SubmitPost from '@/components/SubmitPost';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PostPlace',
      component: PostPlace,
    },
    {
      path: '/register',
      name: 'Registesr',
      component: Register,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/submitPost',
      name: 'SubmitPost',
      component: SubmitPost,
    },
  ],
});

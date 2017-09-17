import Vue from 'vue';
import Vuex from 'vuex';
import BlogService from '@/service/blogService';

Vue.use(Vuex);

const Blog = new BlogService();

const store = new Vuex.Store({
  state: {
    blogList: [],
    commentList: [],
    isAuthenticated: false,
    token: null,
  },
  mutations: {
    setBlogList(state, data) {
      state.blogList = data;
    },
    setIsAuthenticated(state, data) {
      state.isAuthenticated = data;
    },
    setCommentList(state, data) {
      state.commentList = data;
    },
    setToken(state, data) {
      state.token = data;
    },
  },
  actions: {
    loadBlogList(context) {
      return Blog.getPosts().then((d) => {
        context.commit('setBlogList', d.data);
      });
    },
    loadCommentList(context, postId) {
      return Blog.getComments(postId).then((d) => {
        context.commit('setCommentList', d.data);
      });
    },
  },
  getters: {

  },
});

export default store;

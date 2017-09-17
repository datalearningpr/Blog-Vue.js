import axios from 'axios';

class BlogService {
  constructor() {
    this.apiURL = 'http://localhost:5000';
  }

  getApiUrl() {
    return this.apiURL;
  }

  getPosts() {
    return axios.get(`${this.getApiUrl()}/api/blog/postlist`)
      .then(response => response)
      .catch((e) => {
        this.throwRequestError(e);
      });
  }

  getComments(postId) {
    return axios.get(`${this.getApiUrl()}/api/blog/post/${postId}/commentlist`)
      .then(response => response)
      .catch((e) => {
        this.throwRequestError(e);
      });
  }

  registerUser(userName, passWord) {
    const parameters = {
      username: userName,
      password: passWord,
    };
    return axios.post(`${this.getApiUrl()}/api/blog/register`, parameters)
      .then(response => response)
      .catch((e) => {
        this.throwRequestError(e);
      });
  }

  loginUser(userName, passWord) {
    const parameters = {
      username: userName,
      password: passWord,
    };
    return axios.post(`${this.getApiUrl()}/api/blog/login`, parameters)
      .then(response => response)
      .catch(e => e.response);
  }

  postBlog(token, parameters) {
    const config = {
      headers: { Authorization: `JWT ${token}` },
    };
    return axios.post(`${this.getApiUrl()}/api/blog/post`, parameters, config)
      .then(response => response)
      .catch(e => e.response);
  }

  postComment(token, parameters) {
    const config = {
      headers: { Authorization: `JWT ${token}` },
    };
    return axios.post(`${this.getApiUrl()}/api/blog/comment`, parameters, config)
      .then(response => response)
      .catch(e => e.response);
  }
}

export default BlogService;

<template>
  <div>
    <form @submit.prevent>
        <div><h1>Edit Post</h1></div>
        <div>
            <label>Post Title</label>
            <input v-model="title" id="Text2" name="title" placeholder="placeholder"  type="text">
        </div>
        <div>
            <label>Post Category</label>
            <input v-model="category" id="Text3" name="category" placeholder="placeholder" type="text">
        </div>
        <div>
            <label>Post Content</label>
            <textarea v-model="body" debounce=500></textarea>
            <div id="marked" v-html="compiledMarkdown"></div>
        </div>
        <div><input type="submit" value="Edit" @click="submitBlog()"></div>
    </form>
  </div>
</template>

<script>
import Marked from 'marked';
import BlogService from '@/service/blogService';

const Blog = new BlogService();


export default {
  name: 'SubmitPost',
  data() {
    return {
      title: '',
      category: '',
      body: '',
    };
  },
  components: {
  },
  created() {
  },
  methods: {
    submitBlog() {
      const parameters = {
        title: this.title,
        category: this.category,
        body: this.body,
      };
      const authToken = this.$store.state.token;
      Blog.postBlog(authToken, parameters).then((d) => {
        if (d.status !== 200) {
          alert('bad');
        } else {
          alert(d.data.msg);
        }
      });
    },
  },
  computed: {
    compiledMarkdown() {
      return Marked(this.body, { sanitize: true });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
textarea {
  display: inline-block;
  width: 49%;
  height: 200px;
  vertical-align: top;
  box-sizing: border-box;
  padding: 0 20px;
  resize: none;
}

#marked {
  display: inline-block;
  width: 49%;
  height: 100%;
  vertical-align: top;
  box-sizing: border-box;
  padding: 0 20px;
}


div {
  margin: auto;
  width: 50%;
  padding-top:20px;
}

div[id="marked"] {
  margin-left: auto;
  margin-right: auto;
  margin-top: 0;
  height: 200px;
  max-width: 50%;
  max-height: 200px;
  overflow-y: auto;
  word-wrap: break-word;
}

input {
  display: block;
  width: 300px;
}

input[type="submit"] {
  width: 100px;
}

h1 {
  margin: auto;
}

label {
  display: block;
}


</style>

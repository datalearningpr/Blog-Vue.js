<template>
    <div id="PostPlace">
        <el-col :span="4"><p></p></el-col>
        <el-col :span="11" v-if="!this.isArticle">
            <div>
                <h1>
                    <a v-on:click="reSet">Simple Blog</a>
                    <small>Recording things</small>
                </h1>
                <h3 v-if="this.mode==='normal'"></h3>
                <h3 v-else-if="this.mode==='title'">title with {{this.titleSearch}} :</h3>
                <h3 v-else-if="this.mode==='category'">category is {{this.categorySearch}} :</h3>
                <h3 v-else-if="this.mode==='author'">author is {{this.authorSearch}} :</h3>
                
                <div id="htmlholder">
                    <div id="postlist">
                        <div v-for="post in getPosts">
                            <h2>
                                <a v-on:click="getArticle(post.id)">{{post.title}}</a>
                            </h2>
                            <p class="lead">
                                by
                                <a v-on:click="searchAuthor(post.username)">{{post.username}}</a>
                            </p>
                            <p style="display:inline; margin-right:20px">
                                <i class="el-icon-time"></i> {{post.timestamp}} </p>
                            <p style="display:inline">
                                <i class="el-icon-document"></i> {{post.category}} </p>
                            <hr>
                            <p>{{post.body}}</p>
                            <el-button type="primary" href="'/post/'+post.id">Read More
                                <i class="el-icon-caret-right"></i>
                            </el-button>
                            <hr>
                        </div>
                    </div>
                </div>
                <!-- Pager -->
                <ul>
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-size="this.pageSize"
                        layout="total, prev, pager, next"
                        :total="postsLength">
                        </el-pagination>
                </ul>
            </div>
        </el-col>

        <el-col :span="11" v-else>
            <h1>
                <a v-on:click="reSet">Simple Blog</a>
                <small>Recording things</small>
            </h1>
            <!-- Blog Post -->
            <!-- Title -->
            <h1>{{getPosts[0].title}}</h1>
            <!-- Author -->
            <p>
                by <a>{{getPosts[0].username}}</a>
            </p>
            <hr>
            <!-- Date/Time -->
            <p style="display:inline; margin-right:20px"><i class="el-icon-time"></i> Posted on {{getPosts[0].timestamp}} </p>
            <p style="display:inline"><i class="el-icon-document"></i> {{getPosts[0].category}}</p>
            <hr>
            <!-- Preview Image -->
            <!-- Post Content -->
            <p>{{getPosts[0].body}}</p>
            <hr>
            <!-- Blog Comments -->
            <!-- Comments Form -->
            
            <div v-if="this.$store.state.isAuthenticated">
                <h4>Leave a Comment:</h4>
                <form @submit.prevent>
                    <div>
                        <textarea v-model="newComment" name="comment" rows="3"></textarea>
                    </div>
                    <button @click="addNewComment()" type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>

            <hr>
            <!-- Posted Comments -->
            <!-- Comment -->

            <div v-for="item in getComments" class="flex">
                <a class="pull-left" href="#">
                    <img class="media-object" src="http://placehold.it/64x64" alt="">
                </a>
                <div class="comment">
                    <h4>
                        {{item.username}}
                        <small>{{item.timestamp}}</small>
                    </h4>
                    <div name="comment-area">{{item.body}}</div>
                </div>
            </div>
        </el-col>


        <!-- ################################################################################################################ -->

        <!-- Below is the side widgets section -->

        <!-- ################################################################################################################ -->
        

        <el-col :span="5">
            <div>
                    <!-- Blog Search Well -->
                    <div class="well">
                        <h4>Blog Search</h4>
                        <div>
                            <form @submit.prevent>
                                <input type="text" v-model="titleSearchDisplay" title="Enter keyword(s) to find" name="title" style="width:75%">
                                <button v-on:click="searchTitle">
                                    <i class="el-icon-search"></i>
                                </button>
                            </form>
                        </div>
                        <!-- /.input-group -->
                    </div>
                    <!-- Blog Categories Well -->
                    <div class="well">
                        <h4>Blog Categories</h4>
                        <div class="row">
                            <div class="category-column">
                                <ul>
                                    <li v-for="item in getCategory.categoryLeft">
                                        <a v-on:click="searchCategory(item)">{{item}}</a>
                                    </li>
                                </ul>
                            </div>
                            <!-- /.col-lg-6 -->
                            <div class="category-column">
                                <ul>
                                    <li v-for="item in getCategory.categoryRight">
                                        <a v-on:click="searchCategory(item)">{{item}}</a>
                                    </li>
                                </ul>
                            </div>
                            <!-- /.col-lg-6 -->
                        </div>
                        <!-- /.row -->
                    </div>
                    <!-- Side Widget Well -->
                    <div class="well">
                        <a href="https://www.accuweather.com/en/hk/hong-kong/1123655/weather-forecast/1123655" class="aw-widget-legal">
                        </a>
                        <div id="awcc1501740191757" class="aw-widget-current" data-locationkey="1-1123655_1_AL" data-unit="c" data-language="en-us" data-useip="false" data-uid="awcc1501740191757"></div>
                        
                    </div>
                </div>
        </el-col>
    </div>
</template>

<script>
import BlogService from '@/service/blogService';

const Blog = new BlogService();


export default {
  data() {
    return {
      isArticle: false,
      postId: null,

      currentPageNumber: 1,
      pageSize: 3,

      mode: 'normal',
      titleSearchDisplay: '',
      titleSearch: '',
      categorySearch: '',
      authorSearch: '',

      newComment: '',
    };
  },
  created() {
    this.$store.dispatch('loadBlogList');
  },
  mounted() {
    const el = document.createElement('script');
    el.setAttribute('type', 'text/javascript');
    el.setAttribute('src', '//oap.accuweather.com/launch.js');
    document.getElementsByTagName('head')[0].appendChild(el);
  },
  computed: {
    getPosts() {
      let result;
      if (this.isArticle === true) {
        result = this.$store.state.blogList.filter(row => row.id === this.postId);
      } else if (this.mode === 'normal') {
        result = this.$store.state.blogList.slice((this.currentPageNumber - 1) * this.pageSize, ((this.currentPageNumber - 1) * this.pageSize) + this.pageSize);
      } else if (this.mode === 'title') {
        result = this.$store.state.blogList.filter(row => row.title.includes(this.titleSearch)).slice((this.currentPageNumber - 1) * this.pageSize, ((this.currentPageNumber - 1) * this.pageSize) + this.pageSize);
      } else if (this.mode === 'category') {
        result = this.$store.state.blogList.filter(row => row.category === this.categorySearch).slice((this.currentPageNumber - 1) * this.pageSize, ((this.currentPageNumber - 1) * this.pageSize) + this.pageSize);
      } else if (this.mode === 'author') {
        result = this.$store.state.blogList.filter(row => row.username === this.authorSearch).slice((this.currentPageNumber - 1) * this.pageSize, ((this.currentPageNumber - 1) * this.pageSize) + this.pageSize);
      }
      return result;
    },
    getCategory() {
      const categoryList = [...new Set(this.$store.state.blogList.map(item => item.category))];
      const number = Math.ceil(categoryList.length / 2);
      return {
        categoryLeft: categoryList.slice(0, number),
        categoryRight: categoryList.slice(number, categoryList.length),
      };
    },
    postsLength() {
      let result;
      if (this.mode === 'normal') {
        result = this.$store.state.blogList.length;
      } else if (this.mode === 'title') {
        result = this.$store.state.blogList.filter(row => row.title.includes(this.titleSearch)).length;
      } else if (this.mode === 'category') {
        result = this.$store.state.blogList.filter(row => row.category === this.categorySearch).length;
      } else if (this.mode === 'author') {
        result = this.$store.state.blogList.filter(row => row.username === this.authorSearch).length;
      }
      return result;
    },
    getComments() {
      let result;
      if (this.isArticle) {
        result = this.$store.state.commentList;
      } else {
        result = [];
      }
      return result;
    },
  },
  methods: {
    handleSizeChange() {
    },
    handleCurrentChange(val) {
      this.currentPageNumber = val;
    },
    searchTitle() {
      this.isArticle = false;
      this.titleSearch = this.titleSearchDisplay;
      this.titleSearchDisplay = '';
      this.mode = 'title';
      this.currentPageNumber = 1;
    },
    searchCategory(category) {
      this.isArticle = false;
      this.categorySearch = category;
      this.mode = 'category';
      this.currentPageNumber = 1;
    },
    searchAuthor(author) {
      this.isArticle = false;
      this.authorSearch = author;
      this.mode = 'author';
      this.currentPageNumber = 1;
    },
    getArticle(postId) {
      this.isArticle = true;
      this.postId = postId;
      this.newComment = '';
      this.$store.dispatch('loadCommentList', this.postId);
    },
    addNewComment() {
      const parameters = {
        postId: this.getPosts[0].id,
        comment: this.newComment,
      };
      const authToken = this.$store.state.token;
      this.newComment = '';
      Blog.postComment(authToken, parameters).then((d) => {
        if (d.status !== 200) {
          alert('bad');
        } else {
          alert(d.data.msg);
          this.$store.dispatch('loadCommentList', this.getPosts[0].id);
        }
      });
    },
    reSet() {
      this.isArticle = false;
      this.postId = null;

      this.mode = 'normal';
      this.titleSearchDisplay = '';
      this.titleSearch = '';
      this.categorySearch = '';
      this.authorSearch = '';

      this.newComment = '';
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

* {
    box-sizing: border-box;
    }

#PostPlace {
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    font-size: 14px;
    line-height: 1.42857143;
    color: #333;
}


h2 {
    font-size: 30px;
}

hr {
    height: 0;
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
}

div {
    display: block;
}

.well {
    min-height: 20px;
    padding: 19px;
    margin-bottom: 20px;
    background-color: #f5f5f5;
    border: 1px solid #e3e3e3;
    border-radius: 4px;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.05);
}

.row {
    margin-right: -15px;
    margin-left: -15px;
    overflow: hidden;
}

.category-column {
    width: 50%;
    float: left;
    position: relative;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
}

.category-column li {
    list-style: none;
}

a {
    color: #337ab7;
}

.category-column a:focus, a:hover {
    color: #23527c;
    text-decoration: underline;
}



.flex {
    display: flex;
}


.comment {
    width: 90%;
    word-wrap: break-word;
    margin-left: 10px;

}
 
.comment>h4 {
    margin-top: 0;
    margin-bottom: 5px;
}


[name="comment"] {
    width: 50%;
    resize: none;
}


</style>

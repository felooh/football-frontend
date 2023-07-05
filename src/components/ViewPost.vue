<template>
    <HeaderBar />
    <!-- ------------
        header part html
    -------------------- -->
    <div class="container">
      <div class="post-container">
        <h1 class="post-title">{{ post.title }}</h1>
        <div class="post-details">
          <p class="blogger-name">{{ post.author_name }}</p>
          <img :src="post.image" alt="Post Image" width="400">
          <p class="post-content">{{ post.content }}</p>
        </div>
        <div class="likes-comments">
          <p>Likes: <span class="likes-count">100</span></p>
          <p>Comments: <span class="comments-count">50</span></p>
        </div>
      </div>
    </div>
    <br>
    <FooterBar />
</template>

<script>
import axios from "axios";
import HeaderBar from "./Header.vue"
import FooterBar from "./Footer.vue"
export default {
    name: 'ViewPost',
    
     components:{
      HeaderBar,
      FooterBar
  },

  data(){
    return {
      post:{},
      postId : null,
      token: localStorage.getItem('access'),

    }

  },

  mounted(){

    this.fetchPost();

  },
  
  created(){

    this.postId = this.$route.params.id;

  },

  methods:{
    async fetchPost(){
        try {
        const response = await axios.get(`http://localhost:8000/api/v1/posts/${this.postId}`, {
            headers: {
                "Authorization": `Bearer ${this.token}`
            }
        }); 
        
        this.post = response.data;

      } catch (error) {
        console.error(error);
      }
    },
  }


}


</script>

<style>
  @import "../assets/style.css"
</style>
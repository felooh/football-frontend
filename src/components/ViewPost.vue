<template>
    <HeaderBar />
    <!-- ------------
        header part html
    -------------------- -->
    <div class="container">
      <div class="post-container">
        <h1 style="font-size: 50px;"  class="post-title">{{ post.title }}</h1>
        <div class="post-details">
          <p class="blogger-name"><i class="fas fa-user-tie"></i>{{ post.author_name }}</p>
          <p class="blogger-name"><i class="far fa-clock"></i>1 month ago</p>
          <p class="blooger-name"><i class="far fa-comments"></i>no comments</p>
          <p class="blogger-name"><i class="fas fa-tag"></i>No tags</p>
          <img :src="post.image" alt="Post Image" width="400">
          <p class="post-content" v-html="post.content"></p>
        </div>
        <div class="likes-comments">
          <p>Likes: <span class="likes-count">100</span></p>
          <p>Comments: <span class="comments-count">50</span></p>
          <i class="fas fa-trash-can" @click="deletePost(post.id)">    Delete Post</i>

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
    async deletePost(){
            try {

            const response = await axios.delete(`http://localhost:8000/api/v1/posts/${this.postId}`, {
                headers: {
                    "Authorization": `Bearer ${this.token}`
                }
            });
            if (response){
                alert("Deleted Sucessfully")

                this.$router.push({name:"UserProfile"})
            }

            } catch (error) {
            console.error(error)

            }
        }
  }


}


</script>


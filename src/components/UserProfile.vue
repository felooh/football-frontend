<template>
        <HeaderBar/>
        <div class="container mt-5">
            <div class="row">
                <div class="col-md-4">
                    <h1 style="font-weight: bolder;">Blogger Details</h1>
                    <div class="image">
                        <img src="../assets/images/profile_user.jpg" alt="User Photo" class="img-fluid rounded-circle" style="width: 200px;  margin-left: 55px;">
                        <h3 class="text-center mt-3">{{ user.first_name }}</h3>
                        <p class="text-center">Number of Posts: 10</p>
                        <i class="bi bi-trash"></i>
                    </div>
                </div>

                <div class="col-md-8">
                    <h1 style="font-weight: bolder;" >Recent Posts</h1>
                    <div class="row">
                        <div v-if="posts.length === 0" class="col-md-12">
                            <div class="card bg-light-red">
                                <div class="no-posts-message">
                                    <h5 class="no-posts-message">No posts yet</h5>
                                </div>
                            </div>
                        </div>
                        <div v-else class="col-md-6" v-for="post in posts" :key="post.id">
                            <div class="card mb-3">
                                <img :src="'http://127.0.0.1:8000'+post.image" class="card-img-top" alt="Post Image" style="height: 350px;">
                                <div class="card-body">
                                    <h5 style="font-weight: bold;" class="card-title">{{ post.title }}</h5>
                                    <div class="d-flex justify-content-between">
                                        <small class="text-muted">Likes: </small>
                                        <small class="text-muted">Comments: </small> 
                                    </div>
                                    <p class="card-text mt-2">Author: {{ user.first_name}}</p>
                                    <router-link :to="'/view_post/' + post.id" class="btn btn-primary" >Read More</router-link><br>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
                
        <FooterBar/>
</template>

<script>
import axios from "axios";
import HeaderBar from "./Header.vue";
import FooterBar from "./Footer.vue";

export default {
    name: "UserProfile",
    data(){
        return{
            posts: [],
            user:{},
            token: localStorage.getItem('access'),
        }
    },
    components:{
      HeaderBar,
      FooterBar
    },

    mounted(){

        this.fetchPost()
        this.fetchUser()
  },

  methods:{

    async fetchPost(){
        try {
        const response = await axios.get("http://localhost:8000/api/v1/posts/author/", {
            headers: {
                "Authorization": `Bearer ${this.token}`
            }
        }); 
        
        this.posts = response.data;


      } catch (error) {
        console.error(error);
      }
    },
    async  fetchUser() {
        try {

            const response = await axios.get("http://localhost:8000/api/get-user/", {
                headers: {
                    "Authorization": `Bearer ${this.token}`
                }
            });

            this.user = response.data;
            
        } catch (error) {
            console.error(error)
            
        }


      },
      
      
  }
  
  
}
</script>


<style>
 @import "../assets/style.css"
</style>
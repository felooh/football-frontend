<template>
    <HeaderBar/>
    <div class="container mt-5">
        <div class="row" style="z-index: -1;">
            <!-- User details side -->
            <div class="col-md-4">
                <h1>Blogger Details</h1>
                <div class="text-center">
                    <img src="../assets/images/profile_user.jpg" alt="User Photo" class="img-fluid rounded-circle" style="width: 200px;">
                </div>
                <h3 class="text-center mt-3">{{ user.first_name }}</h3>
                <p class="text-center">Number of Posts: 10</p>
            </div>

            <!-- Blogger's posts side -->
            <div class="col-md-8">
                <h2>Recent Posts</h2>
                <div class="row">
                    <div class="col-md-6">
                        <div class="card mb-3">
                            <img src="../assets/images/players/player-12.png" class="card-img-top" alt="Post Image">
                            <div class="card-body">
                                <h5 class="card-title">Post Title 1</h5>
                                <div class="d-flex justify-content-between">
                                    <small class="text-muted">Likes: 10</small>
                                    <small class="text-muted">Comments: 5</small>
                                </div>
                                <p class="card-text mt-2">Author:</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card mb-3">
                            <img src="../assets/images/players/player-7.png" class="card-img-top" alt="Post Image">
                            <div class="card-body">
                                <h5 class="card-title">Post Title 2</h5>
                                <div class="d-flex justify-content-between">
                                    <small class="text-muted">Likes: 15</small>
                                    <small class="text-muted">Comments: 3</small>
                                </div>
                                <p class="card-text mt-2">Author:</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card mb-3">
                            <img src="../assets/images/players/player-12.png" class="card-img-top" alt="Post Image">
                            <div class="card-body">
                                <h5 class="card-title">Post Title 1</h5>
                                <div class="d-flex justify-content-between">
                                    <small class="text-muted">Likes: 10</small>
                                    <small class="text-muted">Comments: 5</small>
                                </div>
                                <p class="card-text mt-2">Author:</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card mb-3">
                            <img src="../assets/images/players/player-12.png" class="card-img-top" alt="Post Image">
                            <div class="card-body">
                                <h5 class="card-title">Post Title 1</h5>
                                <div class="d-flex justify-content-between">
                                    <small class="text-muted">Likes: 10</small>
                                    <small class="text-muted">Comments: 5</small>
                                </div>
                                <p class="card-text mt-2">Author:</p>
                            </div>
                        </div>
                    </div>
                    <!-- Add more posts here in the same format -->
                    <div class="col-md-6" v-for="post in posts" :key="post.id">
                        <div class="card mb-3">
                          <img :src="post.image" class="card-img-top" alt="Post Image" style="height: 350px;">
                          <div class="card-body">
                            <h5 class="card-title">{{ post.title }}</h5>
                            <div class="d-flex justify-content-between">
                              <small class="text-muted">Likes: </small>
                              <small class="text-muted">Comments: </small>
                            </div>
                            <p class="card-text mt-2">Author: {{ post.author_name}}</p>
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
import axios from "axios"
import HeaderBar from "./Header.vue"
import FooterBar from "./Footer.vue"
export default {
    name: "UserProfile",
    data(){
        return{
            posts: [],
            user:{}
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
        const response = await axios.get("http://localhost:8000/post/"); 
        
        this.posts = response.data;

      } catch (error) {
        console.error(error);
      }
    },
    async  fetchUser() {
        const authenticationToken = localStorage.getItem('access');

        const response = await axios.get("http://localhost:8000/api/get-user/", {
            headers: {
                "Authorization": `Bearer ${authenticationToken}`
            }
        });
        console.log(response.data)

        this.user = response.data;


      },
  }
  
  
}
</script>


<style>
 @import "../assets/style.css"
</style>
<template>
    
    <nav id="my_nav_bar" class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#"><img src="../assets/images/pngwing.com.png" width="120" height="100" alt=""></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
    
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link
                    to="/home"
                    class="nav-link"
                    exact
                    @click="selectedRoute = '/'"
                  >
                  <i class="bi bi-house-fill"></i>Home
                    <span class="sr-only">(current)</span>
                  </router-link>
                  <!-- Repeat the same for other list items with respective routes -->
                  
                </li>
                <li class="nav-item" v-show="login">
                    <router-link to="/user_profile" class="nav-link"><i class="bi bi-file-earmark-post"></i>My Posts</router-link>

                </li>
                <li class="nav-item" v-show="login">
                    <router-link to="/add_post" class="nav-link"><i class="bi bi-patch-plus"></i>Create Post</router-link>
                </li>
                <li class="nav-item" v-show="logged">
                    <router-link to="/login" class="nav-link"><i class="bi bi-door-open"></i>Login</router-link>
                </li>
                <li class="nav-item" v-show="logged">
                    <router-link to="/sign_up" class="nav-link"><i class="bi bi-plus-circle"></i>Sign Up</router-link>
                </li>
                <li class="nav-item" v-show="login">
                    <router-link to="/logout" class="nav-link"><i class="bi bi-box-arrow-right"></i>Logout</router-link>
                </li>
                <li class="nav-item" v-show="login">
                    <router-link to="/echome" class="nav-link"><i class="bi bi-cart4"></i>eShop</router-link>
                </li>
                <li class="nav-item" v-show="login">
                    <router-link to="/profile_update" class="nav-link">
                        <img id="img-nav-bar" :src="user.profile_pic != null ? user.profile_pic : defaultImageSrc"> Profile
                    </router-link>
                </li>

                    <div class="nav_dropdown" >
                        <button class="btn btn-primary dropdown-toggle" style="margin-left: 60px;">Categories</button>
                        <div class="dropdown-content">
                        <a href="#leagues">Leagues</a>
                        <a href="#players">Players</a>
                        <a href="#highlights">Highlights</a>
                        <a href="#news">Latest News</a>
                        <a href="#videos">Videos</a>
                        </div>
                    </div>
                   

           
                    <form class="form-inline my-2 my-lg-0" >
                        <div class="searchBar">
                            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"> 
                        </div>
                    </form>
                 
            </ul>
        </div>
    </nav>


</template>


<script>
import axios from "axios";

   export default{
    name:"HeaderBar",
    data(){
        return {
            logged: true,
            login: false,
            user: {},
            selectedRoute: "",
            defaultImageSrc: require ("@/assets/preview.png")
 
        }
    },
    mounted() {

        this.fetchUser()

        let user = localStorage.getItem("access");

        if(user){
            this.logged = false;
            this.login = true
        }

        if(this.user.profile_pic){
            this.login = true
        }
     },

     methods:{
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
 @import "../assets/style.css";

 #nav .active-link{
    color: red;
 }
</style>
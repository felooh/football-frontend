<template>
    
    <nav id="my_nav_bar" class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#"><img src="../assets/images/pngwing.com.png" width="120" height="100" alt=""></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
    
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <router-link to="/" class="nav-link"><i class="fa fa-home" aria-hidden="true"></i>Home<span
                        class="sr-only">(current)</span></router-link>
                </li>
                <li class="nav-item" v-show="login">
                    <router-link to="/user_profile" class="nav-link"><i class="fas fa-user"></i>My Posts</router-link>

                </li>
                <li class="nav-item" v-show="login">
                    <router-link to="/add_post" class="nav-link"><i class="fa fa-plus-circle"></i>Create Post</router-link>
                </li>
                <li class="nav-item" v-show="logged">
                    <router-link to="/login" class="nav-link"><i class="fa fa-plus-circle"></i>Login</router-link>
                </li>
                <li class="nav-item" v-show="logged">
                    <router-link to="/sign_up" class="nav-link"><i class="fa fa-plus-circle"></i>Sign Up</router-link>
                </li>
                <li class="nav-item" v-show="login">
                    <router-link to="/logout" class="nav-link"><i class="fa fa-power-off" aria-hidden="true"></i>Logout</router-link>
                </li>
                <li class="nav-item" v-show="login">
                    <router-link to="/echome" class="nav-link"><i class="fa fa-power-off" aria-hidden="true"></i>eShop</router-link>
                </li>
                <li class="nav-item" >
                    <router-link to="/profile_update" class="nav-link">
                        <img :src="user.profile_pic" alt="" id="img-nav-bar">
                         Profile
                    </router-link>
                </li>

                <li class="nav-item">
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
        
                </li>

                <li class="nav-item">
                    <form class="form-inline my-2 my-lg-0" >
                        <div class="searchBar">
                            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"> 
                        </div>
                    </form>
                </li>   
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
            user: {}
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

        if(response.status===401){
            
            this.$router.push({name:"LogIn"})
        }
       
      },
     }

    
     
}


</script>

<style>
 @import "../assets/style.css";
</style>
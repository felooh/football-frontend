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
                    to="/"
                    class="nav-link"
                    exact
                    @click="selectedRoute = '/'"
                  >
                    <i class="fa fa-home" aria-hidden="true"></i>Home
                    <span class="sr-only">(current)</span>
                  </router-link>
                  <!-- Repeat the same for other list items with respective routes -->
                  
                </li>
                <li class="nav-item" >
                    <router-link to="/login" class="nav-link"><i class="bi bi-door-open"></i>Login</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/sign_up" class="nav-link"><i class="bi bi-plus-circle"></i>Sign Up</router-link>
                </li>
                 
            </ul>
        </div>
    </nav>

    <!-- ------------
          header part html
      -------------------- -->
      <header class="wrapper">
        <div class="container">
            <div class="header-text">
                <h1>Football Blog<br></h1>
                <div class="header-button">
                    <a class="btn btn-primary" href="#">Update your Profile to post!</a>
                    <span><i class="fas fa-arrow-right"></i></span>
                </div>
            </div>
            <div class="header-img">
                <img src="../assets/images/banner.png" alt="">
            </div>
        </div>
       </header>
     <!-- ---------------
    league part html 
  ------------------------>
  <header class="wrapper-2">
    <div class="container">
        <div class="header-text">
            <div>
            </div>
        </div>
        <div class="header-img">
        </div>
    </div>
   </header>

  <!-- ---------------
    league part ends here html 
  ------------------------>
  <br><br>
 
   
  
     <FooterBar />
  </template>
  
  <script>
  import FooterBar from "@/components/Footer.vue"
  export default {
    name: 'IndexPage',
    data(){
      return{
      }
    },
    components:{
        FooterBar
    },
    
    mounted() {

      document.title = "Football Blog "
    },
    
}
  </script>
  
  <style>
      @import "/src/assets/style.css";
  </style>
  
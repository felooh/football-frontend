<template>
   
        <div class="reg_container">
          <div class="row">
            <div class="col-lg-10 col-xl-9 mx-auto">
              <div class="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
                <div class="card-img-left d-none d-md-flex">
                  <!-- Background image for card set in CSS! -->
                </div>
                <div id="whole_form" class="card-body p-4 p-sm-5">
                  <h5 class="card-title text-center mb-5 fw-light fs-5">Register</h5>
                  <form>
      
                    <div class="form-floating mb-3">
                      <input v-model="blogger.name" type="text" class="form-control"  placeholder="myusername" required autofocus>
                      <label for="floatingInputUsername">Username</label>
                    </div>

                    <div class="form-floating mb-3">
                      <input v-model="blogger.email" type="email" class="form-control" placeholder="myemail" required autofocus>
                      <label for="floatingInputUsername">Email</label>
                    </div>
      
      
                    <div class="form-floating mb-3">
                      <input v-model="blogger.password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
                      <label for="floatingPassword">Password</label>
                    </div>
      
                    <div class="form-floating mb-3">
                      <input type="password" class="form-control" id="floatingPasswordConfirm" placeholder="Confirm Password">
                      <label for="floatingPasswordConfirm">Confirm Password</label>
                    </div>
      
                    <div class="d-grid mb-2">
                      <button @click.prevent="SignUp" class="btn btn-lg btn-primary btn-login fw-bold text-uppercase" type="submit">Register</button>
                    </div>
                    <hr>
      
                    <router-link to="/login" class="d-block text-center mt-2 small"><i class="fa fa-plus-circle"></i>Have an account? Login Here</router-link>

      
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

</template>

<script>
 export default{
    name:"SignUp",
    data(){
       return {
        blogger:{
          name: "",
          email:"",
          password:""
        }
      
       }
    },
    methods:{
        
        async SignUp(){
          var response = await fetch('http://localhost:8000/api/user/' ,{
            method:"post",
            headers:{
              'Content-Type':'application/json'
            },
            body: JSON.stringify(this.blogger)
          })
          if(response.status==201) {
                alert("Sign Up Successful")
                                
                this.$router.push({name:"LogIn"})

            }
        },
        
    },
   
 }
</script>

<style>
  @import "../assets/style.css"
</style>
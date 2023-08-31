  <template>
    <body style="background-image: linear-gradient(to right, #3A1078,#3795BD);"> 
        <div class="reg_container">
          <div class="row">
            <div class="col-lg-10 col-xl-9 mx-auto">
              <div class="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
                <div class="card-img-left d-none d-md-flex">
                  <!-- Background image for card set in CSS! -->
                </div>
                <div id="whole_form" class="card-body p-4 p-sm-5">
                  <h5 class="card-title text-center mb-5 fw-light fs-5" style="font-weight:bolder;">Login Here</h5>
                  <form>
                    <br><br><br>
                    <div class="form-floating mb-3">
                      <input v-model="username" type="email" class="form-control"  placeholder="myEmail" required>
                      <label for="floatingInputEmail">Email</label>
                    </div>
                    <hr>
      
                    <div class="form-floating mb-3">
                      <input v-model="password" type="password" class="form-control"  placeholder="Password" required>
                      <label for="floatingPassword">Password</label>
                    </div>
                    <br><br><br>
                    <div class="d-grid mb-2">
                      <button @click.prevent="Login" class="btn btn-lg btn-primary btn-login fw-bold text-uppercase" type="submit">Login</button>
                    </div>
      
                    <router-link to="/sign_up" class="d-block text-center mt-2 small" ><i class="fa fa-plus-circle"></i>Have an account? Sign Up Here</router-link>

      
                    <hr class="my-4">
      
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
    </body>

</template>


<script>
import axios from "axios";
import swal from 'sweetalert';

export default {
    name:"LogIn",
    data(){
        return {
            username:"",
            password:"",
            
        }
    },
    methods:{
        async Login(){

          const user = {

          username: this.username,
          password: this.password
          };

    
          /////////////////

          try{
            const response = await axios.post("http://localhost:8000/api/token/", user);

            if(response.status === 200){
              
              const access = response.data.access
              const refresh= response.data.refresh
              swal({
                icon: 'success',
                title: 'Success',
                text: 'Logged in Successfully created'
              })
              this.isLoggedIn = true
              localStorage.setItem("access", access)
              localStorage.setItem("refresh", refresh)
              this.$router.push({name:"HomePage"})
              
            }else{
              this.errors = response.data
              swal({
                icon: 'error',
                title: 'Invalid',
                text: 'An error occurred. Please try again.'
              })
            }
          }catch (e) {
            swal({
              icon: 'error',
              title: 'Invalid',
              text: e
            })
          }

          /////////////////////
            
        }
    }

}
</script>

<style>
  @import "../assets/style.css"
</style>

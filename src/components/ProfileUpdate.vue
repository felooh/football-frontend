<template>
    <HeaderBar />
    <div class="container rounded bg-white mt-5 mb-5">
        <div class="row">
            <div class="col-md-3 border-right">
                <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                    <img class="rounded-circle mt-5"  src="../assets/images/profile_user.jpg" alt="" style="width: 300px;">
                    <br>
                    <span class="font-weight-bold">{{ user.name }}</span><span class="text-black-50">{{ user.email }}</span>
                    <span> </span>
                   
                </div>
            </div>
            <div class="col-md-9 border-right">
                <div class="p-3 py-5">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h4 class="text-right">Profile Settings</h4>
                    </div>
                    <form >
                        <div class="row mt-2">
                            <div class="col-md-6"><label class="labels">First Name</label>
                                <input v-model="user.first_name" type="text" class="form-control" placeholder="first name" >
                            </div>
                            <div class="col-md-6"><label class="labels">Last Name</label>
                                <input v-model="user.last_name" type="text" class="form-control" placeholder="surname">
                            </div>
                        </div>
                        <div class="row mt-3">
                            <!-- <div class="col-md-12"><label class="labels">Username</label>
                                <input v-model="name" type="text" class="form-control" placeholder="" >
                            </div> -->
    
                            <div class="col-md-12"><label class="labels">Mobile Number</label>
                                <input v-model="user.mobile" type="text" class="form-control" placeholder="enter phone number" >
                            </div>
                            <div class="col-md-12">
                                <label class="labels">Gender</label>
                                <select v-model="user.gender" class="form-control">
                                    <option value="" selected disabled>Please select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Prefer not to say">Prefer not to say</option>
                                </select>
                            </div>
                            <div class="col-md-12">
                                <label class="labels">Location</label>
                                <input v-model="user.location" type="text" class="form-control" placeholder="enter address line 2" >
                            </div>
                            <!-- <div class="col-md-12">
                                <label class="labels">Email</label>
                                <input v-model="email" type="text" class="form-control" placeholder="enter email id" >
                            </div> -->
                            <div class="col-md-12">
                                <label class="labels">Occupation</label>
                                <input v-model="user.occupation" type="text" class="form-control" placeholder="Ocuupation" >
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-6">
                                <label class="labels">Country</label>

                                <country-select contentType="text" v-model="user.country" class="form-control"  :country="country" topCountry="US" />
    
                            </div>
                        </div>
                        <div class="mt-5 text-center">
                            <button  @click.prevent="updateUser" class="btn btn-primary profile-button" type="submit">Save Profile</button>
                        </div>
                    </form>
                  
                </div>
            </div>
          
        </div>
    </div>
    <FooterBar />
</template>

<script>
import axios from "axios"
import HeaderBar from "./Header.vue";
import FooterBar from "./Footer.vue";



export default {
  name: 'UpdateProfile',
    components:{
      HeaderBar,
      FooterBar,
      
  },
  data() {
    return{
     
       user: {}
    
    }
  },
  mounted(){

    const token = localStorage.getItem('access');

    if (!token) {
    this.$router.push({name:"LogIn"})
    }
    
    this.fetchUser();
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

    async updateUser(){

        const authenticationToken = localStorage.getItem('access');

        const response = await axios.patch(`http://localhost:8000/api/update-user/`, this.user, {
            headers: {
                "Authorization": `Bearer ${authenticationToken}`
            }
        })

        if(response.status===200){
            alert("VERY Successful")
            this.$router.push({name:"UserProfile"})
        }
     }  

   }
}

  
</script>

<style>
  @import "../assets/style.css"
</style>
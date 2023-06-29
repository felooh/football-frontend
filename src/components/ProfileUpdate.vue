<template>
    <HeaderBar />
    <div class="container rounded bg-white mt-5 mb-5">
        <div class="row">
            <div class="col-md-3 border-right">
                <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                    <img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg">
                    <span class="font-weight-bold">Edogaru</span><span class="text-black-50">edogaru@mail.com.my</span>
                    <span> </span>
                </div>
            </div>
            <div class="col-md-9 border-right">
                <div class="p-3 py-5">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h4 class="text-right">Profile Settings</h4>
                    </div>
                    <div class="row mt-2">
                        <div class="col-md-6"><label class="labels">First Name</label>
                            <input v-model="first_name" type="text" class="form-control" placeholder="first name" >
                        </div>
                        <div class="col-md-6"><label class="labels">Last Name</label>
                            <input v-model="last_name" type="text" class="form-control" placeholder="surname">
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-md-12"><label class="labels">Username</label>
                            <input v-model="name" type="text" class="form-control" placeholder="" >
                        </div>

                        <div class="col-md-12"><label class="labels">Mobile Number</label>
                            <input v-model="mobile" type="text" class="form-control" placeholder="enter phone number" >
                        </div>
                        <div class="col-md-12">
                            <label class="labels">Gender</label>
                            <select v-model="gender" class="form-control">
                                <option value="" selected disabled>Please select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Prefer not to say">Prefer not to say</option>
                            </select>
                        </div>
                        <div class="col-md-12">
                            <label class="labels">Location</label>
                            <input v-model="location" type="text" class="form-control" placeholder="enter address line 2" >
                        </div>
                        <div class="col-md-12">
                            <label class="labels">Email</label>
                            <input v-model="email" type="text" class="form-control" placeholder="enter email id" >
                        </div>
                        <div class="col-md-12">
                            <label class="labels">Occupation</label>
                            <input v-model="occupation" type="text" class="form-control" placeholder="Ocuupation" >
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-md-6">
                            <label class="labels">Country</label>
                            <country-select v-model="country" class="form-control"  :country="country" topCountry="US" />

                        </div>
                    </div>
                    <div class="mt-5 text-center">
                        <button class="btn btn-primary profile-button" type="button">Save Profile</button>
                    </div>
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
       first_name:"",
       last_name:"",
       name:"",
       mobile:"",
       gender:"",
       location:"",
       email:"",
       occupation:"",
       country:""

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

        const response = await axios.get("http://localhost:8000/api/user/", {
            headers: {
                "Authorization": `Bearer ${authenticationToken}`
            }
        });
        console.log(response.data)

        const userData = response.data;

        this.first_name = userData.first_name;
        this.last_name = userData.last_name;
        this.name = userData.name;
        this.mobile = userData.mobile;
        this.gender = userData.gender;
        this.location = userData.location;
        this.email = userData.email;
        this.occupation = userData.occupation;
        this.country = userData.country;

        console.log(userData);
      }

   

   
   }
 }

  
</script>

<style>
  @import "../assets/style.css"
</style>
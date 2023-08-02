<template>
    <HeaderBar />
    <div class="container rounded bg-white mt-5 mb-5">
        <div class="row">
            <div class="col-md-3 border-right">
                <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                    <div class="profile-picture-container">
                        <img :src="user.profile_pic != null ? user.profile_pic : defaultImageSrc" alt="Profile Picture" class="img-fluid rounded-circle" style="width: 500px; height: 200px;">
                    </div>
                    <br>
                    <span class="font-weight-bold">{{ user.name }}</span><span class="text-black-50">{{ user.email }}</span>
                    <span> </span>
                </div>
            </div>
            <div class="col-md-9 border-right">
                <div class="p-3 py-5">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h4 style="font-weight: bolder;" class="text-right">Profile Settings</h4>
                    </div>

                    <form  enctype="multipart/form-data" >
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
                            <br>
                            <br>
                            <br>
                            <br>
                            <div class="col-md-6">
                                <label for="user.profile_pic">Profile Picture</label><br>
                                <input type="file" :id="user.profile_pic"  @change.prevent="handleFileChange" />
                            </div>
                        </div>
                        <div class="mt-5 text-center">
                            <button @click.prevent="updateUser" class="btn btn-primary profile-button" type="submit">Save Profile</button>
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
     
       user: {},
       defaultImageSrc: require ("@/assets/preview.png")

    
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

        let formData = new FormData();

        if (this.user.profile_pic instanceof File) {
            formData.append("profile_pic", this.user.profile_pic);
        }

        formData.append("first_name", this.user.first_name)
        formData.append("last_name", this.user.last_name)
        formData.append("location", this.user.location)
        formData.append("gender", this.user.gender)
        formData.append("location", this.user.location)
        formData.append("country", this.user.country)
        formData.append("occupation", this.user.occupation)
        formData.append("mobile", this.user.mobile)


        
        const response = await axios.patch(`http://localhost:8000/api/update-user/`, formData, {
            headers: {
                "Authorization": `Bearer ${authenticationToken}`
            }
        })

        if(response.status===200){
            alert("Update Successful")
            this.$router.push({name:"UserProfile"})
        }
     },
         
     handleFileChange(event) {
      this.user.profile_pic = event.target.files[0];
      
    },

   }
}

  
</script>

<style>
  @import "../assets/style.css"
</style>
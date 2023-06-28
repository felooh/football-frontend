<template>
    <HeaderBar />
    <h2>Football Blog Input Form</h2>
    <body> 
        <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-8">
                <div class="add_post_container" style="align-items:center;">
                    <form  enctype="multipart/form-data" @submit.prevent="addPost" >
                        <div class="mb-3" style="z-index:1;">
                          <label class="label" for="category">Category</label>
                          <select v-model="post.category" class="form-select" aria-label="Default select example">
                            <option selected>Choose the category for content</option>
                            <option value="leagues">Leagues</option>
                            <option value="players">Players</option>
                            <option value="highlights">Highlights</option>
                            <option value="news">News</option>
                            <option value="videos">Videos</option>
                          </select>
                          </div>
                        <div class="form-group">
                          <label for="postTitle">Post Title</label>
                          <input v-model="post.title" type="text" class="form-control" id="postTitle" placeholder="Enter post title">
                        </div>
                        <br>
                        <div class="form-group">
                          <label for="content">Content</label>
                          <div style="height: 400px;">
                            <QuillEditor v-model:content="post.content" contentType="text" theme="snow" toolbar="full"/>
                          </div>
                        </div>
                        <br><br><br><br>
                        <div class="form-group">
                          <label for="image">Image:</label>
                          <input type="file" id="image" @change.prevent="handleFileChange" />
                          
                        </div>
                        <br>
                        <!-- <div class="form-group">
                          <label for="basic-url" class="form-label">Video</label>
                          <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon3">https://example.com/users/</span>
                            <input
                              v-model="post.video"
                              type="text"
                              class="form-control"
                              id="basic-url1"
                              aria-describedby="basic-addon3"
                            />
                          </div>
                        </div> -->
                        <br>
                        <div class="form-group">
                          <label for="authorName">Author Name</label>
                          <input v-model="post.author_name" type="text" class="form-control" id="authorName" placeholder="Enter author name">
                        </div>
                        <br>
                        <button  type="submit" class="btn btn-primary">Submit</button>
                      </form>
                </div>
            </div>
            <div class="col-md-2"></div>
          </div>
    </body>
    <FooterBar />
</template>

<script>
import axios from "axios";
import HeaderBar from "./Header.vue";
import FooterBar from "./Footer.vue";
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';


export default{
    name:"AddPost",
    components:{
    HeaderBar,
    FooterBar,
    QuillEditor
    
},
data(){
  return {
    post:{
      category:"",
      title:"",
      content:"",
      file: null,
      author_name:""
    }
    
  }
},
methods:{
     async addPost() {
        let formData = new FormData();

        formData.append("category", this.post.category);
        formData.append("title", this.post.title);
        formData.append("content", this.post.content);
        formData.append("image", this.post.file);
        formData.append("author_name", this.post.author_name);

        try {
          let response = await axios.post("http://localhost:8000/post/", formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          });

          if (response.status === 201) {
            console.warn(response.data);
            alert("Post Successful");
            this.$router.push({ name: "UserProfile" });
          }
        } catch (error) {
          console.error(error);
        }
      },

        
     handleFileChange(event) {
      this.post.file = event.target.files[0];
    },
        
    }
}   


// use formdata 
</script>

<style>
  @import "../assets/style.css"
</style>
/* Add your Application JavaScript */
Vue.component('app-header', {
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand" href="#">Lab 7</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/upload">Upload</router-link>
          </li>
        </ul>
      </div>
    </nav>
    `
});

Vue.component('app-footer', {
    template: `
    <footer>
        <div class="container">
            <p>Copyright &copy; Flask Inc.</p>
        </div>
    </footer>
    `
});
const uploadForm = Vue.component('upload-form', {
    template: `
    <div>
    <div class="alert alert-primary" role="alert" v-if="message">
      Upload was successful
    </div>
    <div class="alert alert-danger" role="alert" v-if="error">
      <ul>
        <li v-for="err in errors">{{err}}</li>
      </ul>
    </div>
    <form @submit.prevent="uploadPhoto" id="uploadForm">
        <div class="form-group">
        <label>Description</label>
        <textarea class="form-control" rows="5" id="description" name="description"></textarea>
      </div>
        <input type="file" class="form-control-file" name="photo"><br>
        <button type="submit" class="btn btn-primary mb-2">Upload</button>
    </form>
    </div>
    `,
    data: function(){
        return {
            message: false,
            error: false,
            errors: []
        }
    },
    methods: {
        uploadPhoto(){
            let uploadForm = document.getElementById('uploadForm');
            let form_data = new FormData(uploadForm); 
            let self = this;
        fetch("/api/upload", {
         method: 'POST',
         body: form_data,
         headers: {
             'X-CSRFToken': token
             },
        credentials: 'same-origin'
        }).
        then(function (response) {
         return response.json();
         })
         .then(function (jsonResponse) {
            if (jsonResponse.errors){
                self.errors = jsonResponse.errors;
                self.error = true;
                self.message = false;
            }else{
                self.message = true;
                self.error = false;
            }
         })
         .catch(function (error) {
            console.log(error);
         });
    }
    }
});
const Home = Vue.component('home', {
   template: `
    <div class="jumbotron">
        <h1>Lab 7</h1>
        <p class="lead">In this lab we will demonstrate VueJS working with Forms and Form Validation from Flask-WTF.</p>
    </div>
   `,
    data: function() {
       return {}
    }
});

// Define Routes
const router = new VueRouter({
    routes: [
        { path: "/", component: Home },
        { path: "/upload", component: uploadForm }
    ]
});

// Instantiate our main Vue Instance
let app = new Vue({
    el: "#app",
    router
});
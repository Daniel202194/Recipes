<template>
  <div class="container">
      <h1 class="title"><strong><b>Main Recipes</b></strong></h1>
      <b-row>
        <div class="mainP">
        <b-col>
          <div class="preview">
            <h2 style="color:white"><strong ><B>Explore these recipes</B></strong></h2>
            <RecipePreviewList title="Random Recipes" class="RandomRecipes center" />
          </div>
        </b-col>
        </div>
        <div class="mainP">
          <b-col class="right-side">  
            <h2 v-if="!$root.store.username " style="color:white"><strong><b>Sign In to view your last watched recipes</b></strong></h2>    
            <login v-if="!$root.store.username " class="log"></login>
             <h2 v-if="$root.store.username   " style="color:white "><strong ><B>Last Watched Recipes</B></strong></h2>
            <recipeWatchedList v-if="$root.store.username" 
              title="Last Viewed Recipes"
              :class="{
                RandomRecipes: true,
                blur: !$root.store.username,
                center: true
              }"
              
            ></recipeWatchedList>
          </b-col>
        </div>
      </b-row>
  </div>
</template>

<script>
import login from "../components/login";
import RecipePreviewList from "../components/RecipePreviewList";
import recipeWatchedList from "../components/recipeWatchedList";
export default {
  components: {
    RecipePreviewList,
    login,

    recipeWatchedList
  },
  data(){
    return{
      cookie:false
    }
  },
  mounted(){
    // this.authrationCheck();
    
  },
  methods:{
    async authrationCheck(){
      this.cookie=window.$cookies.isKey('session');
    }
  }
};
</script>

<style lang="scss" scoped>
h2{
  text-shadow: 0px 8px  rgb(0, 0, 0), 0 0px rgb(177, 116, 25);
}
.title {
  padding-top: 50px;
  color: whitesmoke;
	font-weight: normal;
	font-family: 'Ultra', sans-serif;   
	font-size: 36px;
	line-height: 70px;
	text-transform: uppercase;
  text-shadow: 0px 8px  rgb(0, 0, 0), 0 0px rgb(177, 116, 25);
  background-position:center ;
  
}
.log{
  margin-top: 120px;

}

.blur {
  -webkit-filter: blur(0px); /* Safari 6.0 - 9.0 */
  filter: blur(20px);
  display: none;
  
}

::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
  
}
::v-deep .blur .log {
  display: none; 
}

.toLogIn {
  margin-top: 15px;
  margin-left: 40px;;
  box-shadow: 27px 1px 31px -1px #1c1b18;
	background:linear-gradient(to bottom, #eae0c2 5%, #ccc2a6 100%);
	background-color:#eae0c2;
	border-radius:42px;
	border:2px solid #ffffff;
	display:inline-block;
	cursor:pointer;
	color:#505739;
	font-family:Georgia;
	font-size:21px;
	font-weight:bold;
	padding:20px 30px;
	text-decoration:none;
}
.toLogIn:hover {
  background:linear-gradient(to bottom, #ccc2a6 5%, #eae0c2 100%);
	background-color:#ccc2a6;
}
.toLogIn:active {
  position: relative;
  top: 1px;
}

.mainP {
  margin-top: 70px;
  text-align: center;  
  width: 40%;
}
.container{
  text-align: center;
  
}
.RandomRecipes center{
  margin-left: 50px;
}
.right-side{
  margin-left: 180px;
}
</style>

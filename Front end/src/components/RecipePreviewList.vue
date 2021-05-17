<template>
  <div>
    
    
      <div class="btn">
      <button  class="randBtn" @click="switchRandom()">New Random Recipes</button>
      </div>
      <b-col>
        <b-row class="recipePre" v-for="r in recipes" :key="r.id">
          <div>
            <RecipePreview class="recipePreview" :recipe="r" />
          </div>
        </b-row>
      </b-col>
    

    
  </div>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      
      recipes: []
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      this.axios.defaults.withCredentials = true;
      try {
        const response = await this.axios.get(
          "http://localhost:3000/recipes/randomRecipes"
        );
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
      } catch (error) {
        console.log(error);
      }
    },
    async switchRandom() {
      this.axios.defaults.withCredentials = true;
      try {
        const response = await this.axios.get(
          "http://localhost:3000/recipes/randomRecipes"
        );
        const newRecipes = response.data;
        this.recipes = [];
        this.recipes.push(...newRecipes);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.btn{
  text-align: center;
  margin-right: 25px;
}

.randBtn {
  
	box-shadow: 15px 15px 15px 15px #1c1b18;
	background:linear-gradient(to bottom, #887f63 5%, #fff4d4 100%);
	background-color:#eae0c2;
	border-radius:10px;
	border:2px solid #000000;
	display:inline-block;
	cursor:pointer;
	color:#505739;
	font-family:Georgia;
	font-size:16px;
	font-weight:bold;
	padding:18px 4px;
	// text-decoration:none;
  text-align: left;
  margin-left:10px ;
}
.randBtn:hover {
	background:linear-gradient(to bottom, #ccc2a6 5%, #eae0c2 100%);
	background-color:#ccc2a6;
}
.randBtn:active {
	position:relative;
	top:1px;
}

</style>

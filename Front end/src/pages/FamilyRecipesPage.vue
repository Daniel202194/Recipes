<template>
  <b-container class="container">
    <h1 class="title"><strong><b>My Family Recipes</b></strong></h1>
    <br />
    <h3>
      <slot></slot>
    </h3>
    <b-col>
      <b-row v-for="r in FamilyRecipes" :key="r.id">
        <RecipeFamilyPreview class="RecipeFamilyPreview" :recipe="r" />
      </b-row>
      <br>
    </b-col>

    <br>
  </b-container>
</template>


    <script>
import RecipeFamilyPreview from "../components/RecipeFamilyPreview.vue";
export default {
  components: {
    RecipeFamilyPreview
  },
  data() {
    return {
      FamilyRecipes: null
    };
  },
  mounted() {
    this.showRecipes();
  },

  methods: {
    async showRecipes() {
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(
          "http://localhost:3000/user/myFamilyRecipes"
        );
        const FamRecipes = response.data;
        this.FamilyRecipes = [];
        this.FamilyRecipes.push(...FamRecipes);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.title{
   padding-top: 10px;
  color: wheat;
  text-align: center;
	font-weight: normal;
	font-family: 'Ultra', sans-serif;   
	font-size: 77.179px;
	line-height: 70px;
	text-transform: uppercase;
  text-shadow: 0px 8px  rgb(0, 0, 0), 0 0px rgb(177, 116, 25);
  background-position:center ;
}

.container{
   max-width: 900px;
  
  background-origin: border-box;
  height: 100%; /* You must set a specified height */
  width: 100%;
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; 
} 
</style>
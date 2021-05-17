<template>
  <div class="container" id="container">
    <div class="back">
      <h1 class="title">
        <strong>
          <b>Search recipes</b>
        </strong>
      </h1>
      <b-form-group class="group" id="searchName" label-for="recipesNumber">
        <b-form-input
          placeholder="Enter recipe name you want to search"
          name="searchName"
          id="searchName"
          v-model="searching.NameOfFood"
        ></b-form-input>
      </b-form-group>
      <br />

      <h5>
        <b>choose number of recipes you want to get back</b>
      </h5>
      <b-form-group class="group" id="recipesNumber" label-for="recipesNumber">
        <b-form-select
          name="recipesNumber"
          id="recipesNumber"
          v-model="searching.numberOfRecipes"
          :options="recipesNum"
        ></b-form-select>
      </b-form-group>

      <b-form-group class="group" id="group_by_cuisine" label-for="chooseCuisine">
        <b-form-select
          name="chooseCuisine"
          id="chooseCuisine"
          v-model="select_cuisine"
          :options="cuisine"
        ></b-form-select>
      </b-form-group>

      <b-form-group class="group" id="group_by_diet" label-for="choosediet">
        <b-form-select name="choosediet" id="choosediet" v-model="select_diet" :options="diet"></b-form-select>
      </b-form-group>
      <b-form-group class="group" id="group_by_intolarence" label-for="chooseintolarence">
        <b-form-select
          name="chooseintolarence"
          id="chooseintolarence"
          v-model="select_intolarence"
          :options="intolarence"
        ></b-form-select>
      </b-form-group>
      <br />
      <button @click="sortByTime()" class="btn">sort by time</button>
      <br />
      <br />
      <button @click="sortBylikes()" class="btn">sort by likes</button>
      <br />
      <br />

      <button @click="search1()" class="btn">search</button>
      <br />
      <br />
    </div>
    <b-col>
      <span v-for="r in recipes" :key="r.id" style="margin-left: 50px;">
        <b-row>
          <RecipePreview class="recipePreview" :recipe="r" />
        </b-row>
      </span>
    </b-col>
    <b-alert v-model="showDismissibleAlert" variant="warning" dismissible style="text-align:center">no recipes found</b-alert>
  </div>
</template>
<script>
import cuisine from "../assets/cuisine";
import diet from "../assets/diet";
import intolarence from "../assets/intolarence";
import RecipePreview from "../components/RecipePreview.vue";
export default {
  name: "search",
  components: {
    RecipePreview
  },
  data() {
    return {
      searching: {
        NameOfFood: null,
        numberOfRecipes: 5
      },
      recipesNum: [5, 10, 15],
      select_cuisine: null,
      cuisine: [{ value: null, text: "cooshe recipe cusine.." }],
      select_diet: null,
      diet: [{ value: null, text: "choose diet type.." }],
      select_intolarence: null,
      intolarence: [
        { value: null, text: "choos intolarence you don't like.." }
      ],
      isSearched:false,
      recipes: [],
      showDismissibleAlert:false
    };
  },
  mounted() {
    // console.log("mounted");
    this.cuisine.push(...cuisine);
    this.diet.push(...diet);
    this.intolarence.push(...intolarence);

    this.lastSearch();
  },
  methods: {
    async search1() {
      try {
        this.axios.defaults.withCredentials = true;
        this.isBeenSearched = false;
        let searchParams = {};
        if (this.select_cuisine != null) {
          searchParams["cuisine"] = this.select_cuisine;
        }
        if (this.select_diet != null) {
          searchParams["diet"] = this.select_diet;
        }
        if (this.select_intolarence != null) {
          searchParams["intolerance"] = this.select_intolarence;
        }

        let response = await this.axios.get(
          `http://localhost:3000/recipes/search/query/${this.searching.NameOfFood}/amount/${this.searching.numberOfRecipes}`,
          {
            params: searchParams
          }
        );
        const found_recipes = response.data;
        this.recipes = [];
        this.recipes.push(...found_recipes);
        this.isSearched=true;
        if (this.$root.store.username) {
          this.$root.store.globalRecipes = [];
          this.$root.store.globalRecipes.push(...this.recipes);
        }
        if (this.recipes.length > 0) {
          this.isBeenSearched = true;
        }
        if (this.recipes.length == 0){
          this.showDismissibleAlert=true;
        }
        else{
        this.showDismissibleAlert=false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    sortByTime() {
      return this.recipes.sort((a, b) => a.readyInMinutes - b.readyInMinutes);
    },
    sortBylikes() {
      return this.recipes.sort((a, b) => b.like - a.like);
    },
    checkIfOk() {
      if (this.recipes.length == 0 && this.isSearched) {
        return false;
      } else {
        return true;
      }
    },
    lastSearch() {
      if (this.$root.store.username) {
        if (this.$root.store.globalRecipes !== undefined) {
          this.recipes = this.$root.store.globalRecipes;
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
::v-deep .recipePreview .container-image:hover .overlay{
  height: 120px;
}
h5 {
  text-align: center;

  font-size: 22px;
}
.title {
  padding-top: 50px;
  color: whitesmoke;
  text-align: center;
  font-weight: normal;
  font-family: "Ultra", sans-serif;
  font-size: 45px;
  line-height: 80px;
  text-transform: uppercase;
  text-shadow: 0px 8px 4px rgb(0, 0, 0), 0 10px rgb(177, 116, 25);
  background-position: center;
}
.back {
  background-color: rgba(255, 255, 255, 0.6);
}
.group {
  width: 400px;
  margin-left: 40px;
  text-align: center;
}
.container {
  max-width: 500px;
  //    background-color :rgba(255, 255, 255, 0.651);
  background-origin: border-box;
  height: 150%; /* You must set a specified height */
  width: 100%;
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover;
  text-align: center;
}
.btn {
  box-shadow: 7px 7px 7px 7px #1c1b18;
  background: linear-gradient(to bottom, #887f63 5%, #fff4d4 100%);
  background-color: #eae0c2;
  border-radius: 10px;
  border: 2px solid #000000;
  display: inline-block;
  cursor: pointer;
  color: #505739;
  font-family: Georgia;
  font-size: 16px;
  font-weight: bold;
  padding: 5px 3px;
  text-decoration: none;
}
.btn:hover {
  background: linear-gradient(to bottom, #ccc2a6 5%, #eae0c2 100%);
  background-color: #ccc2a6;
}
.btn:active {
  position: relative;
  top: 1px;
}
</style>
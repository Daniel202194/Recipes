<template>
  <div>
    
      <b-col class="container">
        <b-row v-for="r in recipes" :key="r.id">
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
  name: "recipeWatchedList",
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
    this.recipesWatched();
  },
  methods: {
    async recipesWatched() {
      this.axios.defaults.withCredentials = true;
      try {
        const response = await this.axios.get(
          "http://localhost:3000/user/ThreeLastRecipes"
        );
        const Watchedrecipes = response.data;
        this.recipes = [];
        this.recipes.push(...Watchedrecipes);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 76px;
}
</style>
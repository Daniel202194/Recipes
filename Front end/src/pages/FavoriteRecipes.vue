<template>
  <div>
    <b-container>
      <h1 class="title">
        <b>
          <strong>
            favorite recipes
            <slot></slot>
          </strong>
        </b>
      </h1>
      <h3 class="title1" v-if="error">
        <b>
          <strong>{{this.error}}</strong>
        </b>
      </h3>
      <b-col>
        <b-row v-for="r in Favoriterecipes" :key="r.id">
          <RecipePreview
            title="Last Viewed Recipes"
            :class="{
                RandomRecipes: true,
                blur: !$root.store.username,
                center: true
              }"
            class="recipePreview"
            :recipe="r"
          />
        </b-row>
      </b-col>
    </b-container>
  </div>
</template>




    <script>
import RecipePreview from "../components/RecipePreview.vue";
export default {
  name: "FavoriteRecipes",
  components: {
    RecipePreview
  },

  data() {
    return {
      Favoriterecipes: [],
      error: ""
    };
  },
  mounted() {
    this.showFavoriteRecipes();
    this.$root.$on("favoritePage", () => {
      this.showFavoriteRecipes();
    });
  },

  methods: {
    async showFavoriteRecipes() {
      this.axios.defaults.withCredentials = true;
      try {
        const response = await this.axios.get(
          "http://localhost:3000/user/FavoriteRecipes"
        );
        const FavRecipes = response.data;
        this.Favoriterecipes = [];
        this.Favoriterecipes.push(...FavRecipes);
      } catch (error) {
        
        try {
          if (error.response.data.message === "unauthorized") {
            this.$root.store.logout();
            this.$router.push("/login").catch(() => {
              this.$forceUpdate();
            });
          }
        } catch (e) {
          this.error = "there are no recipes to show";
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.title {
  padding-top: 50px;
  color: whitesmoke;
  text-align: center;
  font-weight: normal;
  font-family: "Ultra", sans-serif;
  font-size: 36px;
  line-height: 70px;
  text-transform: uppercase;
  text-shadow: 0px 8px rgb(0, 0, 0), 0 0px rgb(177, 116, 25);
  background-position: center;
}
.title1 {
  padding-top: 50px;
  color: rgb(121, 0, 0);
  text-align: center;
  font-weight: normal;
  font-family: "Ultra", sans-serif;
  font-size: 36px;
  line-height: 70px;
  text-transform: uppercase;
  background-position: center;
}
</style>
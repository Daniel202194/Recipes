<template>
  <div class="container">
    <div v-if="recipe">
      <h1 class=title><strong><b>{{ recipe.title }}</b></strong></h1>
      <b-row>
        <b-col>
          <img :src="recipe.image" class="center" />
        </b-col>
        <b-col>
          <b-row>
            <b-col>
              <li id="details" class="details">
                <b-row>
                  <img src="../images/clock.png" alt="Likes:" class="img" />

                  <span class="time">{{ recipe.readyInMinutes }}min</span>
                </b-row>
              </li>
              <li id="details" class="details">
                <b-row>
                  <img src="../images/likes.png" alt="Likes:" class="img" />

                  <span class="time">{{ recipe.like }}</span>
                </b-row>
              </li>

              <li id="details" class="details">
                <b-row>
                  <span v-if="recipe.vegetarian">
                    <img src="../images/marked.png" alt="vegeterian:" class="img" />
                  </span>
                  <span v-if="!recipe.vegetarian">
                    <img src="../images/Xbox.png" alt="vegeterian:" class="img" />
                  </span>
                  <span class="vegeterian">vegetarian</span>
                </b-row>
              </li>
              <li id="details" class="details">
                <b-row>
                  <span v-if="recipe.glutenFree">
                    <img src="../images/marked.png" alt="glutenFree:" class="img" />
                  </span>
                  <span v-if="!recipe.glutenFree">
                    <img src="../images/Xbox.png" alt="glutenFree:" class="img" />
                  </span>
                  <span class="vegeterian">glutenFree</span>
                </b-row>
              </li>
            </b-col>
            <b-col>
              <li id="details" class="details">
                <b-row>
                  <span v-if="recipe.vegan">
                    <img src="../images/marked.png" alt="vegan:" class="img" />
                  </span>
                  <span v-if="!recipe.vegan">
                    <img src="../images/Xbox.png" alt="vegan:" class="img" />
                  </span>
                  <span class="vegeterian">vegan</span>
                </b-row>
              </li>
              <li id="details" class="details" v-if="$root.store.username">
                <b-row>
                  <img src="../images/marked.png" alt="watched:" class="img" />
                  <span class="vegeterian">watched</span>
                </b-row>
              </li>
              <li id="details" class="details" v-if="$root.store.username">
                <b-row>
                  <span v-if="recipe.watched">
                    <img src="../images/marked.png" alt="watched:" class="img" />
                  </span>
                  <span v-if="!recipe.watched">
                    <img src="../images/Xbox.png" alt="watched:" class="img" />
                  </span>
                  <span class="vegeterian">saved</span>
                </b-row>
              </li>
            </b-col>
          </b-row>
        </b-col>
      </b-row><h3><Strong>Ingredients:</Strong></h3>
      <ul>
       <b> <li
          id="bulet"
          class="details"
          v-for="(r, index) in recipe.extendedIngredients"
          :key="index + '_' + r.id"
          
        >
        <img
                  class="integ"
                  src="https://www.freeiconspng.com/uploads/restaurant-icon-png-plate-1.png">
          {{r.name}}:
          {{r.amount}}
          {{r.unit}}
        </li></b>
      </ul><h3><Strong>Instructions:</Strong></h3>
      <ol>
        <b><li class="num" v-for="s in recipe._instructions" :key="s.number">{{ s.step }}</li></b>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: null
    };
  },
  async created() {
    try {
      let response;

      try {
        response = await this.axios.get(
          `http://localhost:3000/recipes/recipepage/recipeID/${this.$route.params.recipeId}`,
          {
            params: { id: this.$route.params.recipeId }
          }
        );

        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }
      let {
        analyzedInstructions,
        instructions,
        extendedIngredients,
        like,
        readyInMinutes,
        image,
        title,
        vegan,
        glutenFree,
        vegetarian,
        saved,
        watched
      } = response.data;

      let _instructions = analyzedInstructions;

      let _recipe = {
        instructions,
        _instructions,
        analyzedInstructions,
        extendedIngredients,
        like,
        readyInMinutes,
        image,
        title,
        vegan,
        glutenFree,
        vegetarian,
        saved,
        watched
      };

      this.recipe = _recipe;
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style lang="scss" scoped>
li{
  font-family: "Libre Baskerville", serif;
  font-size: 20px;
}
#bulet{
  margin-top: 15px;
}
.details {
  list-style: none;
  margin-left: 5px;
}
#details {
  margin-left: 50px;
  margin-top: 30px;
}

.center {
  margin-left: 40px;
  margin-top: 15px;
  width: 340px;
}
.integ{
  width: 25px;
  margin-right: 10px;
}
.container {
  max-width: 800px;
  background-color: rgba(170, 136, 108, 0.6);
  background-origin: border-box;
  height: 150%; /* You must set a specified height */
  width: 100%;
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover;
}
.img {
  margin-left: 18px;
  margin-right: 6px;
  width: 25px;
  height: 25px;
}
h3 {
  margin-top: 20px;
  color: rgb(0, 0, 0);
  font-weight: normal;
  font-family: "Ultra", sans-serif;
  font-size: 30px;
  text-transform: uppercase;
  background-position: center;
}
.title {
  padding-top: 50px;
  color: rgb(0, 0, 0);
  text-align: center;
  font-weight: normal;
  font-family: "Ultra", sans-serif;
  font-size: 40px;
  line-height: 70px;
  text-transform: uppercase;
  background-position: center;
}

.num{
  line-height: 35px;
  margin-bottom: 20px;
}
</style>

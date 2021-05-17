
<template>
  <div class="container">
    <b-col class="recipePre">
      <div style="text-align:center;">
        <div :title="recipe.title" class="recipe-title">
          <strong>{{ recipe.title }}</strong>
        </div>
        <div class="container-image">
          <router-link
            :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
            class="recipe-preview"
          >
            <img :src="recipe.image" class="recipe-image" />
            <div class="overlay">
              <div class="image-text">click to see all recipe inforamtion</div>
            </div>
          </router-link>
        </div>
      </div>
      <b-row>
        <b-col>
          <li>
            <b-row>
              <img src="../images/clock.png" alt="Likes:" class="img" />

              <span class="time">{{ recipe.readyInMinutes }}min</span>
            </b-row>
          </li>
          <li>
            <b-row>
              <img src="../images/likes.png" alt="Likes:" class="img" />

              <span class="like">{{ recipe.like }}</span>
            </b-row>
          </li>

          <li>
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
          <li>
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
        </b-col>
        <b-col>
          <li>
            <b-row>
              <span v-if="recipe.glutenFree">
                <img src="../images/marked.png" alt="glutenFree:" class="img" />
              </span>
              <span v-if="!recipe.glutenFree">
                <img src="../images/Xbox.png" alt="glutenFree:" class="img" />
              </span>
              <span class="vegeterian">Gluten Free</span>
            </b-row>
          </li>
          <li v-if="$root.store.username">
            <b-row>
              <span v-if="recipe.watched">
                <img src="../images/marked.png" alt="watched:" class="img" />
              </span>
              <span v-if="!recipe.watched">
                <img src="../images/Xbox.png" alt="watched:" class="img" />
              </span>
              <span class="vegeterian">watched</span>
            </b-row>
          </li>
          <li v-if="$root.store.username">
            <b-row>
              <span v-if="recipe.saved">
                <img src="../images/marked.png" alt="saved:" class="img" />
              </span>
              <span v-if="!recipe.saved">
                <img src="../images/Xbox.png" alt="saved:" class="img" />
              </span>
              <span class="vegeterian">saved</span>
            </b-row>
          </li>
        </b-col>
      </b-row>

      <b-row class="btn">
        <b-col class="addbtn" v-if="$root.store.username && !recipe.saved ">
          <button class="favBtn" @click="addToFavorite()">add to favorite</button>
        </b-col>
        <b-col class="removebtn" v-else-if="$root.store.username && recipe.saved  ">
          <button class="favBtn" @click="removeFromFavorite()">remove from favorite</button>
        </b-col>
      </b-row>
      <br />
      
    </b-col>
  </div>
</template>


<script >
export default {
  data() {
    return {
      the_recipe: this.recipe,
      isInTalbe: false,
     
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  methods: {
    async addToFavorite() {
      this.axios.defaults.withCredentials = true;

      try {
        const response = await this.axios.post(
          "http://localhost:3000/user/FavoriteRecipes",
          {
            title: this.the_recipe.title,
            readyInMinutes: this.the_recipe.readyInMinutes,
            image: this.the_recipe.image,
            aggregateLikes: this.the_recipe.like,
            vegetarian: this.the_recipe.vegetarian,
            glutenFree: this.the_recipe.glutenFree,
            vegan: this.the_recipe.vegan,
            recipe_id: this.the_recipe.id,
            watched: this.the_recipe.watched,
            saved: true
          }
        );
        if (response.data.message == "The recipe already marked as favorite") {
          this.isInTalbe = true;
          
        } 
        this.the_recipe.saved=true;
      } catch (error) {
        console.log(error);
      }
    },
    async removeFromFavorite() {
      this.axios.defaults.withCredentials = true;
   
      try {
        const response = await this.axios.post(
          "http://localhost:3000/user/FavoriteRecipeRemove",
          {
            recipe_id: this.the_recipe.id
          }
        );
        this.$root.$emit("favoritePage");
        this.the_recipe.saved=false;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped>
.container {
  width: 400px;
}
.watched {
  margin-top: 20px;
}
.recipe-image {
  margin-bottom: 15px;
  width: 330px;
  height: auto;
  text-align: center;
}
.recipe-title {
  color: #2c3a50;
  font-size: 25px;
  font-family: "Libre Baskerville", serif;
  line-height: 30px;
  text-align: center;
  text-shadow: 1px 1px 1px rgb(0, 0, 0);
}
.recipePre {
  margin-top: 70px;
  height: 570px;
  background-color: rgb(214, 214, 214);
}

.img {
  margin-left: 18px;
  margin-right: 6px;
  width: 25px;
  height: 25px;
}
li {
  
  margin-bottom: 10px;
  list-style-type: none;
}

.overlay {
  position: absolute;
  top: 90px;
  left: 20px;
  right: 9px;
  opacity: 0.8;
  background-color: #008cba;
  overflow: hidden;
  width: 89.5%;
  height: 0;
  transition: 0.8s ease;
}

.container-image:hover .overlay {
  height: 150px;
}
.image-text {
  white-space: nowrap;
  color: white;
  font-size: 20px;
  position: absolute;
  overflow: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}
.favBtn {
  box-shadow: 15px 15px 15px 15px #1c1b18;
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
  font-weight: bold;
  padding: 18px 4px;
  text-decoration: none;
}
.favBtn:hover {
  background: linear-gradient(to bottom, #ccc2a6 5%, #eae0c2 100%);
  background-color: #ccc2a6;
}
.favBtn:active {
  position: relative;
  top: 1px;
}
</style>

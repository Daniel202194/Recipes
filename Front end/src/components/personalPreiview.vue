<template>
  <div class="container">
    <b-col class="recipePre">
      <div :title="recipe.title" class="recipe-title">
        <strong>
          <u>{{ recipe.title }}</u>
        </strong>
      </div>
      <router-link
        :to="{ name: 'recipePersonal', params: { recipeId: recipe.id } }"
        class="recipe-preview"
      >
        <div class="container-image">
          <img :src="recipe.image" class="recipe-image" />

          <div class="overlay">
            <div class="image-text">click to see <br>all recipe inforamtion</div>
          </div>
        </div>
      </router-link>
      <li>
        <b-row>
          <img src="../images/clock.png" alt="time:" class="img" />

          <span class="span">{{ recipe.readyInMinutes }}min</span>
        </b-row>
      </li>
      <li>
        <b-row>
          <span v-if="recipe.vegetarian">
            <img src="../images/marked.png" alt="vegetarian:" class="img" />
          </span>
          <span v-if="!recipe.vegetarian">
            <img src="../images/Xbox.png" alt="vegetarian:" class="img" />
          </span>
          <span class="span">vegetarian</span>
        </b-row>
      </li>
      <li>
        <b-row>
          <span v-if="recipe.glutenFree">
            <img src="../images/marked.png" alt="glutenFree:" class="img" />
          </span>
          <span v-if="!recipe.glutenFree">
            <img src="../images/Xbox.png" alt="glutenFree:" class="img" />
          </span>
          <span class="span">glutenFree</span>
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
          <span class="span">vegan</span>
        </b-row>
      </li>
    </b-col>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  methods: {
    async setCookie() {
      return window.$cookies.isKey("session");
    }
  }
};
</script>

<style scoped>
.recipe-image {
  width: 250px;
  height: 200px;
}
li {
  list-style-type: none;
}
.recipePre {
  margin-top: 50px;
  background-size: 100%;
  height: 400px;
  background-color: rgba(189, 184, 184, 0.699);
}
.recipe-title {
  color: #ffffff;
  font-size: 45px;
  margin-bottom: 25px;
  font-family: "Libre Baskerville", serif;
  line-height: 30px;
  text-align: center;
  text-shadow: 0px 5px 4px rgb(0, 0, 0);
}
.img {
  margin-top: 10px;
  margin-left: 100px;
  width: 20px;
  height: 20px;
}
.span {
  margin-top: 10px;
}
.container {
  text-align: center;
}
.overlay {
  position: absolute;
  top: 90px;
  left: 35px;
  opacity: 0.8;
  background-color: #008cba;
  overflow: hidden;
  width: 250px;
  height: 0;
  transition: 0.8s ease;
}

.container-image:hover .overlay {
  height: 120px;
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
</style>


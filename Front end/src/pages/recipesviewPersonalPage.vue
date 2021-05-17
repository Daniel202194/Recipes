<template>
  <div class="container">
    <span v-for="r in recipe" :key="r.id">
      <h1 class="title">
        <strong>
          <b>{{ r.title }}</b>
        </strong>
      </h1>
      <b-row class="inCenter">
        <b-col>
          <img :src="r.image" class="center" style="margin-top: 20px;" />
        </b-col>
        <b-col>
          <li class="pre">
            <b-row>
              <img src="../images/clock.png" alt="time:" class="img" />

              <span class="span">{{ r.readyInMinutes }}min</span>
            </b-row>
          </li>
          <li class="pre">
            <b-row>
              <span v-if="r.vegetarian">
                <img src="../images/marked.png" alt="vegan:" class="img" />
              </span>
              <span v-if="!r.vegetarian">
                <img src="../images/Xbox.png" alt="vegan:" class="img" />
              </span>
              <span class="span">vegetarian</span>
            </b-row>
          </li>
          <li class="pre">
            <b-row>
              <span v-if="r.glutenFree">
                <img src="../images/marked.png" alt="vegan:" class="img" />
              </span>
              <span v-if="!r.glutenFree">
                <img src="../images/Xbox.png" alt="vegan:" class="img" />
              </span>
              <span class="span">glutenFree</span>
            </b-row>
          </li>
          <li class="pre">
            <b-row>
              <span v-if="r.vegan">
                <img src="../images/marked.png" alt="vegan:" class="img" />
              </span>
              <span v-if="!r.vegan">
                <img src="../images/Xbox.png" alt="vegan:" class="img" />
              </span>
              <span class="span">vegan</span>
            </b-row>
          </li>
        </b-col>
      </b-row>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <h3>Ingredients:</h3>
            <ul>
              <li id="integ" v-for="(k, index) in r.ingredients" :key="index + '_' + k.id">
                <img
                  class="integ"
                  src="https://www.freeiconspng.com/uploads/restaurant-icon-png-plate-1.png"
                />
                {{k}}
              </li>
            </ul>
          </div>
          <div class="wrapped">
            <h3>Instructions:</h3>
            <ol>
              <li v-for="s in r.instructions" :key="s.number">{{ s }}</li>
            </ol>
          </div>
        </div>
      </div>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: []
    };
  },
  mounted() {
    this.createPersonal();
  },
  methods: {
    async createPersonal() {
      try {
        console.log(this.$route.params.recipeId);
        let response;
        // response = this.$route.params.response;

        try {
          response = await this.axios.get(
            `http://localhost:3000/user/PersonalRecipes/recipeID/${this.$route.params.recipeId}`
          );
          if (response.status !== 200) this.$router.replace("/NotFound");
        } catch (error) {
          console.log("error.response.status", error.response.status);
          this.$router.replace("/NotFound");
          return;
        }
        const personals = response.data;
        console.log(personals);
        this.recipe.push(...personals);
      } catch (error) {
        if (error.response.data.message === "unauthorized") {
          this.$root.store.logout();
          this.$router.push("/login").catch(() => {
            this.$forceUpdate();
          });
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.integ {
  width: 35px;
  height: 35px;
}
.wrapper {
  display: flex;
}
.wrapped {
  width: 50%;
}

.pre {
  list-style-type: none;
}

#integ {
  margin-top: 10px;
  list-style-type: none;
}
.center {
  display: block;
  margin-left: auto;
}
h3 {
  margin-top: 20px;
  color: rgb(0, 0, 0);
  font-weight: normal;
  font-family: "Ultra", sans-serif;
  font-size: 30px;
  line-height: 70px;
  text-transform: uppercase;
  background-position: center;
}
.img {
  margin-top: 30px;
  margin-left: 50px;
  margin-right: 6px;
  width: 30px;
  height: 30px;
}
img {
  width: 300px;
  height: 250px;
}
li {
  color: rgb(38, 38, 77);
  font-size: 25px;
}
.span {
  margin-top: 30px;
}
.span1 {
  margin-top: 30px;
}
.inCenter {
  margin-left: 10%;
  text-align: center;
}
.title {
  padding-top: 50px;
  color: rgb(0, 0, 0);
  text-align: center;
  font-weight: normal;
  font-family: "Ultra", sans-serif;
  font-size: 50px;
  line-height: 70px;
  text-transform: uppercase;
  background-position: center;
}

.container {
  max-width: 900px;
  background-color: rgba(170, 136, 108, 0.6);
  background-origin: border-box;
  height: 150%; /* You must set a specified height */
  width: 100%;
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover;
}
</style>
<template>
  <div class="container">
    <div v-if="recipe" class="recipe-body">
      <div class="recipe-header mt-3 mb-4">
        <h2 class="title">
          <b>
            <strong>{{ recipe.recipeName }}</strong>
          </b>
        </h2>
        <b-row>
          <b-col>
            <img :src="recipe.image" class="center" />
          </b-col>
          <b-col class="preView">
            <b-row>
              <h6 class="pre-title">
                <strong>Aouther:</strong>
              </h6>
              {{ recipe.aouther }}
            </b-row>
            <b-row>
              <h6 class="pre-title">
                <strong>
                  <b>Used Time:</b>
                </strong>
              </h6>
              {{ recipe.timeThatUsed }}
            </b-row>
            <b-row>
              <h6 class="pre-title">
                <strong>Vegetarian:</strong>
              </h6>
              <span v-if="recipe.vegetarian">
                <img src="../images/marked.png" alt="saved:" class="img" />
              </span>
              <span v-if="!recipe.vegetarian">
                <img src="../images/Xbox.png" alt="saved:" class="img" />
              </span>
            </b-row>
          </b-col>
        </b-row>
      </div>
      <div>
        <div class="wrapper">
          <div class="wrapped">
            <h3><strong><b>Ingrediants:</b></strong></h3>
            <ul>
              <li id="integ" v-for="(r,index) in recipe.products" :key="index+'_'+r.id">
                <img
                  class="integ"
                  src="https://www.freeiconspng.com/uploads/restaurant-icon-png-plate-1.png"
                />
                <b>{{r}}</b>
              </li>
            </ul>
          </div>
          <div class="wrapped">
           <h3><strong><b> Instructions:</b></strong></h3>
            <ol>
              <b><li class="instruct" v-for="(r,index) in recipe.Instructions" :key="index+'_'+r.id"><b>{{r}}</b></li></b>
            </ol>
          </div>
        </div>
      </div>
    </div>
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
  }
};
</script>

<style lang="scss" scoped>
.img {
  width: 40px;
  height: auto;
}

.recipe-body {
  background-color: rgba(155, 155, 155, 0.774);
}

.center {
  width: 350px;
  height: 300px;
  display: block;
  margin-left: 40px;
  
}

.title {
  padding-top: 20px;
  margin-top: 40px;
  color: #ffffff;
  font-size: 45px;
  margin-bottom: 25px;
  font-family: "Libre Baskerville", serif;
  line-height: 30px;
  text-align: center;
  text-shadow: 0px 5px 4px rgb(0, 0, 0);
}

.preView {
  margin-right: 40px;
  font-size: 25px;
  font-family: "Libre Baskerville", serif;
  line-height: 65px;
  text-align: center;
}
.pre-title {
  color: #030303;
  font-size: 34px;
  margin-bottom: 25px;
  font-family: "Libre Baskerville", serif;
  line-height: 60px;
  text-align: center;
  text-shadow: 0px 2px 3.5px rgb(0, 0, 0);
}
.integ{
  width: 35px;
  height: 35px;
}
#integ {
  margin-top: 10px;
  list-style-type: none;
  font-size: 25px;
}
.instruct{
  font-size: 25px;
  font-family: "Lucida Console", Courier, monospace;
  margin:10px;
  line-height: 40px;
  margin-left: 40px;
  margin-bottom:30px ;
  
}
.container{
  margin-bottom: 40px;
}
</style>

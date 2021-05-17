<template>
  <div class="allPage">
    <b-navbar toggleable="lg" variant="dark" class="navbar navbar-dark bg-dark">
      <b-navbar-brand href="#"></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav pills>
            <b-nav-item to="/">
              <strong>
                <b>Home</b>
              </strong>
            </b-nav-item>
            <b-nav-item v-if="!$root.store.username" to="/register">
              <strong>
                <b>Register</b>
              </strong>
            </b-nav-item>
            <b-nav-item v-if="!$root.store.username" to="/login">
              <strong>
                <b>Login</b>
              </strong>
            </b-nav-item>
            <b-nav-item to="/about">
              <strong>
                <b>About</b>
              </strong>
            </b-nav-item>
            <b-nav-item to="/search">
              <strong>
                <b>search</b>
              </strong>
            </b-nav-item>
          </b-nav>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown v-if="$root.store.username" right>
            <template v-slot:button-content>
              <em clas="personal">
                <strong>
                  <b>
                    <span
                      v-if="$root.store.username && $root.store.image!='null' && $root.store.image!=null"
                    >
                      <img :src="$root.store.image" class="profile" />
                    </span>
                    {{$root.store.username}}
                  </b>
                </strong>
              </em>
            </template>
            <b-dropdown-item to="/FavoriteRecipes">
              <strong>
                <b>My Favorites</b>
              </strong>
            </b-dropdown-item>
            <b-dropdown-item to="/PersonalRecipes">
              <strong>
                <b>My Recipes</b>
              </strong>
            </b-dropdown-item>
            <b-dropdown-item to="/myFamilyRecipes">
              <strong>
                <b>My Family Recipes</b>
              </strong>
            </b-dropdown-item>
            <b-dropdown-item v-if="$root.store.username " @click="Logout">
              <strong>
                <b>Log out</b>
              </strong>
            </b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item v-if="!$root.store.username " disabled>
            <strong>hello guest</strong>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view id="app" />
  </div>
</template>

<script >
import MainPageVue from "./pages/MainPage.vue";
export default {
  name: "App",
  data() {
    return {
      // cookie: false,
      inMain: false
    };
  },
  mounted() {
    this.checkMain();
  },
  methods: {
    checkMain() {
      if ("/" == this.$router.currentRoute.path)
        this.inMain = this.$router.currentRoute.path;
    },

    Logout() {
      this.$root.store.logout();
      console.log("app");
      this.$root.toast("Logout", "User logged out successfully", "success");
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: black;
  min-height: 100vh;
}
.navbar.navbar-dark.bg-dark {
  background-color: #474027 !important;
  font-size: 25px;
}
.allPage {
  background-image: url("../src/images/cuttingBoard.jpg");
  height: 100%; /* You must set a specified height */
  width: 100%;
  // background-size: cover;;
  background-repeat: repeat; /* Do not repeat the image */
}
.profile {
  height: 55px;
  width: 60px;
  // margin-top: 10px;
  margin-right: 15px;
  border-radius: 50%;
}
.personal{
  margin-top: 30px;
}
</style>

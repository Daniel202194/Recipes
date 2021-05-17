import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/search"),
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
  path: "/FavoriteRecipes",
  name: "FavoriteRecipes",
  component: () => import("./pages/FavoriteRecipes"),
},
{
path: "/PersonalRecipes",
name: "PersonalRecipes",
component: () => import("./pages/PersonalRecipes"),
},
{
  path: "/myFamilyRecipes",
  name: "FamilyRecipesPage",
  component: () => import("./pages/FamilyRecipesPage"),
  },
  {
    path: "/recipeID/:recipeId",
    name: "recipePersonal",
    component: () => import("./pages/recipesviewPersonalPage"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },


  {
    path: "/About",
    name: "About",
    component: ()=> import("./pages/About"),
  }
];

export default routes;

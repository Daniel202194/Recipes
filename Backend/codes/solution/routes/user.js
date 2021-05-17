var express = require("express");
var router = express.Router();
const axios = require("axios");
const DButils = require("../../modules/DButils");
const api_domain = "https://api.spoonacular.com/recipes";
const api_key=process.env.spooncular_apiKey;
const recipes=require("./recipes")


router.use(function requireLogin(req, res, next) {
  if (!req.session.user_id) {
    next({ status: 401, message: "unauthorized" });
  } else {
    next();
  }
});
//get info on personal recipes
router.get("/PersonalRecipes", async(req,res,next)=>{
  try {
    const personal_recipes = await DButils.execQuery(`select * from personalRecipes where user_id='${req.session.user_id}' `);
    if(personal_recipes.length==0)
      res.status(200).send( {personal_recipes, message: "There are no recipes in the personal Page"});
    else {
      res.status(200).send(personal_recipes);
    }
  }catch(error) {
    next(error);
  }

});
router.get("/PersonalRecipes/recipeID/:recipe_id", async(req,res,next)=> {
  try {
    let recipe_id = req.params.recipe_id;
    const personal_recipes = await DButils.execQuery(`select * from personalRecipes where user_id='${req.session.user_id}' and id='${recipe_id}' `);
    
    if(personal_recipes.length==0){
      res.status(200).send({message: "no recipe with given id in the personal recipes"});
    }
    else{
      personal_recipes[0].instructions=await personal_recipes[0].instructions.split(".");
      personal_recipes[0].ingredients=await personal_recipes[0].ingredients.split(",");
      res.status(200).send(personal_recipes);
    }

  } catch (error) {
    next(error);
  }
});

router.get("/FavoriteRecipes", async(req,res,next)=>{
  try {
    const favourite_recipes = await DButils.execQuery(`select * from favoritesRecipes where user_id='${req.session.user_id}'`);
    if(favourite_recipes.length==0){
      res.status(200).send({message: "no favorite recipes to show"});
    }else {
      res.status(200).send(favourite_recipes);
    }
  }catch (error) {
    next(error);
  }
});
router.post("/FavoriteRecipes" , async(req,res)=>{

  let idUser=req.session.user_id;
  let idRecipe=req.body.recipe_id;
  const favoriteRecipe = await DButils.execQuery(`select id from favoritesRecipes where id='${idRecipe}' and user_id='${idUser}'`);
  if(favoriteRecipe.length==1)
    res.status(200).send({message:"The recipe already marked as favorite"});
  else{
    
    let title=req.body.title;
   
    let time=req.body.readyInMinutes;
    let image=req.body.image;
    let likes=req.body.aggregateLikes;
    let veget=req.body.vegetarian;
    let gluten=req.body.glutenFree;
    let vegan=req.body.vegan;
    let watched=req.body.watched;
    let saved=req.body.saved;
    await DButils.execQuery(`Insert into favoritesRecipes VALUES ('${idRecipe}','${idUser}','${title}','${time}','${image}','${likes}','${veget}','${gluten}','${vegan}','${watched}','${saved}')`);
    res.status(200).send({message: "The recipe added successfully to favorites"})
  }
});

router.post("/FavoriteRecipeRemove",async(req,res)=>{
  let idUser = req.session.user_id;
  let idRecipe = req.body.recipe_id;
  const recipeToRemove = await DButils.execQuery(`select id from favoritesRecipes where id='${idRecipe}' and user_id='${idUser}'`);
  if(recipeToRemove.length==0){
    res.status(409).send({message: "The recipe is not marked as favorite"})
  }
  else{
    await DButils.execQuery(`DELETE FROM favoritesRecipes WHERE id='${idRecipe}' and user_id='${idUser}'`);
    res.status(200).send({message: "The recipe succesfuly removed from favorites"});
  }
});

//return 3 last wathced recipes ""need to fix""
router.get("/ThreeLastRecipes",async (req,res,next)=>{
  try {

    const  recipe_ids = await DButils.execQuery(`SELECT TOP 3 recipe_id  FROM watchedRecipes where user_id='${req.session.user_id}' ORDER BY timeAdded desc `);
    let  all_recipes = [];
    let i = 0;
    while (i < recipe_ids.length) {
      let  recipe_from_api= await recipes.getRecipeInfo(recipe_ids[i].recipe_id)
      let recipe= await recipes.getRecipe(recipe_from_api.data,req) ;
      all_recipes.push( recipe);
      i++;
    }
    if(recipe_ids.length==0){
      res.status(204).send({message: "the user does not have history"})
    }
    else if(recipe_ids.length<3){
      res.status(200).send(all_recipes);
    }
    else{
      res.status(200).send(all_recipes);
    }
    //res.status(200).send(recipes);
  }catch(error) {
    next(error);
  }

});
router.get("/myFamilyRecipes", async(req,res)=>{
  //const user=req.user_id;
  const recipes=await DButils.execQuery(`SELECT * FROM familyRecipes where user_id='${req.session.user_id}'`);
  let all_family_recipes=[];
  let i=0;
  while(i<recipes.length){
    recipes[i].Instructions= await recipes[i].Instructions.split('.');
    recipes[i].products= await recipes[i].products.split(',');

    all_family_recipes.push(recipes[i]);
    i++;
  }
  i=0;
  let j=0;
  let k=0;
  let instruct=[];
  let integratis =[];
  while(i<all_family_recipes.length){
    while(j<all_family_recipes[i].Instructions.length){
      let check=all_family_recipes[i].Instructions[j].split("\n")
      
      if(check.length>1)
        instruct.push(check[1]);
      else
        instruct.push(check[0]);
      j++;
    }
    while(k<all_family_recipes[i].products.length){
      let check2=all_family_recipes[i].products[k].split("\n");
      if(check2.length>1)
        integratis.push(check2[1]);
      else
        integratis.push(check2[0]);
      k++;
    }
    j=0;
    all_family_recipes[i].Instructions=instruct;
    all_family_recipes[i].products=integratis;
    integratis=[];
    instruct=[];
    i++;
  }
  res.status(200).send(all_family_recipes);
});
async function getRecipeDetails(recipeId){
  let url=`${api_domain}/${recipeId}/information`;
  const  check= await axios.get(url,{
    params:{
      id: recipeId,
      apiKey: api_key
    }

  });
  return check;
}
function getRecipeInfo(get_info) {
  return  {
    params: {
      id:get_info.data.id,
      title:get_info.data.title,
      readyInMinutes:get_info.data.readyInMinutes,
      image:get_info.data.image,
      like:get_info.data.aggregateLikes,
      vegetarian:get_info.data.vegetarian,
      glutenFree:get_info.data.glutenFree,
      vegan:get_info.data.vegan,
      includeNutrition: false,
      apiKey: process.env.spooncular_apiKey
    }
  };
}
module.exports = router;

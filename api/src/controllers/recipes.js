const Sequelize = require('sequelize');
const { Op } = require("sequelize");
const { Recipe, Diet } = require('../db');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios').default;
const { API_KEY } = process.env;


async function getRecipes(req,res, next) {
  try {
    const getRecipes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
    const dbRecipes = await Recipe.findAll({
      include: Diet
    }); 
    if(dbRecipes.length === 0) return res.send(getRecipes.data.results)
    let arrayResponse = [];
  
    for(let j = 0; j < dbRecipes.length; j++) {
        let dietsMap = []
        dbRecipes[j].diets.map((diet) => (
          dietsMap.push(diet.name)
        ))
        let objectResponseDB = {
          id: dbRecipes[j].id, 
          title: dbRecipes[j].title,
          summary: dbRecipes[j].summary,
          spoonacularScore: dbRecipes[j].spoonacularScore,
          healthScore: dbRecipes[j].healthScore,
          analyzedInstructions: dbRecipes[j].analyzedInstructions,
          diets: dietsMap,
          image: dbRecipes[j].image 
        }
      arrayResponse.push(objectResponseDB)
    } 
    const concatRecipes = arrayResponse.concat(getRecipes.data.results)
    return res.send(concatRecipes)
  } catch(error) {
    next(error)
  }
}

async function postRecipe(req, res) {
const { title, summary, spoonacularScore, healthScore, analyzedInstructions, image, diets } = req.body; 
const id = uuidv4();
  if (!title || !summary) return res.status(404).json({})
    const newRecipe = await Recipe.create({
            id: id, 
            title: req.body.title,
            summary: req.body.summary,
            spoonacularScore: req.body.spoonacularScore,
            healthScore: req.body.healthScore,
            image: req.body.image, 
            analyzedInstructions: [req.body.analyzedInstructions]
    }) 
    for(let i = 0; i < diets.length; i++) {
      await newRecipe.addDiet(diets[i], {through: 'recipe_diet'})
    }
    const recipes_diets = await Recipe.findOne({
      where: {
        title: req.body.title
      },
      include: Diet
    })

    return res.json(recipes_diets) 
} 
 


module.exports = {
  getRecipes,
  postRecipe}

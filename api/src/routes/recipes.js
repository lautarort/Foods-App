const {Router} = require('express');
const {getRecipes, getRecipeByName, getRecipeById, postRecipe} = require('../controllers/recipes')
const router = Router();

router.get('/', getRecipes); 
router.post('/addRecipe', postRecipe); 

module.exports= router; 
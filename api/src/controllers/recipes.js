const Sequelize = require('sequelize');
const { Op } = require("sequelize");
const { Recipe, Diet } = require('../db');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios').default;
const { API_KEY } = process.env;


async function getRecipeByName (req, res, next) {
  const {title} = req.query
  try {
    const apiRecipes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&query=${title}`)
    const dbRecipes = await Recipe.findAll({
      where: {title: 
        { [Op.iLike]: `%${title}%`}
      }, include: Diet
    }
    )
   if (dbRecipes.length === 0) {
       let result = apiRecipes.data.results.slice(0, 9) // los pagino 9 por pag
       if (apiRecipes.data.results.length === 0) return res.status(404).send('Invalid search')
       return res.send(result) 
   } else {
    let arrayResponse = [] 
    for(let i = 0; i < dbRecipes.length; i++) {
      let dietsMap = []
      dbRecipes[i].diets.map((diet) => (
        dietsMap.push(diet.name) // agrego las dietas
      )
      )
      let objectResponseDB = {
        id: dbRecipes[i].id,
        title: dbRecipes[i].title,
        summary: dbRecipes[i].summary,
        spoonacularScore: dbRecipes[i].spoonacularScore,
        healthScore: dbRecipes[i].healthScore,
        analyzedInstructions: dbRecipes[i].analyzedInstructions,
        image: dbRecipes[i].image, 
        diets: dietsMap
      }
    arrayResponse.push(objectResponseDB)
  } 
      let totalRecipes = arrayResponse.concat(apiRecipes.data.results)
      let totalRecipesConcat = totalRecipes.slice(0,9)
     return res.send(totalRecipesConcat)
   }
  } catch (error) {
    next(error)
  }
}

async function getRecipeById (req, res, next) {
  try {
    const {id} = req.params // recibimos el id por params
    if(id.length < 35) { //si tiene menos de 35 numeros son de la api
      const apiRecipes = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
      let analyzedInstructionsMap = [] // arreglo vacio donde los vamos metiendo
      apiRecipes.data.analyzedInstrucions.map((inst) => (
        inst.steps?.map((s) => (
          analyzedInstrucionsMap.push(s.step)
          ))
        ))
        console.log(apiRecipes.data.analyzedInstrucions.steps)
          let objectResponse = {
            id: apiRecipes.data.id,
            vegetarian: apiRecipes.data.vegetarian,
            vegan: apiRecipes.data.vegan,
            glutenFree: apiRecipes.data.glutenFree,
            title: apiRecipes.data.title,
            image: apiRecipes.data.image,
            diets: apiRecipes.data.diets,
            dishTypes: apiRecipes.data.dishTypes,
            summary: apiRecipes.data.summary,
            spoonacularScore: apiRecipes.data.spoonacularScore,
            healthScore: apiRecipes.data.healthScore,
            analyzedInstructions: analyzedInstructionsMap
          }
          if(apiRecipes) return res.send(objectResponse)

    } else {
      const dbRecipeId = await Recipe.findOne({ // sino estarian en la base de datos porque el uuid es mas largo q  35
        where : {
          id: req.params.id
        },
        include: Diet
      })
      let dietsMap = []
      dbRecipeId.diets.map((diets) => (
        dietsMap.push(diet.name)
      ))
      let objectResponse = {
        id: dbRecipeId.id,
        title: dbRecipeId.title,
        summary: dbRecipeId.summary,
        spoonacularScore: dbRecipeId.spoonacularScore,
        healthScore: dbRecipeId.healthScore,
        diets: dietsMap,
        analyzedInstructions: dbRecipeId.analyzedInstructions,
        image: dbRecipeId.image
    }
    
    if(!dbRecipeId) return res.status(400).send('Invalid ID')
    return res.send(objectResponse)
  }
  } catch(error) {
    next(error)
  }
}

async function getRecipes(req,res, next) {
  try {
    const getRecipes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`) //busca todos en la api
    const dbRecipes = await Recipe.findAll({    //busca todos en la base de datos
      include: Diet
    }); 
    if(dbRecipes.length === 0) return res.send(getRecipes.data.results) // data
    let arrayResponse = [];
  
    for(let j = 0; j < dbRecipes.length; j++) { // le agrego las recetas correspondiente a c/u
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
    const concatRecipes = arrayResponse.concat(getRecipes.data.results) //los junto base de datos y api
    return res.send(concatRecipes) //los respondo
  } catch(error) {
    next(error)
  }
}

async function postRecipe(req, res) {
const { title, summary, spoonacularScore, healthScore, analyzedInstructions, image, diets } = req.body; 
const id = uuidv4();
  if (!title || !summary) return res.status(404).json({}) //si no tiene titulo y sumary tiramos error no se puede crear
    const newRecipe = await Recipe.create({ // creamos receta
            id: id, 
            title: req.body.title,
            summary: req.body.summary,
            spoonacularScore: req.body.spoonacularScore,
            healthScore: req.body.healthScore,
            image: req.body.image, 
            analyzedInstructions: [req.body.analyzedInstructions]
    }) 
    for(let i = 0; i < diets.length; i++) {
      await newRecipe.addDiet(diets[i], {through: 'recipe_diet'}) //lo agregamos a la tabla intermedia
    }
    const recipes_diets = await Recipe.findOne({ 
      where: {
        title: req.body.title
      },
      include: Diet
    })

    return res.json(recipes_diets) // mandamos el resultado al front
} 
 


module.exports = {
  getRecipes,
  getRecipeByName,
  getRecipeById, 
  postRecipe}
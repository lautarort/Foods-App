import axios from 'axios';
export const GET_RECIPES = 'GET_RECIPES'; // lo exporto para usar en reducer
export const GET_RECIPES_DETAIL = 'GET_RECIPES_DETAIL';
export const SEARCH_RECIPES = 'SEARCH_RECIPES'; 
export const CREATE_RECIPE = 'CREATE_RECIPE'; 
export const POST_NEW_RECIPE = 'POST_NEW_RECIPE';

// LAS ACCIONES NO TIENEN LOGICA AGARRAN ALGO Y LO PASAN
// como funcionaria esta funcion
// retornamos una funcion que se va a encargar de dispatchar una accion 
// para utilizar una funcion asincrona
// llamamos al back, pedimos info, cuando llegue info dispatchamos accion
export function getRecipes() {
    return (dispatch) => // arrow funcion 
      fetch('http://localhost:3001/recipes') // hago pedido al back
        .then((response) => response.json()) // una promesa 
        .then((json) => {
            console.log(json) 
            // cuando tenemos la data queremos dispatchar la accion
            dispatch({
            type: GET_RECIPES, // objeto q va a tener un typ
            payload: json // el payload es el resultado .data
   // el payload son los datos que le voy a pasar al reducer
        })
        })
  }


  export function getRecipeDetail(id) {
    return function (dispatch) {
      return fetch(`http://localhost:3001/recipes/${id}`)
        .then((response) => response.json())
        .then((json) => {
          console.log(id)
          dispatch({ 
            type: GET_RECIPES_DETAIL, 
            payload: json });
        })
    }
  }

  export function searchRecipes(title) {
    return (dispatch) =>
      fetch(`http://localhost:3001/recipes/search?title=${title}`)
        .then((response) => response.json())
        .then((json) => {
          dispatch({
            type: SEARCH_RECIPES,
            payload: json
          })
        })
  }

  export function createRecipe(obj) {
    return (dispatch) =>
      fetch('http://localhost:3001/recipes/addRecipe', {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then((resp) => resp.json())
        .then((json) => {
          dispatch({
            type: CREATE_RECIPE,
            payload: json
          })
        })
  } 

  export const getNewRecipe = (info) => {
    return async function(dispatch) {
      let result = await axios.post(`http://localhost:3001/recipe/create`, info)
      let results = result.data
      return dispatch({ type: POST_NEW_RECIPE, payload: results });
      }
}

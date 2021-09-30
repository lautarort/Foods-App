import axios from 'axios';
export const GET_RECIPES = 'GET_RECIPES'; // lo exporto para usar en reducer

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


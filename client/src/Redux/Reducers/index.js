
import { 
    GET_RECIPES 
} from '../Actions/recipesActions';

const initialState = { // estado inicial: objeto con distintas propiedades
    recipes: [],
    diets : [],
    // recipeById: {},
    // createdRecipe: [],
    // filteredRecipes: [],
    // orderBy: "Select",
    // filterBy: "All"
}
//  reducer es una funcion que exportamos 
// le damos funciones a redux para q ejecute acciones
// la funcion va a estar esperando un estado, si no le llega estado le pasamos el estado inicial
// la segunda parte qe va a recibir la funcion son las acciones que vamos a definir
// estas acciones que definimos que llegan a traves del dispatch las vamos a usar para modificar el estado
// usamos switch q nos permite hacer muchos ifs
// cada vez que termina la ejecucion de esta funcion tendria que retornar el nuevo estado
function rootReducer(state = initialState, action) { //funcion reductora que
     //  recibe el state que como estado inicial initialstate y  actions que seria el objeto que dispatcha las acciones
    switch (action.type) { // matchamos con el type del objeto action 
      //RECIPES
      // ACA LLAMAMOS LA ACCION
         case GET_RECIPES:  
          return { // retornamos un objeto
            // los ... toman el initialstate
            ...state, 
            // pisamos el valor de recipes y la redefinimos
            recipes: action.payload
            // la data guardada en el payload se lo pasamos aca  
          }
        
        }
    }



export default rootReducer; 
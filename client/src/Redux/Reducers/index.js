import { 
  GET_RECIPES,
  GET_RECIPES_DETAIL, 
  SEARCH_RECIPES, 
  CREATE_RECIPE, 
  POST_NEW_RECIPE
} from '../Actions/recipesActions';
import { 
  GET_DIETS, 
  DIET_FILTER 
} from '../Actions/dietsActions';
import { 
  ORDER_DESC_NAME, 
  ORDER_LOWER_SCORE, 
  ORDER_ASC_NAME, 
  ORDER_HIGHER_SCORE, 
  RESET  
} from '../Actions/orderActions';

const initialState = { // estado inicial: objeto con distintas propiedades
    recipes: [],
    diets : [],
    recipeById: {},
    createdRecipe: [],
    filteredRecipes: [],
    orderBy: "Select",
    filterBy: "All"
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
          case POST_NEW_RECIPE:
            return {
              ...state, 
            newRecipe: action.payload}
        
         case GET_RECIPES_DETAIL: 
          return {
            ...state,
           recipeById: action.payload
          }
        
         case CREATE_RECIPE: 
          return {
            ...state,
            createdRecipe: action.payload
          }
        
        case SEARCH_RECIPES :
          console.log(action.payload) 
          return {
            ...state,
            recipes: action.payload
          }
        
        //DIETS: 
       case GET_DIETS:
        return{
          ...state,
          diets: action.payload
        }
      
        case DIET_FILTER: 
        return {
          ...state,  
          filteredRecipes: action.payload.recipeDiet,
          filterBy: action.payload.type
        }
      
        //ORDER:
        case ORDER_ASC_NAME: 
          return {
            ...state,
            filteredRecipes: action.payload.orderedRecipes,
            orderBy: action.payload.name
          }
        
        case ORDER_DESC_NAME: 
          return {
            ...state,
            filteredRecipes: action.payload.orderedRecipes,
            orderBy: action.payload.name
          }
        
        case ORDER_HIGHER_SCORE: 
          return {
            ...state,
            filteredRecipes: action.payload.orderedRecipes,
            orderBy: action.payload.name
          }
        
        case ORDER_LOWER_SCORE: 
          return {
            ...state,
            filteredRecipes: action.payload.orderedRecipes,
            orderBy: action.payload.name
          }
        
        case RESET: 
          return {
            ...state,
            filteredRecipes: [],
            orderBy: "Select",
            filterBy: "All"
          }
          default:
            return state 
        }
    }



export default rootReducer; 
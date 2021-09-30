import { createStore, compose, applyMiddleware } from 'redux'; //traemos el create store y un  middleweare para poder configurarlo con las redux dev tools
import rootReducer from "../Reducers/index.js"; // el reducer creado por mi
import thunk from "redux-thunk"; // permite asincronismo

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //permite ver en el navegador el estado

const store = createStore( // declaramos el store pasandole el createStore
    rootReducer,  // le pasamos el reducer
    composeEnhancers(applyMiddleware(thunk)) //  el compose nos va a permitir componer el applymildeware con thunk
    )

export default store; //se lo pasamos al provider en index.js
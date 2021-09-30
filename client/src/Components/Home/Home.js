import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDiets } from '../../Redux/Actions/dietsActions';
import { getRecipes } from '../../Redux/Actions/recipesActions';

// useSelector hook para reemplazar mapStateToProps
// useDispatch hook para reemplazar mapDispatchToProps


function Home() {
    const dispatch = useDispatch() 
    //bindea el estado
    const recipes = useSelector (state=> state.recipes) //esto nos va a traer el estado definido en el store trae nuestro arreglo de recetas
    //cada vez que el estado cambie la pag se vuelve a renderizar
    useEffect()
    return (
        <div>

        </div>
       
    )
}

export default Home;
import React from 'react'
import './DisplayRecipes.css'
import RecipeContainer from '../RecipeContainer/RecipeContainer'


function DisplayRecipes(props) {
    console.log('display', props.recipes.length)

    return (
        <div>
            {props.recipes.map((recipe, index) => (
                <RecipeContainer index={index}  recipe={recipe}/>
            ))}
        </div>
    )
}

export default DisplayRecipes;
import React from 'react'
import {Link} from 'react-router-dom'
import recipe from '../../img/recipe.jpg'
// import './RecipeContainer.css'

export default function RecipeContainer (props) {
    console.log('recipeContainer', props.recipe)
    return (
        <div>
            <h1>{ props.recipe.title }</h1>
            <div>
            <img src={props.recipe.image ? props.recipe.image : `${recipe} `} alt="pingo" />
            </div>
                <div>
                    {props.recipe.diets?.map((diet, index) => (
                        <span>
                            <p>
                                {diet}
                            </p>
                        </span>
                    ))}
                </div>
                <Link to={`/recipe/${props.recipe.id}`}>
                    <button type='submit'>More...</button>
                </Link>
            
        </div>
    )
}

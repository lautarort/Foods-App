import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDiets } from '../../Redux/Actions/dietsActions';
import { getRecipes } from '../../Redux/Actions/recipesActions';
import './Landing.css'

function Landing() {
     const dispatch = useDispatch() 
      useEffect(() => {
          dispatch(getDiets())
          dispatch(getRecipes())
           // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

    return (
        <div className='landing_container'>
        <h1 className= 'welcome_text'>Loves Food</h1>
        <button className='button_home'><Link to='/home' className='link_text'> START </Link></button>
        </div>
    )
}

export default Landing
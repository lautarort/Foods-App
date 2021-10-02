import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { reset } from '../../Redux/Actions/orderActions';
import {dietFilter } from '../../Redux/Actions/dietsActions';
import { orderAsc, orderDesc } from '../../Redux/Actions/orderActions';
// import './FilterOptions.css'; 

function FilterOptions() {
    const {diets} = useSelector((store) => store);
    const dispatch = useDispatch();

    const handleFilters = (e) => {
        if(e.target.value === "higher_score" || e.target.value === 'asc_name'){
            dispatch(orderAsc(e.target.value))
        }
        if(e.target.value === "lower_score" || e.target.value === "desc_name") {
            dispatch(orderDesc(e.target.value))
        }
        if(e.target.value === 'All') {
            dispatch(reset())
        }
    }

    return (
        <div>
            <div>
                <p>SELECT DIET</p>
                <select id="select_id" onChange={(e) => dispatch(dietFilter(e.target.value))}>
                <option default value = "All">All</option>
                {diets.map((diet) => (
                    <option value={diet.name}>{diet.name}</option>
                ))}
                </select>
            </div>
            <div>
                <p>SCORE</p>
                <select onChange={(e) => handleFilters(e)}>
                <option default>All</option>
                <option value="higher_Score">From Higher-Lower </option>
                <option value="lower_Score">From Lower-Higher</option>
                </select>
                </div>
            <div>
                <p>ORDER BY</p>
                <select onChange={(e) => handleFilters(e)}>
                <option default>All</option>
                <option value="asc_name">Ascending (A-Z)</option>
                <option value="desc_name">Descending (Z-A)</option>
                </select>
                </div>
        </div>
    )

} 

export default FilterOptions;
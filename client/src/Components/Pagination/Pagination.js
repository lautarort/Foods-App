import React from 'react';
// import './Pagination.css'

function Pagination({ recipePerPage, totalRecipes, paginate}) {
    const pages = [];

    for(let i = 1; i <= Math.ceil(totalRecipes / recipePerPage); i++) {
        pages.push(i);
    }
    return (
        <nav>
            <div>
                {pages.map((num) => (
                    <button
                    onClick={(e) => paginate(e, num)}>
                    {num}
                    </button>
                ))}
            </div>
        </nav>
    );
}

export default Pagination;
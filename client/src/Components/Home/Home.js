import React, {useState, useEffect} from 'react';
import { useSelector} from 'react-redux';
import Pagination  from '../Pagination/Pagination';
import FilterOptions from '../FilterOptions/FilterOptions';
import DisplayRecipes from '../DisplayRecipes/DisplayRecipes';
import Nav from '../Nav/Nav';
// import './Home.css'

// useSelector hook para reemplazar mapStateToProps
// useDispatch hook para reemplazar mapDispatchToProps


function Home() {
    //bindea el estado definido en el reducer
    const {recipes} = useSelector ((state) => state) //esto nos va a traer el estado definido en el store, trae nuestro arreglo de recetas
    const {filteredRecipes} = useSelector ((state) => state);
    const {filterBy} = useSelector((state) => state);
    const {orderBy} = useSelector((state) => state);

     const [allRecipes, setAllRecipes] = useState([])
     const [page, setPage] = useState(1);
     const [recipesPerPage] = useState(9);

    //cada vez que el estado cambie la pag se vuelve a renderizar
    useEffect(() => {
        if(filterBy === 'All' && orderBy === 'Select') {
            setAllRecipes(recipes.slice())
        } else {
            setAllRecipes(filteredRecipes.slice())
        }
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[filterBy, orderBy, recipes])

    console.log(recipes)

    // PAGINATION
    
    // indice del úlitmo elemento de cada pagina
    let indexLastPage = page * recipesPerPage;
    // indice del primer elemento de cada pagina
    let indexFirstPage = indexLastPage - recipesPerPage;
    // recetas de la pagina actual
    let currentPage = allRecipes.slice(indexFirstPage, indexLastPage);

    // cambiar pagina

    function paginate(e, num) {
        e.preventDefault();
        setPage(num);
    } // seteo el num de la pagina

    return (
        <div>
            <>
            <Nav />
            <FilterOptions />
            <DisplayRecipes recipes={currentPage} />
            <Pagination
                recipePerPge={recipesPerPage} // 9
                totalRecipes={allRecipes.length}
                paginate={paginate} // function
                />
            </>
        </div>
       
    )
}

export default Home;
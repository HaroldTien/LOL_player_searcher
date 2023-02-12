
import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
    Link 
  } from "react-router-dom";
import '../css/nav.css'
const NavBar=(props)=>{

    return(
        <nav className='nav'>
            <Link to="/" className='site-title'>Home</Link>
            <ul>
                <li>
                    <Link to="/aiBP" >AI Ban Pick</Link>        
                </li>
            </ul>
        </nav>
    );
}
export default NavBar;
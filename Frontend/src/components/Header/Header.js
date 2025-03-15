import React from 'react'
import "./Header.css"
// import { Link } from 'react-router-dom';
const Header = (props) => {
    return (
        <nav class="navbar navbar-expand-lg navbar-dark fixed-top py-0 navbar-cont">
            <h2 className='HLogo'>TELEMID - AID</h2>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
                    <li class="nav-item active">
                        <a class="nav-link" href="/homepage">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link " href="/profile">Profile</a>
                    </li>
                    {/* {props.user.role === 'MANAGER'?<></>:
                                    <li class="nav-item">
                                        <a class="nav-link" href="/pets">Available Pets</a>
                                    </li>
                    } */}
                    <li class="nav-item">
                        <a to={'/signup'} class="nav-link" href='/' >Log out</a>
                    </li>
        </ul>
    </div>
    
        </nav>
    )
}

export default Header

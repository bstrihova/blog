import React from 'react'

function Header() {

    const logout = () => {
        localStorage.clear();
        console.log("u've been logged out");
    }

    console.log(localStorage.getItem("access_token"));
    console.log(localStorage.getItem("user"));

    let user = localStorage.getItem('user');


    let rightMenu = "";
    if (user) {
        rightMenu = (
            <ul className="navbar-nav d-flex align-items-center">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img src="http://placedog.net/131/131" width="40" className="rounded-circle"/>
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a className="dropdown-item" href="/" onClick={logout} style={{color: "red"}}>Logout</a>
                    </div>
                </li>   
                <li className="nav-item">
                    <a className="nav-link" href="/admin">My Articles</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/admin/create" style={{color: "#2B7EFB"}} >Create Article</a>
                </li>
            </ul>    
        )
    } else {
        rightMenu = (
            <ul className="navbar-nav d-flex align-items-center">
                <a className="nav-link" style={{color: "#2B7EFB"}} href="/login">
                    Log in →
                </a>
            </ul>
        )
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">
                <img src="https://www.flaticon.com/svg/static/icons/svg/61/61624.svg" width="40" alt="cat logo"/>
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">

                {/* menu on the left side */}
                <ul className="navbar-nav mr-auto d-flex align-items-center">
                <li className="nav-item active">
                    <a className="nav-link" href="/">Recent Articles</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/about">About</a>
                </li>
                </ul>

                {rightMenu}
            </div>
        </nav>
    )
}

export default Header

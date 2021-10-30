import React from "react"
import { Link } from "react-router-dom"
import './NavBar.css'
import { useHistory } from "react-router"





export const NavBar = ({ clearUser, isAuthenticated }) => {

    const history = useHistory()

    const handleLogout = () => {
        clearUser();
        history.push('/');
    }


    return (
        <nav className="navbar ">

            <ul className="nav_ul">

                <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                </li>

                {clearUser, isAuthenticated ?
                    <li className="nav-item">
                        <Link className="nav-link" to="/children">Children</Link>
                    </li>
                    : null}
                {clearUser, isAuthenticated ?
                    <li className="nav-item">
                        <Link className="nav-link" to="/appointments">Appointment</Link>
                    </li>
                    : null}
                {/* {clearUser, isAuthenticated ?
                    <li className="nav-item">
                        <Link className="nav-link" to="/children">Children</Link>
                    </li>
                    : null} */}
                {clearUser, isAuthenticated ?
                    <li className="nav-item">
                        <Link className="nav-link" to="/reviews">Review</Link>
                    </li>
                    : null}
                {isAuthenticated
                    ? <li className="navbar__item">
                        <span className="navbar__link" onClick={handleLogout}> Logout </span>
                    </li>
                    : <li className="navbar__item">
                        <Link className="navbar__link" to="/login">Login</Link>
                    </li>}
            </ul>
        </nav>
    )
}
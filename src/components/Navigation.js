import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import AppContext from '../AppContext'

const Navigation = () => {

    //Global State
    const [globalState, setGlobalState] = useContext(AppContext)

    let userType = globalState.userType

    return (
        <nav className="navbar navbar-expand-lg navbar-dark main-nav shadow-sm">
            <div className="container">
                <a className="navbar-brand" href="#">Observation App</a>
                
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item p-1">
                            <NavLink className="nav-link pl-md-3 pr-md-3 home" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item p-1">
                            <NavLink className="nav-link pl-md-3 pr-md-3" to="/admin/users">Users</NavLink>
                        </li>
                        <li className="nav-item p-1">
                            <NavLink className="nav-link pl-md-3 pr-md-3" to="/admin/subjects">Subjects</NavLink>
                        </li>
                        <li className="nav-item p-1">
                            <NavLink className="nav-link pl-md-3 pr-md-3" to="/admin/grades">Grades</NavLink>
                        </li>
                        <li className="nav-item p-1">
                            <NavLink className="nav-link pl-md-3 pr-md-3" to="/admin/forms">Forms</NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown p-1">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {userType}
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="#">Logout</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navigation

import React from 'react'
import {useNavigate} from 'react-router-dom'
function Authentication({children}) {
    const navigate = useNavigate();
    const isAuth = localStorage.getItem("email");
    return isAuth ? children : navigate("/")
}

export default Authentication;
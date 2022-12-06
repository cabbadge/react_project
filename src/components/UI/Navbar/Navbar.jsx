import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {AuthContext} from "../../../Context";
import MyButton from "../Button/MyButton";

const Navbar = () => {
    const {isAuth,setIsAuth}=useContext(AuthContext)

    return (
        <div className="navbar">
            <MyButton onClick={()=>setIsAuth(false)}>
                Выйти
            </MyButton>
            <div className="navbar_links">

                <Link to='/about'>О сайте</Link>
                <Link to='/posts'>Посты</Link>
            </div>
        </div>
    );
};

export default Navbar;
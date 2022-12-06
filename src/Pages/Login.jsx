import React, {useContext} from 'react';
import MyInput from "../components/UI/Input/MyInput";
import MyButton from "../components/UI/Button/MyButton";

const Login = () => {
    return (
        <div>
            <h1>Страница для логина</h1>
            <form>
                <MyInput type='text' placeholder='Введите логин'/>
                <MyInput type='password' placeholder='Введите пароль'/>
                <MyButton>Войти</MyButton>
            </form>
        </div>
    );
};

export default Login;
import logo from "../images/logo.svg";
import React from "react";
import {Link, Route, Switch} from "react-router-dom";

function Header(props) {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип" />

            <Switch>
                <Route path="/sign-up">
                    <Link to="/sign-in" className="header__button">Войти</Link>
                </Route>

                <Route path="/sign-in">
                    <Link to="/sign-up" className="header__button">Регистрация</Link>
                </Route>

                <Route path="/">
                    <div className="header__login-block">
                        <p className="header__login">{props.email}</p>
                        <Link to="/sign-in" className="header__button header__button_logout" onClick={props.onclick}>Выйти</Link>
                    </div>
                </Route>
            </Switch>
        </header>
    )
}

export default Header;
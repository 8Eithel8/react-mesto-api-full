import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import React from "react";
import {useEffect, useState} from "react";
import {api} from "../utils/api.js";
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import Login from "./Login.js";
import Rigister from "./Register.js";
import InfoTooltip from "./InfoTooltip.js";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.js";
import * as auth from "../utils/auth.js";
import iconReg from "../images/icon-reg.svg";
import iconErr from "../images/icon-reg-err.svg";

function App() {

    const [cards, setCards] = useState([]);
    const [currentUser , setCurrentUser ] = useState({});
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [infoToolImage, setInfoToolImage] = React.useState('');
    const [infoToolMessage, setInfoToolMessage] = React.useState('');
    const [userLogin, setUserLogin] = React.useState('');

    const history = useHistory()

    useEffect(() => {
        Promise.all([api.getInitialCards(), api.getUserInfo()])
            .then(([cards, userInfo]) => {
                setCards(cards);
                setCurrentUser(userInfo);
            })
            .catch(
                (err) => console.log('Error: ', err)
            );
    }, [])

    function handleCardLike(card, isLiked) {

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(
            (err) => console.log('Error: ', err)
        );
    }

    function handleCardDelete (card) {

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.removeCard(card._id).then(() => {
            setCards((state) => state.filter((c) => c._id !== card._id));
        })
        .catch(
            (err) => console.log('Error: ', err)
        );
    }

    function handleUpdateUser (data) {
        api.editUserInfo(data).then((newData) => {
                setCurrentUser({
                    ...currentUser,
                    name: newData.name,
                    about: newData.about,
                })
            closeAllPopups();
            }
        )
        .catch(
            (err) => console.log('Error: ', err)
        );
    }

    function handleAddPlaceSubmit (data) {
        api.postNewCard(data).then((newCard) => {
            setCards([
                    newCard,
                    ...cards,
                ])
            closeAllPopups();
            }
        )
        .catch(
            (err) => console.log('Error: ', err)
        );
    }

    function handleUpdateAvatar (data) {
        api.updateAvatar(data).then((newData) => {
                setCurrentUser({
                    ...currentUser,
                avatar: newData.avatar,
                })
            closeAllPopups();
            }
        )
        .catch(
            (err) => console.log('Error: ', err)
        );
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsInfoToolTipOpen(false);
        setSelectedCard(null);
    }

    useEffect( () => {
        // если у пользователя есть токен в localStorage,
        // эта функция проверит валидность токена
        const jwt = localStorage.getItem('jwt');
        if (jwt){
            // проверим токен
            auth.getData(jwt).then((res) => {
                if (res){
                    // авторизуем пользователя
                    setLoggedIn(true);
                    setUserLogin(res.data.email);
                    history.push('/');
                }
            });
        }
    }, [])

    useEffect(() => {
        if (loggedIn === true) {
            history.push('/');
        }
    }, [loggedIn, history])

    //вход пользователя
    function onSignIn(email, password) {
        auth.authorize(email, password)
            .then((data) => {
                console.log(data)
                if (data.token){
                    localStorage.setItem('jwt', data.token);
                    setLoggedIn(true);
                    setUserLogin(email);
                    history.push('/');
                }  else {
                    setInfoToolImage(iconErr);
                    setInfoToolMessage('Что-то пошло не так! Попробуйте ещё раз.');
                    setIsInfoToolTipOpen(true);
                }
            })
            .catch(err => console.log(err));
    }

    // регистрация пользователя
    function onSignUp(email, password){
        auth.register(email, password).then((res) => {
            if(res.data){
                setInfoToolImage(iconReg);
                setInfoToolMessage('Вы успешно зарегистрировались!');
                setIsInfoToolTipOpen(true);
                history.push('/sign-in');

            } else {
                setInfoToolImage(iconErr);
                setInfoToolMessage('Что-то пошло не так! Попробуйте ещё раз.');
                setIsInfoToolTipOpen(true);
            }
        });
    }

    //выход из аккаунта
    function onSignOut(){
        setLoggedIn(false);
        localStorage.removeItem('jwt');
        history.push('/sign-in');
        setUserLogin('');
    }

    return (
        <div className="page">
        <CurrentUserContext.Provider value={currentUser}>

            <Header
                onclick={onSignOut}
                email={userLogin}
            />

            <Switch>
                <ProtectedRoute
                    exact path="/"
                        component={Main}
                        loggedIn={loggedIn}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                        cards={cards}
                />

                <Route path="/sign-up">
                    <Rigister onSubmit={onSignUp}/>
                </Route>

                <Route path="/sign-in">
                    <Login onSubmit={onSignIn}/>
                </Route>

                <Route  path="*">
                    <Redirect to={ loggedIn ? "/" : "/sign-in"} />
                </Route>
            </Switch>

            <Route exact path="/">
                <Footer/>
            </Route>

            <InfoTooltip
                isOpen={isInfoToolTipOpen}
                onClose={closeAllPopups}
                image={infoToolImage}
                message={infoToolMessage}
            />

            <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
            />

            <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
            />

            <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}
            />

            <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

        </CurrentUserContext.Provider>
        </div>
    );
}

export default App;
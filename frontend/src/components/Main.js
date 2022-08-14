import Card from "./Card.js";
import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile">
                <div
                    className="profile-wrapper-avatar"
                    onClick={props.onEditAvatar}
                >
                    <div className="profile__avatar-edit"></div>
                    <img className="profile__avatar" src={currentUser.avatar} alt="Аватарка" />
                </div>
                <div className="profile__info">
                    <h1 className="profile__title">{currentUser.name}</h1>
                    <button
                        className="profile__button profile__button_type_edit"
                        type="button"
                        aria-label="Редактировать"
                        onClick={props.onEditProfile}
                    >
                    </button>
                    <p className="profile__subtitle">{currentUser.about}</p>
                </div>
                <button
                    className="profile__button profile__button_type_add"
                    type="button"
                    aria-label="Добавить"
                    onClick={props.onAddPlace}
                ></button>
            </section>

            <section className="cards">
                {props.cards.map((card) => (
                    <Card
                        key={card._id}
                        data={card}
                        onCardClick={props.onCardClick}
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDelete}
                    />
                ))}
            </section>
        </main>
    );
}

export default Main;
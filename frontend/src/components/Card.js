import {CurrentUserContext} from "../contexts/CurrentUserContext.js";
import React from "react";

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = props.data.owner === currentUser._id;

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `card__remove ${isOwn ? '' : 'card__remove_hidden'}`
    );

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = props.data.likes.some(i => i === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
        `card__like ${isLiked ? 'card__like_added' : ''}`
    );

    //Обработчик клика на картинку
    function handleClick() {
        props.onCardClick(props.data);
    }

    //ОБработчик клика на лайк
    function handleLikeClick() {
        props.onCardLike(props.data, isLiked);
    }

    //ОБработчик клика на лайк
    function handleDeleteClick () {
        props.onCardDelete(props.data);
    }

    return (
        <article className="card">
            <img className="card__image" onClick={handleClick} src={props.data.link} alt={props.data.name} />
            <button className={cardDeleteButtonClassName}
                    onClick={handleDeleteClick}
                    type="button"
                    aria-label="Удалить"
            ></button>
            <div className="card__footer">
                <h2 className="card__title">{props.data.name}</h2>
                <div className="card__like-wrapper">
                    <button className={cardLikeButtonClassName}
                            onClick={handleLikeClick}
                            type="button"
                            aria-label="Нравится"
                    ></button>
                    <span className="card__like-counter">{props.data.likes.length}</span>
                </div>
            </div>
        </article>
    )
}

export default Card;
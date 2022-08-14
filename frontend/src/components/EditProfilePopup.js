import PopupWithForm from "./PopupWithForm.js";
import React from "react";
import {useState} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = useState(currentUser.name);
    const [description , setDescription ] = useState(currentUser.about);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);


    function handleChange(evt) {
        evt.target.name === "name" ? setName(evt.target.value) : setDescription(evt.target.value);
    }

    function handleSubmit(evt) {
        // Запрещаем браузеру переходить по адресу формы
        evt.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name: name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name='profile'
            title='Редактировать профиль'
            isOpen={props.isOpen}
            onClose={props.onClose}
            submitText='Сохранить'
            onSubmit={handleSubmit}
        >
            <label className="popup__label-field" htmlFor="name">
                <input className="popup__field" type="text" name="name" id="name" placeholder="Имя" required
                       minLength="2" maxLength="40" value={name ?? ""} onChange={handleChange}/>
                <span className="popup__error name-error"></span>
            </label>
            <label className="popup__label-field" htmlFor="about">
                <input className="popup__field" type="text" name="about" id="about" placeholder="Занятие"
                       required minLength="2" maxLength="200" value={description ?? ""} onChange={handleChange} />
                <span className="popup__error about-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup;
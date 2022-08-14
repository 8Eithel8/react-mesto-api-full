import PopupWithForm from "./PopupWithForm.js";
import React from "react";

function AddPlacePopup(props) {
    const imageRef = React.useRef();
    const titleRef = React.useRef();

    React.useEffect(() => {
        imageRef.current.value = '';
        titleRef.current.value = '';
    }, [props.isOpen]);

    function handleSubmit(evt) {
        // Запрещаем браузеру переходить по адресу формы
        evt.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик

        props.onAddPlace({
            name: titleRef.current.value,
            link: imageRef.current.value
        });
    }

    return (
        <PopupWithForm
            name='adder'
            title='Новое место'
            isOpen={props.isOpen}
            onClose={props.onClose}
            submitText='Создать'
            onSubmit={handleSubmit}
        >
            <label className="popup__label-field" htmlFor="photo-name">
                <input
                    className="popup__field"
                    type="text"
                    name="name"
                    id="photo-name"
                    placeholder="Название"
                    required
                    minLength="2"
                    maxLength="30"
                    ref={titleRef}
                />
                <span className="popup__error photo-name-error"></span>
            </label>
            <label className="popup__label-field" htmlFor="photo-link">
                <input
                    className="popup__field"
                    type="url"
                    name="link"
                    id="photo-link"
                    placeholder="Ссылка на картинку"
                    required
                    ref={imageRef}
                />
                <span className="popup__error photo-link-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default AddPlacePopup;
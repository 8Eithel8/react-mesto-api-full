import PopupWithForm from "./PopupWithForm.js";
import React from "react";

function EditAvatarPopup(props) {
    const avatarRef = React.useRef();

    React.useEffect(() => {
        avatarRef.current.value = '';
    }, [props.isOpen]);

    function handleSubmit(evt) {
        // Запрещаем браузеру переходить по адресу формы
        evt.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateAvatar({
            avatar: avatarRef.current.value
        });
    }

    return (
        <PopupWithForm
            name='editAvatar'
            title='Обновить аватар'
            isOpen={props.isOpen}
            onClose={props.onClose}
            submitText='Сохранить'
            onSubmit={handleSubmit}
        >
            <label className="popup__label-field" htmlFor="avatar">
                <input
                    className="popup__field"
                    type="url"
                    name="avatar"
                    id="avatar"
                    placeholder="Ссылка на картинку"
                    ref={avatarRef}
                    required />
                <span className="popup__error avatar-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;
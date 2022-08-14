function PopupWithForm(props) {

    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button className="popup__button popup__button_close"
                        type="button"
                        aria-label="Закрыть"
                        onClick={props.onClose}
                ></button>

                <h2 className="popup__title">{props.title}</h2>
                <form className="popup__form"
                      name={`form-${props.name}`}
                      onSubmit={props.onSubmit}
                >
                    {props.children};

                    <button type="submit" className="popup__button popup__button_submit">{props.submitText}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;

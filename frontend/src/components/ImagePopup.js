function ImagePopup(props) {
    return (
        <div className={`popup popup_type_photo ${props.card ? 'popup_opened' : ''}`}>
            <article className="popup__photo-card">
                <button
                    className="popup__button popup__button_close"
                    type="button"
                    aria-label="Закрыть"
                    onClick={props.onClose}
                ></button>
                <img className="popup__photo" src={props.card?.link} alt={props.card?.name} />
                <h3 className="popup__photo-title">{ props.card?.name}</h3>
            </article>
        </div>
    );
}

export default ImagePopup;
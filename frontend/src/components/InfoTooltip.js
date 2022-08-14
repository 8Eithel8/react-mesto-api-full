import React from "react";

function InfoTooltip(props) {

    return (
        <div className={`popup popup_type_infotooltip ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__container_infotooltip">
                <button className="popup__button popup__button_close"
                        type="button"
                        aria-label="Закрыть"
                        onClick={props.onClose}
                ></button>
                <img className="popup__image-tooltip" src={props.image} alt={props.card?.name} />
                <h2 className="popup__message">{props.message}</h2>

            </div>
        </div>
    );
}

export default InfoTooltip;
import React from 'react';

function ImagePopup({ card, onClose }) {
    React.useEffect(() => {
        if (!card) return;
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [card, onClose]);

    const handleOverlay = (event) => {
        if (event.target === event.currentTarget && card) {
            onClose();
        }
    };
    return (
        <div className={`popup popup_type_image ${card && 'popup_is-opened'}`} onMouseDown={handleOverlay}>
            <div className="popup__big-image">
                <button type="button" className="popup__close" aria-label="Закрыть" onClick={onClose}></button>
                <img src={card ? card.link : ''} alt={card ? card.name : ''} className="popup__image" />
                <p className="popup__title-image">{card ? card.name : ''}</p>
            </div>
        </div>
    );
}

export default ImagePopup;
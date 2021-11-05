import React, { useEffect } from 'react';

function PopupWithForm({
    name,
    children,
    isOpen,
    onClose,
    popupTitle,
    btnText,
    onSubmit,
    isDisabled
}) {
    useEffect(() => {
        if (!isOpen) return;
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onClose]);

    const handleOverlay = (event) => {
        if (event.target === event.currentTarget && isOpen) {
            onClose();
        }
    };

    return (
        <div className={`popup popup_type_${name} ${isOpen && 'popup_is-opened'}`}
            onMouseDown={handleOverlay}>
            <div className="popup__forms">
                <button type="button"
                    className="popup__close"
                    aria-label="Закрыть"
                    onClick={onClose} >

                </button>
                <form name={`${name}`}
                    id={`${name}`}
                    className="popup__form"
                    noValidate
                    onSubmit={onSubmit}>
                    <fieldset className="popup__set">
                        <h2 className="popup__title">{popupTitle}</h2>
                        {children}
                        <button type="submit"
                            className={`popup__button ${isDisabled && "popup__button_disabled"}`}
                            disabled={isDisabled}
                            aria-label={`${btnText}`}>
                            {btnText}
                        </button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;
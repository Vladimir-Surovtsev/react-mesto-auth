import React from "react";
import acceptIcon from "../images/accept-icon.svg";
import errorIcon from "../images/error-icon.svg";

const icons = {
    success: acceptIcon,
    error: errorIcon
}

function InfoTooltip({ isOpen, onClose, status: { iconType, text } = {} }) {
    React.useEffect(() => {
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
        <div className={`popup ${isOpen && "popup_is-opened"}`} onMouseDown={handleOverlay}>
            <form className='popup__forms' noValidate>
                <button
                    type='button'
                    className='popup__close'
                    onClick={onClose}
                ></button>
                <div>
                    <img
                        className='popup__icon'
                        src={icons[iconType]}
                        alt={text}
                    />
                    <p className='popup__message'>{text}</p>
                </div>
            </form>
        </div>
    );
}

export default InfoTooltip;
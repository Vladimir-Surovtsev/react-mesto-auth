import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormValidation } from "../hooks/forms";

function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit, isLoading }) {
    const { values, handleChange, resetForm, errors, isValid } = useFormValidation();

    useEffect(() => {
        resetForm({});
    }, [isOpen, resetForm]);

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlaceSubmit(values);
    }

    return (
        <PopupWithForm
            name={"add"}
            popupTitle={"Новое место"}
            btnText={isLoading ? "Сохранение..." : "Создать"}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isDisabled={!isValid || isLoading}>
            <label className="popup__field">
                <input
                    name="name"
                    type="text"
                    id="place-input"
                    className="popup__input"
                    placeholder="Название"
                    required minLength="2" maxLength="30"
                    value={values.name || ""}
                    onChange={handleChange} />
                <span
                    className={`popup__input-error ${errors.name ? "popup__input-error_visible" : ""}`}
                >
                    {errors.name || ""}
                </span>
            </label>
            <label className="popup__field">
                <input
                    name="link"
                    type="url"
                    id="image-link-input"
                    className="popup__input"
                    placeholder="Ссылка на картинку"
                    required
                    value={values.link || ""}
                    onChange={handleChange} />
                <span
                    className={`popup__input-error ${errors.link ? "popup__input-error_visible" : ""}`}
                >
                    {errors.link || ""}
                </span>
            </label>
        </PopupWithForm>
    );
}

export default AddPlacePopup;
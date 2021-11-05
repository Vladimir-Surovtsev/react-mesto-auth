import React, { useEffect, useContext } from 'react';
import PopupWithForm from "./PopupWithForm";
import { useFormValidation } from "../hooks/forms";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({
    isOpen,
    onUpdateUser,
    onClose,
    isLoading
}) {
    const currentUser = useContext(CurrentUserContext);
    const {
        values,
        handleChange,
        resetForm,
        errors,
        isValid
    } = useFormValidation();

    useEffect(() => {
        if (currentUser) {
            resetForm(currentUser, {}, true);
        }
    }, [currentUser, resetForm, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser(values);
    }

    return (
        <PopupWithForm
            name={"edit"}
            popupTitle={"Редактировать профиль"}
            btnText={isLoading ? "Сохранение..." : "Сохранить"}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isDisabled={!isValid || isLoading}>
            <label className="popup__field">
                <input
                    name="name"
                    type="text"
                    id="name-input"
                    className="popup__input"
                    value={values.name || ""}
                    required
                    minLength="2" maxLength="40"
                    onChange={handleChange} />
                <span
                    className={`popup__input-error ${errors.name ? "popup__input-error_visible" : ""}`}
                >
                    {errors.name || ""}
                </span>
            </label>
            <label className="popup__field">
                <input
                    name="about"
                    type="text"
                    id="job-input"
                    className="popup__input"
                    value={values.about || ""}
                    required
                    minLength="2" maxLength="200"
                    onChange={handleChange} />
                <span
                    className={`popup__input-error ${errors.about ? "popup__input-error_visible" : ""}`}
                >
                    {errors.about || ""}
                </span>
            </label>
        </PopupWithForm>
    );
}

export default EditProfilePopup;
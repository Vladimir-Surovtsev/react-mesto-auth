import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { useFormValidation } from "../hooks/forms";

function EditAvatarPopup({
    isOpen,
    onClose,
    onUpdateAvatar }) {
    const {
        values,
        handleChange,
        resetForm,
        errors,
        isValid
    } = useFormValidation();

    useEffect(() => {
        resetForm({});
    }, [isOpen, resetForm]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar(values);
    }


    return (
        <PopupWithForm
            name={"avatar"}
            popupTitle={"Обновить аватар"}
            btnText={"Сохранить"}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isDisabled={!isValid}>
            <label className="popup__field">
                <input
                    name="avatar"
                    type="url"
                    id="avatar-link-input"
                    className="popup__input"
                    placeholder="Ссылка на аватар"
                    value={values.avatar || ""}
                    onChange={handleChange}
                    required />
                <span
                    className={`popup__input-error ${errors.avatar ? "popup__input-error_visible" : ""}`}
                >
                    {errors.avatar || ""}
                </span>
            </label>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
import React from 'react';
import { Link } from 'react-router-dom';
import { useFormValidation } from "../hooks/forms"

function Register({ onRegister }) {
    const {
        values,
        handleChange,
        errors,
        isValid
    } = useFormValidation();

    function handleSubmit(evt) {
        evt.preventDefault();
        onRegister(values.email, values.password);
    }

    return (
        <div className="auth-form">
            <form className="auth-form__form" onSubmit={handleSubmit}>
                <div className="auth-form__wrapper">
                    <h3 className="auth-form__title">Регистрация</h3>
                    <label className="auth-form__input">
                        <input type="email" name="email" id="email"
                            className="auth-form__textfield" placeholder="Email"
                            value={values.email || ""}
                            onChange={handleChange} required />
                            <span
                                className={`auth-form__input-error ${errors.email ? "auth-form__input-error_visible" : ""}`}
                            >
                                {errors.email || ""}
                            </span>
                    </label>
                    <label className="auth-form__input">
                        <input type="password" name="password" id="password"
                            className="auth-form__textfield" placeholder="Пароль"
                            minLength="7" maxLength="20"
                            value={values.password || ""}
                            onChange={handleChange} required />
                            <span
                                className={`auth-form__input-error ${errors.password ? "auth-form__input-error_visible" : ""}`}
                            >
                                {errors.password || ""}
                            </span>
                    </label>
                </div>
                <div className="auth-form__wrapper">
                    <button className="auth-form__button" type="submit" disabled={!isValid}>Зарегистрироваться</button>
                    <p className="auth-form__text">Уже зарегистрированы? <Link className="auth-form__link" to="/signin">Войти</Link></p>
                </div>
            </form>
        </div>
    )
}

export default Register;
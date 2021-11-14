import React from 'react';
import { useFormValidation } from "../hooks/forms"

function Login({ onLogin }) {
    const {
        values,
        handleChange,
        errors,
        isValid
    } = useFormValidation();

    function handleSubmit(evt) {
        evt.preventDefault();
        onLogin(values.email, values.password);
    }

    return (
        <div className="auth-form">
            <form className="auth-form__form" onSubmit={handleSubmit}>
                <div className="auth-form__wrapper">
                    <h3 className="auth-form__title">Вход</h3>
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
                <button className={`auth-form__button`}
                    disabled={!isValid}
                    type="submit">Войти
                </button>
            </form>
        </div>
    )
}

export default Login;
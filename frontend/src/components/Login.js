import React from "react";

function Login(props) {
    const emailRef = React.useRef();
    const passwordRef = React.useRef();

    function  handleSubmit(e){
        e.preventDefault();
        if (!emailRef.current.value || !passwordRef.current.value){ return; }
        props.onSubmit( emailRef.current.value, passwordRef.current.value)
    }

    return (
        <>
            <section className="registration">
                <h1 className="registration__title">Вход</h1>
                <form className="auth-form"
                      name={`form-${props.name}`}
                      onSubmit={handleSubmit}
                >
                    <div className="auth-form__fields">
                        <label className="auth-form__label-field" htmlFor="name">
                            <input
                                className="auth-form__field"
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                required
                                minLength="2"
                                maxLength="40"
                                ref={emailRef}
                            />
                            <span className="auth-form__error name-error"></span>
                        </label>
                        <label className="auth-form__label-field" htmlFor="name">
                            <input
                                className="auth-form__field"
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Пароль"
                                required
                                minLength="2"
                                maxLength="40"
                                ref={passwordRef}
                            />
                            <span className="auth-form__error name-error"></span>
                        </label>
                    </div>
                    <button type="submit" className="auth-form__button">Войти</button>

                </form>
            </section>
        </>
    )
}

export default Login;
import { reduxForm } from "redux-form"
import { createField, Input } from "../../../common/FormsControls/FormsControls"
import { maxLenghtCreator, required } from "../../../utils/validator/validators"
import style from "./../../../common/FormsControls/FormsControls.module.css"
import React, { FC } from "react"
import Preloader from "../../../common/Preloader/Preloader"

const maxLenght50 = maxLenghtCreator(50)
type LoginFormPropsType = {
    isShowCapcha: boolean
    isWaitingCapcha: boolean
    _error: any
    capchaUrl: string
    handleSubmit: () => void
}
type LoginFormFieldType = {
    email: string
    password: string
    rememberMe: boolean
    captha?: string
}
const LoginForm: FC<LoginFormPropsType> = ({ handleSubmit, _error, capchaUrl, isShowCapcha, isWaitingCapcha }) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField("Login", 'email', [required, maxLenght50], Input)}
            {/* <Field name={'email'} component={Input}
                    placeholder="Login"
                    validate={[required, maxLenght50]}
                /> */}
            {createField("Password", 'password', [required, maxLenght50],
                Input, { type: "password" })}

            {createField(null, 'rememberMe', [],
                'input', { type: "checkbox" }, "Remember me")}
            {_error && <div className={style.formSummaryError}>
                {_error}
            </div>}

            {isShowCapcha ?
                <>
                    Капча
                    <Preloader isFetching={isWaitingCapcha} />
                    <img src={capchaUrl} alt="capchaUrl" />
                    {createField("captha", 'captha', [required, maxLenght50],
                        Input, { type: "text" })}
                </> : null}
            <button >Login</button>
        </form>
    )
}

const ReduxLoginForm = reduxForm<LoginFormFieldType, LoginFormPropsType>({
    form: 'login'
})(LoginForm)

export default ReduxLoginForm
import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom";
import "./Login.css"

export const Login = ({ setAuthUser }) => {
    const [loginUser, setLoginUser] = useState({ name: "", email: "" })
    const [existDialog, setExistDialog] = useState(false)

    const history = useHistory()

    const handleInputChange = (event) => {
        const newUser = { ...loginUser }
        newUser[event.target.id] = event.target.value
        setLoginUser(newUser)
    }


    const existingUserCheck = () => {
        // If your json-server URL is different, please change it below!
        return fetch(`http://localhost:8088/users?email=${loginUser.email}`)
            .then(res => res.json())
            .then(user => user.length ? user[0] : false)
    }

    const handleLogin = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then(exists => {
                if (exists) {
                    // The user id is saved under the key medical_appointment_user in session Storage. Change below if needed!
                    sessionStorage.setItem("medical_appointment_user", exists.id)
                    setAuthUser(exists)
                    history.push("/")
                } else {
                    setExistDialog(true)
                }
            })
    }

    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" open={existDialog}>
                <div>User does not exist</div>
                <button className="button--close" onClick={e => setExistDialog(false)}>Close</button>
            </dialog>
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h4 className="main_login">Please sign in</h4>
                    <fieldset className="login_form">
                        <label htmlFor="inputName"> Full Name </label>
                        <input type="name"
                            id="name"
                            className="form-control"
                            placeholder="Full Name"
                            required autoFocus
                            value={loginUser.name}
                            onChange={handleInputChange} />
                        <label htmlFor="inputEmail"> Email address </label>
                        <input type="email"
                            id="email"
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus
                            value={loginUser.email}
                            onChange={handleInputChange} />
                    </fieldset>
                    <fieldset className="sign_btn">
                        <button className="sign_in" type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="register_link">
                <Link to="/register">Register for an account</Link>
            </section>
        </main>
    )
}

import { useRef, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticate, login } from "../../../server/authenthication";
import "./login.scss";

function LoginPage() {

    const form = useRef();
    const redirect = useNavigate();

    const [err, setErr] = useState({
        email : false,
        pass : false
    });

    useLayoutEffect(() => {
        authenticate( (response) => {
            if ( response.email ) {
                redirect("/");
            }
        } );
    }, []);

    function resetErr() {
        err.email = false;
        err.pass = false;
        setErr({...err});
    }

    return (

        <div id="login-page">
            <header>
                <img src="san_jose_seal.png"/>
                <h1>Barangay San Jose<span>Tuy Batangasy</span></h1>
            </header>
            <main>
                <span>Administrator</span>
                <form
                    id="login-form"
                    ref={form}
                    onSubmit={(event) => {
                        event.preventDefault();
                        resetErr();
                        login( form.current.loginemail.value, form.current.loginpassword.value, ( response ) => {
                            if ( response.email ) {
                                redirect( "/" );
                            } else {
                                if ( response.status === "invalid email" ) {
                                    err.email = true;
                                } else if ( response.status === "wrong password" ) {
                                    err.pass = true;
                                }
                                setErr({...err});
                            }
                        } )
                    }}>
                    <input
                        type="email"
                        placeholder="Email"
                        id="loginemail"
                        className={ err.email ? "err" : "" }
                        required
                        />
                    <input
                        type="password"
                        id="loginpassword"
                        className={ err.pass ? "err" : "" }
                        placeholder="Password"
                        required
                    />
                    <button id="login-btn">Login</button>
                </form>
            </main>
        </div>
    )
}

export default LoginPage;
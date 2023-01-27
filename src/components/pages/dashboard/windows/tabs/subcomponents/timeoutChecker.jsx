import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { appContextImport } from "../../../../../../App";
import "./timeoutChecker.scss";

function Timeout() {

    const appContext = useContext(appContextImport);

    const redirect = useNavigate();

    return (
        <div className={"timeout-float-container " + ( appContext.timeout.get() ? "show" : "" )}>
            <img src="/san_jose_seal.png" alt="sanjose seal" />
            <div className="timeout-message-wrapper">
                Session Timeout! Please Login again.
                <button onClick={() => {
                    appContext.timeout.set(false);
                    redirect("/login");
                }} >Re-Login</button>
            </div>
        </div>
    );
}

export default Timeout;
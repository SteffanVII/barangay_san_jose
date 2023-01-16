import { useContext,  } from "react";
import { dashboardContextImport } from "../../../globals/contexts";
import "./navButton.scss";

function MainNavButton(props) {

    const useDashboardContext = useContext(dashboardContextImport);

    function getCollapse() {
        return useDashboardContext.collapse.value;
    }

    function getActiveWindow() {
        return useDashboardContext.activeWindow.value;
    }

    function isActive() {
        return getActiveWindow() == props.value;
    }

    return (
        <button
            className={"main-nav-btn " + (getCollapse() ? "collapse " : "") + (isActive() ? "active " : "")} 
            type={"button"}
            onClick={(event) => {
                if ( props.isFunction === true ) {
                    props.function();
                } else {
                    useDashboardContext.activeWindow.setter(props.value);
                }
            }}
        >
            { !props.noicon ? <img src={props.icon}/> : null }
            <span>{props.title}</span>
        </button>
    );
}

export default MainNavButton;
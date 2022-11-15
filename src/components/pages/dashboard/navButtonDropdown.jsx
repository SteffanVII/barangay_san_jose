import { useContext } from "react";
import { dashboardContext } from "../../../globals/contexts";
import MainNavButton from "./navButton";
import "./navButtonDropdown.scss";

function MainNavButtonDropdown(props) {

    const useDashboardContext = useContext(dashboardContext);

    function getCollapse() {
        return useDashboardContext.collapse.value;
    }

    function setCollapse(value) {
        useDashboardContext.collapse.setter(value);
    }

    function expandNav(event) {
        if ( getCollapse() ) setCollapse(false);
    }

    function isChildActive() {
        return Array.from(props.children.keys()).includes(useDashboardContext.activeWindow.value);
    }

    return (
        <details
                className={"main-nav-btn-dd " + ( getCollapse() ? "collapse" : "" )}
                open={getCollapse() ? false : (isChildActive() ? true : null )}
                onClick={(event) => {
                    if ( isChildActive() ) event.preventDefault();
                    expandNav();
                }}
        >
            <summary><img src={props.icon}/><span>{props.title}</span></summary>
            {Array.from(props.children).map( ([ key, value ]) => <MainNavButton title={value.title} noicon={value.noicon} value={key} key={value.title + "-child"} /> )}
        </details>
    );
}

export default MainNavButtonDropdown;
import { useContext } from "react";
import { dashboardContextImport } from "../../../../../globals/contexts";
import "./tabButton.scss";


function TabButton(props) {
    const usedashboardContextImport = useContext(dashboardContextImport);

    function getActiveTab() {
        return usedashboardContextImport.activeWindow.value;
    }

    function setActiveWindow() {
        usedashboardContextImport.activeWindow.setter(props.value);
    }

    return (
        <div className="tab-button">
            <input
                type="radio"
                name={props.name + "-tab-btn"}
                id={props.title + "-tab-btn"}
                checked={ getActiveTab() == props.value ? true : false }
                onChange={(event) => {
                   if ( event.target.checked ) {
                    setActiveWindow(props.value);
                   }
                }}
            />
            <label htmlFor={props.title + "-tab-btn"}>{props.title}</label>
        </div>
    );
}

export default TabButton;
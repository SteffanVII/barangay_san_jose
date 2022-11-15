import { useContext, useLayoutEffect, useState } from "react";
import { dashboardContext } from "../../../../globals/contexts";
import TabButton from "./tabs/tabButton";
import "./windowComponent.scss";

function WindowComponent(props) {
    
    const useDashboardContext = useContext(dashboardContext);

    function getActiveTab() {
        return useDashboardContext.activeWindow.value;
    }

    return (
        <section
            className="window"
            id={props.title + "-window"}
        >
            <h3>{props.title}</h3>
            { props.tabs.size > 1 ?
                <div className={"tabs-btn-container"}>
                    { props.tabs.size > 1 ? Array.from(props.tabs.keys()).map( i => <TabButton value={i} title={props.tabs.get(i).title} name={props.title} key={props.tabs.get(i).title + "-tab-btn"} /> ) : null}
                </div>
                :
                null
             } 
            <div className="tabs-container">
                { Array.from(props.tabs.keys()).some( i => getActiveTab()) ? props.tabs.get(getActiveTab()).component : null }
            </div>
        </section>
    );

}

export default WindowComponent;
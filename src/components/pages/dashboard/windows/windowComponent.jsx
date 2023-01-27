import { useContext, useLayoutEffect, useState } from "react";
import { dashboardContextImport } from "../../../../globals/contexts";
import Timeout from "./tabs/subcomponents/timeoutChecker";
import TabButton from "./tabs/tabButton";
import "./windowComponent.scss";

function WindowComponent(props) {
    
    const usedashboardContextImport = useContext(dashboardContextImport);

    function getActiveTab() {
        return usedashboardContextImport.activeWindow.value;
    }

    return (
        <section
            className="window"
            id={props.title + "-window"}
        >
            <div className="window-header">
                <h3>{props.title}</h3>
                { props.tabs.size > 1 ?
                    <div className={"tabs-btn-container"}>
                        { props.tabs.size > 1 ? Array.from(props.tabs.keys()).map( i => <TabButton value={i} title={props.tabs.get(i).title} name={props.title} key={props.tabs.get(i).title + "-tab-btn"} /> ) : null}
                    </div>
                    :
                    null
                } 
            </div>
            <div className="tabs-container">
                { Array.from(props.tabs.keys()).some( i => getActiveTab()) ? props.tabs.get(getActiveTab()).component : null }
            </div>
            <Timeout/>
        </section>
    );

}

export default WindowComponent;
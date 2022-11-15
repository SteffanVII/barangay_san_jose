import {  useLayoutEffect, useReducer, useState } from "react";
import { dashboardContext } from "../../../globals/contexts";
import "./dashboard.scss";
import DashboardHeader from "./dashboardHeader";
import WindowComponent from "./windows/windowComponent";
import DashboardTab from "./windows/tabs/dashboardTab";
import AnnouncementsTab from "./windows/tabs/announcementsTab";
import LogHistoryTab from "./windows/tabs/loghistoryTab";
import TimestampsTab from "./windows/tabs/timestampsTab";
import ResidentsTab from "./windows/tabs/residentsTab";
import { authenticate } from "../../../server/authenthication";
import { useNavigate } from "react-router-dom";

export const tabs = {
    dashboard : 1,
    announcement : 2,
    residents : 3,
    loghistory : 4,
    appointmentTimestamps : 5
}

export const RdashboardDispatchTypes = {
    setwindow : 0,
    collapsenav : 1
}

function Rdashboard( state, action ) {
    switch (action.type) {
        case RdashboardDispatchTypes.collapsenav:
            state.collapse = action.payload;
            return {...state};
        case RdashboardDispatchTypes.setwindow:
            state.activewindow = action.payload;
            switch (action.payload) {
                case tabs.dashboard:
                    state.windowcomp = <WindowComponent title={"Dashboard"} tabs={new Map([
                        [tabs.dashboard, {
                            title : "Dashboard",
                            component : <DashboardTab/>
                        }]
                    ])}/>;
                    break;
                case tabs.announcement:
                    state.windowcomp = <WindowComponent title={"Announcements"} tabs={new Map([
                        [tabs.announcement, {
                            title : "Announcement",
                            component : <AnnouncementsTab/>
                        }]
                    ])}/>;
                    break;
                case tabs.loghistory:
                    state.windowcomp = <WindowComponent title={"Audit"} tabs={new Map([
                        [tabs.loghistory, {
                            title : "History",
                            component : <LogHistoryTab/>
                        }],
                        [tabs.appointmentTimestamps, {
                            title : "Timestamps",
                            component : <TimestampsTab/>
                        }]

                    ])}/>
                    break;
                case tabs.appointmentTimestamps:
                    state.windowcomp = <WindowComponent title={"Audit"} tabs={new Map([
                        [tabs.loghistory, {
                            title : "History",
                            component : <LogHistoryTab/>
                        }],
                        [tabs.appointmentTimestamps, {
                            title : "Timestamps",
                            component : <TimestampsTab/>
                        }]

                    ])}/>
                    break;
                case tabs.residents:
                    state.windowcomp = <WindowComponent title={"Residents"} tabs={new Map([
                        [tabs.residents, {
                            title : "Residents",
                            component : <ResidentsTab/>
                        }],
                    ])}/>
                    break;
                default:
                    break;
            }
            return {...state};
        default:
            return state;
    }
}

function DashboardPage() {

    const [dashboardState, dashboardDispatch] = useReducer(Rdashboard, {
        activewindow : tabs.dashboard,
        windowcomp : <WindowComponent title={"Dashboard"} tabs={new Map([
            [tabs.dashboard, {
                title : "Dashboard",
                component : <DashboardTab/>
            }]
        ])}/>,
        collapse : true
    })

    const [ auth, setAuth ] = useState(false);

    const redirect = useNavigate();

    useLayoutEffect(() => {
        authenticate( (response) => {
            if ( response.status == "ok" ) {
                setAuth(true);
            } else {
                redirect("/login");
            }
        } );
    }, []);

    function getCollapse() {
        return dashboardState.collapse;
    }

    function getActiveWindow() {
        return dashboardState.activewindow;
    }

    return (
        <dashboardContext.Provider value={{
            collapse : {
                value : getCollapse(),
                setter : (value) => {
                    dashboardDispatch({type : RdashboardDispatchTypes.collapsenav, payload : value});
                }
            },
            activeWindow : {
                value : getActiveWindow(),
                setter : (value) => {
                    dashboardDispatch({type : RdashboardDispatchTypes.setwindow, payload : value})
                }
            }
        }}>
            { auth ? 
                <div
                    className={getCollapse() ? "collapse" : ""}
                    id="dashboard-page"
                >
                    <DashboardHeader/>
                    <main>
                        { auth ? dashboardState.windowcomp : null}
                    </main>
                </div>
                :
                null
            }

        </dashboardContext.Provider>
    );
}

export default DashboardPage;
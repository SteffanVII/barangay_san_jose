import { useContext, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dashboardContext } from '../../../globals/contexts';
import { parseCookie } from '../../../globals/utilities';
import { logout } from '../../../server/authenthication';
import { tabs } from './dashboard';
import "./dashboardHeader.scss";
import MainNavButton from "./navButton";
import MainNavButtonDropdown from './navButtonDropdown';

function DashboardHeader() {

    const useDashboardContext = useContext(dashboardContext);
    const redirect = useNavigate();

    function getCollapse() {
        return useDashboardContext.collapse.value;
    }

    function collapse(event) {
        useDashboardContext.collapse.setter(!getCollapse())
    }

    useLayoutEffect(() => {
        // console.log(parseCookie(document.cookie));
    }, []);

    return (
        <header
            className={getCollapse() ? "collapse" : ""}
            id={"dashboard-header"}
        >
            <div id="tuy">
                <img id="tuy-logo" src="Tuy_Batangas.png" alt="Bayan ng Tuy sigil"/>
                <div
                    id="tuy-title"
                >
                    <h1>Barangay San Jose</h1>
                    <h2>Tuy, Batangas</h2>
                </div>
            </div>
            <div
                id="admin-container"
            >
                <label htmlFor="admin-email">Barangay Admin</label>
                <span id="admin-email">{ parseCookie().admin.email }</span>
            </div>
            <nav id="main-nav">
                <MainNavButton title={"Dashboard"} value={tabs.dashboard} />
                <MainNavButton title={"Announcement"} value={tabs.announcement} />
                <MainNavButton title={"Residents"} value={tabs.residents} />
                <MainNavButtonDropdown title={"Audit"} children={new Map([
                    [ tabs.loghistory,  { title : "Log History", noicon : true,  }],
                    [ tabs.appointmentTimestamps, { title : "Appointment Timestamps", noicon : true }]
                ])} />
                <MainNavButton title={"Logout"} isFunction={true} function={() => {
                    logout(() => {
                        redirect("/login");
                    })
                }} />
            </nav>
            <label
                htmlFor="collapse-radio"
                id='collapse-radio-label'
            >    
            </label>
            <input
                type="checkbox"
                id='collapse-radio'
                onChange={collapse}
            />
        </header>
    );
}

export default DashboardHeader;
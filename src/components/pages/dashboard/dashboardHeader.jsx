import { useContext, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dashboardContextImport } from '../../../globals/contexts';
import { parseCookie } from '../../../globals/utilities';
import { logout } from '../../../server/authenthication';
import { tabs } from './dashboard';
import "./dashboardHeader.scss";
import MainNavButton from "./navButton";
import MainNavButtonDropdown from './navButtonDropdown';

function DashboardHeader() {

    const useDashboardContext = useContext(dashboardContextImport);
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
                <img id="tuy-logo" src="san_jose_seal.png" alt="Barangay SanJose Seal"/>
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
                <span id="admin-email">{parseCookie().admin}</span>
            </div>
            <nav id="main-nav">
                <MainNavButton title={"Dashboard"} value={tabs.dashboard} icon={"/dashboard.svg"} />
                <MainNavButton title={"Requests Manager"} value={tabs.requestsManager} icon={"folder.svg"} />
                <MainNavButtonDropdown title={"Content Manager"} icon={"/website-content.svg"} children={new Map([
                    [ tabs.banners, { title : "Banners", noicon : true } ],
                    [ tabs.events, { title : "Events", noicon : true } ]
                ])}/>
                <MainNavButtonDropdown title={"Records"} icon={"/reading-list.svg"} children={new Map([
                    [ tabs.residents, { title : "Residents", noicon : true } ],
                    [ tabs.blotters, { title : "Blotters", noicon : true } ]
                ])} />
                {/* <MainNavButtonDropdown title={"Audit"} icon={"/calculator.svg"} children={new Map([
                    [ tabs.receipt,  { title : "Receipts", noicon : true,  }],
                    [ tabs.loghistory,  { title : "Log History", noicon : true,  }],
                    [ tabs.appointmentTimestamps, { title : "Appointment Timestamps", noicon : true }]
                ])} /> */}
                <MainNavButton title={"Transaction Records"} value={tabs.receipt} icon={"/calculator.svg"} />
                <MainNavButton title={"Logout"} icon={"/logout.svg"} isFunction={true} function={() => {
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
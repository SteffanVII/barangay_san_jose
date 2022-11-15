import {useLayoutEffect, useState} from "react";
import { getDashboardData } from "../../../../../server/dashboard";
import "./dashboardTab.scss";

function DashboardTab() {
    const [data, setData] = useState({});

    useLayoutEffect(() => {
        getDashboardData(( res ) => {
            setData(res);
        })
    }, []);

    return (
        <div
            className="tab"
            id="dashboard-tab"
        >
            <div className="counters-container">
                <div className="counter counter__residents">
                    <span>Residents</span>
                    <span>{data.residentsCount}</span>
                </div>
            </div>
        </div>
    );
}

export default DashboardTab;
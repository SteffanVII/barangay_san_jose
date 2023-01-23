import { useContext } from "react";
import {useLayoutEffect, useState} from "react";
import Chart from "react-google-charts";
import { dashboardContextImport } from "../../../../../globals/contexts";
import { getDashboardData } from "../../../../../server/dashboard";
import "./dashboardTab.scss";
import Banners from "./subcomponents/bannersCarousel";
import EventsDashboard from "./subcomponents/dashboardEvents";

function DashboardTab() {

    const dbContext = useContext(dashboardContextImport);

    const [data, setData] = useState({
        residentsCount : 0,
        documentServe : 0,
        pendingRequests : 0,
        blotters : 0,
        gender : {
            male : 0,
            female : 0
        },
        voter : {
            yes : 0,
            no : 0
        },
        populationGrowth : [
            [ "", 0 ],
            [ "", 0 ],
            [ "", 0 ],
            [ "", 0 ],
            [ "", 0 ],
        ]
    });

    useLayoutEffect(() => {
        getDashboardData(( res ) => {
            dbContext.timeoutRedirect( res, () => {
                setData(res);
            } );
        })
    }, []);

    return (
        <div
            className="tab"
            id="dashboard-tab"
        >
            <div className="counters-container">
                <div className="counter counter__residents">
                    <span>Population</span>
                    <span>{data.residentsCount}</span>
                </div>
                <div className="counter counter__pending">
                    <span>Pending Request</span>
                    <span>{data.pendingRequests}</span>
                </div>
                <div className="counter counter__serve">
                    <span>Documents Served</span>
                    <span>{data.documentServe}</span>
                </div>
                <div className="counter counter__blotters">
                    <span>Blotters</span>
                    <span>{data.blotters}</span>
                </div>
            </div>
            <div className="charts-containers">
                <Chart
                    chartType="LineChart"
                    width="500px"
                    height="300px"
                    data={[
                        [ "Year", "Population" ],
                        [ data.populationGrowth[4][0].toString(), data.populationGrowth[4][1] ],
                        [ data.populationGrowth[3][0].toString(), data.populationGrowth[3][1] ],
                        [ data.populationGrowth[2][0].toString(), data.populationGrowth[2][1] ],
                        [ data.populationGrowth[1][0].toString(), data.populationGrowth[1][1] ],
                        [ data.populationGrowth[0][0].toString(), data.populationGrowth[0][1] ],
                        
                    ]}
                    options={{
                        title : "Barangay SanJose Annual Population Count",
                        legend : "none"
                    }}
                />
                <Chart
                    chartType="PieChart"
                    width="300px"
                    height="300px"
                    data={[
                        [ "Categories", "Gender" ],
                        [ "Male", data.gender.male ],
                        [ "Female", data.gender.female ]
                    ]}
                    options={{
                        title : "Gender",
                        pieHole : 0.4,
                        is3D : false,
                        pieSliceText : "value",
                        colors : [ "#80b7dc", "#eca4e3" ]
                    }}
                />
                <Chart
                    chartType="PieChart"
                    width="300px"
                    height="300px"
                    data={[
                        [ "Categories", "Voters" ],
                        [ "Voter", data.voter.yes ],
                        [ "Non Voter", data.voter.no ]
                    ]}
                    options={{
                        title : "Voter/Non Voter",
                        pieHole : 0.4,
                        is3D : false,
                        pieSliceText : "value",
                        colors : [ "#9fe4ae", "#e49f9f" ]
                    }}
                />
                <div className="population-chart">
                </div>
            </div>
            <div className="banner-event-splitter">
                <div className="db-banners">
                    <Banners/>
                </div>
                <div className="db-events">
                    <EventsDashboard/>
                </div>
            </div>
        </div>
    );
}

export default DashboardTab;
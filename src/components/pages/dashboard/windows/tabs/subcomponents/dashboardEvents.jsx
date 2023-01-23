import { useContext, useState } from "react";
import { useLayoutEffect } from "react";
import { dashboardContextImport } from "../../../../../../globals/contexts";
import { getEvents } from "../../../../../../server/events";
import DashboardEventCard from "./dashboardEventCard";
import "./dashboardEvents.scss";

function EventsDashboard() {


    const dbContext = useContext(dashboardContextImport);

    const [ events, setEvents ] = useState();

    useLayoutEffect(() => {
        getEvents( ( res ) => {
            dbContext.timeoutRedirect( res, () => {
                setEvents(res.map( ( e, i ) => <DashboardEventCard key={`db-event-card-${e.title}-${i}`} data={e} /> ));
            } );
        } )
    }, []);

    return (
        <div className="events-dashboard">
            <span className="events-dashboard-title">Upcoming Events</span>
            <div className="events-container">
                {events}
            </div>
        </div>
    );

}

export default EventsDashboard;
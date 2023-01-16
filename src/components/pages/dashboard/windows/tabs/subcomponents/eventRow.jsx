import { useContext, useState } from "react";
import { useLayoutEffect } from "react";
import { dashboardContextImport } from "../../../../../../globals/contexts";
import { monthsMap } from "../../../../../../globals/utilities";
import { removeEvent } from "../../../../../../server/events";
import { eventsContextImport } from "../eventsTab";
import "./eventRow.scss";

function EventRow ( props ) {

    const dashboardContext = useContext(dashboardContextImport);
    const eventsContext = useContext(eventsContextImport);

    const [ ongoing, setOngoing ] = useState(false);
    const [ date, setDate ] = useState(null);

    useLayoutEffect(() => {
        let now = new Date();

        if ( now.getTime() < new Date(props.data.when).getTime() ) {
            setOngoing(true);
        } else {
            setOngoing(false);
        }
        
        let d = new Date(props.data.when);
        let yyyy = d.getFullYear();
        let mm = d.getMonth() + 1;
        let dd = d.getDate();

        setDate(`${monthsMap.get(mm)} ${dd}, ${yyyy}`);
    }, [props.data]);

    return (
        <div className={`event-row ${ongoing ? `ongoing` : ``}`}>
            <p className="event-title"><span>Title : <br /></span><span>{props.data.title}</span></p>
            <p className="event-description"><span>About : <br /></span><span>{props.data.about}</span></p>
            <p className="event-date"><span>When : <br /></span><span>{date}</span></p>
            <div className="actions-container">
                <button type="button"
                        onClick={() => {
                            removeEvent( props.data, ( response ) => {
                                dashboardContext.timeoutRedirect( response, () => {
                                    eventsContext.refresh();
                                } );
                            } )
                        }}
                >Delete</button>
                <button type="button"
                        onClick={() => {
                            eventsContext.edit( props.data );
                        }}
                >Edit</button>
            </div>
        </div>
    );

}

export default EventRow;
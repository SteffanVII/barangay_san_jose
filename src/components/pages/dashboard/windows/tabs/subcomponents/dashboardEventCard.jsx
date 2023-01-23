import { monthsMap } from "../../../../../../globals/utilities";

function DashboardEventCard( props ) {
    return (
        <div className="dashboard-event-card">
            <div className="dashboard-event-card-top">
                <span className="event-title" >{props.data.title}</span>
                <span className="event-date">{`${monthsMap.get(parseInt(props.data.when.split("-")[1]))} ${props.data.when.split("-")[2].split("T")[0]}, ${props.data.when.split("-")[0]}`}</span>
            </div>
            <p className="event-about">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{props.data.about}</p>
        </div>
    );
}

export default DashboardEventCard;
import { useLayoutEffect } from "react";
import { useContext } from "react";
import { monthsMap } from "../../../../../../globals/utilities";
import { requestsManagerTabContext } from "../requestsManagerTab";
import "./requestCard.scss";

export function parseType( type ) {
    switch ( parseInt(type) ) {
        case 0:
            return "Barangay Clearance";
        case 1:
            return "Bussiness Clearance";
        case 2:
            return "Certificate of Residency";
        case 3:
            return "Cedula";
        default:
            return "Unknown";
    }
}

function RequestCard( props ) {

    const requestsManager = useContext(requestsManagerTabContext);

    return (
        <div className={"request-card " + "stat" + props.data.status + " " + ( requestsManager.getActive() === props.data.id ? "active" : "" )}>
            <span className="request-card-id">{props.data.id}</span>
            <div className="request-type-container">
                <span>Requesting</span>
                <span>{parseType(props.data.type)}</span>
            </div>
            <div className="requesting-name-container">
                <span>Name</span>
                <span>{props.data.name}</span>
            </div>
            <div className="requested-date-container">
                <span>Date Requested</span>
                <span>{monthsMap.get( parseInt(props.data.req_date.split("T")[0].split("-")[1])) + " " + props.data.req_date.split("T")[0].split("-")[2] + ", " + props.data.req_date.split("T")[0].split("-")[0]}</span>
            </div>
            <button
                onClick={() => {
                    requestsManager.setViewed(props.data.id);
                }}
            >View</button>
        </div>
    );

}

export default RequestCard;
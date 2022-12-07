import { useContext, useLayoutEffect } from "react";
import { monthsMap, parseAge } from "../../../../../../globals/utilities";
import { residentsTabContext } from "../residentsTab";
import "./residentDetailsFloat.scss";

function ResidentDetailsFloat(props) {
    const tabContext = useContext(residentsTabContext);

    return (
        <div
            id="resident-details-float" 
            className={tabContext.detailsFloat.value ? "show" : ""}
        >
            <span className="float-title">Resident Info</span>
            <div className="details-float-btns-container">
                <button className="print-btn">
                    Print
                </button>
                <button className="update-btn"
                    onClick={() => {
                        tabContext.formFloat.edit(props.data);
                    }}
                >
                    Update
                </button>
                <button className="close-btn"
                    onClick={() => tabContext.detailsFloat.hide()}
                >
                    Close
                </button>
            </div>

            { props.data !== undefined ?
                <div className="details-container">
                    <div className="details-row">
                        <div className="name-labels">
                            <span>Firstname</span>
                            <span>Lastname</span>
                            <span>Middlename</span>
                            <span>Suffix</span>
                        </div>
                        <div className="name-values">
                            <span>{props.data.fname}</span>
                            <span>{props.data.lname}</span>
                            <span>{props.data.mname}</span>
                            <span>{props.data.suffix}</span>
                        </div>
                    </div>
                    <div className="details-row">
                        <div className="details-column">
                            <span className="details-column-label">Gender</span>
                            <span className="details-column-value">{(props.data.gender == 0 ? "Male" : "Female")}</span>
                        </div>
                        <div className="details-column">
                            <span className="details-column-label">Age</span>
                            <span className="details-column-value">{parseAge(props.data.bdate)}</span>
                        </div>
                        <div className="details-column">
                            <span className="details-column-label">Birthdate</span>
                            <span className="details-column-value">{monthsMap.get(props.data.bdate.split("-")[1]) + " " + props.data.bdate.split("-")[2] + ", " + props.data.bdate.split("-")[0]}</span>
                        </div>
                        <div className="details-column">
                            <span className="details-column-label">Birthplace</span>
                            <span className="details-column-value">Quezon City</span>
                        </div>
                    </div>
                    <div className="details-row">
                        <div className="details-column">
                            <span className="details-column-label">Civil Status</span>
                            <span className="details-column-value">Single</span>
                        </div>
                        <div className="details-column">
                            <span className="details-column-label">Religion</span>
                            <span className="details-column-value">{props.data.religion}</span>
                        </div>
                    </div>
                    <div className="details-row">
                        <div className="details-column">
                            <span className="details-column-label">Full Address</span>
                            <span className="details-column-value">{props.data.address}</span>
                        </div>
                    </div>
                    <div className="details-row">
                        <div className="details-column">
                            <span className="details-column-label">House No.</span>
                            <span className="details-column-value">{props.data.house_no}</span>
                        </div>
                        <div className="details-column">
                            <span className="details-column-label">Purok No.</span>
                            <span className="details-column-value">{props.data.purok}</span>
                        </div>
                        <div className="details-column">
                            <span className="details-column-label">Voter</span>
                            <span className="details-column-value">{(props.data.registered == 0 ? "Registered" : "Not Registered")}</span>
                        </div>
                    </div>
                    <div className="details-row">
                        <div className="details-column">
                            <span className="details-column-label">Contact No.</span>
                            <span className="details-column-value">{props.data.contact_no}</span>
                        </div>
                        <div className="details-column">
                            <span className="details-column-label">Email</span>
                            <span className="details-column-value">abaochrisjay@gmail.com</span>
                        </div>
                    </div>
                </div> : null }
        </div>
    )

};

export default ResidentDetailsFloat;
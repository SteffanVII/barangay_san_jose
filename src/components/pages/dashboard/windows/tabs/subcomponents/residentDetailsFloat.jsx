import download from "downloadjs";
import { toPng } from "html-to-image";
import { useContext, useLayoutEffect, useRef } from "react";
import { monthsMap, parseAge } from "../../../../../../globals/utilities";
import { residentsTabContext } from "../residentsTab";
import "./residentDetailsFloat.scss";

function ResidentDetailsFloat(props) {
    const tabContext = useContext(residentsTabContext);
    const downloadEl = useRef(null);

    function filter( n ) {
        if ( n.classList ) {
            const exclusions = [ "print-btn", "update-btn", "close-btn" ];
            return !exclusions.some( name => n.classList.contains(name) );
        } else {
            return true;
        }
    }

    return (
        <div
            id="resident-details-float" 
            className={tabContext.detailsFloat.value ? "show" : ""}
        >
            <div ref={downloadEl} className="resident-details-save">

                <span className="float-title">Resident Info</span>
                <div className="details-float-btns-container">
                    <button className="print-btn"
                            onClick={() => {
                                toPng( downloadEl.current, {
                                    filter : filter,
                                    style : {
                                        padding : "20px"
                                    },
                                    width : 640,
                                    height : 672
                                } )
                                .then( dataUrl => {
                                    download( dataUrl, `${props.data.lname}-${props.data.fname}-record.png` );
                                } )
                                .catch( err => {
                                    console.log(err);
                                } );
                            }}
                    >
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
                                <span className="details-column-value">{( props.data.bdate !== null ? parseAge(props.data.bdate) : "No data")}</span>
                            </div>
                            <div className="details-column">
                                <span className="details-column-label">Birthdate</span>
                                <span className="details-column-value">{ (props.data.bdate !== null ? monthsMap.get(parseInt(props.data.bdate.split("-")[1])) + " " + props.data.bdate.split("-")[2].split("T")[0] + ", " + props.data.bdate.split("-")[0] : "No data")}</span>
                            </div>
                            <div className="details-column">
                                <span className="details-column-label">Birthplace</span>
                                <span className="details-column-value">{ (props.data.birthplace !== '' ? props.data.birthplace : "No data")}</span>
                            </div>
                        </div>
                        <div className="details-row">
                            <div className="details-column">
                                <span className="details-column-label">Civil Status</span>
                                <span className="details-column-value">{ (props.data.civil_status !== '' ? props.data.civil_status : "No data")}</span>
                            </div>
                            <div className="details-column">
                                <span className="details-column-label">Religion</span>
                                <span className="details-column-value">{ (props.data.religion !== '' ? props.data.religion : "No data")}</span>
                            </div>
                        </div>
                        <div className="details-row">
                            <div className="details-column">
                                <span className="details-column-label">Full Address</span>
                                <span className="details-column-value">{ (props.data.address !== '' ? props.data.address : "No data")}</span>
                            </div>
                        </div>
                        <div className="details-row">
                            <div className="details-column">
                                <span className="details-column-label">House No.</span>
                                <span className="details-column-value">{ (props.data.house_no !== null ? props.data.house_no : "No data")}</span>
                            </div>
                            <div className="details-column">
                                <span className="details-column-label">Purok No.</span>
                                <span className="details-column-value">{ props.data.purok !== null ? props.data.purok : "No data"}</span>
                            </div>
                            <div className="details-column">
                                <span className="details-column-label">Voter</span>
                                <span className="details-column-value">{(props.data.registered == 0 ? "Not Registered" : "Registered")}</span>
                            </div>
                        </div>
                        <div className="details-row">
                            <div className="details-column">
                                <span className="details-column-label">Contact No.</span>
                                <span className="details-column-value">{ (props.data.contact_no !== '' ? props.data.contact_no : "No data")}</span>
                            </div>
                            <div className="details-column">
                                <span className="details-column-label">Email</span>
                                <span className="details-column-value">{(props.data.email !== '' ? props.data.email : "No data")}</span>
                            </div>
                        </div>
                    </div> : null }
            </div>
        </div>
    )

};

export default ResidentDetailsFloat;
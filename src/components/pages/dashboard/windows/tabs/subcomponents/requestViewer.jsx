import { useState } from "react";
import { useContext } from "react";
import { useLayoutEffect } from "react";
import { dashboardContextImport } from "../../../../../../globals/contexts";
import { generateBarangayClearance, generateBussinessClearance, generateResidency } from "../../../../../../globals/utilities";
import { changeDocumentRequestStatus, getDocumentRequestInfo } from "../../../../../../server/requests";
import { requestsManagerTabContext } from "../requestsManagerTab";
import { parseType } from "./requestCard";

import "./requestViewer.scss";

function RequestViewer( props ) {

    const tabContext = useContext(requestsManagerTabContext);
    const dashboardContext = useContext(dashboardContextImport);

    const [ data, setData ] = useState(null);
    const [ confirm, setConfirm ] = useState(null);

    function refresh() {
        if ( props.requestId !== null ) {
            getDocumentRequestInfo( props.requestId, ( response ) => {
                dashboardContext.timeoutRedirect( response, () => {
                    console.log(response);
                    setData(response)
                } );
            } )
        }        
    }

    useLayoutEffect(() => {
        refresh();
        setConfirm(null);
    }, [props.requestId]);

    return (
        <div className={"request-viewer"}>
            { data !== null &&
                <div className={"request-viewer-wrapper " + "type" + data.status}>
                    <div className="request-info-wrapper request-id">
                        <span>Request ID</span>
                        <span>{data.id}</span>
                    </div>
                    <div className="request-info-wrapper request-type">
                        <span>Requested Document</span>
                        <span>{parseType(data.type)}</span>
                    </div>
                    <div className="request-info-wrapper request-date">
                        <span>Date Requested</span>
                        <span>{data.req_date.split("T")[0]}</span>
                    </div>
                    <div className="request-info-wrapper request-name">
                        <span>Name</span>
                        <span>{data.name}</span>
                    </div>
                    <div className="request-info-wrapper request-email">
                        <span>Email</span>
                        <span>{data.email !== "" ? data.email : "No data"}</span>
                    </div>
                    <div className="request-info-wrapper request-phone">
                        <span>Phone</span>
                        <span>{data.phone !== "" ? data.phone : "No data"}</span>
                    </div>
                    { ( parseInt(data.type) === 0) && <div className="request-info-wrapper request-purok">
                        <span>Purok</span>
                        <span>{data.purok}</span>
                    </div>
                    }
                    { ( parseInt(data.type) === 0) && <div className="request-info-wrapper request-purpose">
                        <span>Purpose</span>
                        <span>{data.purpose}</span>
                    </div>
                    }
                    { ( parseInt(data.type) === 1) && <div className="request-info-wrapper request-bussiness-name">
                        <span>Bussiness Name</span>
                        <span>{data.bussiness_name}</span>
                    </div>
                    }
                    { ( parseInt(data.type) === 1) && <div className="request-info-wrapper request-bussiness-address">
                        <span>Bussiness Address</span>
                        <span>{data.bussiness_address}</span>
                    </div>
                    }
                    { ( parseInt(data.type) === 1) && <div className="request-info-wrapper request-bussiness-description">
                        <span>Bussiness Description</span>
                        <span>{data.bussiness_description}</span>
                    </div>
                    }
                    { (data.status === 1) && 
                        <div className="request-info-wrapper request-admin">
                            <span>Being Processed by</span>
                            <span>{data.processed_by}</span>
                        </div>
                    }
                    { (data.status === 3 || data.status === 2) && 
                        <div className="request-info-wrapper request-admin">
                            <span>Processed by</span>
                            <span>{data.processed_by}</span>
                        </div>
                    }
                    <div className="request-actions-container">
                        { (data.status === 0 || data.status == 1) && <button
                                                    className="decline-request"
                                                    onClick={() => {
                                                        setConfirm("decline");
                                                    }}
                                                >Decline</button> }
                        { (data.status === 0) && <button
                                                    className="process-request"
                                                    onClick={() => {
                                                        setConfirm("process");
                                                    }}
                                                >Process</button> }
                        { (data.status === 1) && <button
                                                    className="ready-request"
                                                    onClick={() => {
                                                        setConfirm("ready");
                                                    }}
                                                >Ready</button> }
                        { (data.status === 1) && <button
                                                    className="print-request"
                                                    onClick={() => {
                                                        setConfirm("print");
                                                    }}
                                                >Print</button> }
                        { (data.status === 2) && <button
                                                    className="pickedup-request"
                                                    onClick={() => {
                                                        setConfirm("pickedup");
                                                    }}
                                                >Picked Up</button> }
                    </div>
                </div> 
            }
            <div className={"confirm-request-action " + ( confirm !== null ? "show" : "" )}>
                <div className="confirm-request-action-buttons">
                    <span>Confirm?</span>
                    <button onClick={() => {
                        if ( confirm === "decline" ) {
                            changeDocumentRequestStatus( data.id, 4, () => {
                                refresh();
                                tabContext.refreshList();
                            } )
                        }
                        else if ( confirm === "process" ) {
                            changeDocumentRequestStatus( data.id, 1, () => {
                                refresh()
                                tabContext.refreshList();
                            } )
                        }
                        else if ( confirm === "ready" ) {
                            changeDocumentRequestStatus( data.id, 2, () => {
                                refresh();
                                tabContext.refreshList();
                            } )
                        }
                        else if ( confirm === "pickedup" ) {
                            changeDocumentRequestStatus( data.id, 3, () => {
                                refresh();
                                tabContext.refreshList();
                            } )
                        }
                        else if ( confirm === "print" ) {
                            if ( data.type === 0 ) {
                                generateBarangayClearance( data );
                            }
                            else if ( data.type === 1 ) {
                                generateBussinessClearance( data );
                            }
                            else if ( data.type === 2 ) {
                                generateResidency( data );
                            }
                            else if ( data.type === 3 ) {

                            }
                        }
                        setConfirm(null);
                    }} >OK</button>
                    <button onClick={() => {
                        setConfirm(null);
                    }}>CANCEL</button>
                </div>
            </div>
        </div>
    );
}

export default RequestViewer;
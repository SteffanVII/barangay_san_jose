import { useLayoutEffect, useRef } from "react";
import { useState } from "react";
import { useContext } from "react";
import { dashboardContextImport } from "../../../../../../globals/contexts";
import { deleteBlotterInfo, getBlotterInfo, patchBlotterInfo, registerBlotter } from "../../../../../../server/blotters";
import { blotterTabContextImport } from "../blottersTab";
import "./blotterViewer.scss";

function BlotterViewer() {

    const dashboardContext = useContext(dashboardContextImport);
    const blotterTabState = useContext(blotterTabContextImport);

    const [ load, setLoad ] = useState(false);
    const [ data, setData ] = useState(null);
    const [ duplicate, setDuplicate ] = useState(null);
    const [ confirm, setConfirm ] = useState({
        type : "hide",
        click : null
    })
    // const [ casenoExits, setCasenoExits ] = useState(false);

    const form = useRef(null);

    function getType() {
        return blotterTabState.state.floats.blotterForm.type;
    }
    
    function getVisibility() {
        return blotterTabState.state.floats.blotterForm.show;
    }

    function getViewedCaseNo() {
        return blotterTabState.state.floats.blotterForm.case;
    }

    function caseNo() {
        if ( data ) {
            return data.case_no;
        } else {
            return "";
        }
    }

    function complaint() {
        if ( data ) {
            return data.complaint;
        } else {
            return "";
        }
    }

    function dateFiled() {
        if ( data ) {
            return data.filed_date.split("T")[0];
        } else {
            return "";
        }
    }

    function incidenttimeline() {
        if ( data ) {
            return `${data.incident_date.split("T")[0]}T${data.time}`;
        } else {
            return "";
        }
    }

    function status() {
        if ( data ) {
            return data.status;
        }
    }

    function isOpen() {
        if ( data ) {
            return data.status === 0 ? true : false
        }
    }

    function isClosed() {
        if ( data ) {
            return data.status === 1 ? true : false
        }
    }

    function generateInvolved() {
        if ( duplicate ) {
            let comp = [];
            let res = [];
            
            duplicate.forEach( el => {
                let element =
                <span className="involved-element"> { (el.type === 0 ? "Complainant - " : "Respondent - ") + el.name }
                    <button type="button"
                        disabled={ getType() === "update" || getType() === "create" ? false : true }
                        value={duplicate.indexOf(el)}
                        onClick={(event) => {
                            duplicate.splice(event.target.value, 1);
                            setDuplicate([...duplicate]);
                        }}
                    >R</button>
                </span>
                if ( el.type === 0 ) {
                    comp.push(element);
                } else {
                    res.push(element);
                }

            });
            return [...comp, ...res];
        }
    }

    useLayoutEffect(() => {

        if ( getType() === "view" && getVisibility() === true ) {
            setLoad(true);
        } else if ( getType() === "create" && getVisibility() === true ) {
            setData(undefined);
            setDuplicate([]);
            setLoad(false);
        } else {
            setLoad(false);
        }

    }, [blotterTabState.state.floats.blotterForm])

    useLayoutEffect(() => {

        if ( load ) {
            getBlotterInfo( getViewedCaseNo(), ( response ) => {
                dashboardContext.timeoutRedirect( response, () => {
                    setData(response[0]);
                    setDuplicate([...response[0].individuals]);
                    setLoad(false);
                } )
            } )
        }

    }, [load])

    return (
        <form ref={form}
                className={"blotter-viewer-float " + ( getVisibility() ? "show" : "" )}
                onReset={() => {
                    setDuplicate([...data.individuals]);
                }}
                onSubmit={(e) => {
                    e.preventDefault();
                    setConfirm({
                        type : "submit",
                        click : () => {
                            registerBlotter( {
                                case_no : form.current["blotter_case_no_input"].value === "" ? "default" : form.current["blotter_case_no_input"].value,
                                complaint : form.current["blotter-complaint-textarea"].value,
                                individuals : [...duplicate],
                                status : form.current["blotter-view-status-dropdown"].value,
                                incident_date : form.current["blotter-date-time"].value,
                                filed_date : form.current["date-filed"].value === "" ? "default" : form.current["date-filed"].value
                            }, ( status, response ) => {
                                if ( status === 409 ) {
                                    // setCasenoExits(true);
                                } else {
                                    blotterTabState.resetResults();
                                    blotterTabState.setBlotterViewer({
                                        type : "view",
                                        show : true,
                                        case : response.case_no
                                    });
                                }
                            } )
                            setConfirm({
                                type : "hide",
                                click : null
                            })
                        }
                    })
                }}
        >
            <fieldset>
                <div className="blotter-viewer-header">
                    <label >Case No.</label>
                    <input type="number"
                            id="blotter_case_no_input"
                            // disabled={ getType() === "create" ? false : true }
                            disabled
                            defaultValue={caseNo()}
                    />
                    <div className="float-btns">
                        { getType() === "update" &&
                            <button type="button"
                                    onClick={() => {
                                        form.current.reset();
                                    }}
                            >
                                Reset
                            </button> 
                        }
                        { getType() === "update" &&
                            <button type="button"
                                    onClick={() => {
                                        setConfirm({
                                            type : "update",
                                            click : () => {
                                                patchBlotterInfo( {
                                                    case_no : caseNo(),
                                                    complaint : form.current["blotter-complaint-textarea"].value,
                                                    individuals : [...duplicate],
                                                    status : form.current["blotter-view-status-dropdown"].value,
                                                    incidenttimeline : form.current["blotter-date-time"].value,
                                                    filed_date : form.current["date-filed"].value
                                                }, () => {
                                                    blotterTabState.resetResults();
                                                    blotterTabState.setBlotterViewer({
                                                        type : "view",
                                                        show : true,
                                                        case : caseNo()
                                                    });
                                                });
                                                setConfirm({
                                                    type : "hide",
                                                    click : null
                                                })
                                            }
                                        });
                                    }}
                            >
                                Apply
                            </button> 
                        }
                        { getType() === "view" &&
                            <button type="button"
                                    onClick={() => {
                                        setConfirm({
                                            type : "delete",
                                            click : () => {
                                                deleteBlotterInfo( caseNo(), () => {
                                                    blotterTabState.resetResults();
                                                    blotterTabState.setBlotterViewer({
                                                        type : "view",
                                                        show : false,
                                                    });
                                                    setConfirm({
                                                        type : "hide",
                                                        click : null
                                                    })
                                                } )
                                            }
                                        });
                                    }}
                            >
                                Delete
                            </button> 
                        }
                        { getType() === "view" &&
                            <button type="button"
                                    onClick={() => {
                                        blotterTabState.setBlotterViewer({
                                            type : "update",
                                            show : true
                                        })
                                    }}
                            >
                                Update
                            </button> 
                        }
                        { getType() === "create" &&
                            <button type="submit"
                            >
                                Submit
                            </button> 
                        }
                    </div>
                </div>
                <div className="blotter-viewer-body">
                    <div className="blotter-viewer-body-left">
                        <label className="blotter-body-label">Involved</label>
                        <div className="blotter-involved-container">
                            <div className="involved-adder-container">
                                <select id="involved-type-dropdown"
                                        disabled={ getType() === "update" || getType() === "create" ? false : true }>
                                    <option value={0}>Complainant</option>
                                    <option value={1}>Respondent</option>
                                </select>
                                <input type="text"
                                        placeholder="Name"
                                        id="blotter-involved-add-input"
                                        disabled={ getType() === "update" || getType() === "create" ? false : true }/>
                                <button type="button"
                                        id="blotter-involved-add-btn"
                                        disabled={ getType() === "update" || getType() === "create" ? false : true }
                                        onClick={() => {
                                            let value = form.current["blotter-involved-add-input"].value;
                                            let type = form.current["involved-type-dropdown"].value;
                                            if ( value !== "" ) {
                                                duplicate.push({
                                                    name : value,
                                                    type : parseInt(type)
                                                })
                                                setDuplicate([...duplicate]);
                                            }
                                            form.current["blotter-involved-add-input"].value = "";
                                        }}
                                >Add</button>
                            </div>
                            { generateInvolved() }
                        </div>
                        <label className="blotter-body-label">Date & Time of Incident</label>
                        <input type="datetime-local"
                                id="blotter-date-time"
                                disabled={ getType() === "update" || getType() === "create" ? false : true }
                                defaultValue={incidenttimeline()}
                                required
                        />
                        <label htmlFor="blotter-complaint-textarea"
                                className="blotter-body-label"
                        >Complaint</label>
                        <textarea id="blotter-complaint-textarea"
                                    disabled={ getType() === "update" || getType() === "create" ? false : true }
                                    defaultValue={complaint()}
                                    required
                        ></textarea>
                    </div>
                    <div className="blotter-viewer-body-right">
                        <label htmlFor="date-filed"
                                className="blotter-body-label"
                        >Date Filed</label>
                        <input type="date"
                                id="date-filed"
                                disabled={ getType() === "update" || getType() === "create" ? false : true }
                                defaultValue={dateFiled()}
                        />
                        <label htmlFor="blotter-view-status-dropdown"
                                className="blotter-body-label"
                        >Status</label>
                        <select id="blotter-view-status-dropdown"
                                disabled={ getType() === "update" || getType() === "create" ? false : true }
                        >
                            { (!isOpen() && !isClosed()) && [
                                <option value="0" key={"drpopen"} >OPEN</option>,
                                <option value="1" key={"drpclosed"} >CLOSED</option>
                            ]}
                            { isOpen() && [
                                <option value="0" key={"drpopen"} >OPEN</option>,
                                <option value="1" key={"drpclosed"} >CLOSED</option>
                            ]}
                            { isClosed() && [
                                <option value="1" key={"drpclosed"} >CLOSED</option>,
                                <option value="0" key={"drpopen"} >OPEN</option>
                            ]}
                        </select>
                    </div>
                </div>
            </fieldset>
            <div className={"blotter-viewer-loading-indicator " + ( load ? "show" : "" )}><span></span></div>
            <div className={"blotter-viewer-confirmation-container " + ( confirm.type !== "hide" ? "show" : "" )}>
                <div className="blotter-viewer-confirmation-wrapper">
                        <span>Are you sure?</span>
                        <div className="blotter-viewer-confirmation-btns">
                            <button type="button"
                                    onClick={() => confirm.click()}
                            >
                                { confirm.type === "update" && "Apply" }
                                { confirm.type === "delete" && "Delete" }
                                { confirm.type === "submit" && "Submit" }
                            </button>
                            <button type="button"
                                    onClick={() => {
                                        setConfirm({
                                            type : "hide",
                                            click : null
                                        })
                                    }}
                            >No</button>
                        </div>
                </div>
            </div>
            {/* <div className={"case_no_exist_notif " + (casenoExits ? "show" : "")}
                onAnimationEnd={() => {
                    setCasenoExits(false);
                }}
            >
                Case Number already occupied!
            </div> */}
            <button type="button"
                    id="close-blotter-viewer"
                    onClick={() => {
                        blotterTabState.setBlotterViewer({
                            type : "view",
                            show : false
                        })
                        setData(null);
                        setConfirm({
                            type : "hide",
                            click : null
                        });
                        // setCasenoExits(false);
                        form.current.reset();
                    }}
            >
                
            </button>
        </form>
    );
}

export default BlotterViewer;
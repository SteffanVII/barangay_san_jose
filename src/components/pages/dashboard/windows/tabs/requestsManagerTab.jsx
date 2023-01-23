import { createContext } from "react";
import { useContext } from "react";
import { useRef } from "react";
import { useLayoutEffect, useReducer } from "react";
import { dashboardContextImport } from "../../../../../globals/contexts";
import { getDocumentRequestsList } from "../../../../../server/requests";
import "./requestsManagerTab.scss";
import RequestCard from "./subcomponents/requestCard";
import RequestViewer from "./subcomponents/requestViewer";

export const requestsManagerActionTypes = {
    REQUESTS : 0,
    PARAMS : 1,
    VIEW : 2
}

function requestsManagerReducer( state, action ) {

    switch (action.type) {
        case requestsManagerActionTypes.REQUESTS:
            state.raw = action.payload;
            state.requestCards = Array.from(state.raw).map( data => <RequestCard key={data.id} data={data} />);
            return {...state};

        case requestsManagerActionTypes.PARAMS:
            state.controller = action.payload.controller;
            state.filters = action.payload.filters;
            return {...state};
        
        case requestsManagerActionTypes.VIEW:
            state.viewedId = action.payload;
            // if ( state.viewedId !== null ) {
            //     state.viewedComp = <RequestViewer requestId={action.payload} />
            // } else {
            //     state.viewedComp = [];
            // }
            return {...state};
    
        default:
            return state;
    }

}

export const requestsManagerTabContext = createContext(null);

function RequestsManagerTab() {

    const [ requestManagerTabState, dispatch ] = useReducer(requestsManagerReducer, {
        raw : [],
        requestCards : [],
        controller : {
            type : "default",
            status : 0,
            searchtype : "id",
            searchvalue : ""
        },
        filters : {

        },
        viewedId : null,
    })

    const controller = useRef();

    const dashboardContext = useContext(dashboardContextImport);

    function getParams() {
        dispatch({
            type : requestsManagerActionTypes.PARAMS,
            payload : {
                controller : {
                    type : controller.current["request-type-dropdown"].value,
                    status : controller.current["status-dropdown"].value,
                    searchtype : controller.current["search-type-dropdown"].value,
                    searchvalue : controller.current["search-request-input"].value
                },
                filters : {

                }
            }
        });
    }

    function refreshList() {
        getDocumentRequestsList( {
            controller : requestManagerTabState.controller,
            filters : requestManagerTabState.filters
        }, ( response ) => {
            dashboardContext.timeoutRedirect( response, () => dispatch({ type : requestsManagerActionTypes.REQUESTS, payload : response }) );
        })
    }

    useLayoutEffect(() => {
        refreshList();
    }, [requestManagerTabState.controller, requestManagerTabState.filters]);

    return (
        <requestsManagerTabContext.Provider value={{
            setViewed : (id) => {
                dispatch({
                    type : requestsManagerActionTypes.VIEW,
                    payload : id
                });
            },
            getActive : () => {
                return requestManagerTabState.viewedId;
            },
            refreshList : refreshList
        }}>
            <div
                className="tab"
                id="requests-manager-tab"
            >
                <form className="request-manager-controller" ref={controller}>

                    <div className="search-request-container">
                        <select
                            id="search-type-dropdown"
                            onChange={() => {
                                getParams();
                            }}
                        >
                            <option value="id">ID</option>
                            <option value="name">Name</option>
                        </select>
                        <input
                            type="search"
                            id="search-request-input"
                            placeholder="      "
                            onChange={(event) => {
                                if ( event.target.value === "" ) {
                                    getParams();
                                }
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => {
                                getParams();
                            }}
                        >Search</button>
                    </div>

                    <div className="request-type-dropdown-container">
                        <label htmlFor="">Request Type</label>
                        <select
                            id="request-type-dropdown"
                            onChange={() => getParams()}
                        >
                            <option value="default">All</option>
                            <option value="0">Barangay Clearance</option>
                            <option value="1">Bussiness Clearance</option>
                            <option value="2">Certificate of Residency</option>
                            <option value="3">Cedula</option>
                        </select>
                    </div>

                    <div className="status-dropdown-container">
                        <label htmlFor="">Status</label>
                        <select
                            className={ "type" + requestManagerTabState.controller.status }
                            id="status-dropdown"
                            onChange={() => getParams()}
                        >
                            <option value="0">Waiting</option>
                            <option value="1">Processing</option>
                            <option value="admin">Processing - Yours</option>
                            <option value="2">For Pickup</option>
                            <option value="3">Picked Up</option>
                            <option value="4">Declined</option>
                        </select>
                    </div>

                    <div className="request-refresh-container">
                        <button type="button"
                                onClick={() => {
                                    refreshList();
                                }}
                        >Refresh</button>
                    </div>

                </form>

                <div className="view-n-card-grid">
                    <div className="requests-container">
                        {requestManagerTabState.requestCards}
                    </div>
                    <div className="request-view-container">
                        <span className="request-viewer-title">Request Viewer</span>
                        <RequestViewer requestId={requestManagerTabState.viewedId} />
                    </div>
                </div>

            </div>
        </requestsManagerTabContext.Provider>
    );
}

export default RequestsManagerTab;
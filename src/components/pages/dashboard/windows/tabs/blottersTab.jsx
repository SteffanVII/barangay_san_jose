import { useReducer } from "react";
import { useContext } from "react";
import { dashboardContextImport } from "../../../../../globals/contexts";
import BlotterCard from "./subcomponents/blotterCard";

import "./blottersTab.scss";
import { useRef } from "react";
import useLazyLoad from "../../../../../hooks/useLazyLoad";
import { useEffect } from "react";
import { useLayoutEffect } from "react";
import { getBlotters } from "../../../../../server/blotters";
import { createContext } from "react";
import BlotterViewer from "./subcomponents/blotterViewer";

const blottersTabActionTypes = {
    PARAMS : 0,
    BLOTTERS : 1,
    LOAD : 2,
    RESET : 3,
    SEARCHING : 4,
    VIEWER : 5
}

function blottersTabReducer( state, action ) {
    switch (action.type) {
        case blottersTabActionTypes.BLOTTERS:

            state.raw = action.payload ;
            state.blotterCards = Array.from(state.raw.results).map( data => <BlotterCard key={"b" + data.case_no} data={data} /> )

            if ( state.raw.totalResults > 0 && state.raw.totalResults === state.raw.results.length ) {
                state.triggerShow = false;
            }
            if ( state.raw.totalResults === 0 ) {
                state.triggerShow = false;
                state.noResult = true;
            }

            state.searching = false;
        
            return {...state};

        case blottersTabActionTypes.LOAD:

            state.load = action.payload;

            return {...state};
        
        case blottersTabActionTypes.RESET:

            state.raw = {
                totalResults : 0,
                results : []
            };
            state.blotterCards = [];
            state.load = true;
            state.triggerShow = true;
            state.noResult = false;

            return {...state};

        case blottersTabActionTypes.VIEWER:

            state.floats.blotterForm = action.payload;

            return {...state};
        
        default:
            return state;
    }
}

export const blotterTabContextImport = createContext(null);

function BlottersTab() {
    
    const [ blottersTabState, blottersTabDispatch ] = useReducer( blottersTabReducer, {
        raw : {
            totalResults : 0,
            results : []
        },
        blotterCards : [],
        triggerShow : true,
        noResult : false,
        load : false,
        controller : {
            search : {
                type : 0,
                value : ""
            }
        },
        floats : {
            blotterForm : {
                type : "view",
                show : false,
                case : ""
            }
        }
    } );

    const dashboardContext = useContext(dashboardContextImport);

    const lazyloadTrigger = useRef(null);
    const controller = useRef(null);

    const [ node, observer ] = useLazyLoad( lazyloadTrigger, ( entry ) => {
        if ( entry.isIntersecting ) {
            // console.log("intersecting");
            blottersTabDispatch({
                type : blottersTabActionTypes.LOAD,
                payload : true
            })
        } else {
            // console.log("not intersecting");
            blottersTabDispatch({
                type : blottersTabActionTypes.LOAD,
                payload : false
            })
        }
    } )
    
    function refresh() {
        getBlotters( {
            searchtype : controller.current["search-blotter-dropdown"].value,
            searchvalue : controller.current["search-blotter-input"].value,
            status : controller.current["blotter-status-dropdown"].value,
            offset : blottersTabState.raw.results.length,
            order : controller.current["blotter-order-dropdown"].value
        }, ( res ) => {
                dashboardContext.timeoutRedirect( res, () => {
                    blottersTabDispatch({
                        type : blottersTabActionTypes.BLOTTERS,
                        payload : res
                    });
                    if ( blottersTabState.load === true && res.totalResults !== res.results.length ) {  
                        blottersTabDispatch({
                            type : blottersTabActionTypes.LOAD,
                            action : true
                        })
                    }
                })
            }
        )
    }

    function controllersOnChange() {
        blottersTabDispatch({ type : blottersTabActionTypes.RESET });
    }

    function setBlotterViewer( payload ) {
        blottersTabDispatch({
            type : blottersTabActionTypes.VIEWER,
            payload : payload
        });
    }

    useLayoutEffect(() => {
        if ( blottersTabState.load ) {
            refresh(); 
        }
    }, [blottersTabState.load]);

    return (
        <blotterTabContextImport.Provider value={{
            state : blottersTabState,
            setBlotterViewer : setBlotterViewer,
            resetResults : controllersOnChange
        }}>
            <div
                className="tab"
                id="blotters-tab"
            >
                <form ref={controller}
                        className="blotters-controller"
                        onSubmit={(e) => {
                            e.preventDefault();
                            if ( e.target["search-blotter-input"].value !== "" ) {
                                controllersOnChange();
                            }
                        }}>
                    <div className="search-blotter-container">
                        <select id="search-blotter-dropdown">
                            <option value="caseno">Case No.</option>
                            <option value="name">Name</option>
                        </select>
                        <input type="search"
                                placeholder="    "
                                id="search-blotter-input"
                                onChange={(event) => {
                                    if ( event.target.value === "" ) controllersOnChange();
                                    // controllersOnChange();
                                }}
                        />
                        <button type="button"
                                onClick={() => controllersOnChange()}
                        >Find</button>
                    </div>
                    <select id="blotter-status-dropdown"
                            onChange={() => controllersOnChange()}
                    >
                        <option value="all">All</option>
                        <option value="open">Open</option>
                        <option value="closed">Closed</option>
                    </select>
                    <select id="blotter-order-dropdown"
                            onChange={() => controllersOnChange()}
                    >
                        <option value="desc">Desc</option>
                        <option value="asc">Asc</option>
                    </select>
                    <button type="button"
                            className="register-blotter-button"
                            onClick={() => {
                                blottersTabDispatch({
                                    type : blottersTabActionTypes.VIEWER,
                                    payload : {
                                        type : "create",
                                        show : true
                                    }
                                })
                            }}
                    >Register New Case</button>
                </form>
                <div className="blotters-container">
                    {blottersTabState.blotterCards}
                    <div ref={lazyloadTrigger} className={"blotters-lazyload-trigger " + (blottersTabState.triggerShow ? "show" : "")}><span></span></div>
                    <div className={"blotters-no-result-found "  + (blottersTabState.noResult ? "show" : "")}>No Result Found.</div>
                </div>
                <div className={"float-container " + ( dashboardContext.collapse.value ? "collapse" : "" )}>
                                <BlotterViewer/>
                </div>
            </div>
        </blotterTabContextImport.Provider>
    );

}

export default BlottersTab;
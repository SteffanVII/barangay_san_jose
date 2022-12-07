import { createContext, useContext, useLayoutEffect, useReducer, useRef } from "react";
import { dashboardContext } from "../../../../../globals/contexts";
import { getResidentsAll } from "../../../../../server/residents";
import "./residentsTab.scss";
import PaginationButton from "./subcomponents/paginationButton";
import ResidentDetailsFloat from "./subcomponents/residentDetailsFloat";
import ResidentFormFloat from "./subcomponents/residentFormFloat";
import ResidentRow from "./subcomponents/residentRow";

export const residentsTabReducerActionTypes = {
    SETRESULTS : 0,
    CHANGEPAGE : 1,
    CHANGEENTRIES : 2,
    TOGGLEFILTERS : 3,
    SHOWDETAILS : 4,
    HIDEDETAILS : 5,
    SHOWFORM : 6,
    HIDEFORM : 7
}

function residentsTabReducer(state, action) {
    switch (action.type) {

        case residentsTabReducerActionTypes.SETRESULTS:
            state.results = action.payload;
            state.tableComponents = Array.from(state.results.entries).map( data =>
                <ResidentRow
                    key={data.fname + "-" + data.mname + "-" + data.lname}
                    data={data}
                />
            );

            state.paginationComps = [];
            let start = state.queryControl.page <= 3 ? 1 : state.queryControl.page >= state.results.totalPages - 2 ? state.results.totalPages - 4 : state.queryControl.page - 2;
            let end = state.queryControl.page <= 3 ? 6 : state.queryControl.page >= state.results.totalPages - 2 ? state.results.totalPages + 1 : state.queryControl.page + 3;
            for ( let index = start; index < end; index++ ) {
                if ( index < state.results.totalPages + 1 ) {
                    state.paginationComps.push(<PaginationButton key={index + "-pgnbtn"} page={index} current={state.results.currentPage} />)
                }
            }

            return {...state};

        case residentsTabReducerActionTypes.CHANGEPAGE:
            state.queryControl.page = action.payload;
            state.queryControl = {...state.queryControl};
            return {...state};

        case residentsTabReducerActionTypes.CHANGEENTRIES:
            state.queryControl.entries = action.payload;
            state.queryControl.page = 1;
            state.queryControl = {...state.queryControl};
            return {...state};

        case residentsTabReducerActionTypes.TOGGLEFILTERS:
            state.filters = action.payload;
            return {...state};

        case residentsTabReducerActionTypes.SHOWDETAILS:
            state.showDetails = true;
            state.showForm = {
                value : false,
                edit : state.showForm.edit,
                data : state.showForm.data
            };
            state.residentFloatDetails = action.payload;
            return {...state};
        case residentsTabReducerActionTypes.HIDEDETAILS:
            state.showDetails = false;
            return {...state};

        case residentsTabReducerActionTypes.SHOWFORM:
            state.showForm = action.payload;
            state.showDetails = false;
            return {...state};

        case residentsTabReducerActionTypes.HIDEFORM:
            state.showForm = {
                value : false,
                edit : false,
                data : {}
            };
            return {...state};
        
        default:
            return state;
    }
}

export const residentsTabContext = createContext(null);

function ResidentsTab() {

    const [ residentsTabState, residentsTabDispatch ] = useReducer(residentsTabReducer, {
        results : {
            entries : [],
            totalEntries : 0,
            currentPage : 1,
            totalPages : 0
        },
        tableComponents : [],
        paginationComps : [],
        queryControl : {
            entries : 100,
            page : 1,
        },
        filters : false,
        filterControl : {

        },
        showDetails : false,
        residentFloatDetails : undefined,
        showForm : {
            value : false,
            edit : false,
            data : {}
        },
        
    })

    const filterForm = useRef(null);
    const dbContext = useContext(dashboardContext);

    // Fetch residents everytime valuse inside queryControl changes -- look at residentsTabState ...
    useLayoutEffect(() => {
        getResidentsAll( residentsTabState.queryControl, (response) => {
            residentsTabDispatch({
                type : residentsTabReducerActionTypes.SETRESULTS,
                payload : response
            })
        })
    }, [residentsTabState.queryControl]);

    return (
        <residentsTabContext.Provider value={{
            reducer : {
                state : residentsTabState,
                dispatch : residentsTabDispatch
            },
            detailsFloat : {
                show : (val) => {
                    residentsTabDispatch({  type : residentsTabReducerActionTypes.SHOWDETAILS, payload : val });
                },
                hide : () => {
                    residentsTabDispatch({ type : residentsTabReducerActionTypes.HIDEDETAILS });
                },
                value : residentsTabState.showDetails
            },
            formFloat : {
                hide : () => {
                    residentsTabDispatch({
                        type : residentsTabReducerActionTypes.HIDEFORM
                    })
                },
                edit : ( values ) => {
                    residentsTabDispatch({
                        type : residentsTabReducerActionTypes.SHOWFORM,
                        payload : {
                            value : true,
                            edit : true,
                            data : values
                        }
                    });
                },
                value : () => {return residentsTabState.showForm}
            }
        }}>

            <div
                className="tab"
                id="residents-tab"
            >
                <form ref={filterForm} className={"filters-container " + ( residentsTabState.filters ? "show" : "" )}
                    onSubmit={(event) => {
                        event.preventDefault();

                    }}
                >
                    <span>Filters</span>
                    <div className="filters-wrapper">
                        <div className="filter-wrapper filter-wrapper__name">
                            <div className="name-input-wrapper">
                                <input type="text" id="firstname-filter" placeholder="Firstname" disabled/>
                                <input type="checkbox" id="toggle-firstname-filter"
                                    onChange={(event) => {
                                        filterForm.current["firstname-filter"].disabled = !event.target.checked;
                                    }}
                                />
                            </div>
                            <div className="name-input-wrapper">
                                <input type="text" id="lastname-filter" placeholder="Lastname" disabled/>
                                <input type="checkbox" id="toggle-lastname-filter"
                                    onChange={(event) => {
                                        filterForm.current["lastname-filter"].disabled = !event.target.checked;
                                    }}
                                />
                            </div>
                            <div className="name-input-wrapper">
                                <input type="text" id="middlename-filter" placeholder="Middlename" disabled/>
                                <input type="checkbox" id="toggle-middlename-filter"
                                    onChange={(event) => {
                                        filterForm.current["middlename-filter"].disabled = !event.target.checked;
                                    }}
                                />
                            </div>
                        </div>
                        {/* <hr /> */}
                        <div className="filter-wrapper filter-wrapper__age">
                            <div className="age-filter-group">
                                <label htmlFor="">Age</label>
                                <input type="checkbox" id="toggle-age-filter"
                                    onChange={(event) => {
                                        filterForm.current["toggle-age-filter-by-range"].disabled = !event.target.checked;
                                        filterForm.current["age-filter-input"].disabled = filterForm.current["toggle-age-filter-by-range"].checked ? true : !event.target.checked;
                                        filterForm.current["age-filter-input-min"].disabled = event.target.checked ? filterForm.current["toggle-age-filter-by-range"].checked ? false : true : !event.target.checked;
                                        filterForm.current["age-filter-input-max"].disabled = event.target.checked ? filterForm.current["toggle-age-filter-by-range"].checked ? false : true : !event.target.checked;
                                    }}
                                />
                            </div>
                            <input type="number" id="age-filter-input" defaultValue={0} disabled/>
                            <div className="age-filter-group">
                                <label htmlFor="">By range</label>
                                <input type="checkbox" id="toggle-age-filter-by-range" disabled
                                    onChange={(event) => {
                                        filterForm.current["age-filter-input"].disabled = event.target.checked;
                                        filterForm.current["age-filter-input-min"].disabled = !event.target.checked;
                                        filterForm.current["age-filter-input-max"].disabled = !event.target.checked;
                                    }}
                                />
                            </div>
                            <div className="age-filter-group">
                                <label htmlFor="">Min</label>
                                <input type="number" id="age-filter-input-min" defaultValue={18} disabled/>
                            </div>
                            <div className="age-filter-group">
                                <label htmlFor="">Max</label>
                                <input type="number" id="age-filter-input-max" defaultValue={80} disabled/>
                            </div>
                        </div>
                        {/* <hr /> */}
                        <div className="filter-wrapper filter-wrapper__gender">
                            <div className="gender-filter-group">
                                <label htmlFor="">Gender</label>
                                <input type="checkbox" id="toggle-gender-filter"
                                    onChange={(event) => {
                                        filterForm.current["gender-filter-dropdown"].disabled = !event.target.checked;
                                    }}
                                />
                            </div>
                            <select id="gender-filter-dropdown" disabled>
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                            </select>
                        </div>
                        {/* <hr /> */}
                        <div className="filter-wrapper filter-wrapper__purok">
                            <div className="purok-filter-group">
                                <label htmlFor="">Purok</label>
                                <input type="checkbox" id="toggle-purok-filter"
                                    onChange={(event) => {
                                        filterForm.current["purok-filter-input"].disabled = !event.target.checked;
                                    }}
                                />
                            </div>
                            <input type="number" id="purok-filter-input" placeholder="Purok No." disabled/>
                        </div>
                    </div>
                    <div className="filter-buttons-container">
                        <button>Clear Filters</button>
                        <button>Apply</button>
                    </div>
                </form>
                <div className="entries-controller">
                    {/* Filter switch */}
                    <div className="filter-switch-container">
                        <input type="checkbox" id="filter-switch"
                            onChange={(event) => {
                                residentsTabDispatch({
                                    type : residentsTabReducerActionTypes.TOGGLEFILTERS,
                                    payload : event.target.checked
                                })
                            }}
                        />
                        <label htmlFor="filter-switch">Filters</label>
                    </div>
                    <hr />
                    {/* Entry count changer */}
                    <div className="entry-shown-container">
                        <label htmlFor="entry-count-input">Show</label>
                        <input type="number" id="entry-count-input" defaultValue={100}
                            onChange={(event) => {
                                residentsTabDispatch({ type : residentsTabReducerActionTypes.CHANGEENTRIES, payload : event.target.value });
                            }}
                        />
                        <label htmlFor="entry-count-input">entries</label>
                    </div>
                    <hr />
                    <div className="entry-count-container">
                        <span>Total residents - </span>
                        <span>{residentsTabState.results.totalEntries}</span>
                    </div>
                    <div className="entry-btns-container">
                        <button id="add-resident-btn"
                            onClick={() => {
                                residentsTabDispatch({
                                    type : residentsTabReducerActionTypes.SHOWFORM, payload : {
                                        value : true,
                                        edit : false
                                    }
                                })
                            }}
                        >Add Resident</button>
                    </div>
                    {/* Entry pagination */}
                    <div className="entry-pagination-container">
                        <button
                            id="prev-page"
                            onClick={() => {
                                if ( residentsTabState.queryControl.page > 1 ) {
                                    residentsTabDispatch({
                                        type : residentsTabReducerActionTypes.CHANGEPAGE,
                                        payload : residentsTabState.queryControl.page - 1
                                    })
                                }
                            }}
                        ><span></span></button>
                        { residentsTabState.paginationComps }
                        <button
                            id="next-page"
                            onClick={() => {
                                if ( residentsTabState.queryControl.page < residentsTabState.results.totalPages ) {
                                    residentsTabDispatch({
                                        type : residentsTabReducerActionTypes.CHANGEPAGE,
                                        payload : residentsTabState.queryControl.page + 1
                                    })
                                }
                            }}
                        ><span></span></button>
                    </div>
                </div>
                <table cellSpacing={0} >
                    <thead>
                        <tr>
                            <th></th>
                            <th><button>Name</button></th>
                            <th><button>Birthdate</button></th>
                            <th><button>Age</button></th>
                            <th><button>Gender</button></th>
                            <th><button>Registered/Not Registered</button></th>
                            <th><button>Purok No.</button></th>
                            <th><button>House No.</button></th>
                            <th><button>Contact No.</button></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {residentsTabState.tableComponents}
                    </tbody>
                </table>
                <div className={"float-container " + ( dbContext.collapse.value ? "collapse" : "" )}>
                    <ResidentDetailsFloat data={residentsTabState.residentFloatDetails} />
                    <ResidentFormFloat/>
                </div>
            </div>
        </residentsTabContext.Provider>
    );
}

export default ResidentsTab;
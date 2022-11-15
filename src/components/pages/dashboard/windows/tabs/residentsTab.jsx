import { createContext, useLayoutEffect, useReducer } from "react";
import { getResidentsAll } from "../../../../../server/residents";
import "./residentsTab.scss";
import PaginationButton from "./subcomponents/paginationButton";
import ResidentRow from "./subcomponents/residentRow";

export const residentsTabReducerActionTypes = {
    SETRESULTS : 0
}

function residentsTabReducer(state, action) {
    switch (action.type) {
        case residentsTabReducerActionTypes.SETRESULTS:
            state.results = action.payload;
            console.log(state.results);
            state.tableComponents = Array.from(state.results.entries).map( data =>
                <ResidentRow
                    key={data.firstname + "-" + data.middelname + "-" + data.lastname}
                    data={data}
                />
            );
            state.paginationComps = [];
            for (let index = 1; index < state.results.totalPages + 1; index++) {
                state.paginationComps.push(<PaginationButton page={index} current={state.results.currentPage} />)
            }
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
            entries : 4,
            page : 1,
        }
    })

    useLayoutEffect(() => {
        getResidentsAll( residentsTabState.queryControl, (response) => {
            residentsTabDispatch({
                type : residentsTabReducerActionTypes.SETRESULTS,
                payload : response
            })
        })
    }, []);

    return (
        <residentsTabContext.Provider value={{
            reducer : {
                state : residentsTabState,
                dispatch : residentsTabDispatch
            }
        }}>

            <div
                className="tab"
                id="residents-tab"
            >
                <div className="entries-controller">
                    <div className="filter-switch-container">
                        <label htmlFor="filter-switch">Filter</label>
                        <input type="checkbox" id="filter-switch" />
                    </div>
                    <hr />
                    <div className="entry-shown-container">
                        <label htmlFor="entry-count-input">Show</label>
                        <input type="number" id="entry-count-input" defaultValue={4}/>
                        <label htmlFor="entry-count-input">entries</label>
                    </div>
                    <hr />
                    <div className="entry-count-container">
                        <span>Total residents - </span>
                        <span>{residentsTabState.results.length}</span>
                    </div>
                    <div className="entry-btns-container">

                    </div>
                    <div className="entry-pagination-container">
                        <button id="prev-page"><span></span></button>
                        { residentsTabState.paginationComps }
                        <button id="next-page"><span></span></button>
                    </div>
                </div>
                <table cellSpacing={0} >
                    <thead>
                        <tr>
                            <th><button>Id No.</button></th>
                            <th><button>Firstname</button></th>
                            <th><button>Lastname</button></th>
                            <th><button>Middlename</button></th>
                            <th><button>Birthdate</button></th>
                            <th><button>Age</button></th>
                            <th><button>Gender</button></th>
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
            </div>
        </residentsTabContext.Provider>
    );
}

export default ResidentsTab;
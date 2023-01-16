import { useLayoutEffect } from "react";
import { createContext } from "react";
import { useContext } from "react";
import { useReducer, useRef } from "react";
import { dashboardContextImport } from '../../../../../globals/contexts';
import { addEvent, getEvents, updateEvent } from "../../../../../server/events";
import "./eventsTab.scss";
import EventRow from "./subcomponents/eventRow";

export const eventsContextImport = createContext(null);

const eventsActions = {
    SHOWFORM : 0,
    SET : 1
}

function eventsReducer( state, action ) {
    switch (action.type) {
        case eventsActions.SHOWFORM:

            state.formState = action.payload;

            if ( state.formState.edit ) {

                let d = new Date(state.formState.data.when);

                let yyyy = d.getFullYear();
                let mm = (d.getMonth() + 1).toString() ;
                let dd = (d.getDate()).toString();

                if ( mm.length < 2 ) {
                    mm = `0${mm}`;
                }
                if ( dd.length < 2 ) {
                    dd = `0${dd}`;
                }

                state.formState.data['date'] = `${yyyy}-${mm}-${dd}`;
            }
            return {...state};

        case eventsActions.SET:

            state.results = action.payload;
            state.eventRows = state.results.map( d => <EventRow key={`${d.title}-${d.id}`} data={d} /> )

            return {...state};
    
        default:
            return state;
    }
}

function EventsTab() {

    const dashboardContext = useContext(dashboardContextImport);

    const [ state, dispatch ] = useReducer( eventsReducer, {
        formState : {
            show : false,
            edit : false,
            data : null
        },
        results : [],
        eventRows : [],
    } )

    const toggle = useRef(null);
    const controller = useRef(null);
    const title = useRef(null);
    const about = useRef(null);
    const when = useRef(null);

    function refresh() {
        getEvents(( response ) => {
            dashboardContext.timeoutRedirect( response, () => {
                dispatch({
                    type : eventsActions.SET,
                    payload : response
                });
            } )
        })
    }

    function openAdd() {
        dispatch({
            type : eventsActions.SHOWFORM,
            payload : {
                show : true,
                edit : false,
                data : null
            }
        });
    }

    function openEdit( data ) {
        dispatch({
            type : eventsActions.SHOWFORM,
            payload : {
                show : true,
                edit : true,
                data : data
            }
        });
    }

    function closeForm() {
        dispatch({
            type : eventsActions.SHOWFORM,
            payload : {
                show : false,
                edit : false,
                data : null
            }
        });
    }

    function clearForm() {
        if ( state.formState.edit ) {
            title.current.value = state.formState.data.title;
            about.current.value = state.formState.data.about;
            when.current.value = state.formState.data.date;
        } else {
            title.current.value = "";
            about.current.value = "";
            when.current.value = "";
        }
    }

    useLayoutEffect(() => {
        refresh();
    }, []);

    useLayoutEffect(() => {
        clearForm();
    }, [state.formState])

    return (
        <eventsContextImport.Provider value={{
            edit : openEdit,
            refresh : refresh,
            clear : clearForm
        }}>

            <div className="tab"
                id="events-tab"
            >
                <form ref={controller} className="events-controller">
                    <div ref={toggle} id="events-add-toggle"
                            onClick={(e) => {
                                if ( toggle.current === e.target ) {
                                    openAdd();
                                }
                            }}
                    >+
                        <fieldset className={"events-add-form " + (state.formState.show ? 'show' : '')}>
                            <span className="pd"
                                onClick={() => {
                                    closeForm();
                                }}
                            >X</span>
                            <input ref={title} type="text" id="event-title-input" placeholder="Title"
                                    defaultValue={ state.formState.edit ? state.formState.data.title : "" }/>
                            <textarea ref={about} id="event-description-input" placeholder="Description"
                                    defaultValue={ state.formState.edit ? state.formState.data.about : "" }></textarea>
                            <input ref={when} type="date" id="event-date-input"
                                    defaultValue={ state.formState.edit ? state.formState.data.date : "" }/>
                            <div className="events-btns-wrapper">
                                <button type="button"
                                    onClick={() => clearForm()}
                                >Reset</button>
                                { state.formState.edit && <button type="button"
                                                                    onClick={() => {
                                                                        updateEvent( {
                                                                            id : state.formState.data.id,
                                                                            title : controller.current['event-title-input'].value,
                                                                            about : controller.current['event-description-input'].value,
                                                                            date : new Date(controller.current['event-date-input'].value).toISOString().split("T")[0]
                                                                        }, ( response ) => {
                                                                            dashboardContext.timeoutRedirect( response, () => {
                                                                                refresh();
                                                                                closeForm();
                                                                            } );
                                                                        } )
                                                                    }}
                                                            >Apply</button> } 
                                { !state.formState.edit && <button type="button"
                                                                    onClick={() => {
                                                                        addEvent( {
                                                                            title : controller.current['event-title-input'].value,
                                                                            about : controller.current['event-description-input'].value,
                                                                            date : new Date(controller.current['event-date-input'].value).toISOString().split("T")[0]
                                                                        }, ( response ) => {
                                                                            dashboardContext.timeoutRedirect( response, () => {
                                                                                refresh();
                                                                                closeForm();
                                                                            } );
                                                                        } )
                                                                    }}
                                                            >Add</button> } 
                            </div>
                        </fieldset>
                    </div>
                </form>
                <div className="events-container">
                    {state.eventRows}
                </div>
            </div>
        </eventsContextImport.Provider>
    );
}

export default EventsTab;
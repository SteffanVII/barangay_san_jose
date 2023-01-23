import { useReducer } from "react";
import { createContext } from "react";
import { useContext } from "react";
import { useLayoutEffect, useRef } from "react";
import { dashboardContextImport } from "../../../../../globals/contexts";
import { monthsMap } from "../../../../../globals/utilities";
import { addReceipt, getFixedTransactionCounters, getReceipts } from "../../../../../server/receipts";
import "./receiptTab.scss";
import ReceiptRow from "./subcomponents/receiptRow";

const receiptTabActions = {
    FORMSTATE : 0,
    RESULTS : 1,
    COUNTERS : 2
}

function receiptTabReducer( state, action ) {
    switch (action.type) {
        case receiptTabActions.FORMSTATE:
            state.form = action.payload
            return {...state};

        case receiptTabActions.RESULTS:
            state.results.raw = action.payload;
            state.results.rows = state.results.raw.map( d => <ReceiptRow key={`receipt-row-${d.receipt_number}`} data={d} /> );
            return {...state};

        case receiptTabActions.COUNTERS:
            state.counter = action.payload;
            return {...state};
    
        default:
            return state;
    }
}

export const receiptTabContextImport = createContext(null);

function ReceiptTab( props ) {

    const [ state, dispatch ] = useReducer( receiptTabReducer, {
        form : {
            show : false
        },
        results : {
            raw : [],
            rows : []
        },
        counter : {
            tmonth : 0,
            lmonth : 0,
            tyear : 0,
            lyear : 0,
            labels : {
                tmonth : "",
                lmonth : "",
                tyear : "",
                lyear : "",
            }
        }
    } );

    const form = useRef(null);

    const dbContext = useContext(dashboardContextImport);

    function refreshReceipts() {
        getReceipts( ( res ) => {
            dbContext.timeoutRedirect( res, () => {
                dispatch({
                    type : receiptTabActions.RESULTS,
                    payload : res
                });
            } )
        } )
    }

    function refreshCounters() {

        getFixedTransactionCounters( ( res ) => {
            dbContext.timeoutRedirect( res, () => {
                dispatch({
                    type : receiptTabActions.COUNTERS,
                    payload : res
                });
            } )
        } )

    }

    function showForm() {
        dispatch({
            type : receiptTabActions.FORMSTATE,
            payload : {
                show : true
            }
        });
    }

    function hideForm() {
        dispatch({
            type : receiptTabActions.FORMSTATE,
            payload : {
                show : false
            }
        });
    }

    useLayoutEffect(() => {
        refreshReceipts();
        refreshCounters();
    }, []);

    return (
        <receiptTabContextImport.Provider value={{
            refresh : refreshReceipts,
            refreshCounter : refreshCounters,
            timeoutRedirect : dbContext.timeoutRedirect
        }}>
            <div className="receipt"
                id="receipt-tab"
            >
                <div className="receipts-counters-container">
                    <h3>Transactions</h3>
                    <div className="receipt-counters">
                        <div className="receipt-counter">
                            <span>This Month - <span>{state.counter.labels.tmonth}</span></span>
                            <span>Total - {state.counter.tmonth}</span>
                        </div>
                        <div className="receipt-counter">
                            <span>Last Month - <span>{state.counter.labels.lmonth}</span></span>
                            <span>Total - {state.counter.lmonth}</span>
                        </div>
                        <div className="receipt-counter">
                            <span>This Year - <span>{state.counter.labels.tyear}</span></span>
                            <span>Total - {state.counter.tyear}</span>
                        </div>
                        <div className="receipt-counter">
                            <span>Last Year - <span>{state.counter.labels.lyear}</span></span>
                            <span>Total - {state.counter.lyear}</span>
                        </div>
                    </div>
                </div>
                <div className="receipt-tab-controller">
                    <button onClick={() => {
                        showForm();
                    }} >Add Receipt</button>
                    <form ref={form} className={`receipt-form ${state.form.show ? `show` : ``}`}
                        onSubmit={(e) => {
                            e.preventDefault();
                            addReceipt( {
                                receipt_number : form.current["receipt-number"].value,
                                type : form.current.type.value,
                                amount : form.current.amount.value
                            }, ( res ) => {
                                dbContext.timeoutRedirect( res, () => {
                                    form.current.reset();
                                    refreshReceipts();
                                    refreshCounters();
                                    hideForm();
                                } )
                            } )
                        }}
                    >
                        <span>New Receipt</span>
                        <input type="text" id="receipt-number" placeholder="Receipt Number" required/>
                        <input type="text" id="type" placeholder="Type" required/>
                        <input type="text" id="amount" placeholder="Amount Ex. 20.00" pattern="[0-9]+.[0-9]+" required/>
                        <button type="submit" >Add</button>
                        <button type="button"
                                onClick={() => {
                                    hideForm();
                                }}
                        >Close</button>
                    </form>
                </div>
                <table className="receipt-container">
                    <thead>
                        <tr>
                            <th>Receipt Number</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Date Issued</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.results.rows}
                    </tbody>
                </table>
            </div>
        </receiptTabContextImport.Provider>
    );

}

export default ReceiptTab;
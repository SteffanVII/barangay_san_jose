import { useContext, useEffect } from "react";
import { useRef } from "react";
import { useLayoutEffect } from "react";
import { useState } from "react";
import { monthsMap, useClickOutside } from "../../../../../../globals/utilities";
import { deleteReceipt } from "../../../../../../server/receipts";
import { receiptTabContextImport } from "../receiptTab";
import "./receiptRow.scss";

function ReceiptRow( props ) {

    const [ deleteC, setDeleteC ] = useState(false);

    const receiptTabContext = useContext(receiptTabContextImport);

    const clickOutsideRoot = useRef(null);

    useClickOutside( clickOutsideRoot, () => {
        setDeleteC(false);
    } );

    return (
        <tr className="receipt-row">
            <td>{props.data.receipt_number}</td>
            <td>{props.data.type}</td>
            <td>{props.data.amount}</td>
            <td>{`${monthsMap.get(parseInt(props.data.date.split("T")[0].split("-")[1]))} ${props.data.date.split("-")[2].split("T")[0]}, ${props.data.date.split("-")[0]}`}</td>
            <td><button ref={clickOutsideRoot} disabled={deleteC}
                    onClick={() => {
                        setDeleteC(true);
                    }}
                >Delete
                    <div className={`delete-confirm ${deleteC ? `show` : `` }`}>
                        <span>Are you sure?</span>
                        <button onClick={() => {
                            deleteReceipt( props.data.receipt_number, ( res ) => {
                                receiptTabContext.timeoutRedirect( res, () => {
                                    receiptTabContext.refresh();
                                    receiptTabContext.refreshCounter();
                                } )
                            } );
                        }}>Yes</button>
                        <button onClick={() => {
                            setDeleteC(false);
                        }} >No</button>
                    </div>
                </button></td>
        </tr>
    );
}

export default ReceiptRow;
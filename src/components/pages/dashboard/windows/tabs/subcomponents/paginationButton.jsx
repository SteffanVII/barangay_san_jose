import { useContext } from "react";
import { getResidentsAll } from "../../../../../../server/residents";
import { residentsTabContext, residentsTabReducerActionTypes } from "../residentsTab";
import "./paginationButton.scss";

function PaginationButton( props ) {

    const resTabCon = useContext(residentsTabContext);

    return (
        <button
            className={"pagination-btn " + ( props.current == props.page ? "current" : "" )}
            onClick={() => {
                props.callback( props.page );
            }}
        >{props.page}</button>
    );

}

export default PaginationButton;
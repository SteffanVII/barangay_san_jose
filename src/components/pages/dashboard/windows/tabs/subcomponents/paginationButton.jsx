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
                getResidentsAll( resTabCon.reducer.queryControl, (res ) => {
                    resTabCon.reducer.dispatch({ type : residentsTabReducerActionTypes.SETRESULTS, payload : res });
                } )
                resTabCon.reducer.dispatch({});
            }}
        >{props.page}</button>
    );

}

export default PaginationButton;
import { useState } from "react";
import { useLayoutEffect } from "react";
import PaginationButton from "./paginationButton";
import "./pagination.scss";

function Pagination( props ) {

    const [ btns, setBtns ] = useState([]);

    useLayoutEffect(() => {
        let tmp = [];
        let start = props.page() <= 3 ? 1 : props.page() >= props.total() - 2 ? props.total() - 4 : props.page() - 2;
        let end = props.page() <= 3 ? 6 : props.page() >= props.total() - 2 ? props.total() + 1 : props.page() + 3;
        for ( let index = start; index < end; index++ ) {
            if ( index < props.total() + 1 ) {
                tmp.push(<PaginationButton key={index + "-pgnbtn"} page={index} current={props.current} callback={props.pageCb} />)
            }
        }
        setBtns(tmp);
    }, [props.current])

    return (
        <div className="entry-pagination">
            <button type="button"
                    className="prev-button"
                    onClick={() => props.prevFunction()}
            ><span></span></button>
            {btns}
            <button type="button"
                    className="next-button"
                    onClick={() => props.nextFunction()}
            ><span></span></button>
        </div>
    );

}

export default Pagination;
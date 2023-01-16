import { useContext } from "react";
import { useRef } from "react";
import { monthsMap } from "../../../../../../globals/utilities";
import { blotterTabContextImport } from "../blottersTab";
import "./blotterCard.scss";

function BlotterCard( props ) {

    const blotterTabState = useContext(blotterTabContextImport);

    const wrapper = useRef(null);

    function complainants() {
        let c = [];
        props.data.individuals.forEach( i => {
            if ( i.type === 0 ) c.push( <span className="blotter-card-involved-name" key={i.name + "i"}>{i.name}</span> );
        } )
        return c;
    }

    function respondents() {
        let r = [];
        props.data.individuals.forEach( i => {
            if ( i.type === 1 ) r.push( <span className="blotter-card-involved-name" key={i.name + "i"}>{i.name}</span> );
        } )
        return r;
    }

    function blotterCardOnClick() {
        blotterTabState.setBlotterViewer({
            type : "view",
            show : true,
            case : props.data.case_no
        });
    }

    return (
        <div
            className="blotter-card"
            onMouseLeave={() => {
                wrapper.current.scrollTo({ top : 0, behavior : 'smooth' });
            }}
            onClick={() => {
                blotterCardOnClick();
            }}
        >
            <div ref={wrapper} className="blotter-card-wrapper">
                <div className="blotter-card-texts">
                    <span className="blotter-card-no">{ `No. ${props.data.case_no}`}</span>
                    <span className="blotter-card-label">Status</span>
                    <span className={"blotter-card-status " + "stat-" + props.data.status}>{ props.data.status == 0 ? "Open" : "Closed" }</span>
                    <span className="blotter-card-label">Date Filed</span>
                    {/* <span className="blotter-card-date-filed">{props.data.filed_date}</span> */}
                    
                    <span className="blotter-card-date-filed">{monthsMap.get(parseInt(props.data.filed_date.split("T")[0].split("-")[1])) + " " + props.data.filed_date.split("T")[0].split("-")[2] + ", " + props.data.filed_date.split("T")[0].split("-")[0]}</span>
                    <span className="blotter-card-label">Complainants</span>
                    {complainants()}
                    <span className="blotter-card-label">Respondents</span>
                    {respondents()}
                </div>
            </div>
        </div>
    );
}

export default BlotterCard;
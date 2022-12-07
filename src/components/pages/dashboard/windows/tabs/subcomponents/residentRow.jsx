import { useContext, useLayoutEffect } from "react";
import { monthsMap, parseAge } from "../../../../../../globals/utilities";
import { residentsTabContext } from "../residentsTab";

function ResidentRow(props) {

    const tabContext = useContext(residentsTabContext);

    return (
        <tr>
            <td><button onClick={() => {
                tabContext.detailsFloat.show(props.data);
            }} >More</button></td>
            <td className="resident-name" >{props.data.fname + " " + props.data.mname + " " + props.data.lname + " " + props.data.suffix}</td>
            <td className="resident-birthdate">{monthsMap.get(props.data.bdate.split("-")[1]) + " " + props.data.bdate.split("-")[2] + ", " + props.data.bdate.split("-")[0]}</td>
            <td className="resident-age">{parseAge(props.data.bdate)}</td>
            <td className="resident-gender">{(props.data.gender == 0 ? "Male" : "Female")}</td>
            <td className="resident-registered">{(props.data.registered == 0 ? "Not Registered" : "Registered")}</td>
            <td className="resident-purok-no">{props.data.purok}</td>
            <td className="resident-house-no">{props.data.house_no}</td>
            <td className="resident-contact">{props.data.contact_no}</td>
        </tr>
    );

}

export default ResidentRow;
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
            <td className="resident-birthdate">{ (props.data.bdate !== null ? monthsMap.get(parseInt(props.data.bdate.split("-")[1])) + " " + props.data.bdate.split("-")[2].split("T")[0] + ", " + props.data.bdate.split("-")[0] : "No data")}</td>
            <td className="resident-age">{ props.data.bdate !== null ? parseAge(props.data.bdate) : "No data"}</td>
            <td className="resident-gender">{(props.data.gender == 0 ? "Male" : "Female")}</td>
            {/* <td className="resident-registered">{(props.data.registered == 0 ? "Not Registered" : "Registered")}</td> */}
            <td className="resident-purok-no">{ (props.data.purok !== null ? props.data.purok : "No data")}</td>
            <td className="resident-house-no">{ (props.data.house_no !== null ? props.data.house_no : "No data")}</td>
            <td className="resident-contact">{ (props.data.contact_no !== "" ? props.data.contact_no : "No data")}</td>
        </tr>
    );

}

export default ResidentRow;
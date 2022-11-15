function ResidentRow(props) {
    return (
        <tr>
            <td className="resident-id-no">{props.data.id_no}</td>
            <td className="resident-firstname" >{props.data.firstname}</td>
            <td className="resident-lastname">{props.data.lastname}</td>
            <td className="resident-middlename">{props.data.middlename}</td>
            <td className="resident-birthdate">{props.data.birthdate}</td>
            <td className="resident-age">{props.data.age}</td>
            <td className="resident-gender">{props.data.gender}</td>
            <td className="resident-contact">{props.data.contact_no}</td>
            <td className="resident-purok-no">{props.data.purok}</td>
            <td className="residnet-house-no">{props.data.house_no}</td>
            <td><button>Full Details</button></td>
        </tr>
    );

}

export default ResidentRow;
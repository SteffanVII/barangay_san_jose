import { useState } from "react";
import { useContext, useLayoutEffect, useRef } from "react";
import Select from "react-select";
import { registerResident, updateResident } from "../../../../../../server/residents";
import { residentsTabContext } from "../residentsTab";
import "./residentFormFloat.scss";

function ResidentFormFloat() {

    const tabContext = useContext(residentsTabContext);
    const form = useRef(null);
    const [ updateNotif, setUpdateNotif ] = useState(false);

    return (
        <form
            ref={form}
            id="resident-form-float"
            className={ tabContext.formFloat.value().value ?  "show" : "" }
            onSubmit={(event) => {
                event.preventDefault();
                if ( !tabContext.formFloat.value().edit ) {
                    registerResident({
                        fname : form.current["firstname"].value,
                        lname : form.current["lastname"].value,
                        mname : form.current["middlename"].value,
                        suffix : form.current["suffix"].value,
                        gender : form.current["gender"].value,
                        bdate : form.current["birthdate"].value,
                        address : form.current["address-input"].value,
                        purok : form.current["purok-input"].value,
                        contact : form.current["contact-no-input"].value,
                        house : form.current["house-no-input"].value,
                        registered : form.current["voter"].value,
                        religion : form.current["religion-input"].value,
                        email : form.current["email-input"].value,
                        birthplace : form.current["birthplace"].value,
                        status : form.current["civil-status"].value
                    }, () => {
                        tabContext.refresh();
                        tabContext.formFloat.hide();
                    });
                } else {
                    updateResident({
                        id : tabContext.formFloat.value().data.id,
                        fname : form.current["firstname"].value,
                        lname : form.current["lastname"].value,
                        mname : form.current["middlename"].value,
                        suffix : form.current["suffix"].value,
                        gender : form.current["gender"].value,
                        bdate : form.current["birthdate"].value,
                        address : form.current["address-input"].value,
                        purok : form.current["purok-input"].value,
                        contact : form.current["contact-no-input"].value,
                        house : form.current["house-no-input"].value,
                        registered : form.current["voter"].value,
                        religion : form.current["religion-input"].value,
                        email : form.current["email-input"].value,
                        birthplace : form.current["birthplace"].value,
                        status : form.current["civil-status"].value
                    }, () => {
                        setUpdateNotif(true);
                        tabContext.refresh();
                    });
                }
            }}
            onTransitionEnd={(event) => {
                if ( event.target === form.current ) {
                    event.target.reset();
                }
            }}
        >
            <span className="float-title">{ tabContext.formFloat.value().edit ? "Update Resident Record" : "Add Resident Record"}</span>
            <div className="inputs-container">
                <div className="inputs-container__left">
                    <div className="inputs-name-container">
                        {/* <span>Name</span> */}
                        <label htmlFor="firstname">Firstname</label>
                        <input type="text" id="firstname" placeholder="Firtname"  required defaultValue={tabContext.formFloat.value().edit ? tabContext.formFloat.value().data.fname : ""}/>
                        <label htmlFor="lastname">Lastname</label>
                        <input type="text" id="lastname" placeholder="Lastname" required defaultValue={tabContext.formFloat.value().edit ? tabContext.formFloat.value().data.lname : ""}/>
                        <label htmlFor="middlename">Middlename</label>
                        <input type="text" id="middlename" placeholder="Middlename"  defaultValue={tabContext.formFloat.value().edit ? tabContext.formFloat.value().data.mname : ""}/>
                        <label htmlFor="suffix">Suffix</label>
                        <input type="text" id="suffix" placeholder="Ex. Jr Sr II IV" defaultValue={tabContext.formFloat.value().edit ? tabContext.formFloat.value().data.suffix : ""}/>
                    </div>
                    <div className="inputs-contact-container">
                        {/* <span>Contact</span> */}
                        <label htmlFor="contact-no-input">Phone Number</label>
                        <input type="tel" pattern={"09[0-9]{9}"} placeholder={"09xxxxxxxxx"} id="contact-no-input" defaultValue={tabContext.formFloat.value().edit ? tabContext.formFloat.value().data.contact_no : ""}/>
                        <label htmlFor="email-input">Email</label>
                        <input type="email" id="email-input" placeholder="Email" defaultValue={tabContext.formFloat.value().edit ? tabContext.formFloat.value().data.email : ""}/>
                    </div>
                    <div className="inputs-religion-container">
                        {/* <span>Religion</span> */}
                        <label htmlFor="religion-input">Religion</label>
                        <input type="text" id="religion-input" placeholder="Religion" defaultValue={tabContext.formFloat.value().edit ? tabContext.formFloat.value().data.religion : ""}/>
                    </div>
                </div>
                <div className="inputs-container__right">
                    <div className="inputs-birthdate-container">
                        {/* <span>Birthdate</span> */}
                        <div className="inputs-birthdate-wrapper">
                            {/* <input type="number" id="birthyear" placeholder="YYYY" min={0} required defaultValue={tabContext.formFloat.value().edit ? tabContext.formFloat.value().data.bdate.split("-")[0] : ""}/> */}
                            {/* <select id="birthmonth"
                                defaultValue={tabContext.formFloat.value().edit ? tabContext.formFloat.value().data.bdate.split("-")[1] : "01"}
                                options={[
                                    { value : "01", label : "January" },
                                    { value : "02", label : "February" },
                                    { value : "03", label : "March" },
                                    { value : "04", label : "April" },
                                    { value : "05", label : "May" },
                                    { value : "06", label : "June" },
                                    { value : "07", label : "July" },
                                    { value : "08", label : "August" },
                                    { value : "09", label : "September" },
                                    { value : "10", label : "October" },
                                    { value : "11", label : "November" },
                                    { value : "12", label : "December" },
                                ]}
                            >
                                <option value="01">January</option>
                                <option value="02">February</option>
                                <option value="03">March</option>
                                <option value="04" selected>April</option>
                                <option value="05">May</option>
                                <option value="06">June</option>
                                <option value="07">July</option>
                                <option value="08">August</option>
                                <option value="09">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select> */}
                            <label htmlFor="birthdate">Birthdate</label>
                            <input type="date" id="birthdate" defaultValue={tabContext.formFloat.value().edit ? tabContext.formFloat.value().data.bdate !== null ? tabContext.formFloat.value().data.bdate.split("T")[0] : "" : ""} />
                            {/* <input type="number" id="birthday" placeholder="DD" min={1} max={31} required defaultValue={tabContext.formFloat.value().edit ? tabContext.formFloat.value().data.bdate.split("-")[2] : ""}/> */}
                            <label htmlFor="birthplace">Birthplace</label>
                            <input type="text" id="birthplace" placeholder="Birthplace" defaultValue={tabContext.formFloat.value().edit ? tabContext.formFloat.value().data.birthplace : ""}/>
                        </div>
                    </div>
                    <div className="inputs-location-container">
                        {/* <span>Location</span> */}
                        <label htmlFor="address-input">Address</label>
                        <input type="text" id="address-input" placeholder="Full Address" defaultValue={tabContext.formFloat.value().edit ? tabContext.formFloat.value().data.address : ""}/>
                        <div className="inputs-location-wrapper">
                            <label htmlFor="purok-input">Purok</label>
                            <input type="number" id="purok-input" min={1} max={7} defaultValue={tabContext.formFloat.value().edit ? tabContext.formFloat.value().data.purok : ""}/>
                            <label htmlFor="house-no-input">House Number</label>
                            <input type="number" id="house-no-input"  defaultValue={tabContext.formFloat.value().edit ? tabContext.formFloat.value().data.house_no : ""}/>
                        </div>
                    </div>
                    <div className="inputs-gender-container">
                        {/* <span>Gender</span> */}
                        <label htmlFor="">Gender</label>
                        <div className="inputs-gender-wrapper">
                            <input type="radio" name="gender" value={0} id="gender-male" defaultChecked={
                                tabContext.formFloat.value().edit ? tabContext.formFloat.value().data.gender === 0 ?
                                true : false : true
                            }/>
                            <label htmlFor="gender-male">Male</label>
                            <input type="radio" name="gender" value={1} id="gender-female" defaultChecked={
                                tabContext.formFloat.value().edit ? tabContext.formFloat.value().data.gender === 1 ?
                                true : false : false
                            }/>
                            <label htmlFor="gender-female">Female</label>
                        </div>
                    </div>
                    <div className="inputs-voter-container">
                        {/* <span>Voter</span> */}
                        <label htmlFor="">Voter</label>
                        <div className="inputs-voter-wrapper">
                            <input type="radio" name="voter" value={1} id="voter-true" defaultChecked={
                                tabContext.formFloat.value().edit ? tabContext.formFloat.value().data.registered === 1 ?
                                true : false : false }/>
                            <label htmlFor="voter-true">True</label>
                            <input type="radio" name="voter" value={0} id="voter-false" defaultChecked={
                                tabContext.formFloat.value().edit ? tabContext.formFloat.value().data.registered === 0 ?
                                true : false : true }/>
                            <label htmlFor="voter-false">False</label>
                        </div>
                    </div>
                    <div className="inputs-civilstatus-container">
                        <label htmlFor="civil-status">Civil Status</label>
                        <input type="text" id="civil-status" placeholder="Civil Status" defaultValue={tabContext.formFloat.value().edit ? tabContext.formFloat.value().data.civil_status : ""}/>
                    </div>
                </div>
            </div>
            <div className="form-float-buttons-container">
                <button className="form-float-submit" >{ tabContext.formFloat.value().edit ? "Update" : "Submit"}</button>
                <button
                    type="button"
                    className="form-float-reset"
                    onClick={() => {
                        form.current.reset();
                    }}
                >Reset</button>
                <button
                    type="button"
                    className="form-float-cancel"
                    onClick={() => {
                        tabContext.formFloat.hide();
                    }}
                >Close</button>
            </div>
            <div className={"record-updated-notif " + (updateNotif ? "show" : "")}
                onAnimationEnd={() => {
                    setUpdateNotif(false);
                }}
            >
                Record Updated
            </div>
        </form>
    );

}

export default ResidentFormFloat;
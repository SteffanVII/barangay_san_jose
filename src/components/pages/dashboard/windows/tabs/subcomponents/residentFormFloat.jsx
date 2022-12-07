import { useContext, useLayoutEffect, useRef } from "react";
import Select from "react-select";
import { residentsTabContext } from "../residentsTab";
import "./residentFormFloat.scss";

function ResidentFormFloat() {

    const tabContext = useContext(residentsTabContext);
    const form = useRef(null);

    return (
        <form
            ref={form}
            id="resident-form-float"
            className={ tabContext.formFloat.value().value ?  "show" : "" }
            onSubmit={(event) => {
                event.preventDefault();
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
                        <span>Name</span>
                        <input type="text" id="firstname" placeholder="Firstname" required defaultValue={tabContext.formFloat.value().edit ? tabContext.formFloat.value().data.fname : ""}/>
                        <input type="text" id="lastname" placeholder="Lastname" required defaultValue={tabContext.formFloat.value().edit ? tabContext.formFloat.value().data.lname : ""}/>
                        <input type="text" id="middlename" placeholder="Middlename" defaultValue={tabContext.formFloat.value().edit ? tabContext.formFloat.value().data.mname : ""}/>
                        <input type="text" id="suffix" placeholder="Suffix Ex. Jr Sr II IV" defaultValue={tabContext.formFloat.value().edit ? tabContext.formFloat.value().data.suffix : ""}/>
                    </div>
                    <div className="inputs-contact-container">
                        <span>Contact</span>
                        <input type="number" id="contact-no-input" placeholder="Contact Number" defaultValue={tabContext.formFloat.value().edit ? tabContext.formFloat.value().data.contact_no : ""}/>
                        <input type="email" id="email-input" placeholder="Email" defaultValue={tabContext.formFloat.value().edit ? tabContext.formFloat.value().data.email : ""}/>
                    </div>
                    <div className="inputs-religion-container">
                        <span>Religion</span>
                        <input type="text" id="religion-input" placeholder="Religion" defaultValue={tabContext.formFloat.value().edit ? tabContext.formFloat.value().data.religion : ""}/>
                    </div>
                </div>
                <div className="inputs-container__right">
                    <div className="inputs-birthdate-container">
                        <span>Birthdate</span>
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
                            <input type="date" id="birthdate" defaultValue={tabContext.formFloat.value().edit ? tabContext.formFloat.value().data.bdate : ""} />
                            {/* <input type="number" id="birthday" placeholder="DD" min={1} max={31} required defaultValue={tabContext.formFloat.value().edit ? tabContext.formFloat.value().data.bdate.split("-")[2] : ""}/> */}
                            <input type="text" id="birthplace" placeholder="Birthplace"/>
                        </div>
                    </div>
                    <div className="inputs-location-container">
                        <span>Location</span>
                        <input type="text" id="address-input" placeholder="Full Address" required defaultValue={tabContext.formFloat.value().edit ? tabContext.formFloat.value().data.address : ""}/>
                        <div className="inputs-location-wrapper">
                            <input type="number" id="purok-input" placeholder="Purok Number" required defaultValue={tabContext.formFloat.value().edit ? tabContext.formFloat.value().data.purok : ""}/>
                            <input type="number" id="house-no-input" placeholder="House Number" defaultValue={tabContext.formFloat.value().edit ? tabContext.formFloat.value().data.house_no : ""}/>
                        </div>
                    </div>
                    <div className="inputs-gender-container">
                        <span>Gender</span>
                        <div className="inputs-gender-wrapper">
                            <input type="radio" name="gender" id="gender-male" defaultChecked={
                                tabContext.formFloat.value().edit ? tabContext.formFloat.value().data.gender === 0 ?
                                true : false : true
                            }/>
                            <label htmlFor="gender-male">Male</label>
                            <input type="radio" name="gender" id="gender-female" defaultChecked={
                                tabContext.formFloat.value().edit ? tabContext.formFloat.value().data.gender === 1 ?
                                true : false : false
                            }/>
                            <label htmlFor="gender-female">Female</label>
                        </div>
                    </div>
                    <div className="inputs-voter-container">
                        <span>Voter</span>
                        <div className="inputs-voter-wrapper">
                            <input type="radio" name="voter" id="voter-true" defaultChecked={
                                tabContext.formFloat.value().edit ? tabContext.formFloat.value().data.registered === 1 ?
                                true : false : false }/>
                            <label htmlFor="voter-true">True</label>
                            <input type="radio" name="voter" id="voter-false" defaultChecked={
                                tabContext.formFloat.value().edit ? tabContext.formFloat.value().data.registered === 0 ?
                                true : false : true }/>
                            <label htmlFor="voter-false">False</label>
                        </div>
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
        </form>
    );

}

export default ResidentFormFloat;
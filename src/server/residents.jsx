
export function getResidentsAll( query, callback ) {
    
    let xhr = new XMLHttpRequest();

    let params = `?entries=${query.entries}&page=${query.page}`;

    if ( query.firstname !== "" ) {
        params += `&firstname=${query.firstname}`;
    }
    if ( query.lastname !== "" ) {
        params += `&lastname=${query.lastname}`;
    }
    if ( query.middlename !== "" ) {
        params += `&middlename=${query.middlename}`;
    }
    if ( query.age != -1 ) {
        params += `&age=${query.age}`;
    }
    if ( query.byRange.enabled ) {
        params += `&agemin=${query.byRange.min}&agemax=${query.byRange.max}`;
    }
    if ( query.gender !== -1 ) {
        params += `&gender=${query.gender}`;
    }
    if ( query.purok !== -1 ) {
        params += `&purok=${query.purok}`;
    }

    xhr.open("GET", process.env.REACT_APP_API_URL + "/residents/getresidentsall" + params);
    xhr.withCredentials = true;
    xhr.onreadystatechange = () => {
        if ( xhr.readyState === 4 && xhr.status === 200 ) {
            callback(JSON.parse(xhr.response)); 
        }
    }
    xhr.send();
}

export function registerResident( data, callback ) {

    let xhr = new XMLHttpRequest();

    xhr.open( "POST", process.env.REACT_APP_API_URL + "/residents/registerresident" );
    xhr.withCredentials = true;
    xhr.setRequestHeader("content-type", "application/json");
    xhr.onreadystatechange = () => {
        if ( xhr.readyState === 4 && xhr.status === 200 ) {
            callback();
        }
    }
    xhr.send(JSON.stringify(data));
    
}

export function updateResident( data, callback ) {

    let xhr = new XMLHttpRequest();
    
    xhr.open( "PATCH", process.env.REACT_APP_API_URL + "/residents/updateresident" );
    xhr.withCredentials = true;
    xhr.setRequestHeader("content-type", "application/json");
    xhr.onreadystatechange = () => {
        if ( xhr.readyState === 4 && xhr.status === 200 ) {
            callback();
        }
    }
    xhr.send(JSON.stringify(data));

}
export function getDocumentRequestsList( query, callback ) {
    const xhr = new XMLHttpRequest();

    let params = `?type=${query.controller.type}&status=${query.controller.status}&searchtype=${query.controller.searchtype}&searchvalue=${query.controller.searchvalue}`;

    xhr.open( "GET", process.env.REACT_APP_API_URL + "/requests/requestslist" + params);
    xhr.withCredentials = true;
    xhr.onreadystatechange = () => {
        if ( xhr.status === 200 && xhr.readyState === 4 ) {
            callback(JSON.parse(xhr.response));
        }
    }
    xhr.send();
}

export function getDocumentRequestInfo( id, callback ) {
    const xhr = new XMLHttpRequest();

    let params = `?id=${id}`;

    xhr.open( "GET", process.env.REACT_APP_API_URL + "/requests/requestinfo" + params );
    xhr.withCredentials = true;
    xhr.onreadystatechange = () => {
        if ( xhr.status === 200 && xhr.readyState === 4 ) {
            callback( JSON.parse(xhr.response) );
        }
    }
    xhr.send();
}

export function changeDocumentRequestStatus( id, status, callback ) {

    const xhr = new XMLHttpRequest();

    let params = `?statusTo=${status}&id=${id}`;

    xhr.open( "PATCH", process.env.REACT_APP_API_URL + "/requests/changeStatus" + params );
    xhr.withCredentials = true;
    xhr.onreadystatechange = () => {
        if ( xhr.status === 204 && xhr.readyState === 4 ) {
            callback();
        }
    }
    xhr.send();

}
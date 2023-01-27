export function getEvents( callback ) {

    let xhr = new XMLHttpRequest();

    xhr.open( 'GET', process.env.REACT_APP_API_URL + '/events/get' );
    xhr.withCredentials = true;
    xhr.onreadystatechange = () => {
        if ( xhr.readyState === 4 && xhr.status === 200 ) {
            callback(JSON.parse(xhr.response));
        }
    }
    xhr.send();

}

export function addEvent( data, callback ) {

    let xhr = new XMLHttpRequest();

    console.log(data);

    xhr.open('POST', process.env.REACT_APP_API_URL + '/events/post');
    xhr.withCredentials = true;
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onreadystatechange = () => {
        if ( xhr.readyState === 4 && xhr.status === 200 ) {
            callback(JSON.parse(xhr.response));
        }
    }
    xhr.send(JSON.stringify(data));

}

export function removeEvent( data, callback ) {

    let xhr = new XMLHttpRequest();

    xhr.open('DELETE', process.env.REACT_APP_API_URL + '/events/delete');
    xhr.withCredentials = true;
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onreadystatechange = () => {
        if ( xhr.readyState === 4 && xhr.status === 200 ) {
            callback(JSON.parse(xhr.response));
        }
    }
    xhr.send(JSON.stringify(data));

}

export function updateEvent( data, callback ) {

    let xhr = new XMLHttpRequest();

    xhr.open('PATCH', process.env.REACT_APP_API_URL + '/events/update');
    xhr.withCredentials = true;
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onreadystatechange = () => {
        if ( xhr.readyState === 4 && xhr.status === 200 ) {
            callback(JSON.parse(xhr.response));
        }
    }
    xhr.send(JSON.stringify(data));

}
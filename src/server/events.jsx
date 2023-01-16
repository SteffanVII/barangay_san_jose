export function getEvents( callback ) {

    let xhr = new XMLHttpRequest();

    xhr.open( 'GET', 'http://localhost:5000/events/get' );
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

    xhr.open('POST', 'http://localhost:5000/events/post');
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

    xhr.open('DELETE', 'http://localhost:5000/events/delete');
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

    xhr.open('PATCH', 'http://localhost:5000/events/update');
    xhr.withCredentials = true;
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onreadystatechange = () => {
        if ( xhr.readyState === 4 && xhr.status === 200 ) {
            callback(JSON.parse(xhr.response));
        }
    }
    xhr.send(JSON.stringify(data));

}
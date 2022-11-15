const xhr = new XMLHttpRequest();

export function getCount( callback ) {
    xhr.open("get", "http://localhost:5000/residents/gettotalresidents");
    xhr.onreadystatechange = ( ) => {
        if ( xhr.readyState === 4 && xhr.status === 200 ) {
            callback(xhr.response);
        }
    }
    xhr.send();
}
export function addReceipt( data, callback ) {

    let xhr = new XMLHttpRequest();

    xhr.open("POST", process.env.REACT_APP_API_URL + "/receipts/add");
    xhr.withCredentials = true;
    xhr.setRequestHeader("content-type", "application/json");
    xhr.onreadystatechange = () => {
        if ( xhr.readyState === 4 && xhr.status === 200 ) {
            callback(JSON.parse(xhr.response));
        }
    }
    xhr.send(JSON.stringify(data));

}

export function getReceipts( callback ) {

    let xhr = new XMLHttpRequest();

    xhr.open("GET", process.env.REACT_APP_API_URL + "/receipts/get");
    xhr.withCredentials = true;
    xhr.onreadystatechange = () => {
        if ( xhr.readyState === 4 && xhr.status === 200 ) {
            callback( JSON.parse(xhr.response) );
        }
    }
    xhr.send();

}

export function deleteReceipt( number, callback ) {

    let xhr = new XMLHttpRequest();

    let params = { receipt_number : number };

    xhr.open("DELETE", process.env.REACT_APP_API_URL + "/receipts/delete");
    xhr.withCredentials = true;
    xhr.setRequestHeader("content-type", "application/json");
    xhr.onreadystatechange = () => {
        if ( xhr.readyState === 4 && xhr.status === 200 ) {
            callback( JSON.parse(xhr.response) );
        }
    }

    xhr.send(JSON.stringify(params));

}

export function getFixedTransactionCounters( callback ) {

    let xhr = new XMLHttpRequest();

    xhr.open( "GET", process.env.REACT_APP_API_URL + "/receipts/fixedcounters" );
    xhr.withCredentials = true;
    xhr.onreadystatechange = () => {
        if ( xhr.readyState === 4 && xhr.status === 200 ) {
            callback( JSON.parse(xhr.response) );
        }
    }
    xhr.send();

}
export function addReceipt( data, callback ) {

    let xhr = new XMLHttpRequest();

    xhr.open("POST", "http://localhost:5000/receipts/add");
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

    xhr.open("GET", "http://localhost:5000/receipts/get");
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

    xhr.open("DELETE", "http://localhost:5000/receipts/delete");
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

    xhr.open( "GET", "http://localhost:5000/receipts/fixedcounters" );
    xhr.withCredentials = true;
    xhr.onreadystatechange = () => {
        if ( xhr.readyState === 4 && xhr.status === 200 ) {
            callback( JSON.parse(xhr.response) );
        }
    }
    xhr.send();

}
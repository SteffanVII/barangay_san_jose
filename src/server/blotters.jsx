
export function getBlotters( args, callback ) {

    const xhr = new XMLHttpRequest();

    xhr.open("GET", process.env.REACT_APP_API_URL + `/blotters/getblotters?searchtype=${args.searchtype}&searchvalue=${args.searchvalue}&status=${args.status}&offset=${args.offset}&order=${args.order}`);
    xhr.withCredentials = true;
    xhr.onreadystatechange = () => {
        if ( xhr.status === 200 && xhr.readyState === 4 ) {
            callback(JSON.parse(xhr.response));
        }
    }
    xhr.send();

}

export function getBlotterInfo( id, callback ) {

    const xhr = new XMLHttpRequest();

    xhr.open('GET', process.env.REACT_APP_API_URL + `/blotters/getblotterinfo?case=${id}`);
    xhr.withCredentials = true;
    xhr.onreadystatechange = () => {
        if ( xhr.status === 200 && xhr.readyState === 4 ) {
            callback(JSON.parse(xhr.response));
        }
    }
    xhr.send();

}

export function patchBlotterInfo( data, callback ) {

    const xhr = new XMLHttpRequest();

    xhr.open('PATCH', process.env.REACT_APP_API_URL + `/blotters/patchblotterinfo`);
    xhr.withCredentials = true;
    xhr.setRequestHeader("content-type", 'application/json');
    xhr.onreadystatechange = () => {
        if ( xhr.status === 200 && xhr.readyState === 4 ) {
            callback();
        }
    }
    xhr.send(JSON.stringify(data));

}

export function deleteBlotterInfo(  caseno, callback ) {

    const xhr = new XMLHttpRequest();

    xhr.open('DELETE', process.env.REACT_APP_API_URL + `/blotters/deleteblotterinfo?caseno=${caseno}`);
    xhr.withCredentials = true;
    xhr.onreadystatechange = () => {
        if ( xhr.status === 200 && xhr.readyState === 4 ) {
            callback();
        }
    }
    xhr.send();

}

export function registerBlotter( data, callback ) {

    const xhr = new XMLHttpRequest();

    xhr.open( 'POST', process.env.REACT_APP_API_URL + `/blotters/registerblotter` );
    xhr.withCredentials = true;
    xhr.setRequestHeader("content-type", "application/json");
    xhr.onreadystatechange = () => {
        if ( xhr.readyState === 4 ) {
            if ( xhr.status === 200 ) callback( xhr.status, JSON.parse(xhr.response) );
            if ( xhr.status === 409 ) callback( xhr.status );
        }
    }
    xhr.send(JSON.stringify(data));

}
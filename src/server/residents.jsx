
export function getResidentsAll( query, callback ) {
    let xhr = new XMLHttpRequest();

    let params = "?" + "entries=" + query.entries + "&page=" + query.page;

    xhr.open("GET", "http://localhost:5000/residents/getresidentsall" + params);
    xhr.onreadystatechange = () => {
        if ( xhr.readyState === 4 && xhr.status === 200 ) {
            callback(JSON.parse(xhr.response));
        }
    }
    xhr.send();
}
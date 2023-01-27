
function getDashboardData( callback ) {
    let xhr = new XMLHttpRequest
    
    xhr.open("GET", process.env.REACT_APP_API_URL + "/dashboard");
    xhr.withCredentials = true;
    xhr.onreadystatechange = () => {
        if ( xhr.readyState == 4 && xhr.status === 200 ) {
            callback(JSON.parse(xhr.response));
        }
    }
    xhr.send();

}

module.exports = { getDashboardData };
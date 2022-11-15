
function getDashboardData( callback ) {
    let xhr = new XMLHttpRequest
    
    xhr.open("GET", "http://localhost:5000/dashboard");
    xhr.onreadystatechange = () => {
        if ( xhr.readyState == 4 && xhr.status === 200 ) {
            callback(JSON.parse(xhr.response));
        }
    }
    xhr.send();

}

module.exports = { getDashboardData };
const authxhr = new XMLHttpRequest();

function authenticate( callback ) {
    authxhr.open("post", process.env.REACT_APP_API_URL + "/admin/authenticate");
    authxhr.withCredentials = true;
    authxhr.onreadystatechange = () => {
        if ( authxhr.readyState === 4 && authxhr.status === 200 ) {
            callback(JSON.parse(authxhr.response));
        }
    }
    authxhr.send();
}

function login( email, password, callback ) {
    authxhr.open("post", process.env.REACT_APP_API_URL + "/admin/login");
    authxhr.setRequestHeader("content-type", "application/json");
    authxhr.withCredentials = true;
    authxhr.onreadystatechange = () => {
        if ( authxhr.readyState === 4 && authxhr.status === 200 ) {
            let res = JSON.parse(authxhr.response);
            if ( res.email ) {
                document.cookie = "";
                console.log(document.cookie);
                document.cookie = `admin=${res.email};`;
                console.log(document.cookie);
            }
            callback( res );
        }
    }
    authxhr.send(JSON.stringify({
        email : email,
        password : password
    }));
}

function logout( callback ) {
    authxhr.open("post", process.env.REACT_APP_API_URL + "/admin/logout");
    authxhr.onreadystatechange = () => {
        if ( authxhr.readyState === 4 && authxhr.status === 200 ) {
            callback( authxhr.status );
        }
    }
    authxhr.send();
}

module.exports = { authenticate, login, logout };
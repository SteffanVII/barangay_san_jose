const authxhr = new XMLHttpRequest();

function authenticate( callback ) {
    authxhr.open("post", "http://localhost:5000/admin/authenticate");
    authxhr.withCredentials = true;
    authxhr.onreadystatechange = () => {
        if ( authxhr.readyState === 4 && authxhr.status === 200 ) {
            callback(JSON.parse(authxhr.response));
        }
    }
    authxhr.send();
}

function login( email, password, callback ) {
    authxhr.open("post", "http://localhost:5000/admin/login");
    authxhr.setRequestHeader("content-type", "application/json");
    authxhr.withCredentials = true;
    authxhr.onreadystatechange = () => {
        if ( authxhr.readyState === 4 && authxhr.status === 200 ) {
            callback( JSON.parse(authxhr.response) );
        }
    }
    authxhr.send(JSON.stringify({
        email : email,
        password : password
    }));
}

function logout( callback ) {
    authxhr.open("post", "http://localhost:5000/admin/logout");
    authxhr.onreadystatechange = () => {
        if ( authxhr.readyState === 4 && authxhr.status === 200 ) {
            callback( authxhr.status );
        }
    }
    authxhr.send();
}

module.exports = { authenticate, login, logout };
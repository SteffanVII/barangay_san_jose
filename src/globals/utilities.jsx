
function parseCookie() {
    let cookie = document.cookie;

    let o = {};

    cookie.split(/\s*;\s*/).forEach( s => {
        s = s.split("=");
        o[s[0]] = JSON.parse(decodeURIComponent(s[1]));
    });

    return o;
}

module.exports = { parseCookie };

function parseCookie() {
    let cookie = document.cookie;

    let o = {};

    cookie.split(/\s*;\s*/).forEach( s => {
        s = s.split("=");
        o[s[0]] = JSON.parse(decodeURIComponent(s[1]));
    });

    return o;
}

function parseAge( birthdate ) {
    let yy = new Date().getFullYear();
    let by = birthdate.split("-")[0];
    return parseInt(yy) - parseInt(by);
}

const monthsMap = new Map([
    [ "01", "January" ],
    [ "02", "February" ],
    [ "03", "March" ],
    [ "04", "April" ],
    [ "05", "May" ],
    [ "06", "June" ],
    [ "07", "July" ],
    [ "08", "August" ],
    [ "09", "September" ],
    [ "10", "October" ],
    [ "11", "November" ],
    [ "12", "December" ],
]);

module.exports = { parseCookie, parseAge, monthsMap };
const download = require("downloadjs");
const { PDFDocument } = require("pdf-lib");
 
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
    [ 1, "January" ],
    [ 2, "February" ],
    [ 3, "March" ],
    [ 4, "April" ],
    [ 5, "May" ],
    [ 6, "June" ],
    [ 7, "July" ],
    [ 8, "August" ],
    [ 9, "September" ],
    [ 10, "October" ],
    [ 11, "November" ],
    [ 12, "December" ],
]);

function generateBarangayClearance( data ) {

    let xhr = new XMLHttpRequest();
    
    xhr.open("GET", "http://localhost:3000/CERTIFICATE-OF-RESIDENCY.pdf");
    xhr.responseType = "arraybuffer";
    xhr.onreadystatechange = async () => {
        if ( xhr.readyState === 4 && xhr.status === 200 ) {
            try {
                const doc = await PDFDocument.load( xhr.response );
        
                const form = doc.getForm();

                form.getTextField("name").setText(data.name);

                const save = await doc.save();

                download( save, `Barangay-clearance-${data.name}.pdf` );
        
            } catch ( err ) {
                console.log(err);
                return;
            }
        }
    };
    xhr.send();

}

module.exports = { parseCookie, parseAge, monthsMap, generateBarangayClearance };
import { useLayoutEffect } from "react";

const download = require("downloadjs");
const { PDFDocument } = require("pdf-lib");
 
export function parseCookie() {
    let cookie = document.cookie;

    let o = {};

    cookie.split(/\s*;\s*/).forEach( s => {
        s = s.split("=");
        o[s[0]] = decodeURIComponent(s[1]);
    });

    return o;
}

export function parseAge( birthdate ) {
    let yy = new Date().getFullYear();
    let by = birthdate.split("-")[0];
    return parseInt(yy) - parseInt(by);
}

export const monthsMap = new Map([
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

export function useClickOutside( rootElement, callback ) {

    const func = (e) => {
        if ( !rootElement.current.contains(e.target) ) {
            callback();
        }
    }

    useLayoutEffect(() => {
        document.addEventListener('click', func);

        return () => {
            document.removeEventListener('click', func);
        }
    })


    // return () => {
    //     document.removeEventListener('click', func);
    // }
}

export function generateBarangayClearance( data ) {

    let xhr = new XMLHttpRequest();
    
    xhr.open("GET", "https://barangaysanjose.website/BARANGAY-CLEARANCE.pdf");
    xhr.responseType = "arraybuffer";
    xhr.onreadystatechange = async () => {
        if ( xhr.readyState === 4 && xhr.status === 200 ) {
            try {
                const doc = await PDFDocument.load( xhr.response );
        
                const form = doc.getForm();

                let d = new Date();
                let yy = d.getFullYear().toString();
                let mm = monthsMap.get(parseInt(d.getMonth() + 1));
                let dd = d.getDate().toString();

                form.getTextField("name").setText(data.name);
                form.getTextField("purok").setText(`Purok ${data.purok.toString()}`);
                form.getTextField("date").setText(`${mm} ${dd}, ${yy}`);

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

export function generateBussinessClearance( data ) {

    let xhr = new XMLHttpRequest();

    xhr.open( "GET", "https://barangaysanjose.website/BUSSINESS-PERMIT.pdf" );
    xhr.responseType = "arraybuffer";
    xhr.onreadystatechange = async () => {
        if ( xhr.readyState === 4 && xhr.status === 200 ) {
            try {
                let doc = await PDFDocument.load( xhr.response );
                let form = doc.getForm();

                let d = new Date();
                let yy = d.getFullYear().toString().slice(2);
                let mm = monthsMap.get(parseInt(d.getMonth() + 1));
                let dd = d.getDate().toString();

                form.getTextField("busname").setText(data.bussiness_name);
                form.getTextField("ownername").setText(data.name);
                form.getTextField("busaddress").setText(data.bussiness_address);
                form.getTextField("busdescription").setText(data.bussiness_description);
                form.getTextField("day").setText(dd);
                form.getTextField("month").setText(mm);
                form.getTextField("year").setText(yy);

                const save = await doc.save();

                download( save, `Bussiness-clearance-${data.name}.pdf` );

            } catch ( err ) {
                console.log(err);
                return;
            }
        }
    }
    xhr.send();

}

export function generateResidency( data ) {

    let xhr = new XMLHttpRequest();

    xhr.open( "GET", "https://barangaysanjose.website/CERTIFICATE-OF-RESIDENCY.pdf" );
    xhr.responseType = 'arraybuffer';
    xhr.onreadystatechange = async () => {
        if ( xhr.readyState === 4 && xhr.status === 200 ) {
            try {

                let doc = await PDFDocument.load( xhr.response );
                let form = doc.getForm();

                let d = new Date();
                let yy = d.getFullYear().toString().slice(2);
                let mm = monthsMap.get(parseInt(d.getMonth() + 1));
                let dd = d.getDate().toString();

                form.getTextField("name").setText(data.name);
                form.getTextField("day").setText(dd);
                form.getTextField("month").setText(mm);
                form.getTextField("year").setText(yy);

                const save = await doc.save();

                download( save, `Certificate-of-residency-${data.name}.pdf` );

            } catch ( err ) {
                console.log(err);
                return;
            }
        }
    }
    xhr.send();

}

// module.exports = { parseCookie, parseAge, monthsMap, generateBarangayClearance, generateBussinessClearance, generateResidency, useClickOutside };
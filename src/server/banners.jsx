
export function uploadBanner( file, callback ) {

    let xhr = new XMLHttpRequest();

    let formdata = new FormData();
    formdata.append("banner", file);

    xhr.open( "POST", "http://localhost:5000/banners/upload" );
    xhr.withCredentials = true;
    // xhr.setRequestHeader("content-type", "multipart/form-data");
    xhr.onreadystatechange = () => {
        if ( xhr.readyState === 4 && xhr.status === 200 ) {
            callback(JSON.parse(xhr.response));
        }
    }
    xhr.send(formdata);

}

export function getBanners( callback ) {
    
    let xhr = new XMLHttpRequest();

    xhr.open( "GET", "http://localhost:5000/banners/getbanners" );
    xhr.withCredentials = true;
    xhr.onreadystatechange = () => {
        if ( xhr.readyState === 4 && xhr.status === 200 ) {
            callback(JSON.parse(xhr.response));
        }
    }
    xhr.send();

}

export function updateBannerStatus( data, callback ) {

    let xhr = new XMLHttpRequest();

    xhr.open( "PATCH", "http://localhost:5000/banners/updatestatus" );
    xhr.withCredentials = true;
    xhr.setRequestHeader( "content-type", "application/json" );
    xhr.onreadystatechange = () => {
        if ( xhr.readyState === 4 && xhr.status === 200 ) {
            callback((JSON.parse(xhr.response)));
        }
    }
    xhr.send( JSON.stringify(data) );

}

export function deleteBanner( data, callback ) {

    let xhr =new XMLHttpRequest();

    xhr.open( "DELETE", "http://localhost:5000/banners/deletebanner" );
    xhr.withCredentials = true;
    xhr.setRequestHeader( "content-type", "application/json" );
    xhr.onreadystatechange = () => {
        if ( xhr.readyState === 4 && xhr.status === 200 ) {
            callback(JSON.parse(xhr.response));
        }
    }
    xhr.send(JSON.stringify(data));

}

export function repositionBanners( data, callback ) {

    let xhr = new XMLHttpRequest();
    xhr.open( "PATCH", "http://localhost:5000/banners/reposition" );
    xhr.withCredentials = true;
    xhr.setRequestHeader( "content-type", "application/json" );
    xhr.onreadystatechange = () => {
        if ( xhr.readyState === 4 && xhr.status === 200 ) {
            callback(JSON.parse(xhr.response));
        }
    }
    xhr.send(JSON.stringify(data));

}

export function fetchBanners( callback ) {
    let xhr = new XMLHttpRequest();

    xhr.open( "GET", "http://localhost:5000/public/fetchbanners" );
    xhr.onreadystatechange = () => {
        if ( xhr.readyState === 4 ) callback( xhr.status, JSON.parse(xhr.response) );
    }
    xhr.send();
}
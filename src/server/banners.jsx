
export function uploadBanner( file, callback ) {

    let xhr = new XMLHttpRequest();

    let formdata = new FormData();
    formdata.append("banner", file);

    xhr.open( "POST", process.env.REACT_APP_API_URL + "/banners/upload" );
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

    xhr.open( "GET", process.env.REACT_APP_API_URL + "/banners/getbanners" );
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

    xhr.open( "PATCH", process.env.REACT_APP_API_URL + "/banners/updatestatus" );
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

    xhr.open( "DELETE", process.env.REACT_APP_API_URL + "/banners/deletebanner" );
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
    xhr.open( "PATCH", process.env.REACT_APP_API_URL + "/banners/reposition" );
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

    xhr.open( "GET", process.env.REACT_APP_API_URL + "/public/fetchbanners" );
    xhr.onreadystatechange = () => {
        if ( xhr.readyState === 4 ) callback( xhr.status, JSON.parse(xhr.response) );
    }
    xhr.send();
}
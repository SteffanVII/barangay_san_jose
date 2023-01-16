import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

function useLazyLoad( node, callback ) {

    const observer = useRef(new IntersectionObserver( entries => {
        callback( entries[0] );
    } ));

    useEffect( () => {
        observer.current.observe( node.current );
        return () => {
            observer.current.disconnect();
        }
    }, [ node ] );

    return [ node, observer ];
}

export default useLazyLoad;
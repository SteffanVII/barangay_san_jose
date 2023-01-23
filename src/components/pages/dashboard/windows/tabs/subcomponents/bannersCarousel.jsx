import { useEffect, useReducer, useRef } from "react";
import { fetchBanners } from "../../../../../../server/banners";
import  "./bannersCarousel.scss";

const bannersActions = {
    SET : 0,
    NAVIGATORS : 1,
    NAVIGATE : 2,
    PAUSE : 3,
    UNPAUSE : 4,
    AUTONAVIGATE : 5
}

function bannersReducer( state, action ) {
    switch (action.type) {
        case bannersActions.SET:

            state.paths = action.payload;
            console.log(action.payload);
            state.imgs = Array.from(state.paths).map( e => <img src={`http://localhost:5000/serve/${e.path}`} alt={e.filename} loading={"lazy"} /> );

            return {...state};

        case bannersActions.NAVIGATORS:

            state.navigators = Array.from(action.payload).map( ( e, i ) => <div className={`banner-navigator ${state.position === i ? `active` : ``}`} onClick={() => e.onclick(i)} ></div> );

            return {...state};

        case bannersActions.NAVIGATE:
            state.position = action.payload;
            state.pauseAuto = true

            return {...state};

        case bannersActions.AUTONAVIGATE:
            state.position = action.payload;
            state.pauseAuto = false

            return {...state};

        case bannersActions.UNPAUSE:
            state.pauseAuto = false;

            return {...state};
    
        default:
            return state;
    }
}

function Banners() {

    const [ state, dispatch ] = useReducer( bannersReducer, {
        paths : [],
        imgs : [],
        navigators : [],
        position : 0,
        pauseAuto : false
    } )

    const rootElement = useRef(null);
    const imgsContainer = useRef(null);

    const stateRef = useRef(state);

    useEffect(() => {
        fetchBanners( ( status, response ) => {
            if ( status === 200 ) {
                dispatch( {
                    type : bannersActions.SET,
                    payload : response
                } )
            }
        } )

        let bannersInterval = setInterval( () => {
            if ( stateRef.current.paths.length > 0 && !stateRef.current.pauseAuto ) {
                if ( stateRef.current.position == stateRef.current.paths.length - 1 ) {
                    dispatch({
                        type : bannersActions.AUTONAVIGATE,
                        payload : 0
                    });
                } else {
                    dispatch({
                        type : bannersActions.AUTONAVIGATE,
                        payload : stateRef.current.position + 1
                    });
                }
            }
        }, 5000 );

        return () => {
            clearInterval(bannersInterval);
        }
    }, []);

    useEffect(() => {

        dispatch({
            type : bannersActions.NAVIGATORS,
            payload : Array.from(state.paths).map( e => {
                return { data : e, onclick : (i) => {
                    dispatch({
                        type : bannersActions.NAVIGATE,
                        payload : i
                    });
                    setTimeout(() => {
                        if ( stateRef.current.position == stateRef.current.paths.length - 1 ) {
                            dispatch({
                                type : bannersActions.AUTONAVIGATE,
                                payload : 0
                            });
                        } else {
                            dispatch({
                                type : bannersActions.AUTONAVIGATE,
                                payload : stateRef.current.position + 1
                            });
                        }
                    }, 20000);

                } };
            } )
        })

        imgsContainer.current.scroll( {
            left : state.position * rootElement.current.clientWidth,
            behavior : 'smooth'
        } );

        stateRef.current = state;

    }, [state.position, state.paths]);

    return (
        <div ref={rootElement} className={'banners-carousel'} >
            <div ref={imgsContainer} className={'banner-imgs-container'}>
                {state.imgs}
            </div>
            <div className={'banner-imgs-controller'}>
                {state.navigators}
            </div>
        </div>
    );
}

export default Banners;
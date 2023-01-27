import { useState } from "react";
import { useLayoutEffect } from "react";
import { useReducer } from "react";
import { createContext } from "react";
import { useRef, useContext } from "react";
import { getBanners, repositionBanners, uploadBanner } from "../../../../../server/banners";
import "./bannersManagerTab.scss";
import BannerCard from "./subcomponents/bannerCard";
import { dashboardContextImport } from "../../../../../globals/contexts";
import BannerCardLive from "./subcomponents/bannerCardLive";

const bannersManagerTabActionTypes = {
    SETRESULTS : 0,
    SETUPLOAD : 1,
    CLEARUPLOAD : 2,
    RESETPOS : 3,
    REPOS : 4
}

function bannersManagerTabReducer( state, action ) {
    switch (action.type) {
        case bannersManagerTabActionTypes.SETUPLOAD:
            state.file = action.payload;
            URL.revokeObjectURL(state.previewUrl);
            state.previewUrl = URL.createObjectURL(state.file)
            
            return {...state};
            
        case bannersManagerTabActionTypes.CLEARUPLOAD:
            state.file = null;
            URL.revokeObjectURL(state.previewUrl);

            return {...state};

        case bannersManagerTabActionTypes.SETRESULTS:
            state.results = action.payload;
            state.defaultPositions = [...action.payload.live];
            state.cards = state.results.result.map( e => <BannerCard key={e.filename} data={e}/> );
            state.liveCards = state.results.live.map( (e, i) => <BannerCardLive key={`live-${e.filename}`} data={e} index={i} /> );
            
            return {...state};
        
        case bannersManagerTabActionTypes.RESETPOS:
            state.results.live = [...state.defaultPositions];
            state.liveCards = state.results.live.map( (e, i) => <BannerCardLive key={`live-${e.filename}`} data={e} index={i} /> );
            
            return { ...state };
            
        case bannersManagerTabActionTypes.REPOS:
            let el = state.results.live.splice(action.payload.index, 1)[0];
            state.results.live.splice( action.payload.index + action.payload.nIndex, 0, el );
            state.liveCards = state.results.live.map( (e, i) => <BannerCardLive key={`live-${e.filename}`} data={e} index={i} /> );

            return { ...state };
    
        default:
            return {...state};
    }
}

export const bannersTabContextImport = createContext(null);

function BannersManagerTab() {

    const dashboardContext = useContext(dashboardContextImport);

    const uploadInput = useRef(null);

    const [ bannersManagerTabState, bannersManagerTabDispatch ] = useReducer( bannersManagerTabReducer, {
        file : null,
        previewUrl : null,
        results : {},
        cards : [],
        liveCards : [],
    } )

    function clearUpload() {
        bannersManagerTabDispatch({
            type : bannersManagerTabActionTypes.CLEARUPLOAD,
        });
        uploadInput.current.value = null;
    }

    function refresh() {
        getBanners( ( res ) => {
            dashboardContext.timeoutRedirect( res, () => {
                bannersManagerTabDispatch({
                    type : bannersManagerTabActionTypes.SETRESULTS,
                    payload : res
                });
            } )
        } )
    }

    useLayoutEffect(() => {
        refresh();
    }, []);

    return (
        <bannersTabContextImport.Provider
            value={{
                refresh : refresh,
                reposition : ( index, newIndex ) => {
                    bannersManagerTabDispatch({
                        type : bannersManagerTabActionTypes.REPOS,
                        payload : { index : index, nIndex : newIndex }
                    });
                },
                lastIndex : () => {
                    return bannersManagerTabState.results.live.length - 1;
                }
            }}
        >
            <div className="tab"
                id="banners-tab"
            >
                <form className="banners-controller">

                </form>
                <div className="banners-container">
                    <div className="banners-list">
                        {bannersManagerTabState.cards}
                    </div>
                    <div className="banners-editor">
                        <form className={"banner-uploader "}
                            onDragOver={ ( e ) => {
                                e.preventDefault();
                                e.target.classList.add("dragover");
                            } }
                            onDragLeave={ ( e ) => {
                                e.preventDefault();
                                e.target.classList.remove("dragover");
                            } }
                            onDrop={ ( e ) => {
                                e.preventDefault();
                                e.target.classList.remove("dragover");
                                bannersManagerTabDispatch({
                                    type : bannersManagerTabActionTypes.SETUPLOAD,
                                    payload : e.dataTransfer.files[0]
                                });
                            } }
                            onSubmit={(e) => {
                                e.preventDefault();
                                if ( bannersManagerTabState.file !== null ) {
                                    uploadBanner( bannersManagerTabState.file, ( value ) => {
                                        dashboardContext.timeoutRedirect(value, () => {
                                            clearUpload();
                                            refresh();
                                        })
                                    } );
                                }
                            }}
                        >
                            { bannersManagerTabState.file === null &&
                                <span>Drop PNG or JPG file or <span onClick={() => {
                                    uploadInput.current.click();
                                }} >Browse</span></span>
                            }
                            { bannersManagerTabState.file !== null &&
                                <img src={bannersManagerTabState.previewUrl} loading={"lazy"} alt="preview"/>
                            }
                            <input ref={uploadInput}
                                    id="banner-input"
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    onChange={( e ) => {
                                        if( Boolean(e.target.files) ) {
                                            bannersManagerTabDispatch({
                                                type : bannersManagerTabActionTypes.SETUPLOAD,
                                                payload : e.target.files[0]
                                            });
                                        }
                                    }}
                            />
                            <button type="button"
                                onClick={() => {
                                    clearUpload();
                                }}
                            >Clear</button>
                            <button type="submit">Upload</button>
                        </form>
                        <div className="banners-position-list">
                            <div className="banners-position-list-top">
                                <span>Live - {bannersManagerTabState.results.totalLive}</span>
                                <button type="button" className="reset-banners-position-btn"
                                        onClick={() => {
                                            bannersManagerTabDispatch({
                                                type : bannersManagerTabActionTypes.RESETPOS
                                            });
                                        }}
                                >
                                    Reset
                                </button>
                                <button type="button" className="update-banners-position-btn"
                                        onClick={() => {
                                            repositionBanners( bannersManagerTabState.results.live, ( response ) => {
                                                dashboardContext.timeoutRedirect( response, () => {
                                                    refresh();
                                                } )
                                            } );
                                        }}
                                >Apply Order</button>
                            </div>
                            <div className="banners-live-container">
                                {bannersManagerTabState.liveCards}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </bannersTabContextImport.Provider>
    );

}

export default BannersManagerTab;
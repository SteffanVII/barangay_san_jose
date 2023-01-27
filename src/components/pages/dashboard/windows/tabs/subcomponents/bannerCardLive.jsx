import { useContext } from "react";
import { dashboardContextImport } from "../../../../../../globals/contexts";
import { updateBannerStatus } from "../../../../../../server/banners";
import { bannersTabContextImport } from "../bannersManagerTab";
import "./bannerCardLive.scss";

function BannerCardLive( props ) {

    const dashboardContext = useContext(dashboardContextImport);
    const bannersTabContext = useContext(bannersTabContextImport);

    return (
        <div className="live-banner-card">
            <img src={props.data.path} alt={props.data.filename} loading="lazy"/>
            <div className="banner-live-btns-container">
                <span title={props.data.filename} >{props.data.filename}</span>
                {/* <button type="button" className="unlive-btn"
                        onClick={() => {
                            props.data.live = 0;
                            updateBannerStatus( props.data, ( response ) => {
                                dashboardContext.timeoutRedirect( response, () => {
                                    bannersTabContext.refresh();
                                } )
                            } );
                        }}
                >Unlive</button> */}
                <div className="banner-card-position-btns-container">
                    <button type="button"
                        onClick={() => {
                            if ( props.index > 0 ) {
                                bannersTabContext.reposition( props.index, -1 )
                            }
                        }}
                        ></button>
                    <button type="button"
                        onClick={() => {
                            if ( props.index < bannersTabContext.lastIndex() ) {
                                bannersTabContext.reposition( props.index, 1 )
                            }
                        }}
                    ></button>
                </div>
            </div>
        </div>
    );

}

export default BannerCardLive;
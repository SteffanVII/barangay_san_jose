import { useContext } from "react";
import { useLayoutEffect } from "react";
import { dashboardContextImport } from "../../../../../../globals/contexts";
import { deleteBanner, updateBannerStatus } from "../../../../../../server/banners";
import { bannersTabContextImport } from "../bannersManagerTab";
import "./bannerCard.scss";

function BannerCard( props ) {

    const dashboardContext = useContext(dashboardContextImport);
    const bannersTabContext = useContext(bannersTabContextImport);

    return (
        <div className="banner-card">
            <div className={"banner-card-top " + (props.data.live === 1 ? "live" : "" )}>
                <span title={props.data.filename} >{props.data.filename}</span>
                <div className="banner-card-btns-container">
                    <button type="button" className="banner-card-delete"
                            onClick={() => {
                                deleteBanner( props.data, ( response ) => {
                                    dashboardContext.timeoutRedirect( response, () => {
                                        bannersTabContext.refresh();
                                    } )
                                } )
                            }}
                    >Delete</button>
                </div>
                <div className="live-switch">
                    <input type="checkbox" id={`live-checkbox-${props.data.filename}`}
                            onChange={(e) => {
                                props.data.live = e.target.checked ? 1 : 0;
                                updateBannerStatus( props.data, ( response ) => {
                                    dashboardContext.timeoutRedirect( response, () => {
                                        bannersTabContext.refresh();
                                    } );
                                } );
                            }}
                            defaultChecked={Boolean(props.data.live)}
                    />
                    <label htmlFor={`live-checkbox-${props.data.filename}`}>Live</label>
                </div>
            </div>
            <img src={props.data.path} alt={props.data.filename} loading={"lazy"} />
        </div>
    );
}

export default BannerCard;
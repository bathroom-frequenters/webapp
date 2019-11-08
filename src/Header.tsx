import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faWifi } from "@fortawesome/free-solid-svg-icons";
import { ConnectionStatus } from "./types";

type Props = {
    wsStatus: ConnectionStatus;
}

const Header = ({ wsStatus }: Props) => (
    <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
            <a className="navbar-item" href="/">
                Is the Bathroom Available?
            </a>
            <div className="navbar-item connected-status">
                {
                    wsStatus === ConnectionStatus.CONNECTED && (
                        <>
                            <span className="connected-status-message is-hidden-mobile">
                                Connected
                            </span>
                            <span className="icon">
                                <FontAwesomeIcon icon={faWifi}/>
                            </span>
                        </>
                    )
                }

                {
                    wsStatus === ConnectionStatus.DISCONNECTED && (
                        <>
                            <span className="connected-status-message is-hidden-mobile">
                                Disconnected
                            </span>
                            <span className="icon">
                                <FontAwesomeIcon icon={faExclamationTriangle}/>
                            </span>
                        </>
                    )
                }
            </div>
        </div>
    </nav>
);

export default Header;

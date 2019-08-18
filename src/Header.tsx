import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo, faWifi } from "@fortawesome/free-solid-svg-icons";
import { ConnectionStatus } from "./types";

type Props = {
    wsStatus: ConnectionStatus;
    connect?: () => void;
}

const Header = ({ wsStatus, connect }: Props) => (
    <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
            <a className="navbar-item" href="/">
                Is the Bathroom Available?
            </a>

            <a
                role="button"
                className="navbar-burger burger"
                aria-label="menu"
                aria-expanded="false"
                data-target="navbarBasicExample"
            >
                <span aria-hidden="true"/>
                <span aria-hidden="true"/>
                <span aria-hidden="true"/>
            </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-end">
                <div className="navbar-item">
                    <div className="connected-status">
                        {
                            wsStatus === ConnectionStatus.CONNECTED && (
                                <>
                                <span className="connected-status-message">
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
                                <button className="button" onClick={connect}>
                                    <span className="connected-status-message">
                                        Disconnected
                                    </span>
                                        <span className="icon">
                                        <FontAwesomeIcon icon={faRedo}/>
                                    </span>
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    </nav>
);

export default Header;

import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faWifi } from "@fortawesome/free-solid-svg-icons";

type Props = {
    wsConnected: boolean;
}

const Header = ({wsConnected}: Props) => (
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
                        {wsConnected ? (
                            <>
                                <span>
                                    Connected
                                </span>
                                <span className="icon">
                                <FontAwesomeIcon icon={faWifi}/>
                                </span>
                            </>
                        ) : (
                            <>
                                 <span>
                                    Disconnected
                                </span>
                                <span className="icon">
                                    <FontAwesomeIcon icon={faBan}/>
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </nav>
);

export default Header;

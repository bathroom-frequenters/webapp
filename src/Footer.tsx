import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

const Footer = () => (
    <footer className="footer">
        <div className="content has-text-centered">
            <p>
                Made by <a href="https://github.com/tristanmkernan">Tristan</a>{" "}
                with&nbsp;
                <a href="https://reactjs.org/">react</a>,&nbsp;
                <a href="https://bulma.io/">bulma</a> and&nbsp;
                <FontAwesomeIcon icon={faCoffee}/>. The source code is licensed&nbsp;
                <a href="https://opensource.org/licenses/GPL-3.0">GPLv3+</a>. The
                website&nbsp;content is licensed&nbsp;
                <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
                    CC BY NC SA 4.0
                </a>
                .
            </p>
        </div>
    </footer>
);

export default Footer;

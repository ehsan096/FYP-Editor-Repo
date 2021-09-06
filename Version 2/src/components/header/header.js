import React from 'react';
import './header.styles.css';

const Header = () => {
    return (
        <div id="header">
            <ul>
                
                <li className="button">Template</li>
                <li>Undo</li>
                <li>Redo</li>
                <li>Preview</li>
                <li>Save</li>
                <li className="button">Download</li>
            </ul>
        </div>
    );
};

export default Header;
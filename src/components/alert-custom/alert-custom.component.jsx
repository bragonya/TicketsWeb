import React from 'react';

import './alert-custom.styles.scss';
const AlertCustom = ({message, title}) =>(
    <div id="popup1" class="overlay">
        <div class="popup">
            <h2>{title}</h2>
            <span class="close">&times;</span>
            <div class="content">
                {message}
            </div>
        </div>
    </div>
);
export default AlertCustom;
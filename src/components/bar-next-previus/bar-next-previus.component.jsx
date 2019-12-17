import React from 'react';

import './bar-next-previus.styles.scss';
const NextPrevius = () => (
    <div className='bar-next-previus'>
        <div className='previus'>
            <p>Anterior curso &#8617;</p>
        </div>
        <div className='separator-bar-next-previus'></div>
        <div className='next'>
            <p>&#8618; Siguiente curso</p>
        </div>
    </div>
);

export default NextPrevius;
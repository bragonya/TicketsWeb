import React from 'react';

import './card.styles.scss';
const Card = ({ imgURL, title, paragraph, children }) =>(
    <React.Fragment>
        <div className="blog-container">
  
        <div className="blog-header">
            <div className="blog-cover" style={{ backgroundImage: `url(${imgURL})`}}>
            </div>
        </div>

        <div className="blog-body">
            <div className="blog-title">
            <h1><a href="#!">{title}</a></h1>
            </div>
            <div className="blog-summary">
            <p>
                {paragraph}
            </p>
            </div>
            <div className="blog-tags">
            <ul>
                <li><a href="/reservation">Incribirse al curso</a></li>
            </ul>
            </div>
        </div>
  
    <div className="blog-footer">
        <ul>
            {children}
        </ul>
    </div>

    </div>

    </React.Fragment>
);

export default Card;
import React from 'react';
import { connect } from 'react-redux';

import { setSpeaker } from '../../redux/stage/stage.actions';

import './card.styles.scss';

const Card = ({ imgURL, title, paragraph, speaker, setSpeaker, children}) =>(
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
                <li><a 
                        href="/reservation" 
                        onClick={()=>setSpeaker(speaker)} >
                        Incribirse al curso
                    </a>
                </li>
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

const mapDispatchToProps = dispatch =>({
    setSpeaker: speaker => dispatch(setSpeaker(speaker))
});

export default connect(null,mapDispatchToProps)(Card);
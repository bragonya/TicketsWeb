import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { CONST_SPEAKERS_ENUM } from '../../assets/constants';
import { setSpeaker, setCourse } from '../../redux/stage/stage.actions';

import './card.styles.scss';

const Card = ({ imgURL, title, paragraph, speaker, setSpeaker, setCourse, history, children}) =>(
    <React.Fragment>
        <div className="blog-container"
            onClick={()=>{
                localStorage.setItem('speaker',JSON.stringify({'speaker':speaker}));
                setSpeaker(speaker)
                setCourse(
                    speaker===CONST_SPEAKERS_ENUM.both?
                    CONST_SPEAKERS_ENUM.kim
                    :speaker)
                history.push('/reservation')
                }}
        >
  
        <div className="blog-header">
            <div className="blog-cover" style={{ backgroundImage: `url(${imgURL})`}}>
            </div>
        </div>

        <div className="blog-body">
            <div className="blog-title">
            <h1><span>{title}</span></h1>
            </div>
            <div className="blog-summary">
            <p>
                {paragraph}
            </p>
            </div>
            <div className="blog-tags">
            <ul>
                <li><div>
                        Incribirse al curso
                    </div>
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
    setSpeaker: speaker => dispatch(setSpeaker(speaker)),
    setCourse: course => dispatch(setCourse(course))
});

export default withRouter(connect(null,mapDispatchToProps)(Card));
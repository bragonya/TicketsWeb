import React from 'react';
import {connect} from 'react-redux';

import {removeAlert} from '../../redux/alert/alert.actions';

import './alert-container.styles.scss';
class AlertContainer extends React.Component{
  constructor(props){
    super(props);
  }

  removeAlert = () => {
    var {dispatch, alert} = this.props;
    dispatch(removeAlert(alert.id));
  };

  render(){
    
    return (
      <div id="popup1" class="overlay">
        <div class="popup">
            <h2>Here i am</h2>
            <a class="close" href="#">&times;</a>
            <div class="content">
                Thank to pop me out of that button, but now i'm done so you can close this window.
            </div>
        </div>
    </div>
    );
  }
};
export default connect()(AlertContainer);
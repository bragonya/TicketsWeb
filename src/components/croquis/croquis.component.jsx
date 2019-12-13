import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Section from '../section/section.component';
import LegendCroquis from '../legend-croquis/legend-croquis.component';
import LegendDetails  from '../legend-details/legend-details.component';
import LegendPrices from '../legend-prices/legend-prices.component';
import Clock from '../clock/clock.component';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectMainStage, selectCurrentCourse } from '../../redux/stage/stage.selectors';

import { ReactComponent as StageX } from '../../assets/stage.svg';
import { ReactComponent as DentistX } from '../../assets/dentist.svg';

import './croquis.styles.scss';

const Croquis = ({ mainStage, currentUser, currentCourse }) =>{
    const {
            /*KIM:{SL1,SL2,VIP1,VIP2,PF1,PF2}*/
            [currentCourse]:{SL1,SL2,VIP1,VIP2,PF1,PF2,PF3,PF4,E1,E2,E3,E4}
          } = mainStage;
    return (
        <React.Fragment>
            
        <div className="container-croquis">
        
            <div className="box-croquis">
                <div className="grid-row-croquis vip">
                    <h3><strong>Curso de KANO</strong> </h3>
                </div>
                {currentUser?
                    <div className="grid-row-croquis vip">
                        <Clock/>
                    </div>:null
                }
                <div className="grid-row-croquis legends">
                    <LegendDetails/>
                    <hr/>
                    <LegendCroquis/>
                    <hr/>
                    <LegendPrices/>
                </div>
                <div className="grid-row-croquis vip" >
                    <StageX className='img-stage-croquis'/>            
                </div>
                <div className="grid-row-croquis vip" >
                    <DentistX className='img-dentis-croquis'/>            
                </div>
                <div className="grid-row-croquis lounge KIM">
                    <Section key={'SL1'}  section = { {...SL1, course:currentCourse } }/>
                    <hr/>
                    <Section key={'SL2'} section = { {...SL2, course:currentCourse} }/>
                </div>
                <hr/>
                <div className="grid-row-croquis vip KIM">
                    <Section key={'VIP1'} section = { {...VIP1, course:currentCourse} }/>
                    <hr/>
                    <Section key={'VIP2'} section = { {...VIP2, course:currentCourse} }/>
                </div>
                <hr/>
                <div className="grid-row-croquis profesionales KANO">
                    <Section key={'P1'} section = { {...PF1, course:currentCourse} }/>
                    <hr/>
                    <Section key={'P2'} section = { { ...PF2,course:currentCourse } }/>
                    <hr/><hr/>
                    <Section key={'P3'} section = { {...PF3, course:currentCourse} }/>
                    <hr/>
                    <Section key={'P4'} section = { {...PF4, course:currentCourse} }/>    
                </div>
                <hr/>
                <div className="grid-row-croquis">
                    <Section key={'E1'} section = { {...E1, course:currentCourse} }/>
                    <hr/>
                    <Section key={'E2'} section = { {...E2, course:currentCourse} }/>

                    <hr/><hr/>
                    <Section key={'E3'} section = { {...E3,course:currentCourse} }/>
                    <hr/>
                    <Section key={'E4'} section = { {...E4, course:currentCourse} }/>
                </div>
            </div>
        </div>
        </React.Fragment>
    )
};

const mapStateToProps = createStructuredSelector({
    mainStage: selectMainStage,
    currentUser: selectCurrentUser,
    currentCourse: selectCurrentCourse
});

export default connect(mapStateToProps)(Croquis);

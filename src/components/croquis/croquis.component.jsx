import React from 'react';
import { connect } from 'react-redux';

import Section from '../section/section.component';
import LegendCroquis from '../legend-croquis/legend-croquis.component';

import './croquis.styles.scss';
import { ReactComponent as StageX } from '../../assets/stage.svg';


const Croquis = ({mainStage}) =>{
    const {SL1,SL2,VIP1,VIP2,PF1,PF2,PF3,PF4,E1,E2,E3,E4} = mainStage;
    return (
        <div className="container-croquis">
            <div className="box-croquis">
                <div className="grid-row-croquis legend-stage">
                    <LegendCroquis/>
                    <StageX className={'img-stage-croquis'} />
                </div>
                <div className="grid-row-croquis lounge">
                    <Section key={'SL1'}  section = { SL1 }/>
                    <hr/>
                    <Section key={'SL2'} section = { SL2 }/>
                </div>
                <hr/>
                <div className="grid-row-croquis vip">
                    <Section key={'VIP1'} section = { VIP1 }/>
                    <hr/>
                    <Section key={'VIP2'} section = { VIP2 }/>
                </div>
                <hr/>
                <div className="grid-row-croquis">
                    <Section key={'P1'} section = { PF1 }/>
                    <hr/>
                    <Section key={'P2'} section = { PF2 }/>

                    <hr/><hr/>
                    <Section key={'P3'} section = { PF3 }/>
                    <hr/>
                    <Section key={'P4'} section = { PF4 }/>
                        
                </div>
                <hr/>
                <div className="grid-row-croquis">
                    <Section key={'E1'} section = { E1 }/>
                    <hr/>
                    <Section key={'E2'} section = { E2 }/>

                    <hr/><hr/>
                    <Section key={'E3'} section = { E3 }/>
                    <hr/>
                    <Section key={'E4'} section = { E4 }/>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps =({ stage: { mainStage } }) =>({
    mainStage
});

export default connect(mapStateToProps)(Croquis);

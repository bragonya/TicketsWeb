import React from 'react';

import Section from '../section/section.component';
import LegendCroquis from '../legend-croquis/legend-croquis.component';

import './croquis.styles.scss';
import { ReactComponent as StageX } from '../../assets/stage.svg';

import main_stage from '../../assets/seat-structure';

const Croquis = () =>{
    const {sections} = main_stage;
    const [SL1,SL2,VIP1,VIP2,PR1,PR2,PR3,PR4,E1,E2,E3,E4] = sections;
    return (
        <div className="container">
            <div className="box box-1">
                <div className="grid-row legend-stage">
                    <LegendCroquis/>
                    <StageX className={'img-stage'} />
                </div>
                <div className="grid-row lounge">
                    <Section key={'SL1'}  section = { SL1 }/>
                    <hr/>
                    <Section key={'SL2'} section = { SL2 }/>
                </div>
                <hr/>
                <div className="grid-row vip">
                    <Section key={'VIP1'} section = { VIP1 }/>
                    <hr/>
                    <Section key={'VIP2'} section = { VIP2 }/>
                </div>
                <hr/>
                <div className="grid-row">
                    <Section key={'P1'} section = { PR1 }/>
                    <hr/>
                    <Section key={'P2'} section = { PR2 }/>

                    <hr/><hr/>
                    <Section key={'P3'} section = { PR3 }/>
                    <hr/>
                    <Section key={'P4'} section = { PR4 }/>
                        
                </div>
                <hr/>
                <div className="grid-row">
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
export default Croquis;
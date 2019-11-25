import React from 'react';
import './croquis.styles.scss';
import Section from '../section/new-section.component';
const Croquis = () =>(
    <div className="container">
	    <div className="box box-1">
            <div className="grid-row">
                <Section title='Sala Lounge' rows={['A','B']} cols={Array.from({length:5},(v,k)=>k+1)}/>
                <hr></hr>
                <Section title='Sala Lounge' rows = {['C','D']} cols={Array.from({length:5},(v,k)=>k+1)}/>             
            </div>
            <hr/>
            <div className="grid-row">
                <Section title='VIP' rows={['A','B']} cols={Array.from({length:10},(v,k)=>k+1)}/>
                <hr></hr>
                <Section title='VIP' rows = {['C','D']} cols={Array.from({length:10},(v,k)=>k+1)}/>             
            </div>
            <hr/>
            <div className="grid-row">
                <Section title='Profesionales' rows={['A','C','E','G','I','K','M','O','Q']} cols={Array.from({length:8},(v,k)=>k+1)}/>
                <hr/>
                <Section title='Profesionales' rows={['A','C','E','G','I','K','M','O','Q']} cols={Array.from({length:8},(v,k)=>k+1)}/>

                <hr/><hr/>
                <Section title='Profesionales' rows={['A','C','E','G','I','K','M','O','Q']} cols={Array.from({length:8},(v,k)=>k+1)}/>
                <hr/>
                <Section title='Profesionales' rows={['A','C','E','G','I','K','M','O','Q']} cols={Array.from({length:8},(v,k)=>k+1)}/>
                    
            </div>
            <hr/>
            <div className="grid-row">
                <Section title='Estudiantes' rows={['A','C','E','G','I','K','M','O','Q']} cols={Array.from({length:8},(v,k)=>k+1)}/>
                <hr/>
                <Section title='Estudiantes' rows={['A','C','E','G','I','K','M','O','Q']} cols={Array.from({length:8},(v,k)=>k+1)}/>

                <hr/><hr/>
                <Section title='Estudiantes' rows={['A','C','E','G','I','K','M','O','Q']} cols={Array.from({length:8},(v,k)=>k+1)}/>
                <hr/>
                <Section title='Estudiantes' rows={['A','C','E','G','I','K','M','O','Q']} cols={Array.from({length:8},(v,k)=>k+1)}/>
                    
            </div>
            
        </div>
    </div>
);
export default Croquis;
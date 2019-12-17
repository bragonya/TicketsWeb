import React from 'react';
import './select-course-page.styles.scss';

import Card from '../../components/card/card.component';
import { CONST_SPEAKERS_ENUM } from '../../assets/constants';
const SelectCoursePage = ()=>(
    <div className='select-course'>        
            <div className="row row justify-content-center" style={{ margin:'auto', minWidth:'400px'}}>
                <div className="col-auto">   
                    <Card 
                        title ={`Dr. Syngkuc Kim`} 
                        imgURL={require(`../../assets/speakers/kim_picture.jpeg`)}
                        speaker  ={CONST_SPEAKERS_ENUM.kim} 
                        //paragraph = {PARAGRAPH_STRINGS.kim.card}
                    >
                        <li className="published-date lounge">SALA LOUNGE: 1,800</li>
                        <li className="published-date">SALA VIP: 1,600</li>        
                        <li className="published-date">PROFESIONALES: 1,450</li>
                    </Card>
                </div>
                <div className="col-auto">   
                    <Card 
                        title={`Dr. Paulo Kano`} 
                        imgURL={require(`../../assets/speakers/kano_picture.jpeg`)}
                        speaker  ={CONST_SPEAKERS_ENUM.kano}
                        //paragraph = {PARAGRAPH_STRINGS.kano.card}
                    >
                        <li className="published-date lounge">SALA LOUNGE: 1,800</li>
                        <li className="published-date">SALA VIP: 1,600</li>        
                        <li className="published-date">PROFESIONALES: 1,450</li>
                        <li className="published-date">ESTUDIANTES: 750</li>
                    </Card>
                </div>
                <div className="col-auto">   
                    <Card 
                        title={`Ambos Cursos`} 
                        imgURL={require(`../../assets/speakers/ambos_picture.jpeg`)}
                        paragraph = {'Recibe una descuento al inscribirte en ambos cursos, mientras duren existencias.'}
                        speaker  ={CONST_SPEAKERS_ENUM.between}
                    >
                        <li className="published-date lounge">SALA LOUNGE: 1,800</li>
                        <li className="published-date">SALA VIP: 1,600</li>        
                        <li className="published-date">PROFESIONALES: 1,450</li>
                        <li className="published-date">ESTUDIANTES: 750</li>
                    </Card>
                </div>
            </div>
    </div>
);

export default SelectCoursePage
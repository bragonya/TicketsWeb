import React from 'react';
import './select-course-page.styles.scss';

import Card from '../../components/card/card.component';

const SelectCoursePage = ()=>(
    <div className='select-course'>
        
            <div className="row justify-content-around" style={{ marginTop:'7%', minWidth:'100%'}}>
                <div className="col-auto">   
                    <div className="card text-center" style={{'width': '20rem'}}>
                        <ImageContainer imgURL={require('../../assets/speakers/kano_picture.jpeg')}/>
                        <div className="card-body">
                            <h5 className="card-title">Paulo Kano</h5>
                            <button className='btn btn-success'>Inscribirse a curso de <strong>Paulo Kano</strong></button>
                        </div>
                    </div>
                </div>
                <div className="col-auto">   
                    {/*<div className="card text-center" style={{'width': '20rem'}}>
                        <ImageContainer imgURL={require('../../assets/speakers/kim_picture.jpeg')}/>
                        <div className="card-body">
                            <h5 class="card-title">Syngkuc Kim</h5>
                            <p class="card-text">
                                <a href="#" class="card-link">Inscribirse</a>
                            </p>
                        </div>
</div>*/}
                    <Card />
                </div>
                <div className="col-auto">   
                    <div className="card text-center" style={{'width': '20rem'}}>
                        <ImageContainer imgURL={require('../../assets/speakers/ambos_picture.jpeg')}/>
                        <div className="card-body">
                        
                        <button className='btn btn-dark'>Inscribirse a <strong>los dos cursos</strong></button>
                        </div>
                    </div>
                </div>
            </div>
    </div>
);

const ImageContainer = ({ imgURL })=>(
    <div>
        <img 
            style={{width:'100.3%',height:220}}
            src={imgURL} 
            alt="boohoo" 
            />
    </div>
);
export default SelectCoursePage
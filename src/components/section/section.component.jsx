import React from 'react';

import './section.styles.scss';

import { ReactComponent as Logo } from '../../assets/armchair.svg';


const Section = ({section}) =>{
    const { name, seats_by_rows } = section;
    const colsNames = seats_by_rows.map( ({row_name}) => row_name);
    const rowsSeats = seats_by_rows.map( ({seats}) => seats);
    const sizes = rowsSeats.map(row=> row.length);
    const headers = Array.from({length: Math.max.apply(Math,sizes)}, (v, i) => i+1);
    
    return (
        <div >
            <h3 className='h3-croquis'>{name}</h3>    
            <table>             
                <thead>
                    <tr className='tr-croquis' >
                        <td className='td-croquis'></td>
                        {headers.map(head=>(
                                <td className='td-croquis col-number' key={name+'-'+head}>{head}</td>      
                        ))}      
                    </tr>
                </thead>
                <tbody>
                {colsNames.map((colname,index)=>(
                            <tr className='tr-croquis' key={colname+'tr'+index}>
                                <td className='td-croquis col-letter' key={colname+''+index}>{colname}</td>
                                {(rowsSeats[index]).map(({id,state})=>
                                    <td className='td-croquis' key={colname+'-'+id+'-'+index}>
                                        <div className={'seat-croquis seat-'+state}>
                                            <span id={name+id+colname} onClick={(evt)=>{document.getElementById(evt.target.id).innerHTML="&#9635;";}}>&#9634;</span>
                                        </div>
                                    </td>
                                )}    
                            </tr>
                        ))                
                    }
                </tbody>
            </table>
        </div>
    )
};
export default Section;


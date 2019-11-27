import React from 'react';

import './section.styles.scss';

import { ReactComponent as Logo } from '../../assets/event_seat-24px.svg';


const Section = ({section}) =>{
    const { name, seats_by_rows } = section;
    const colsNames = seats_by_rows.map( ({row_name}) => row_name);
    const rowsSeats = seats_by_rows.map( ({seats}) => seats);
    const sizes = rowsSeats.map(row=> row.length);
    const sortedSizes = sizes.sort((a,b)=> b-a);
    const headers = Array.from({length: sortedSizes[0]}, (v, i) => i+1);
    
    return (
        <div style={{"overflow":"auto"}}>
            <h3>{name}</h3>    
            <table>             
                <thead>
                    <tr>
                        <td></td>
                        {headers.map(head=>(
                                <td key={name+'-'+head}>{head}</td>      
                        ))}      
                    </tr>
                </thead>
                <tbody>
                {colsNames.map((colname,index)=>(
                            <tr key={colname+'tr'+index}>
                                <td key={colname+''+index}>{colname}</td>
                                {(rowsSeats[index]).map(({id,state})=>
                                    <td key={colname+'-'+id+'-'+index}>
                                        <Logo  
                                            className={'seat seat-'+state} 
                                        />
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


import React from 'react';

import './new-section.styles.scss';

import { ReactComponent as Logo } from '../../assets/event_seat-24px.svg';


const Section = ({title,rows, cols}) =>{
    return (
        <div style={{"overflow":"auto"}}>
            <h3>{title}</h3>    
            <table> 
                
                <thead>
                    <tr>
                        <td></td>
                        {cols.map(col=>(
                                <td key={title+'-'+col}>{col}</td>      
                        ))}
                        
                    </tr>
                </thead>
                <tbody>
                    {rows.map(row=>(
                        <tr key={row+'-'+title}>
                            <td>{row}</td>
                            {cols.map(col=>(
                                col%2?<td key={row+'-'+col}>
                                    <Logo  width={14} height={14} fill={'green'} className={'seat-free'} />
                                </td>:<td key={row+'-'+col} onClick={()=>alert(row+'-'+col)}>
                                    <Logo width={14} height={14} fill={'gray'}/>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
)};
export default Section;


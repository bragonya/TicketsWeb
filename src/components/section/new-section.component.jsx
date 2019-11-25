import React from 'react';

import './new-section.styles.scss';

const Section = ({title,rows, cols}) =>{
    return (
        <div style={{"overflowX":"auto"}}>
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
                                col%2?<td key={row+'-'+col}><span>&#11093;</span></td>:<td key={row+'-'+col}><span>&#127761;</span></td>
                            ))}
                        </tr>
                    ))}
                </tbody>
                
            </table>
        </div>
)};
export default Section;


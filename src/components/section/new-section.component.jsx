import React from 'react';

import './new-section.styles.scss';

const Section = ({title,rows, cols}) =>{
    console.log();
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
                                col%2?<td key={row+'-'+col}>&#11093;</td>:<td key={row+'-'+col}>&#127761;</td>
                                        
                            ))}
                        </tr>
                    ))}
                </tbody>
                
            </table>
            </div>

    
)};
export default Section;


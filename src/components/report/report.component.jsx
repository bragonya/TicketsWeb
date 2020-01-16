import React from 'react';
import Spinner from 'react-spinkit';
import BasicTable from '../datatable/datatable.component';

import './report.styles.scss';
class Report extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            seats_solds : [],
            loading: true,
            total:''
        }
    }
    componentDidMount(){
        fetch(process.env.REACT_APP_BASE_URL || 'https://odontologiaindependiente.com' + "/report", {
            method: "post",
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'data':''})
        })
        .then(response=> response.json())
        .then(response=>{
                response.seats_solds=response.seats_solds.map(
                    item=>{ 
                        return {
                            ...item,
                            seccion:item.seccion.includes('PF')?'Profesional':
                            item.seccion.includes('E')?'Estudiante':
                            item.seccion.includes('SL')?'Lounge':
                            item.seccion.includes('VIP')?'VIP':item.seccion
                        } 
                    }
                );
                this.setState({ seats_solds : response.seats_solds, loading:false });
             }
        )
        .catch(error=> this.setState({ seats_solds : [], loading:false }));
    }    

    render(){
        const { seats_solds, loading } = this.state;
        return (
            <div>
                {loading?(<div style={{marginTop:'42vh',marginLeft:'48vw',width:'100%',textAlign:'center'}}>
                    <Spinner 
                    name='cube-grid' 
                    color="black"
                    fadeIn="none"
                    style={{height:'30px', width:'30px'}}
                />
                </div>):seats_solds.length?
                    <div className='container-fluid'>   
                        <React.Fragment>
                            <h3>Asientos Vendidos</h3>
                            {/*<span className='span-total'>Total:</span>*/}
                            <BasicTable seats_solds={seats_solds}/>
                        </React.Fragment>
                    </div>:<div><h1>Sin registros</h1></div>   
                }
                
            </div>
                
        )
    }
}
export default Report;
/*{
                fila,columna,seccion,name,curso,register_number,university,no_document
            }*/
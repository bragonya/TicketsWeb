import React from 'react';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
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
        fetch(process.env.REACT_APP_BASE_URL + "/report", {
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
                console.log(response.seats_solds);
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
            <div className='container-fluid'>
            {loading?(<Loader
                type="TailSpin"
                color="#00BFFF"
                height={100}
                width={100}
            />):seats_solds.length?
            <React.Fragment>
            <h3>Asientos Vendidos</h3>
            {/*<span className='span-total'>Total:</span>*/}
            <BasicTable seats_solds={seats_solds}/></React.Fragment>:<div><h1>Sin registros</h1></div>
            }
            </div>
        )
    }
}
export default Report;
/*{
                fila,columna,seccion,name,curso,register_number,university,no_document
            }*/
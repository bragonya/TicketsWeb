import React from 'react';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

class Report extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            seats_solds : [],
            loading: true
        }
    }
    componentDidMount(){
        fetch('http://localhost:4001/report', {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'data':''})
        })
        .then(response=> response.json())
        .then(response=>this.setState({ seats_solds : response.seats_solds, loading:false }))
        .catch(error=> console.error(error),this.setState({ seats_solds : [], loading:false }));
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
            <table className="table table-hover">
                
                <thead>
                    <tr>
                        <th cope="col">Fila</th>
                        <th cope="col">Silla</th>
                        <th cope="col">Seccion</th>
                        <th cope="col">Curso</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        seats_solds.map(
                            ({fila,columna,curso,seccion},ii)=>
                            <tr key={`tr${ii}`}>
                                <td key={`td${fila}${columna}${curso}`}>
                                    {fila}
                                </td>
                                <td>
                                    {columna}
                                </td>
                                <td>
                                    {seccion}
                                </td>
                                <td>
                                    {curso}
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table></React.Fragment>:<div><h1>Sin registros</h1></div>
            }
            </div>
        )
    }
}
export default Report;
/*{
                fila,columna,seccion,name,curso,register_number,university,no_document
            }*/
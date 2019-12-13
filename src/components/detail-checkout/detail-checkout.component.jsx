import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCartItems, selectCartTotal }  from '../../redux/cart/cart.selectors';

import FormInput from '../form-input/form-input.component';

import Clock from '../clock/clock.component';

import './detail-checkout.styles.scss';

var initialState = {
    rowsInput : {}
};

class DetailCheckout extends React.Component{
    state = { ...initialState };


    handleChange = event => {
        const { value, name } = event.target;
        const { rowsInput } = this.state;
        var newrowsInput = {  ...rowsInput ,[name]: value};
        console.log(rowsInput);
        this.setState({ rowsInput : newrowsInput });
    };


    render(){
        const { props:{cartItems, cartTotal}, state:{ rowsInput } } = this;
        return (
            <div className='container'>
                <div className="row justify-content-center" style={{ marginTop:'130px', minWidth:'300px'}}>
                    <div className="col">
                    <Clock/>
                    <h2>Detalle de Compra</h2>
                    <table className="table table-hover">
                        <thead >
                            <tr className='thead-details-checkout'>
                                <th cope="col">Fila</th>
                                <th cope="col">Silla</th>
                                <th cope="col">Seccion</th>
                                <th cope="col">Precio</th>
                                <th cope="col">Nombre Asistente</th>
                                <th cope="col">Carnet/Colegiado Asistente</th>
                                <th cope="col">Universidad Asistente</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cartItems.map(({fila,columna,seccion,price,key})=>(
                                    <tr key={key}>
                                        <td key={`${fila}${key}`}>{fila}</td>
                                        <td key={`${columna}${key}`}>{columna}</td>
                                        <td key={`${seccion}${key}`}>{seccion}</td>
                                        <td key={`${price}${key}`}>{price}</td>
                                        <td key={`name${key}`}>
                                            <FormInput
                                                name={`name${key}`}
                                                type='text'
                                                handleChange={this.handleChange}
                                                value={ rowsInput[`name${key}`]||""}
                                                label=''
                                                required
                                            />
                                        </td>
                                        <td key={`register_number${key}`}>
                                            <FormInput
                                                name={`register_number${key}`}
                                                type='number'
                                                handleChange={this.handleChange}
                                                value={ rowsInput[`register_number${key}`]||""}
                                                label=''
                                                required
                                            />
                                        </td>
                                        <td key={`university${key}`}>
                                            <FormInput
                                                name={`university${key}`}
                                                type='text'
                                                handleChange={this.handleChange}
                                                value={ rowsInput[`university${key}`]||""}
                                                label=''
                                                required
                                            />
                                        </td>
                                    </tr>
                                ))
                            }
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <h4 className=''>{`Total a pagar: ${cartTotal}`}</h4>    
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <input 
                                    type="submit" 
                                    onClick = {this.consumeApi}
                                    className="button btn-success" 
                                    value="Realizar Pago"
                                />
                            </tr>
                        </tbody>
                    </table>
                    </div>    
                </div>
            </div>    
        )
    }
}



const mapStateToProps = createStructuredSelector({
    cartItems : selectCartItems,
    cartTotal : selectCartTotal
});

export default connect(mapStateToProps)(DetailCheckout);
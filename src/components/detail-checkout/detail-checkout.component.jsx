import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCartItems, selectCartTotal }  from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

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
        this.setState({ rowsInput : newrowsInput });
    };

    handleSubmit = event => {
        event.preventDefault();
        try {
          this.setState({ ...initialState });
        } catch (error) {
          console.log(error);
        }
    };

    handleClickGoToPay = () =>{
        /* 
        NOTA: al primer asiento llenarle de forma automatica 
        los campos requeridos para el diploma */
    }

    render(){
        const { props:{cartItems, cartTotal}, state:{ rowsInput } } = this;
        return (
            <div className='container'>
                <div className="row justify-content-center" style={{ marginTop:'130px', minWidth:'220px'}}>
                    <div className="col">
                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>¡AVISO!</strong> Asegurese de que los datos estan correctos, estos serán tomados para la generación de los diplomas.
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <Clock/>
                        <h2>Detalle de Compra</h2>
                        <form onSubmit={this.handleSubmit}>
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
                                        {currentUser.admin?<th cope="col">Numero de Boleta</th>:null}
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
                                                        className=' detail'
                                                        required
                                                    />
                                                </td>
                                                {currentUser.admin?
                                                    <td key={`no_document${key}`}>
                                                    <FormInput
                                                        name={`no_document${key}`}
                                                        type='text'
                                                        handleChange={this.handleChange}
                                                        value={ rowsInput[`no_document${key}`]||""}
                                                        label=''
                                                        className=' detail'
                                                        required
                                                    />
                                                    </td>:null
                                                }
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
                                        <td>
                                            <h4 className=''>{`Total ${currentUser.admin?"":"a pagar"}: ${cartTotal}`}</h4>    
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <input 
                                                type="submit" 
                                                onClick = {this.handleClickGoToPay}
                                                className="button btn-success" 
                                                value={currentUser.admin?"Guardar":"Realizar Pago"} 
                                            />
                                        </td>
                                        
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>    
                </div>
            </div>
        )
    }
}



const mapStateToProps = createStructuredSelector({
    cartItems : selectCartItems,
    cartTotal : selectCartTotal,
    currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(DetailCheckout);
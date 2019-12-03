import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCartItems,selectCartTotal }  from '../../redux/cart/cart.selectors';

import './detail-checkout.styles.scss';

const DetailCheckout = ({ cartItems, cartTotal}) => {
    return (
        <div className='container'>

        
            <div className="row justify-content-center" style={{ marginTop:'130px', minWidth:'300px'}}>
                <div className="col">
                <h2>Detalle de Compra</h2>
                <table className="table table-hover">
                    <thead >
                        <tr className='thead-details-checkout'>
                            <th cope="col">Fila</th><th cope="col">Silla</th><th cope="col">Seccion</th><th cope="col">Precio</th>
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
                                </tr>
                            ))
                        }
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <h4 className=''>{`Total a pagar: ${cartTotal}`}</h4>
                            </td>
                        </tr>
                    </tbody>
                </table>
                
                </div>    
            </div>
        </div>    
    )
};

const mapStateToProps = createStructuredSelector({
    cartItems : selectCartItems,
    cartTotal : selectCartTotal
});

export default connect(mapStateToProps)(DetailCheckout);
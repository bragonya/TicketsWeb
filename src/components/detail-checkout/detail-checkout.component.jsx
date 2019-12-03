import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCartItems,selectCartTotal }  from '../../redux/cart/cart.selectors';

const DetailCheckout = ({ cartItems, cartTotal}) => {
    console.log(cartItems);
    console.log(cartTotal);
    
    return (
        <div className="table" style={{overflowX:"auto",margin:'100px'}}>
            <table>
                <thead>
                    <tr>
                        <td cope="col">Fila</td><td cope="col">Silla</td><td cope="col">Seccion</td><td cope="col">Precio</td>
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
                </tbody>
            </table>
            <h3>{cartTotal}</h3>
        </div>
        
    )
};

const mapStateToProps = createStructuredSelector({
    cartItems : selectCartItems,
    cartTotal : selectCartTotal
});

export default connect(mapStateToProps)(DetailCheckout);
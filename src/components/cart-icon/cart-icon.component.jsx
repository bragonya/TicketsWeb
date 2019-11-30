import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';



import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon = ({itemCount}) =>(
    <div className="-color-primary" onClick={()=>{}}>
        <ShoppingIcon className="e-btn--3d -color-primary shopping-icon"/>
        <span className="item-count">{itemCount}</span>
    </div>
);

/*const mapDispatchToProps = dispatch =>({
    toggleCartHidden : ()=>dispatch(toggleCartHidden())
});
*/
const mapStateToProps = createStructuredSelector({
    itemCount : selectCartItemsCount
});

export default connect(
    mapStateToProps,
    null
)(CartIcon);


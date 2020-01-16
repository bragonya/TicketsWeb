import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import sha1  from 'sha1';

import { selectCartItems, selectCartTotal }  from '../../redux/cart/cart.selectors';
import { selectCurrentUser, selectConexionSocket } from '../../redux/user/user.selectors';

import { clearItemsCart } from '../../redux/cart/cart.actions';

import FormInput from '../form-input/form-input.component';
import IframeComponent from '../iframe-component/iframe.component';

import Clock from '../clock/clock.component';
import  { inputValidMessages } from '../../assets/constants';
import { PreXmlInfo } from '../../assets/xml-source/preprocessingtoken';
import './detail-checkout.styles.scss';



var initialState = {
    rowsInput : {},
    processing : false,
    showIframePayment : false,
    iframeUrl:''
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
          this.handleClickGoToPay();
        } catch (error) {
          console.log(error);
        }
    };

    StringToXML = (oString) => {
        return (new DOMParser()).parseFromString(oString, "text/xml");
    };
    
    generateOrderNumber = () =>{
        var numberRandom = Math.floor(Math.random()*(999-100+1)+100);
        var orderNumberGenerated= `UNB${(+ new Date())}${numberRandom}`;
        return  orderNumberGenerated;
    };

    handleClickGoToPay = () =>{
        const { props:{ currentUser, cartItems, clearItemsCart, conexionSocket, history, cartTotal }, 
                state: { rowsInput} } = this;
        var arrayDetail = [];
        if(currentUser.admin){
            this.setState({ processing : true });
            arrayDetail=cartItems.map(({fila,columna,seccion,curso,price,key})=>{
                return{
                    fila:fila,
                    columna:columna,
                    seccion: seccion,
                    curso: curso,
                    precio: price,
                    name: rowsInput[`name${key}`],
                    register_number: rowsInput[`register_number${key}`],
                    university: rowsInput[`university${key}`],
                    no_document:rowsInput[`no_document${key}`]
                };
            });
            fetch(process.env.REACT_APP_BASE_URL + "/save_order", {
                method: "post",
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'seats': arrayDetail 
                })
            })
            .then( response => {
                try {
                    return response.json(); 
                } catch (error) {
                    response = { state:false, message: 'Formato invalido de respuesta'};
                    return response;
                }
            })
            .then( response => { 
                const { status, message } = response;
                alert(message);
                if(status){
                    localStorage.removeItem('cartItems');
                    this.setState({ ...initialState });
                    conexionSocket.removeAllListeners('countdownStart');
                    conexionSocket.emit('close-timer',{ user:localStorage.getItem('user')?{...JSON.parse(localStorage.getItem('user'))}:null });
                    clearItemsCart();
                    history.push('/reservation');
                    console.log(response);
                }
            })
            .catch(error => {
                this.setState({ processing : false });
                console.error(error);
                alert('Error de Servidor:\n'+error);
            });
        }else{
            
            arrayDetail=cartItems.map(({fila,columna,seccion,curso,price,key})=>{
                return{
                    fila:fila,
                    columna:columna,
                    seccion: seccion,
                    curso: curso,
                    precio: price,
                    name: rowsInput[`name${key}`],
                    register_number: rowsInput[`register_number${key}`],
                    university: rowsInput[`university${key}`],
                    no_document:rowsInput[`no_document${key}`]
                };
            });

            var xmlDoc = this.StringToXML(PreXmlInfo);

            var AmountRef=xmlDoc.getElementsByTagName("Amount")[0].childNodes[0];
            var cartTotalString = `${cartTotal.toString()}00`;
            var arrayStr = cartTotalString.split('');
            var amountStr = Array.from({length:12-arrayStr.length}).map(x=>'0').join(''); 
            AmountRef.nodeValue = amountStr+cartTotalString;

            var OrderNumberRef=xmlDoc.getElementsByTagName("OrderNumber")[0].childNodes[0];
            OrderNumberRef.nodeValue = this.generateOrderNumber();
            //generating signature
            var ProcessingPass = 'KI73nt6s';
            var MerchantId = '88801272';
            var AcquirerId = '464748';
            var Currency   = '320'; 
            var Signature = (new Buffer(sha1(`${ProcessingPass}${MerchantId}${AcquirerId}${OrderNumberRef.nodeValue}${AmountRef.nodeValue}${Currency}`), "hex").toString('base64')); 
            
            var SignatureRef=xmlDoc.getElementsByTagName("Signature")[0].childNodes[0];
            SignatureRef.nodeValue = Signature;

            var self = this;
            conexionSocket.emit('sendOrderNumber',{
                user: JSON.parse(localStorage.getItem('user')),
                order: OrderNumberRef.nodeValue
            },()=>{
                fetch('https://ecm.firstatlanticcommerce.com/PGServiceXML/HostedPagePreprocess',{
                    mode : 'cors',
                    method: 'post',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    body: (new XMLSerializer()).serializeToString(xmlDoc)
                })
                .then(response => response.text())
                .then(response => {
                    console.log('XML RESPONSE:');
                    console.log(response);
                    var xmlDocResponse = self.StringToXML(response);
                    var token=xmlDocResponse.getElementsByTagName("SecurityToken")[0].childNodes[0].nodeValue;
                    const iframe = `https://ecm.firstatlanticcommerce.com/MerchantPages/PaymentUnbiased/PayPage/${token}`; 
                    self.setState({ processing : true, showIframePayment : true, iframeUrl: iframe });
                })
                .catch(error => console.error(error)); 
            });
        }
        /* 
        NOTA: al primer asiento llenarle de forma automatica 
        los campos requeridos para el diploma */
    }
    componentWillMount(){
        const {  props :{ cartItems, currentUser }, state : { rowsInput } } = this;        
        cartItems.forEach(({key})=>{
            rowsInput[`register_number${key}`] = `${currentUser.register_number}`; 
            rowsInput[`university${key}`] = `${currentUser.university}`; 
            rowsInput[`name${key}`]=`${currentUser.firstname} ${currentUser.lastname}`;
        });
    }
    componentDidMount(){
        const { props : { history,conexionSocket, currentUser:{ id } } } = this;
        conexionSocket.removeAllListeners(`payment.result.${id}`);
        conexionSocket.on(`payment.result.${id}`,({reason, status})=>{
            localStorage.removeItem('cartItems');
            this.setState({ ...initialState });
            conexionSocket.removeAllListeners('countdownStart');
            conexionSocket.emit('close-timer',{ user:localStorage.getItem('user')?{...JSON.parse(localStorage.getItem('user'))}:null });
            clearItemsCart();
            history.push(`/paymentresult/${status}/${reason}`);
            //1:exitoso 2:denegado 3:error
        });
    }

    render(){
        const { props:{cartItems, cartTotal, currentUser}, state:{ rowsInput, processing, showIframePayment, iframeUrl } } = this;

        return (
            <div className='container'>
                <div className="row justify-content-center" style={{ marginTop:'130px', minWidth:'220px'}}>
                    
                    <div className="col">
                        {!showIframePayment?
                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>¡AVISO!</strong> Asegurese de que los datos estan correctos, estos serán tomados para la generación de los diplomas.
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>:null
                        }
                        {currentUser?!currentUser.admin?
                            (<div className="row">
                                <div className="col">
                                    <Clock/>
                                </div>
                            </div>):null:null
                        }
                        {!showIframePayment?
                            <>
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
                                                            value={ rowsInput[`name${key}`] || '' }
                                                            label=''
                                                            onInvalid={
                                                                evt=>{if(rowsInput[`name${key}`]||""==='')evt.target.setCustomValidity(inputValidMessages.requiredMessage)}
                                                                    } 
                                                            matchMessage = {''}
                                                            requiredMessage = {inputValidMessages.requiredMessage}
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
                                                            onInvalid={
                                                                evt=>{if(rowsInput[`register_number${key}`]||""==='')evt.target.setCustomValidity(inputValidMessages.requiredMessage)}
                                                                    } 
                                                            matchMessage = {''}
                                                            requiredMessage = {inputValidMessages.requiredMessage}
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
                                                            onInvalid={
                                                                evt=>{if(rowsInput[`university${key}`]||""==='')evt.target.setCustomValidity(inputValidMessages.requiredMessage)}
                                                                    } 
                                                            matchMessage = {''}
                                                            requiredMessage = {inputValidMessages.requiredMessage}
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
                                                            onInvalid={
                                                                evt=>{if(rowsInput[`no_document${key}`]||""==='')evt.target.setCustomValidity(inputValidMessages.requiredMessage)}
                                                                    } 
                                                            matchMessage = {''}
                                                            requiredMessage = {inputValidMessages.requiredMessage}
                                                            required
                                                        />
                                                        </td>:null
                                                    }
                                                </tr>
                                            ))
                                        }
                                        <tr>
                                            <td colSpan="4">
                                                  <h4 className=''>{`Total ${currentUser.admin?"":"a pagar"}: ${cartTotal}`}</h4>    
                                            </td>
                                            <td colSpan="3" bgcolor="white" height="5">&nbsp;</td> 
                                        </tr>
                                        <tr>
                                            <td colSpan="4" >
                                                <input 
                                                    disabled={ processing }
                                                    type="submit" 
                                                    className="button btn-success" 
                                                    value={currentUser.admin?"Guardar":"Realizar Pago"} 
                                                />
                                            </td>
                                            <td colSpan="3" bgcolor="white" height="5">&nbsp;</td> 
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                            </>
                            :null
                        }
                    </div>
                    
                </div>
                {showIframePayment? 
                        <div className="row justify-content-center">
                            <div className='col centering'>
                                <IframeComponent src={iframeUrl} height="450px" width="100%"/>            
                            </div>    
                        </div>   
                    :null
                }
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    cartItems : selectCartItems,
    cartTotal : selectCartTotal,
    currentUser: selectCurrentUser,
    conexionSocket : selectConexionSocket
});

const mapDispatchToProps = dispatch =>({
    clearItemsCart: () => dispatch(clearItemsCart())
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(DetailCheckout));
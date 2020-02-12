import React,{useState} from 'react';
import FormInput from '../../components/form-input/form-input.component';
//import { connect } from 'react-redux';
//import { withRouter } from "react-router-dom";
import IframeComponent from '../../components/iframe-component/iframe.component';

import { inputValidMessages } from '../../assets/constants';

import '../sign-in-sign-up-page/sign-in-sign-up-page.styles.scss';
import './one-single-payment-page.styles.scss';

var enviroment = "ecm";

let initialState = {
    rowInputs:{
        firstname   : '', //default user but modify
        lastname    : '', //default user but modify
        amount      : '',
        description : '',//e.j. placeholder Estoy pagando
        email       : '',//userEmail
    },
    processing : false,
    showIframePayment : false,
    iframeUrl:'',
    orderNumberGenerated : '' //keyGenerated UNB
};

const OneSinglePaymentPage = () =>{
    const [inputs,setInputs] = useState({ ...initialState });
    const {email,firstname,
        lastname,amount,
        description, showIframePayment,
        orderNumberGenerated, iframeUrl} = inputs;
    
    const handleChange = event => {
        const { value, name } = event.target;
        setInputs({ ...inputs, rowInputs:{ [name]: value} });
        console.log(inputs);
    };

    const handleSubmit = event => {
        event.preventDefault();
        try {
            consumeApi();
        } catch (error) {}
    };
    
    const consumeApi = () =>{
        fetch(process.env.REACT_APP_BASE_URL + "/get-one-single-payment-form", {
            method: "post",
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data:inputs.rowInputs,
                user: JSON.parse(localStorage.getItem('user')) || null
            })
        })
        .then( response => {
            try {
                return response.json(); 
            } catch (error) {
                console.log('Formato invalido de respuesta');
                response = { securityToken:''};
                return response;
            }
        })
        .then( response =>{
            const { securityToken, order_id } = response;
            console.log('-response');
            console.log(response);
            if(securityToken){
                console.log(securityToken);
                const iframe = `https://${enviroment}.firstatlanticcommerce.com/MerchantPages/PaymentUnbiased/PaySelective/${securityToken}`; 
                setInputs({ ...inputs, orderNumberGenerated : order_id ,processing : true, showIframePayment : true, iframeUrl: iframe });
            }                
        })
        .catch(err=>{
            console.log('err-');
            console.log(err);
        });
    }

    return(
        <div className='one-single-payment-page'>
            <div className="container-one-single-payment">  
        
                {showIframePayment?
                        <>
                        <div className="row justify-content-center">
                            <div className="col">
                                <div className="alert alert-primary alert-dismissible fade show" role="alert">
                                    ¡Atención! Es importante que guardes este código <strong>{orderNumberGenerated}</strong> en caso de que suceda algún error y tu dinero sea debitado, solo con este código podrás reclamar tu entrada.
                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                            </div> 
                        </div> 
                        <div className="row justify-content-center">
                            
                            <div className='col centering'>
                                <IframeComponent src={iframeUrl} height="650px" width="100%"/>            
                            </div>    
                        </div>   
                        </>
                    :                  <form id='contact' onSubmit={handleSubmit} className='for-one-single-payment'>
                    <center><h1>Formulario de Pago</h1> </center>
                    <hr/>
                            <FormInput
                                    type='text'
                                    name='firstname'
                                    value={firstname}
                                    onChange={handleChange}
                                    label='Nombres'
                                    onInvalid={
                                        evt=>{if(firstname==='')evt.target.setCustomValidity(inputValidMessages.requiredMessage)}
                                            } 
                                    matchMessage = {''}
                                    requiredMessage = {inputValidMessages.requiredMessage}
                                    required
                                />
                                <FormInput
                                    type='text'
                                    name='lastname'
                                    value={lastname}
                                    onChange={handleChange}
                                    label='Apellidos'
                                    onInvalid={
                                        evt=>{if(lastname==='')evt.target.setCustomValidity(inputValidMessages.requiredMessage)}
                                            } 
                                    matchMessage = {''}
                                    requiredMessage = {inputValidMessages.requiredMessage}
                                    required
                                />
                                <FormInput
                                    type='number'
                                    name='amount'
                                    value={amount}
                                    onChange={handleChange}
                                    label='Cantidad a Pagar'
                                    onInvalid={
                                        evt=>{if(amount==='')evt.target.setCustomValidity(inputValidMessages.requiredMessage)}
                                            } 
                                    matchMessage = {''}
                                    requiredMessage = {inputValidMessages.requiredMessage}
                                    required
                                    step="any"
                                />
                                <FormInput
                                    type='text'
                                    name='description'
                                    value={description}
                                    onChange={handleChange}
                                    label='Description'
                                    placeholder={'e.j. placeholder estoy pagando el curso...'}
                                    onInvalid={
                                        evt=>{if(description==='')evt.target.setCustomValidity(inputValidMessages.requiredMessage)}
                                            } 
                                    matchMessage = {''}
                                    requiredMessage = {inputValidMessages.requiredMessage}
                                    required
                                />
                                <FormInput
                                    type='email'
                                    name='email'
                                    value={email}
                                    onChange={handleChange}
                                    label='Correo Electronico'
                                    onInvalid={
                                        evt=>{if(email==='')evt.target.setCustomValidity(inputValidMessages.requiredMessage)}
                                            } 
                                    matchMessage = {inputValidMessages.invalidEmailMessage}
                                    requiredMessage = {inputValidMessages.requiredMessage}
                                    required
                                />
                                 
                                <hr/>
                                <fieldset>           
                                    <button 
                                            type="submit" 
                                            id="contact-submit"
                                        >Realizar Pago</button>
                                </fieldset>
                        </form>
                }

                </div>
            </div>
        )
}
export default OneSinglePaymentPage;
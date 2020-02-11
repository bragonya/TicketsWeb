import React,{useState} from 'react';
import FormInput from '../../components/form-input/form-input.component';
//import { connect } from 'react-redux';
//import { withRouter } from "react-router-dom";

import { inputValidMessages } from '../../assets/constants';

import '../sign-in-sign-up-page/sign-in-sign-up-page.styles.scss';
import './one-single-payment-page.styles.scss';

let initialState = {
    firstname : '', //default user but modify
    lastname :'', //default user but modify
    amount: '',
    description: '',//e.j. placeholder Estoy pagando
    email :'',//userEmail
    //keyGenerated UNB
};
//one-single-payment-page
const OneSinglePaymentPage = () =>{
    const [inputs,setInputs] = useState({ ...initialState });
    const {email,firstname,lastname,amount,description} = inputs;
    
    const handleChange = event => {
        const { value, name } = event.target;
        setInputs({ ...inputs, [name]: value });
        console.log(inputs);
    };

    const handleSubmit = event => {
        event.preventDefault();
        try {
            this.consumeApi();
        } catch (error) {
            
        }
    };

    return(
        <div className='one-single-payment-page'>
        <div className="container">  
        
                    <form id='contact' onSubmit={handleSubmit} className='for-one-single-payment'>
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
            </div>
            </div>
        )
}
export default OneSinglePaymentPage;
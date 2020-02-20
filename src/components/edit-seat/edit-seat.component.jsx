import React,{useState,useEffect,useRef} from 'react';
import FormInput from '../../components/form-input/form-input.component';

import { inputValidMessages } from '../../assets/constants';

import '../../pages/sign-in-sign-up-page/sign-in-sign-up-page.styles.scss';
import '../../pages/one-single-payment-page.styles.scss';


let initialState = {
    columna: 0,
    curso: '',
    estado: '',
    precio: 0,
    seccion: '',
    fila: '',

    name: '',
    no_document: '',
    register_number: '',
    university: ''
};



const useComponentDidMount = func => useEffect(func, []);

const EditSeatForm = () =>{
    

    const [inputs,setInputs] = useState({ ...initialState });
    
    const {    name,no_document,register_number,university} = inputs;
    
    const handleChange = event => {
        const { value, name } = event.target;
        setInputs({ ...inputs, [name]: value });
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
    console.log(email);
    return(
        <div className='one-single-payment-page'>
            <div className="container-one-single-payment">  
                <form id='contact' onSubmit={handleSubmit} className='for-one-single-payment'>
                    <center><h1>Formulario de Pago</h1> </center>
                    <hr/>
                    <FormInput
                        name={`name`}
                        type='text'
                        handleChange={handleChange}
                        value={ name || '' }
                        label=''
                        onInvalid={
                            evt=>{if(name || "" === '')evt.target.setCustomValidity(inputValidMessages.requiredMessage)}
                                } 
                        matchMessage = {''}
                        requiredMessage = {inputValidMessages.requiredMessage}
                        required
                        title={`name`}
                    />

                    <FormInput
                        name={`register_number`}
                        type='number'
                        handleChange={handleChange}
                        value={ register_number || ""}
                        label=''
                        onInvalid={
                            evt=>{if(register_number || "" ==='')evt.target.setCustomValidity(inputValidMessages.requiredMessage)}
                                } 
                        matchMessage = {''}
                        requiredMessage = {inputValidMessages.requiredMessage}
                        required
                        title={`register_number`}
                    />
                    <FormInput
                        name={`university`}
                        type='text'
                        handleChange={handleChange}
                        value={ university || ""}
                        label=''
                        className=' detail'
                        onInvalid={
                            evt=>{if(university || "" === '')evt.target.setCustomValidity(inputValidMessages.requiredMessage)}
                                } 
                        matchMessage = {''}
                        requiredMessage = {inputValidMessages.requiredMessage}
                        required
                        title={`university`}
                    /> 
                    <FormInput
                        name={`no_document`}
                        type='text'
                        handleChange={handleChange}
                        value={ no_document || ""}
                        label=''
                        className=' detail'
                        onInvalid={
                            evt=>{if(no_document || "" === '')evt.target.setCustomValidity(inputValidMessages.requiredMessage)}
                                } 
                        matchMessage = {''}
                        requiredMessage = {inputValidMessages.requiredMessage}
                        required
                        title={`no_document`}
                    />
                                 
                                <hr/>
                                <fieldset>           
                                    <button 
                                            type="submit" 
                                            id="contact-submit"
                                        >Editar</button>
                                </fieldset>
                        </form>
                

                </div>
            </div>
        )
}
export default EditSeatForm;
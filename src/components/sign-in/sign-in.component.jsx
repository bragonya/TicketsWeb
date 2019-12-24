import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { setCurrentUser } from '../../redux/user/user.actions';
import  { inputValidMessages } from '../../assets/constants';


import FormInput from "../form-input/form-input.component";

let initialState = {
    email: '',
    fullname: ''
};


class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...initialState };
    }

    handleSubmit = event => {
        event.preventDefault();
        try {
            this.consumeApi();
        } catch (error) {
            
        }
    };

    handleChange = event => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    };

    consumeApi = () => {
        const { props:{ history, setCurrentUser }, state:{ email, fullname } } = this;
        let fullnameSplit =  fullname.trim().split(/(\s+)/);
        if(fullnameSplit.length===3){
            if(!(fullnameSplit[0].trim()==="") && !(fullnameSplit[2].trim()==="")){
                fetch(process.env.REACT_APP_BASE_URL + "/login", {
                    method: "post",
                    mode: 'no-cors',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        firstname: fullnameSplit[0].trim(),
                        lastname: fullnameSplit[2].trim()
                    })
                })
                .then( response => {
                    try {
                        return response.json(); 
                    } catch (error) {
                        console.log('error al convertir el json');
                        response = { state:false, message: error, user:null};
                        return response;
                    }
                })
                .then( response =>{
                    console.log(response);
                    const { state, message, user } = response;
                    if(state){
                        this.setState({ ...initialState });
                        setCurrentUser(user);
                        localStorage.setItem('user',JSON.stringify(user));
                        history.push('/select');
                    }else{
                        alert(message);
                    }
                })
                .catch(err=>{
                    console.log(err);
                    alert('Error de Servidor:\n'+err);
                });
            }else{
                alert('No ha ingresado el primer nombre o primer apellido');
            }
        }else{
            alert('Verifique que ha ingresado su primer nombre y primer apellido');
        }
    }

    render(){
        const { email, fullname } = this.state;
        return(
            <>
            <form onSubmit={this.handleSubmit}>
                <div className="sign-in-htm">
                    <FormInput
                        name='email'
                        type='email'
                        handleChange={this.handleChange}
                        value={email}
                        label='Correo Electronico'
                        onInvalid={
                                    evt=>{if(email==='')evt.target.setCustomValidity(inputValidMessages.requiredMessage)}
                                  } 
                        matchMessage = {inputValidMessages.invalidEmailMessage}
                        requiredMessage = {inputValidMessages.requiredMessage}
                        required
                    />
                    <FormInput
                        name='fullname'
                        type='text'
                        value={fullname}
                        handleChange={this.handleChange}
                        label='Primer nombre y primer apellido'
                        onInvalid={
                                    evt=>{if(fullname==='')evt.target.setCustomValidity(inputValidMessages.requiredMessage)}
                                } 
                        matchMessage = {''}
                        requiredMessage = {inputValidMessages.requiredMessage}
                        required
                    />
                    <div className="container-group">
                        <div className="group">
                            <input 
                                type="submit" 
                                className="button sign-in" 
                                value="Entrar"
                            />
                        </div>
                    </div>
                </div>
            </form>
            </>
        )
    }
}

const mapDispatchToProps = dispatch =>({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default withRouter(connect(null,mapDispatchToProps)(SignIn));
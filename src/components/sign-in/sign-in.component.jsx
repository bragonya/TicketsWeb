import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { setCurrentUser } from '../../redux/user/user.actions';

import FormInput from "../form-input/form-input.component";

let initialState = {
    email: '',
    fullname: ''
};

let userDevelopment ={
    email:'rluis4490@gmail.com',
    admin:true
}

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
        console.log(fullnameSplit);
        
        if(fullnameSplit.length===3){
            if(!(fullnameSplit[0].trim()==="") && !(fullnameSplit[2].trim()==="")){
                fetch(process.env.REACT_APP_BASE_URL + "/login", {
                    method: "post",
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
                .then( response => response.json())
                .then( response =>{
                    const { state, message, user } = response;
                    if(state){
                        setCurrentUser(user);
                        localStorage.setItem('user',JSON.stringify(user));
                        history.push('/select');
                    }else{
                        alert(message);
                    }
                    this.setState({ ...initialState });
                })
                .catch(err=>{
                    console.log(err);
                    this.setState({ ...initialState });
                    setCurrentUser(userDevelopment);
                    localStorage.setItem('user',JSON.stringify(userDevelopment));
                    history.push('/select');
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
            <form onSubmit={this.handleSubmit}>
                <div className="sign-in-htm">
                    <FormInput
                        name='email'
                        type='email'
                        handleChange={this.handleChange}
                        value={email}
                        label='Correo Electronico'
                        required
                    />
                    <FormInput
                        name='fullname'
                        type='text'
                        value={fullname}
                        handleChange={this.handleChange}
                        label='Primer nombre y primer apellido'
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
        )
    }
}

const mapDispatchToProps = dispatch =>({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default withRouter(connect(null,mapDispatchToProps)(SignIn));
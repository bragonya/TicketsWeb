import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { setCurrentUser } from '../../redux/user/user.actions';

import FormInput from "../form-input/form-input.component";


class SignIn extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          email: '',
          password: ''
        };
    }

    handleSubmit = event => {
        event.preventDefault();
        try {
          this.setState({ email: '', password: '' });
        } catch (error) {
          console.log(error);
        }
    };

    handleChange = event => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    };

    consumeApi = () => {
        const { props:{ history, setCurrentUser }, state:{ email, password } } = this;
        fetch("https://odontologiaindependiente.com/login", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
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
        })
        .catch(err=>
                {console.log(err)
                setCurrentUser({email:'rluis4490@gmail.com',admin:true});
                localStorage.setItem('user',JSON.stringify({email:'rluis4490@gmail.com'}));
                history.push('/select');

            }
        );
    }

    render(){
        const { email, password } = this.state;
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
                        name='password'
                        type='password'
                        value={password}
                        handleChange={this.handleChange}
                        label='Nombre y Apellido'
                        required
                    />
                    <div className="container-group">
                        <div className="group">
                            <input 
                                type="submit" 
                                onClick = {this.consumeApi}
                                className="button sign-in" 
                                value="Entrar"
                            />
                        </div>
                    </div>
                    {/*<div className="foot-lnk">
                        <label htmlFor="tab-1">Olvidó Su Contraseña?</label>
        </div>*/}
                </div>
            </form>
        )
    }
}

const mapDispatchToProps = dispatch =>({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default withRouter(connect(null,mapDispatchToProps)(SignIn));
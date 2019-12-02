import React from 'react';

import FormInput from "../form-input/form-input.component";

import { auth, signInWithGoogle } from '../../firebase/firebase.util';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          email: '',
          password: ''
        };
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { email, password } = this.state;
    
        try {
          await auth.signInWithEmailAndPassword(email, password);
          this.setState({ email: '', password: '' });
        } catch (error) {
          console.log(error);
        }
    };

    handleChange = event => {
        const { value, name } = event.target;
        console.log(this.state);
        this.setState({ [name]: value });
    };

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <div className="sign-in-htm">
                        <FormInput
                            name='email'
                            type='email'
                            handleChange={this.handleChange}
                            value={this.state.email}
                            label='email'
                            required
                        />
                        <FormInput
                            name='password'
                            type='password'
                            value={this.state.password}
                            handleChange={this.handleChange}
                            label='password'
                            required
                        />
                   
                    <div className="container-group">
                        <div className="group">
                            <input type="submit" className="button sign-in" value="Sign In"/>
                        </div>
                        <div className="group">
                            <input type="submit"  onClick={signInWithGoogle} className="button" value="Sign In Google"/>
                        </div>
                    </div>
                    
                    <div className="foot-lnk">
                        <label htmlFor="tab-1">Olvidó Su Contraseña?</label>
                    </div>
                </div>
            </form>
        )
    }
}

export default SignIn;
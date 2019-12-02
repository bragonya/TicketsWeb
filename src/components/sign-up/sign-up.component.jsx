import React from 'react';

import { auth, createUserProfileDocument } from '../../firebase/firebase.util';


import FormInput from '../form-input/form-input.component';



class SignUp extends React.Component {
    constructor() {
        super();
    
        this.state = {
          displayName: '',
          email: '',
          password: '',
          confirmPassword: ''
        };
    }

    handleSubmit = async event => {
        event.preventDefault();
    
        const { displayName, email, password, confirmPassword } = this.state;
    
        if (password !== confirmPassword) {
          alert("passwords don't match");
          return;
        }
    
        try {
          const { user } = await auth.createUserWithEmailAndPassword(
            email,
            password
          );
    
          await createUserProfileDocument(user, { displayName });
    
          this.setState({
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
          });
        } catch (error) {
          console.error(error);
        }
    };
    
    handleChange = event => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    };
    
    render(){
        const { displayName, email, password, confirmPassword } = this.state;

        return (            
            <form>
                <div className="sign-up-htm">
                    <FormInput
                        type='text'
                        name='displayName'
                        value={displayName}
                        onChange={this.handleChange}
                        label='Nombre'
                        required
                    />
                    <FormInput
                        type='email'
                        name='email'
                        value={email}
                        onChange={this.handleChange}
                        label='Correo Electronico'
                        required
                    />
                    <FormInput
                        type='password'
                        name='password'
                        value={password}
                        onChange={this.handleChange}
                        label='Contraseña'
                        required
                    />
                    <FormInput
                        type='password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={this.handleChange}
                        label='Confirmar Contraseña'
                        required
                    />
                    <div className="group">
                        <input type="submit" className="button" value="Inscribeme"/>
                    </div>
                    <div className="foot-lnk">
                        <label htmlFor="tab-1">Ya eres miembro?</label>
                    </div>
                </div>
            </form>
        )
    }
}
export default SignUp;
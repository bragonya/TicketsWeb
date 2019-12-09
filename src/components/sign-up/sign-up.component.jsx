import React from 'react';
import FormInput from '../form-input/form-input.component';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname:'',
            lastname:'',
            telephone:'',//number
            email: '',
            comment: '',
            register_number: '',//number
            university: '',    
            password: '',
            confirmPassword: ''
        };
    }

    handleSubmit = async event => {
        event.preventDefault();
    
        const { state:{
                    firstname, lastname, telephone, email,
                    comment, register_number, university, password, confirmPassword
                },
                props:{
                    goSignIn
                }
              } = this;
    
        if (password !== confirmPassword) {
          alert("passwords no son iguales");
          return;
        }
    
        try {
            let response = await fetch("http://localhost:4001/register", {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstname:firstname,
                    lastname:lastname,
                    telephone:parseInt(telephone),
                    email:email,
                    comment:comment,
                    register_number:parseInt(register_number),
                    university:university,    
                    password:password
                })
            });
            let { state, message } = await response.json();
            if(state){
                alert(message);
                this.setState({
                    firstname:'',
                    lastname:'',
                    telephone:'',//number
                    email: '',
                    comment: '',
                    register_number: '',//number
                    university: '',    
                    password: '',
                    confirmPassword: ''
                });
                goSignIn();
            }else{
                alert(message);    
            }

        } catch (error) {
            console.error(error);
        }
    };
    
    handleChange = event => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    };
    
    render(){
        const { firstname, lastname, telephone, email,
            comment, register_number, university, password, confirmPassword 
          } = this.state;

        return (            
            <form onSubmit={this.handleSubmit}>
                <div className="sign-up-htm">
                    <FormInput
                        type='text'
                        name='firstname'
                        value={firstname}
                        onChange={this.handleChange}
                        label='Nombre'
                        required
                    />
                    <FormInput
                        type='text'
                        name='lastname'
                        value={lastname}
                        onChange={this.handleChange}
                        label='Apellido'
                        required
                    />
                    <FormInput
                        type='number'
                        name='telephone'
                        value={telephone}
                        onChange={this.handleChange}
                        label='Telefono'
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
                        type='number'
                        name='register_number'
                        value={register_number}
                        onChange={this.handleChange}
                        label='Numero Colegiado o Carnet'
                        required
                    />
                    <FormInput
                        type='text'
                        name='university'
                        value={university}
                        onChange={this.handleChange}
                        label='Universidad'
                        required
                    />
                    <FormInput
                        type='text'
                        name='comment'
                        value={comment}
                        onChange={this.handleChange}
                        label='Comentario'
                        
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
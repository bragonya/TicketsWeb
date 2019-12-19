import React from 'react';
import FormInput from '../form-input/form-input.component';


let initialState ={
    firstname:'',
    lastname:'',
    telephone:'',//number
    email: '',
    comment: '',
    register_number: '',//number
    university: ''
};
class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...initialState };
    }

    handleSubmit = async event => {
        event.preventDefault();
    
        const { state:{
                    firstname, lastname, telephone, email,
                    comment, register_number, university
                },
                props:{
                    goSignIn
                }
              } = this;
    
        try {
            let response = await fetch(process.env.REACT_APP_BASE_URL + "/register", {
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
                    university:university
                })
            });
            let { state, message } = await response.json();
            if(state){
                alert(message);
                this.setState({ ...initialState });
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
            comment, register_number, university
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
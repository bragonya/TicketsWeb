import React from "react";


var mailOptions = {
    from: 'rluis4490@gmail.com',
    to: 'bragonya@gmail.com',
    subject: 'PeticionSoporteUNbiased',
    html: ''
};

let initialState = {
    email: '',
    fullname: '',
    message:''
};

class Contact extends React.Component {
    state = { ...initialState };

    handleSubmit = event => {
        const { fullname, email, message } = this.state;
        event.preventDefault();
        try {
            mailOptions['html'] = `<h1>${fullname}</h1><h3>${email}</h3><p>${message}</p>`;
            fetch((process.env.REACT_APP_BASE_URL) + "/sendEmail", {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                   mailOptions
                })
            })
            .then( response => response.json())
            .then( response =>{
                console.log(response);
                this.setState({ ...initialState });
            })
            .catch(err=>{
                console.log(err);
                this.setState({ ...initialState });
            });
        } catch (error) {
            console.log(error);
        }
    };
    handleChange = event => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    };

    render() {
        const  {email, fullname, message} = this.state;
        return (
            <div className="contact section">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h2>Contactenos</h2>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">Nombre</label>
                                    <input 
                                        name='fullname' 
                                        value={fullname}
                                        handleChange={this.handleChange}    
                                        type="text" className="form-control" id="name" aria-describedby="nameHelp" placeholder="John" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input 
                                        name='email' 
                                        value={email}
                                        handleChange={this.handleChange}
                                        type="email" 
                                        className="form-control"
                                        id="email" aria-describedby="emailHelp"
                                        placeholder="john@doe.com" required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">Mensaje</label>
                                    <textarea 
                                        value={message}
                                        handleChange={this.handleChange}
                                        name="message" id="message" rows="6" className="form-control" required></textarea>
                                </div>
                                <button type="submit" className="btn btn-orange">Enviar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Contact;
import React from "react";

class Contact extends React.Component {
    render() {
        return (
            <div className="contact section">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h2>Contactenos</h2>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="name">Nombre</label>
                                    <input type="text" className="form-control" id="name" aria-describedby="nameHelp" placeholder="John" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="john@doe.com" required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">Mensaje</label>
                                    <textarea name="message" id="message" rows="6" className="form-control" required></textarea>
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
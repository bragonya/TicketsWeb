import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

class Contact extends React.Component {
    render() {
        return (
            <div className="contact section">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h2>Contactenos</h2>
                            <form>
                                <div class="form-group">
                                    <label for="name">Nombre</label>
                                    <input type="text" class="form-control" id="name" aria-describedby="nameHelp" placeholder="John" required />
                                </div>
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="john@doe.com" required/>
                                </div>
                                <div class="form-group">
                                    <label for="message">Mensaje</label>
                                    <textarea name="message" id="message" rows="6" className="form-control" required></textarea>
                                </div>
                                <button type="submit" class="btn btn-orange">Enviar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Contact;
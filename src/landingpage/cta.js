import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

class CTA extends React.Component {
    render() {
        return (
            <div className="cta">
                <div className="background" alt="Photo by Joanna Kosinska on Unsplash"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <div className="join">
                                {/* <span className="mr-4">No lo pienses mas, </span> */}
                                <Link to="/register" className="btn btn-orange">Registrarme ahora</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default CTA;
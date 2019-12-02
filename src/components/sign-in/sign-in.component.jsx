import React from 'react';

const SignIn = () => (
    <form>
        <div className="sign-in-htm">
            <div className="group">
                <label htmlFor="user" className="label">Username</label>
                <input id="user" type="text" className="input"/>
            </div>
            <div className="group">
                <label htmlFor="pass" className="label">Password</label>
                <input id="pass" type="password" className="input" datatype="password"/>
            </div>
            <div className="container-group">
                <div className="group">
                    <input type="submit" className="button sign-in" value="Sign In"/>
                </div>
                <div className="group">
                    <input type="submit" className="button" value="Sign In Google"/>
                </div>
            </div>
            
            <div className="foot-lnk">
                <label htmlFor="tab-1">Olvidó Su Contraseña?</label>
            </div>
        </div>
    </form>
);

export default SignIn;
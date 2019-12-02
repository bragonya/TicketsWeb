import React from 'react';

import './sign-in-sign-up.styles.scss';

const SignInSigUp = () => (
    <React.Fragment>
        <div className="login-wrap">
            <div className="login-html">
                <input id="tab-1" type="radio" name="tab" className="sign-in" defaultChecked={true} />
                <label htmlFor="tab-1" className="tab">Entrar</label>
                <input id="tab-2" type="radio" name="tab" className="sign-up"/>
                <label htmlFor="tab-2" className="tab">Inscribirse</label>
                <div className="login-form">
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
                    <form>
                        <div className="sign-up-htm">
                            <div className="group">
                                <label htmlFor="user" className="label">Username</label>
                                <input id="user" type="text" className="input"/>
                            </div>
                            <div className="group">
                                <label htmlFor="pass" className="label">Password</label>
                                <input id="pass" type="password" className="input" datatype="password"/>
                            </div>
                            <div className="group">
                                <label htmlFor="pass" className="label">Repeat Password</label>
                                <input id="pass" type="password" className="input" datatype="password"/>
                            </div>
                            <div className="group">
                                <label htmlFor="pass" className="label">Email Address</label>
                                <input id="pass" type="text" className="input"/>
                            </div>
                            <div className="group">
                                <input type="submit" className="button" value="Sign Up"/>
                            </div>
                            <div className="foot-lnk">
                                <label htmlFor="tab-1">Ya eres miembro?</label>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </React.Fragment>
);

export default SignInSigUp;
import React from 'react';

const SignUp = () => (
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
);

export default SignUp;
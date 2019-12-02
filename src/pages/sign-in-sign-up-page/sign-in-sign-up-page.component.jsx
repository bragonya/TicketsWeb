import React from 'react';

import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";

import './sign-in-sign-up-page.styles.scss';

const SignInSigUpPage = () =>(
    <div className='sign-in-and-sign-up'>
        
        <div className="login-wrap">
            <div className="login-html">
                <input id="tab-1" type="radio" name="tab" className="sign-in" defaultChecked={true} />
                <label htmlFor="tab-1" className="tab">Entrar</label>
                <input id="tab-2" type="radio" name="tab" className="sign-up"/>
                <label htmlFor="tab-2" className="tab">Inscribirse</label>
                <div className="login-form">
                    
                    <SignIn/>       
                    <SignUp/>
                </div>
            </div>
        </div>

    </div>
    
);

export default SignInSigUpPage;
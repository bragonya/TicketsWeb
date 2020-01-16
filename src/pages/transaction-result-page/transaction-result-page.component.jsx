import React from 'react';
import {withRouter} from 'react-router-dom';
import { ReactComponent as Icon} from '../../assets/success.svg';

import IframeComponent from '../../components/iframe-component/iframe.component';

const TransactionResultPage = ({match}) => {    
    const { params: { id } }  = match;
    let result = parseInt(id);
    var iframeUrl='https://ecm.firstatlanticcommerce.com/MerchantPages/PaymentUnbiased/PayPage/Ed9ZQk3HEkmKIUL5Kl5YaQ2';
    console.log(id);
    
    return(
        <div className='container-fluid' style={{marginTop:'200px', textAlign:'center' }}>
            {result===1?
                <>
                <Icon width={50} height={50} ></Icon>    
                <h1>Bienvenido a Unbiased 2020</h1>
                <span>Hemos enviado a tu correo la informacion de tu compra.</span>
           
                <IframeComponent src={iframeUrl} height="100%" width="45%"/>            
                
           
                </>
                :result===2?
                <>
                <div  style={{color:'#721c24'}} role="alert">
                    <h1>Error al realizar el pago</h1>
                </div>
                <span>Intenta de nuevo, de persistir el error contacta con el organizador del evento.</span>
                </>
                :null
            }
        </div>
    );
};
export default withRouter(TransactionResultPage);
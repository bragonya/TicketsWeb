import React from "react";
class Video extends React.Component {
    
    render() {
        return (
            <div className="section text-align--center">  
            <h2>¡Bienvenidos a Unbiased 2020!</h2>
            <div className="card" style={{marginLeft:'5%',marginRight:'5%'}} >
            <div className="embed-responsive embed-responsive-16by9">
            <iframe 
                title='Dr. Paulo Kano' 
                className="embed-responsive-item" 
                width="560" 
                height="315" 
                src="https://www.youtube.com/embed/kBsj8C7bGs8" 
                frameBorder="0" 
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen></iframe>
            </div>
            <div className="card-body">
                <h5 className="card-title">Dr. Paulo Kano</h5>
                <p className="card-text" style={{textAlign:'justify'}} >Este es la primera visita de Paulo Kano a Guatemala. Hemos convertido nuestra conferencia anual en un curso demostrativo. Con dos pacientes Paulo Kano en vivo demostratrá usted puede transferir la información facial de su paciente para que junto con un modelo digital (ya se al escanerar un modelo o escanerar directamente a su paciente en boca) usted pueda obtener todas las ventajas del mundo de la odontología digital: Encerado digital, diseños de sonrisa e impresión de Mock Ups en impresoras 3D. El mundo de la Odontología Digital ya está acá, solo debe saber como entrar a el.</p>
            </div>
            </div>
            </div>
        );
    }
}


export default Video;


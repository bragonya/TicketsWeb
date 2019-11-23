import React from "react";
class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <div className="background bg-3" alt="Photo by The Climate Reality Project on Unsplash"></div>
                <div className="logo">
                    <h1>Flowable Injection Technique</h1>
                    <h2>Enrique Díaz - Odontología Independiente</h2>
                </div>
                <div className="event-info">
                    <ul class="small-block-grid-1 medium-block-grid-2 large-block-grid-4">
                        <li>
                            <i class="fa fa-map-marker "></i> Ciudad de Guatemala
						</li>
                        <li>
                            <i class="fa fa-calendar"></i>25/05/2020
						</li>
                        <li>
                            <i class="fa fa-microphone"></i>8 Expositores
						</li>
                        <li>
                            <i class="fa fa-ticket"></i>107 tickets restantes
						</li>
                    </ul>
                    <h1>2 dias para adquirir conocimientos de las técnicas más útiles.</h1>
                    <h2>Técnicas que serán capaces de aplicar inmediatamente después del curso para incrementar la calidad de su trabajo,
                        <br/> especialmente en cuanto a función y estética, pero siempre de una forma sencilla.
                    </h2>
                </div>

            </div>
        );
    }
}


export default Header;
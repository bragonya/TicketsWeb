import React from "react";
class Header extends React.Component {
    render() {
        return (
            <div className="header"  style={{marginTop:'-11px'}} /*style={{position:'initial'}}*/ >
                <div className="background bg-3" alt="Photo by The Climate Reality Project on Unsplash"></div>
                <div className="logo">
                    <h1>Flowable Injection Technique</h1>
                    <h2>Enrique Díaz - Odontología Independiente</h2>
                </div>
                <div className="event-info">
                    <ul className="small-block-grid-1 medium-block-grid-2 large-block-grid-4">
                        <li>
                            <table>
                                <tbody>
                                    <tr>
                                        <td><i className="fa fa-map-marker "></i></td>
                                        <td> Ciudad de Guatemala</td>
                                    </tr>
                                </tbody>
                            </table>
						</li>
                        <li>
                            <table>
                                <tbody>
                                    <tr>
                                        <td><i className="fa fa-calendar"></i></td>
                                        <td>25/05/2020</td>
                                    </tr>
                                </tbody>
                            </table>
						</li>
                        <li>
                            <table>
                                <tbody>
                                    <tr>
                                        <td><i className="fa fa-microphone"></i></td>
                                        <td>8 Expositores</td>
                                    </tr>
                                </tbody>
                            </table>
						</li>
                        <li>
                            <table>
                                <tbody>
                                    <tr>
                                        <td><i className="fa fa-ticket"></i></td>
                                        <td>107 tickets restantes</td>
                                    </tr>
                                </tbody>
                            </table>
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
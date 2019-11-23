import React from "react";
class Coursesinfo extends React.Component {
    render() {
        return (
            <div className="section container">
                <h2>Acerca de los cursos</h2>
                <div className="row">
                    <div className="col-6">
                        <h3>Objetivos del curso</h3>
                        <p className="text-left">Este curso tiene como principal objetivo dar al participante los conocimientos de las técnicas más útiles
                            que serán capaces de aplicar inmediatamente después del curso para incrementar la calidad de su
                            trabajo, especialmente en cuanto a función y estética, pero siempre de una forma sencilla.</p>
                    </div>
                    <div className="col-6">
                        <img src="/svg/undraw_detailed_analysis_xn7y.svg" alt="" className="img-fluid" />
                    </div>
                    <div className="col-6">
                        <img src="/svg/undraw_windy_day_x63l.svg" alt="" className="img-fluid" />
                    </div>
                    <div className="col-6 my-5">
                        <h3>El participante aprenderá:</h3>
                        <ul className="text-left my-4 mx-auto" style={{ 'max-width': '400px' }}>
                            <li>Diseño de sonrisa digital DSD.</li>
                            <li>Fotografia & video en odontología.</li>
                            <li>Mock Up | Maqueta | Prototipo | APT</li>
                            <li>Preparaciones para carillas Central, Lateral, Canino, Premolar</li>
                            <li>Técnica de Inyección en sector anterior y posterior</li>
                        </ul>
                    </div>
                    <div className="py-4 my-5"><br /></div>
                    <div className="col-12 mt-5 pt-4">
                        <h3>Día 1</h3>
                    </div>
                    <div className="col-12 mt-4">
                        <div className="row">
                            <div className="col-1"></div>
                            <div className="col-5 ml-auto">
                                <div class="card">
                                    <div class="card-body text-left">
                                        <h5 class="card-title">Primera parte</h5>
                                        <h6>Diseño Sonrisa Digital</h6>
                                        <p class="card-text">
                                            Concepto. <br />
                                            Protocolo fotografico.<br />
                                            Protocolo de video.<br />
                                            Planeación.<br />
                                            Flujo de trabajo digital.<br />
                                            Planos de referencia.<br />
                                            Plano oclusal.<br />
                                            Arco facial digital.<br />
                                            Plano horizontal.<br />
                                            Plano vertical.<br />
                                            Visagismo.<br />
                                            Proporción aurea.<br />
                                            Regla digital uso y manejo.<br />
                                            Comunicación interdisciplinaria.<br />
                                            Mock up: Motivacional, substractivo, ideal.<br />
                                            <br />
                                            <br />
                                        </p>
                                        {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                                    </div>
                                </div>
                            </div>
                            <div className="col-5 mr-auto">
                                <div class="card">
                                    <div class="card-body text-left">
                                        <h5 class="card-title">Segunda parte</h5>
                                        <h6>Fotografia Video Dental</h6>
                                        <p class="card-text">
                                            Protocolo fotografico completo: 23 fotografias. <br />
                                            Protocolo de video completo.<br />
                                            Equipo basico y avanzado.<br />
                                            Instrumental para toma fotografica.<br />
                                            Camara DSLR clasificación y modelos.<br />
                                            Tipos de lentes.<br />
                                            Tipos de flash.<br />
                                            Estudio fotografico.<br />
                                            Iluminación LED.<br />
                                            Soportes y tripodes.<br />
                                            Accesorios para edición.<br />
                                            Conceptos básicos de fotografia.<br />
                                            Tiempo de Exposición, apertura, ISO.<br />
                                            Balance de blancos WB.<br />
                                            Configuración basica & avanzada para fotografia.<br />
                                            Configuración basica & avanzada para video.<br />
                                            y mas...
                                        </p>
                                        {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                                    </div>
                                </div>
                            </div>
                            <div className="col-1"></div>
                        </div>
                    </div>

                    <div className="col-12 mt-5 pt-4">
                        <h3>Día 2</h3>
                    </div>
                    <div className="col-12 mt-4">
                        <div className="row">
                            <div className="col-1"></div>
                            <div className="col-5 ml-auto">
                                <div class="card">
                                    <div class="card-body text-left">
                                        <h5 class="card-title">Introducción Teoría</h5>
                                        <h6>Flowable Injection Technique</h6>
                                        <p class="card-text">
                                            Comunicación y entrevista con paciente. <br />
                                            Fotografía y video. <br />
                                            Análisis Estético. <br />
                                            Diseño de Sonrisa. <br />
                                            Toma de Impresión. <br />
                                            Articuladores. <br />
                                            Arcos faciales. <br />
                                            Relación céntrica. <br />
                                            Oclusión céntrica. <br />
                                            Y mas...
                                        </p>
                                        {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                                    </div>
                                </div>
                            </div>
                            <div className="col-5 mr-auto">
                                <div class="card">
                                    <div class="card-body text-left">
                                        <h5 class="card-title">Hands-onPractica</h5>
                                        <h6>Flowable Injection Technique</h6>
                                        <p class="card-text">
                                            Preparaciones para carilla tipo cerámica clasificación I,II,III. <br />
                                            Cubeta transparente como realizarla paso a paso. <br />
                                            Silicona transparente uso y diferencias en marcas. <br />
                                            Detallado y acabo de silicona transparente. <br />
                                            Descontaminación de material para mejor adhesion. <br />
                                            Protocolo adhesivo. <br />
                                            Inyección de resina. <br />
                                            Acabado y terminado. <br />
                                            Pulido y alto brillo. <br />
                                        </p>
                                        {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                                    </div>
                                </div>
                            </div>
                            <div className="col-1"></div>
                        </div>
                    </div>

                </div>
            </div >
        );
    }
}


export default Coursesinfo;
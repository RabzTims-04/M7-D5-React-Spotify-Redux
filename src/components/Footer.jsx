import { Component } from 'react';
import '../css/Footer.css'
import { withRouter } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStepBackward,faStepForward,faPlayCircle,faAlignJustify, faDesktop, faVolumeUp, faHeart } from '@fortawesome/free-solid-svg-icons'

class Footer extends Component {

    render() {
        return (

            <Container fluid>

                <Row className="footer">

                  <Container fluid id="player" className="mt-3 text-center position-relative">

                      <Row className="row-cols-1 row-cols-md-3 no-gutters">

                          {this.props.foot==='home'
                          ?<Col className="d-flex py-2 pl-4">
                              
                          </Col>
                          :<Col className="d-flex py-2 pl-4">

                                <img src={this.props.pic} className="img-fluid" alt="artistname"/>
                                <div className="flex-column pl-3 text-left mt-3 footerp">
                                <p><strong>My Favourite Song</strong></p>            
                                <p className="text-muted">{this.props.title}</p>
                                </div>
                                <FontAwesomeIcon icon={faHeart} className="ml-3 mt-4"/>
                                <svg style={{overflow:'visible'}} className="pl-3 mt-4" width="16" height="16" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" fill-rule="evenodd"><path d="M1 3v9h14V3H1zm0-1h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" fill-rule="nonzero"></path><path d="M10 8h4v3h-4z"></path></g></svg>

                            </Col>
                        }
                        
                            <Col className="text-center">
                
                              {/* shuffle */}
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                className="bi bi-shuffle  mb-2"
                                viewBox="0 0 16 16"
                                >
                                <path
                                    fill-rule="evenodd"
                                    d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z"
                                />
                                <path
                                    d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z"
                                />
                                </svg>

                               {/*  Back */}
                                <FontAwesomeIcon icon={faStepBackward} className="mx-4 mb-1" />

                               {/* Play */}
                               
                                <FontAwesomeIcon icon={faPlayCircle} className="play-pause" size="2x" />

                                {/*  next */}
                                <FontAwesomeIcon icon={faStepForward} className="mx-3  mb-1" />

                               {/*  repeat*/}
                                <svg
                                className="repeat bi bi-arrow-repeat mb-2"
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                                >
                                <path
                                    d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"
                                />
                                <path
                                    fill-rule="evenodd"
                                    d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
                                />
                                </svg>

                                <div class="row justify-content-center text-muted">
                                    <div class="col-12">
                                        <span id="current-time" class="time">0:00</span>
                                        <input type="range" id="seek-slider" max="100" value="0"/>
                                        <span id="duration" class="time">0:00</span>
                                    </div>
                                </div>

                          </Col>

                          <Col className="mt-3">
                                <FontAwesomeIcon icon={faAlignJustify} className='mr-3' />

                                <FontAwesomeIcon icon={faDesktop}/>                              
                    
                                <div className="slidecontainer d-inline-block mt-1 ml-3">
                                    <FontAwesomeIcon icon={faVolumeUp} size='1x' className="mr-2" />
                                    <input type="range" min="1" max="100" value="50" className="slider" id="myRange"/>
                                </div>
                          </Col>

                      </Row>

                  </Container>

                </Row>

            </Container>
        );
    }
}

export default withRouter(Footer)
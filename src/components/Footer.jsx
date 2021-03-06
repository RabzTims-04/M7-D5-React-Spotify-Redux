import { Component, createRef } from 'react';
import '../css/Footer.css'
import { withRouter } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStepBackward,faStepForward,faAlignJustify, faDesktop, faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import { AiFillPauseCircle, AiFillPlayCircle, AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import { connect } from 'react-redux';
import { addToFavouritesAction, removeFromFavouritesAction, songIsPlayingAction } from '../redux/actions/actions';

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => ({
    isPlaying: (boolean) => dispatch(songIsPlayingAction(boolean)),
    addToFavourites: (song) => dispatch(addToFavouritesAction(song)),
    removeFromFavourites: (song) => dispatch(removeFromFavouritesAction(song))
})
class Footer extends Component {

    audioPlayer = createRef()
    progressBar = createRef()
    animationRef = createRef()

    state={
        duration:0,
        currentTime: 0
    }

    calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnedMinutes}:${returnedSeconds}`;
      }

    togglePlayPause = () => {
       const prevValue = this.props.currentSong.isPlaying;
        this.props.isPlaying(!prevValue); 
        if (!prevValue) {
          this.audioPlayer?.current?.play();
          this.animationRef.current = requestAnimationFrame(this.whilePlaying)
          console.log(this.audioPlayer?.current?.play());
        } else {
          this.audioPlayer.current?.pause();
         cancelAnimationFrame(this.animationRef.current)
        }
      }

      whilePlaying = () => {
          if(this.progressBar.current && this.audioPlayer.current){
        this.progressBar.current.value = this.audioPlayer.current.currentTime;
      }
        this.changePlayerCurrentTime();
        this.animationRef.current = requestAnimationFrame(this.whilePlaying);
      }

      changeRange = () => {
          if(this.audioPlayer.current && this.progressBar.current)
        this.audioPlayer.current.currentTime = this.progressBar.current.value;
        this.changePlayerCurrentTime();
      }

      changePlayerCurrentTime = () => {
        this.progressBar.current?.style.setProperty('--seek-before-width', `${this.progressBar.current.value / this.state.duration * 100}%`)
        this.setState({
            ...this.state,
            currentTime: this.progressBar.current?.value
        })
      }

      backTen = () => {
        this.progressBar.current.value = Number(this.progressBar.current.value - 1);
        this.changeRange();
      }
    
      forwardTen = () => {
        this.progressBar.current.value = Number(this.progressBar.current.value + 1);
        this.changeRange();
      }

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
                              <audio src={this.props.currentSong.song?.preview} preload="metadata"  ref={this.audioPlayer}></audio> 
                                <img src={`https://cdns-images.dzcdn.net/images/cover/${this.props.currentSong.song?.md5_image}/350x350.jpg`} className="img-fluid" alt="artistname"/>
                                <div className="flex-column pl-3 text-left mt-3 footerp">
                                <p><strong>My Favourite Song</strong></p>            
                                <p className="text-muted">{this.props.currentSong.song?.title_short}</p>
                                </div>
                                {
                                    (this.props.favourites.songs.findIndex(song => song.id === this.props.currentSong.song.id) !== -1 )
                                    ?<AiFillHeart 
                                    onClick={() => this.props.removeFromFavourites(this.props.currentSong.song && this.props.currentSong.song)}
                                    className="ml-3 mt-2" />
                                    :<AiOutlineHeart 
                                    onClick={() => this.props.addToFavourites(this.props.currentSong.song && this.props.currentSong.song)}
                                    className="ml-3 mt-2" />
                                }
                                <svg style={{overflow:'visible'}} className="pl-3 mt-2" width="16" height="16" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" fill-rule="evenodd"><path d="M1 3v9h14V3H1zm0-1h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" fill-rule="nonzero"></path><path d="M10 8h4v3h-4z"></path></g></svg>

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
                                <FontAwesomeIcon onClick={this.backTen} icon={faStepBackward} className="mx-4 mb-1" />

                               {/* Play */}
                              <Button className="play-pause-btn" onClick={ this.togglePlayPause}>
                               {this.props.currentSong.isPlaying
                               ?<AiFillPauseCircle style={{width:"40px", height:"40px"}}/>
                               :<AiFillPlayCircle style={{width:"40px", height:"40px"}}/>
                               }                               
                               </Button>

                                {/*  next */}
                                <FontAwesomeIcon onClick={this.forwardTen} icon={faStepForward} className="mx-3  mb-1" />

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
                                        <span id="current-time" class="time">{this.calculateTime(this.state.currentTime)}</span>
                                        <input onChange={this.changeRange} type="range" id="seek-slider" ref={this.progressBar} defaultValue="0"/>
                                        <span id="duration" class="time">{this.audioPlayer?.current?.duration ? this.calculateTime(this.audioPlayer?.current?.duration): "00:00"}</span>
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

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Footer))
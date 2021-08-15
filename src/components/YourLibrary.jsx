import { Component } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap'
import MyNav from './MyNav'
import Footer from './Footer'
import '../css/Album.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faMusic } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import { currentSongPlayingAction, songIsPlayingAction, removeFromFavouritesAction, addToFavouritesAction } from '../redux/actions/actions';

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) =>({
  currentSongplaying: (song) => dispatch(currentSongPlayingAction(song)),
  songIsPlaying: (boolean) => dispatch(songIsPlayingAction(boolean)),
  addToFavourites: (song) => dispatch(addToFavouritesAction(song)),
  removeFromFavourites: (song) => dispatch(removeFromFavouritesAction(song))
})

class YourLibrary extends Component {

    state={
        currentSong: this.props.currentSong.song
    }

    componentDidMount = () => {
        console.log(this.props.currentSong);
    }

    render() {

        return (

              <>

         <Container fluid>
             <Row>
                 <Col md={2} className="mynav d-flex flex-column">

                     <MyNav bottom="other"/>

                 </Col>

                 <Col id="content" md={10} className="pb-0">

                     <Container>
                    {/*  <Audio/> */}
                         <Row>

                             <Col className="mt-4" id="albumList">
                               <Table className="table table-borderless">

                                 <tbody id="music-album">

                                   {this.props.favourites.songs
                                   ?this.props.favourites.songs.map(track=>
                                    <tr id={track.id}
                                    onClick = {() =>{
                                      this.props.currentSongplaying(track)
                                      this.props.songIsPlaying(false)
                                    } }>
                                      <td id="music-icon">
                                        <FontAwesomeIcon icon={faMusic}/>
                                      </td>
                                      <td >
                                        <Link>
                                            {track.title}
                                        </Link>
                                        <p>{track.artist.name}</p>
                                      </td>
                                      <td>{track.duration}</td>
                                    </tr>
                                    ) 
                                    :<p style={{color:"white"}}>Loading</p>
                                   }
                                  

                                 </tbody>

                               </Table>
      
                             </Col>

                         </Row>
                     </Container>
            
                 </Col>

             </Row>

         </Container>

          <Footer foot='other'/> 

          </>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(YourLibrary)
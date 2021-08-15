import { Component } from 'react';
import { Container, Row, Col, Button, Table } from 'react-bootstrap'
import MyNav from './MyNav'
import Footer from './Footer'
import '../css/Album.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaRegHeart, FaHeart } from "react-icons/fa"
import { faEllipsisH, faHeart, faMusic } from '@fortawesome/free-solid-svg-icons'
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

                             {/* <Col md={4} className="p-0 mt-5">
                                 <div className="d-flex align-center justify-content-center">
                                     <Link to="">
                                          <img id="queen" className="w-60 img-fluid"
                                          src={`https://cdns-images.dzcdn.net/images/cover/${this.props.currentSong.song?.md5_image}/350x350.jpg`} alt="coverimage"/>
                                     </Link>
                                 </div>
                                 <h5 className="queen-II text-center mt-2">{this.props.currentSong.song?.title}<br></br></h5>
                                 <p className="small text-center mt-1">{this.props.currentSong.song?.artist?.name}</p>
                                 <div className="text-center">
                                   <Button type="button" className="btn badge-pill btn-success btn-sm myBtn">
                                     PLAY
                                  </Button>                                   
                                 </div>
                                 <p className="small text-center">{this.props.currentSong.song?.title_version} SONGS</p>
                                 <div class="text-center">
                                     {
                                    (this.props.favourites.songs.findIndex(song => song.id === this.props.currentSong.song.id) !== -1 )
                                    ?<FaHeart 
                                    onClick={() => this.props.removeFromFavourites(this.props.currentSong.song && this.props.currentSong.song)} 
                                    className="heart-icon mr-2"/>  
                                    :<FaRegHeart 
                                    onClick={() => this.props.addToFavourites(this.props.currentSong.song && this.props.currentSong.song)} className="heart-icon mr-2 mt-0"/>
                                     }
                                    <FontAwesomeIcon icon={faEllipsisH} className="extra"/>
                                  </div>

                             </Col> */}

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
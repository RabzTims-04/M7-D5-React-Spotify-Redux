import { Component } from 'react';
import { Container, Row, Col, Button, Table } from 'react-bootstrap'
import MyNav from './MyNav'
import Footer from './Footer'
import '../css/Album.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faHeart, faMusic } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import { currentSongPlayingAction, songIsPlayingAction } from '../redux/actions/actions';

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) =>({
  currentSong: (song) => dispatch(currentSongPlayingAction(song)),
  songIsPlaying: (boolean) => dispatch(songIsPlayingAction(boolean))
})

class Album extends Component {

  state={
    tracks:[], 
    album:null,
    title:'',
    shortTitle:'',
    picture:''
  }

  componentDidUpdate =()=>{
    console.log(this.state.title);
  }

  componentDidMount =()=>{
    this.fetchTracks()
  }


  fetchTracks = async()=>{
    try {
      const url='https://striveschool-api.herokuapp.com/api/deezer/album/' + this.props.match.params.albumID
      const response = await fetch(url)
      const data= await response.json()
      const tracks = await data.tracks.data
      const artistName = await data.tracks.data[0].artist.name
      console.log(data);
      console.log(artistName);
      console.log(tracks)
      if(response.ok){
        this.setState({
          ...this.state,
          tracks:tracks,
          album:data
        })
        console.log(this.state.album.cover_big);
      }else{
        console.log('error');
      }
      
    } catch (error) {
      console.log(error);      
    }
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

                             <Col md={4} className="p-0 mt-5">
                                 <div className="d-flex align-center justify-content-center">
                                     <Link to="">
                                          <img id="queen" className="w-60 img-fluid"
                                          src={this.state.album?.cover_medium} alt="coverimage"/>
                                     </Link>
                                 </div>
                                 <h5 className="queen-II text-center mt-2">{this.state.album?.title}<br></br></h5>
                                 <p className="small text-center mt-1">{this.state.album?.artist.name}</p>
                                 <div className="text-center">
                                   <Button type="button" className="btn badge-pill btn-success btn-sm myBtn">
                                     PLAY
                                  </Button>                                   
                                 </div>
                                 <p className="small text-center">{this.state.album?.release_date} . {this.state.album?.nb_tracks} SONGS</p>
                                 <div class="text-center">
                                    <FontAwesomeIcon icon={faHeart} className="heart-icon mr-2"/>  
                                    <FontAwesomeIcon icon={faEllipsisH} className="extra"/>
                                  </div>

                             </Col>

                             <Col md={8} className="mt-4" id="albumList">
                               <Table className="table table-borderless">

                                 <tbody id="music-album">

                                   {this.state.tracks
                                   ?this.state.tracks.map(track=>
                                    <tr id={track.id}
                                    onClick = {() =>{
                                      this.props.currentSong(track)
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
                                    :<p>Loading</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Album)
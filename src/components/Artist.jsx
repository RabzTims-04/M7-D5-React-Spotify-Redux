import { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap'
import MyNav from './MyNav'
import Footer from './Footer'
import '../css/Artist.css'
import { Link } from 'react-router-dom';

class Artist extends Component {

    state={
        albums:[]
    }

    componentDidMount = ()=>{
        this.fetchAlbums()
    }


    fetchAlbums = async ()=>{

      try {
        const url= `https://striveschool-api.herokuapp.com/api/deezer/search?q=` + this.props.match.params.artistName
        console.log(this.props.match.params.artistName);
        const response = await fetch(url)
        const data = await response.json()
        const info = await data.data

        if(response.ok){
            this.setState({
                albums:info
            })
            console.log(this.state.albums);
        }
        else{
            console.log('no data');
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

                 <Col id="contentArtist" md={10} className="mb-5">

                     <Container>
                         <Row className="justify-content-center mt-4 pt-5">
                             <div className="d-flex flex-column text-center z-index:2">
                                 <p>33,000,575 MONTHLY LISTENERS</p>
                                 <h1><strong>{this.props.match.params.artistName}</strong></h1>
                                 <div class="d-md-flex flex-row text-center mt-3 d-none ">
                                    <Button type="button" className=" btn badge-pill btn-primary queen-play playbtn">PLAY</Button>
                                    <Button type="button" className=" btn badge-pill btn-secondary follow mx-3">FOLLOW</Button>
                                    <svg  xmlns="http://www.w3.org/2000/svg" width="50" height="50" className="bi bi-three-dots " viewBox="0 0 16 16">
                                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                                    </svg>                  
                                </div>

                                <Row className="text-center mt-3 justify-content-center d-block d-md-none" style={{zIndex:'10'}}>
                                    <Col>
                                         <Button type="button" className="btn btn-primary queen-play btn-lg btn-block smallPlaybtn badge-pill">PLAY</Button>
                                    </Col>
                                    <Col className="mt-4">
                                        <Button type="button" className="btn btn-primary btn-lg btn-block smallfollow badge-pill">FOLLOW</Button>
                                    </Col>

                                </Row>

                                <div className="mt-4 pt-4" style={{zIndex:'1'}}>
                                    <Row className="flex-wrap">
                                        <Col className="d-flex flex-wrap">
                                            <ul className="nav nav-tabs d-flex flex-wrap">
                                                <li className="nav-item">
                                                    <Link className="nav-link active" to="">
                                                        <strong>OVERVIEW</strong>
                                                    </Link>
                                                </li>
                                                <li className="nav-item mx-lg-4 mx-md-1">
                                                    <Link className="nav-link" to="">
                                                        <strong>RELATED ARTISTS</strong>
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className="nav-link" to="">
                                                        <strong>ABOUT</strong>
                                                    </Link>
                                                </li>

                                            </ul>
                                        </Col>
                                    </Row>                                 
                                </div>

                             </div>

                         </Row>
                     </Container>

                     <div id="cardsDeck" className="artist-cards">
                         
                         <Row className="mx-5">
                             <Row id="deckHeader" className="w-100">
                                  <h3 className="ml-5 ml-sm-5 ml-md-0 ml-lg-2 text-white">Albums</h3>
                             </Row>

                             <Row className="row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-6 px-5">

                                 {this.state.albums.length?this.state.albums.map(album=>
                                        <Col key={album.album.id} className="px-0 mb-4">
                                        <div className="card h-100">
                                            <Link to="">
                                                <img src={album.album.cover_big} className="card-img-top" alt="album"/>
                                            </Link>
                                            <div onClick={()=> this.props.history.push('/album/' + album.album.id)} className="card-play"></div>
                                            <div className="card-body text-center p-3">
                                            <p className="card-text text-white mb-0 mt-1">{album.album.title}</p>
                                            <p className="card-text text-muted"><small className="text-muted"><strong>{album.artist.name}</strong></small></p>
                                            </div>
                                        </div>
                                    </Col>
                                
                                 )
                                 :<p>Error Loading</p>
                                 }

                                 

                             </Row>

                         </Row>

                     </div>
            
                 </Col>

             </Row>

         </Container>
          <Footer foot='other'/> 

          </>
        );
    }
}

export default Artist
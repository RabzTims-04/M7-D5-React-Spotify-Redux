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
       /*  const url = 'https://striveschool-api.herokuapp.com/api/deezer/album/' + this.props.match.params.albumID */
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


/* 
  <section id="cardsDeck" class="artist-cards">
                    <div class="row mx-5">
                      <div id="deckHeader" class="row w-100">
                        <div class="">
                            <h3 class="ml-5 ml-sm-5 ml-md-0 ml-lg-2">Albums</h3>
                            <!-- <span>Description for this deck of cards / section of music</span> -->
                        </div>
                        <!-- <div class="d-flex align-items-center ml-auto">
                            <span>SEE ALL</span>
                        </div> -->
                      </div>
                      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-6 px-5">
                        <div class="col px-0 mb-4">
                          <div class="card h-100">
                            <a href="album.html">
                              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUaqRn8ruIVbKenwXKFX7a9KQKRLRuQRpS-GsHIyY6qrICzKjlifRmFEC_fj8FGC0sPLs&usqp=CAU" class="card-img-top" alt="...">
                            </a>
                            <div class="card-play"></div>
                            <!-- <i class="fab fa-spotify"></i> -->
                            <div class="card-body text-center p-3">
                              <p class="card-text text-white mb-0 mt-1">Bohemian Rhapsody(The Original Soundtrack)</p>
                              <p class="card-text text-muted"><small class="text-muted"><strong>Queen</strong></small></p>
                            </div>
                          </div>
                        </div>
                        <div class="col px-0 mb-4">
                          <div class="card h-100">
                            <a href="album.html">
                              <img src="https://bravewords.com/medias-static/images/news/2016%20II/queenonair1.jpg" class="card-img-top" alt="...">
                            </a>
                            <div class="card-play"></div>  
                            <!-- <i class="fab fa-spotify"></i> -->
                            <div class="card-body text-center p-3">
                              <p class="card-text text-white mb-0 mt-1">On Air</p>
                              <p class="card-text text-muted"><small class="text-muted"><strong>Queen</strong></small></p>
                            </div>
                          </div>
                        </div>
                        <div class="col px-0 mb-4">
                          <div class="card h-100">
                            <a href="album.html">
                              <img src="https://img.discogs.com/h-NVa4igX-riZjnzVFugzXxiRIo=/fit-in/600x591/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-7739371-1483370708-1554.jpeg.jpg" class="card-img-top" alt="...">
                            </a>
                            <div class="card-play"></div>  
                            <!-- <i class="fab fa-spotify"></i> -->
                            <div class="card-body text-center p-3">
                              <p class="card-text text-white mb-0 mt-1">A Nigth At The Odeon</p>
                              <p class="card-text text-muted"><small class="text-muted"><strong>Queen</strong></small></p>
                            </div>
                          </div>
                        </div>
                        <div class="col px-0 mb-4">
                          <div class="card h-100">
                            <a href="album.html">
                              <img src="https://upload.wikimedia.org/wikipedia/en/2/2d/Live_at_the_Rainbow_%2774.jpg" class="card-img-top" alt="...">
                            </a>
                            <div class="card-play"></div>  
                            <!-- <i class="fab fa-spotify"></i> -->
                            <div class="card-body text-center p-3">
                              <p class="card-text text-white mb-0 mt-1">Live At The Rainbow</p>
                              <p class="card-text text-muted"><small class="text-muted"><strong>Queen</strong></small></p>
                            </div>
                          </div>
                        </div>
                        <div class="col px-0 mb-4">
                          <div class="card h-100">
                            <a href="album.html">
                              <img src="https://upload.wikimedia.org/wikipedia/en/2/2d/Live_at_the_Rainbow_%2774.jpg" class="card-img-top" alt="...">
                            </a>
                            <div class="card-play"></div>  
                            <!-- <i class="fab fa-spotify"></i> -->
                            <div class="card-body text-center p-3">
                              <p class="card-text text-white mb-0 mt-1">Live At The Rainbow (Deluxe)</p>
                              <p class="card-text text-muted"><small class="text-muted"><strong>Queen</strong></small></p>
                            </div>
                          </div>
                        </div>
                        <div class="col px-0 mb-4">
                          <div class="card h-100">
                            <a href="album.html">
                              <img src=
                              "http://www.potoclips.com/wp-content/uploads/2016/05/Queen-Hungarian-Rhapsody-002.jpg" class="card-img-top" alt="...">
                            </a>
                            <div class="card-play"></div>  
                            <!-- <i class="fab fa-spotify"></i> -->
                            <div class="card-body text-center p-3">
                              <p class="card-text text-white mb-0 mt-1">Hungarian Rhapsody (Live in Budapest/1986)</p>
                              <p class="card-text text-muted"><small class="text-muted"><strong>Queen</strong></small></p>
                            </div>
                          </div>
                        </div>

                        <div class="col px-0 mb-4">
                          <div class="card h-100">
                            <a href="album.html">
                              <img src="https://upload.wikimedia.org/wikipedia/en/thumb/9/99/Queen_The_Cosmos_Rocks_Album_Cover.jpg/220px-Queen_The_Cosmos_Rocks_Album_Cover.jpg" class="card-img-top" alt="...">
                            </a>
                            <div class="card-play"></div>  
                            <!-- <i class="fab fa-spotify"></i> -->
                            <div class="card-body text-center p-3">
                              <p class="card-text text-white mb-0 mt-1">Paul Rodgers</p>
                              <p class="card-text text-muted"><small class="text-muted"><strong>Queen</strong></small></p>
                            </div>
                          </div>
                        </div>
                        <div class="col px-0 mb-4">
                          <div class="card h-100">
                            <a href="album.html">
                              <img src="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRK7LeHFWl0atUUd1nHO-yyTRQpFxGSMK9AKnmhtg-TARBnJ0Li6wlK0Q6jhM9YMvpYcd17R9k1038avn3t5S0TVDyyNRBl1kkpo4rDfvP0mMEu1VLNr2H5EeM8-TI&usqp=CAE" class="card-img-top" alt="...">
                            </a>
                            <div class="card-play"></div>  
                            <!-- <i class="fab fa-spotify"></i> -->
                            <div class="card-body text-center p-3">
                              <p class="card-text text-white mb-0 mt-1">Greatest Hits II</p>
                              <p class="card-text text-muted"><small class="text-muted"><strong>Queen</strong></small></p>
                            </div>
                          </div>
                        </div>
                        <div class="col px-0 mb-4">
                          <div class="card h-100">
                            <a href="album.html">
                              <img src="https://upload.wikimedia.org/wikipedia/en/a/a1/Returnofthechampions.jpg" class="card-img-top" alt="...">
                            </a>
                            <div class="card-play"></div>  
                            <!-- <i class="fab fa-spotify"></i> -->
                            <div class="card-body text-center p-3">
                              <p class="card-text text-white mb-0 mt-1">Return Of The Champions</p>
                              <p class="card-text text-muted"><small class="text-muted"><strong>Queen</strong></small></p>
                            </div>
                          </div>
                        </div>
                        <div class="col px-0 mb-4">
                          <div class="card h-100">
                            <a href="album.html">
                              <img src="https://m.media-amazon.com/images/I/81jx9KYIe0L._SS500_.jpg" class="card-img-top" alt="...">
                            </a>
                            <div class="card-play"></div>  
                            <!-- <i class="fab fa-spotify"></i> -->
                            <div class="card-body text-center p-3">
                              <p class="card-text text-white mb-0 mt-1">On Fire (Live At The Bowl)</p>
                              <p class="card-text text-muted"><small class="text-muted"><strong>Queen</strong></small></p>
                            </div>
                          </div>
                        </div>
                        <div class="col px-0 mb-4">
                          <div class="card h-100">
                            <a href="album.html">
                              <img src="http://2.bp.blogspot.com/-W1nK1BnpQm8/Td2ZUZDUsAI/AAAAAAAABi0/SrcHk1yy4DM/s1600/Queen+-+Made+in+Heaven.jpg" class="card-img-top" alt="...">
                            </a>
                            <div class="card-play"></div>  
                            <!-- <i class="fab fa-spotify"></i> -->
                            <div class="card-body text-center p-3">
                              <p class="card-text text-white mb-0 mt-1">Made in Heaven</p>
                              <p class="card-text text-muted"><small class="text-muted"><strong>Queen</strong></small></p>
                            </div>
                          </div>
                        </div>
                        <div class="col px-0 mb-4">
                          <div class="card h-100">
                            <a href="album.html">
                              <img src="https://www.udiscovermusic.com/wp-content/uploads/2019/05/Queen-Hot-Space-album-cover-820.jpg" class="card-img-top" alt="...">
                            </a>
                            <div class="card-play"></div>  
                            <!-- <i class="fab fa-spotify"></i> -->
                            <div class="card-body text-center p-3">
                              <p class="card-text text-white mb-0 mt-1">Hot Space</p>
                              <p class="card-text text-muted"><small class="text-muted"><strong>Queen</strong></small></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
            </section> */
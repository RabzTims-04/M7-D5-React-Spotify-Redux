import  { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MyNav from './MyNav';
import Footer from './Footer'
import { Link } from 'react-router-dom'
import '../css/Home.css'
import { connect } from 'react-redux';

class Home extends Component {

     state={
        search:'',
        searchArtist:'',
        rockSongs: [],
        popSongs: [],
        hipHopSongs: []
    } 

    
    rockArtists = [
        "queen",
        "u2",
        "thepolice",
        "eagles",
        "thedoors",
        "oasis"
      ];

      popArtists = [
        "ariana",
        "maroon",
        "onerepublic",
        "coldplay",
        "katyperry",
      ];

      hipHopArtists = ["eminem", "snoopdogg", "lilwayne", "drake"];

    componentDidMount = async ()=>{
        
        await this.rockArtists.map(rock => this.fetchAlbum(rock, "rockSongs"))
        await this.popArtists.map(pop => this.fetchAlbum(pop, "popSongs"))
        await this.hipHopArtists.map(hiphop => this.fetchAlbum(hiphop, "hipHopSongs"))

        console.log(this.state.popSongs);
    }

     componentDidUpdate = (prevProps)=>{
         console.log(prevProps);
         if(this.state.search.length>0){
            this.fetchSearch("rockSongs") 
         }
       
    } 

    newSearch =(val)=>{
        if(val.length){
            this.setState({
                ...this.state,
                search:val
            })
        }       
    }

    currentDay = () => {
        let today = new Date()
        let currentDay = today.getDay()
        let daylist = ["Sunday","Monday","Tuesday","Wednesday ","Thursday","Friday","Saturday"];
        return daylist[currentDay]
    }

    fetchAlbum = async (artist, category)=>{

        try {
            const url= `https://striveschool-api.herokuapp.com/api/deezer/search?q=${artist}`
            const response = await fetch(url)
            const data = await response.json()
            const artistpic = await data.data[0]
            console.log(data.data);
            console.log(artistpic);
            if(response.ok){
                 this.setState({
                    ...this.state,                    
                    [category]:[...this.state[category], artistpic]
                }) 
                console.log(this.state.rockSongs);
                console.log(this.state.popSongs);
                console.log(this.state.hipHopSongs);
            }
            else{
                console.log('notfound');
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
                 <Col md={2} className="mynav d-flex flex-column justify-content-between">

                     <MyNav bottom="home"/>

                 </Col>

                 <Col md={10} className="home" id="contentHome">

                     <div>
                        <div class="my-4 pt-4" style={{zIndex:'1'}}>
                            <ul class="nav nav-tabs justify-content-center">
                                <li class="nav-item pr-1">
                                    <Link to="" className="nav-link active">
                                        <strong>TRENDING</strong>
                                    </Link>
                                </li>
                                <li class="nav-item pr-1">
                                    <Link to="" className="nav-link">
                                        <strong>PODCAST</strong>
                                    </Link>
                                </li>
                                <li class="nav-item pr-1">
                                     <Link to="" className="nav-link">
                                        <strong>MOODS AND GENERES</strong>
                                    </Link>
                                </li>
                                <li class="nav-item pr-1">
                                    <Link to="" className="nav-link">
                                        <strong>NEW RELEASES</strong>
                                    </Link>
                                </li>
                                <li class="nav-item">
                                    <Link to="" className="nav-link">
                                        <strong>DISCOVER</strong>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                     </div>

                     {/* Cards */}

                     <div id="cardsDeck">
                         {this.props.artistsSearch.artists.length && this.props.artistsSearch.searchLength
                         ?<div>

                         </div>
                         :<>
                         <Row className="mx-5">
                             <Row id="deckHeader" className="w-100">

                                 <div className="mt-4 mb-1">
                                    <h3>#THROWBACK{this.currentDay().toUpperCase()}</h3>
                                 </div>

                            </Row> 

                            <Row className="row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-6 px-5 home-cards">
                                 {
                                this.state.rockSongs.length && this.state.rockSongs.map((album,i) =>
                                 {console.log(this.state.popArtists);
                                     return (<Col key={album.album.id} className="col px-0 mb-4">
                                     
                                 <div className="card h-100">
                                         
                                             <img onClick={()=> this.props.history.push('/artist/' + album.artist.name)} src={album.artist.picture_medium} className="card-img-top" alt="artistname"/>
                                       
                                         <div className="card-body text-center p-3">
                                             <h5 className="card-title">{album.artist.name}</h5>
                                         </div>
                                 </div>
                                 </Col>) } )
                                                              
                                } 
                                

                            </Row>

                         </Row>

                         <Row className="mx-5">
                             <Row id="deckHeader" className="w-100">

                                 <div className="mt-4 mb-1">
                                    <h3>#POP CLASSICS</h3>
                                 </div>

                            </Row> 

                            <Row className="row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-6 px-5 home-cards">
                                 {
                                this.state.popSongs.length && this.state.popSongs.map((album,i) =>
                                 {console.log(this.state.popSongs);
                                     return (<Col key={album.album.id} className="col px-0 mb-4">
                                     
                                 <div className="card h-100">
                                         
                                             <img onClick={()=> this.props.history.push('/artist/' + album.artist.name)} src={album.artist.picture_medium} className="card-img-top" alt="artistname"/>
                                       
                                         <div className="card-body text-center p-3">
                                             <h5 className="card-title">{album.artist.name}</h5>
                                         </div>
                                 </div>
                                 </Col>) } )
                                                              
                                } 
                                

                            </Row>

                         </Row>

                       <Row className="mx-5">
                             <Row id="deckHeader" className="w-100">

                                 <div className="mt-4 mb-1">
                                    <h3>#HIPHOP CLASSICS</h3>
                                 </div>

                            </Row> 

                            <Row className="row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-6 px-5 home-cards">
                                 {
                                this.state.hipHopSongs.length && this.state.hipHopSongs.map((album,i) =>
                                 {console.log(this.state.rockArtists);
                                     return (<Col key={album.album.id} className="col px-0 mb-4">
                                     
                                 <div className="card h-100">
                                         
                                             <img onClick={()=> this.props.history.push('/artist/' + album.artist.name)} src={album.artist.picture_medium} className="card-img-top" alt="artistname"/>
                                       
                                         <div className="card-body text-center p-3">
                                             <h5 className="card-title">{album.artist.name}</h5>
                                         </div>
                                 </div>
                                 </Col>) } )
                                                              
                                } 
                                

                            </Row>

                         </Row> 
                         </>
                         }

                         <Row className="mx-5">
                              <Row id="deckHeader" className="w-100">

                                 <div className="mt-4 mb-1">
                                     <h3>#Search Result</h3>
                                 </div>

                              </Row>

                                <Row>
                                {
                                      (this.props.artistsSearch.artists.length && (this.props.artistsSearch.searchLength))
                                      ?this.props.artistsSearch.artists.map(artist =>
                                         <Col key={artist.album.id} className="col px-0 mb-4">
                                          
                                      <div className="card h-100">
                                              
                                                  <img onClick={()=> this.props.history.push('/artist/' + artist.artist.name)} src={artist.artist.picture_medium} className="card-img-top" alt="artistname"/>
                                            
                                              <div className="card-body text-center p-3">
                                                  <h5 className="card-title">{artist.artist.name}</h5>
                                              </div>
                                      </div>
                                      </Col> ) 
                                      :
                                          <div >
                                            <p className="pl-5 ml-5">Search for your favourite artists</p>
                                          </div>
                                       
                                 }
                                </Row>

                         </Row>

                     </div>
            
                 </Col>

             </Row>

         </Container>
          <Footer foot='home'/> 

          </>
        )
    }
}

export default connect(s=>s)(Home)
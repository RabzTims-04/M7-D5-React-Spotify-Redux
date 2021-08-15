import  { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MyNav from './MyNav';
import Footer from './Footer'
import { Link } from 'react-router-dom'
import '../css/Home.css'

class Home extends Component {

     state={
        albums:[],
        search:'',
        searchArtist:''
    } 

    componentDidMount =()=>{

        const artists = [
            'Eminem', 'Queen', 'Ed sheeran', 'The Beatles', 
            'Back street boys','Justin Bieber','Micheal Jackson',
            'Justin Timberlake', 'Enrique', 'Lady Gaga', 'Ariana Grande', 
            'Bruno Mars', 'Atif', 'Rahat Fateh', 'Farhan Saeed'
        ]
        
        artists.map(artist => this.fetchAlbum(artist))       
    }

     componentDidUpdate = (prevProps)=>{
         console.log(prevProps);
         if(this.state.search.length>0){
            this.fetchSearch() 
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

    fetchSearch = async()=>{
        const url=(this.state.search.length>0?('https://striveschool-api.herokuapp.com/api/deezer/search?q='+ this.state.search):'')
        const response = await fetch(url)
        const data = await response.json()
        const searchArtist = await data.data[0]
        console.log(searchArtist);
        if(response.ok){
            this.setState({
                ...this.state,
                searchArtist:searchArtist
            })
        }
    }

    fetchAlbum = async (artist)=>{

        try {
            const url= `https://striveschool-api.herokuapp.com/api/deezer/search?q=` + artist
            const response = await fetch(url)
            const data = await response.json()
            const artistpic = await data.data[0]
            console.log(data.data);
            console.log(artistpic);
            console.log(this.state.albums);
            if(response.ok){
                 this.setState({
                    ...this.state,
                    
                    albums: [...this.state.albums, artistpic]
                }) 
                console.log(this.state.albums);
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
                         <Row className="mx-5">
                             <Row id="deckHeader" className="w-100">

                                 <div className="mt-4 mb-1">
                                     <h3>#THROWBACKTHURSDAY</h3>
                                 </div>

                            </Row> 

                            <Row className="row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-6 px-5 home-cards">
                                 {this.state.albums.length?this.state.albums.map((album,i) =>
                                 {console.log(this.state.albums);
                                     return (<Col key={album.album.id} className="col px-0 mb-4">
                                     
                                 <div className="card h-100">
                                         
                                             <img onClick={()=> this.props.history.push('/artist/' + album.artist.name)} src={album.artist.picture_medium} className="card-img-top" alt="artistname"/>
                                       
                                         <div className="card-body text-center p-3">
                                             <h5 className="card-title">{album.artist.name}</h5>
                                         </div>
                                 </div>
                                 </Col>) } ) 
                                                              
                                :<p>Error Loading</p>
                                } 
                                

                            </Row>

                         </Row>

                         <Row className="mx-5">
                             <Row id="deckHeader" className="w-100">

                                 <div className="mt-4 mb-1">
                                     <h3>#Search Result</h3>
                                 </div>

                            </Row> 

                            <Row className="row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-6 px-5 home-cards">
                                 {this.state.searchArtist.length?
    
                                   (<Col className="col px-0 mb-4">
                                     
                                         <div className="card h-100">
                                         
                                             <img onClick={()=> this.props.history.push('/artist/' + this.state.searchArtist.artist.name)} src={this.state.searchArtist.artist.picture_medium} className="card-img-top" alt="artistname"/>
                                       
                                         <div className="card-body text-center p-3">
                                             <h5 className="card-title">{this.state.searchArtist.artist.name}</h5>
                                         </div>
                                 </div>
                                 </Col>)
                                                              
                                :<p></p>
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

export default Home
import { Component } from 'react';
import {Link, withRouter} from 'react-router-dom'
import { FormControl, Spinner, Form } from 'react-bootstrap'
import logo from '../assets/sideassets/crop_spotify_black.png'
import '../css/MyNav.css'
import { connect } from 'react-redux';
import { artistSearchLengthAction, fetchArtistsAction } from '../redux/actions/actions';

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => ({
    searchArtists : (event, artistSearch) => dispatch(fetchArtistsAction(event, artistSearch)),
    searchLength: (number) => dispatch(artistSearchLengthAction(number))
})

class MyNav extends Component {

    state={
        search:"",
        mouseOver: false
    }
    render() {
        return (
            <>

                        <div className="mb-5 pb-5">
                            
                           <ul className="ml-1" style={{listStyle:'none' , padding:'0'}}>
                             <li>
                               <Link  to="/" style={{textDecoration:'none'}}>
                                   <img className="img-fluid  mb-2 mr-2" style={{width:'150px'}} src={logo} alt="spotify-logo"/>
                               </Link>                                  

                            </li> 

                             <li>
                                <Link to='/' style={{textDecoration:'none', color: '#B1B1B1'}}>
                                     <svg className="mr-4" viewBox="0 0 512 512" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M448 463.746h-149.333v-149.333h-85.334v149.333h-149.333v-315.428l192-111.746 192 110.984v316.19z" fill="currentColor"></path></svg>
                                     Home
                                </Link>
                                
                            </li>

                             <li>
                                <Link to='' style={{textDecoration:'none', color: '#B1B1B1'}}>
                                    <svg 
                                    onClick={() => {
                                        this.props.searchLength(0)
                                        this.setState({
                                            ...this.state,
                                            search: ""
                                        })
                                    }}
                                    onMouseOver={() => this.setState({
                                        ...this.state,
                                        mouseOver: true
                                    }) }
                                    className="mr-4 my-4" 
                                    viewBox="0 0 512 512" 
                                    width="24" 
                                    height="24" 
                                    xmlns="http://www.w3.org/2000/svg"><path d="M349.714 347.937l93.714 109.969-16.254 13.969-93.969-109.969q-48.508 36.825-109.207 36.825-36.826 0-70.476-14.349t-57.905-38.603-38.603-57.905-14.349-70.476 14.349-70.476 38.603-57.905 57.905-38.603 70.476-14.349 70.476 14.349 57.905 38.603 38.603 57.905 14.349 70.476q0 37.841-14.73 71.619t-40.889 58.921zM224 377.397q43.428 0 80.254-21.461t58.286-58.286 21.461-80.254-21.461-80.254-58.286-58.285-80.254-21.46-80.254 21.46-58.285 58.285-21.46 80.254 21.46 80.254 58.285 58.286 80.254 21.461z" fill="currentColor" fill-rule="evenodd"></path></svg>
                                     Search
                                </Link>
                                {this.props.artistsSearch.isLoading?
                                                <>
                                                <Spinner animation="grow" size="sm" />
                                                <Spinner animation="grow" />
                                                </>
                                                :this.state.mouseOver && <Form inline>
                                                    <FormControl
                                                    style={{width:"100%"}}
                                                    onKeyDown={(e)=>this.props.searchArtists(e, this.state.search)}
                                                    id="custom-form-jobs"
                                                    value={this.state.search}
                                                    onChange={(e)=>{
                                                        this.props.searchLength(Number(this.state.search.length))
                                                        this.setState({
                                                            ...this.state,
                                                            search:e.target.value
                                                    })}}	
                                                    onMouseLeave= {() => this.setState({
                                                        ...this.state,
                                                        mouseOver: false
                                                    })}
                                                    type="text" 
                                                    placeholder="Search" 
                                                    className=" mr-sm-2" />
                                                </Form>
                                }                                
                            </li>

                             <li >
                                <Link to='/library' style={{textDecoration:'none', color: '#B1B1B1'}}>
                                     <svg className="mr-4" viewBox="0 0 512 512" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M291.301 81.778l166.349 373.587-19.301 8.635-166.349-373.587zM64 463.746v-384h21.334v384h-21.334zM192 463.746v-384h21.334v384h-21.334z" fill="currentColor"></path></svg>
                                     Your Library
                                </Link>
                                
                             </li>
                          </ul>                     
                        
                        </div>

                        {this.props.bottom==='home'
                        ?<div className="bottom">

                        <div class="d-grid gap-2 d-flex flex-column text-center" style={{color: '#B1B1B1'}}>
                            <Link to="">
                                <button class="btn btn-primary badge-pill mb-3 sign" type="button"><strong>SIGN UP</strong></button>
                            </Link> 
                            
                            <Link to="">
                                <button class="btn btn-primary badge-pill login mb-3" type="button"><strong>LOGIN</strong></button>
                            </Link>
                            
                        </div>   

                         <div class="row mb-5 text-center home-bottom">
                            <div class="col-6 d-flex flex-column pr-0">
                                <Link style={{borderRight: '1px solid #B1B1B1'}} to="">
                                    Cookie
                                </Link>
                                <Link className="mt-2" to="">
                                    Policy
                                </Link>
                            </div>
                            <div class="col-6 pl-1 pb-5 mb-5">
                                <Link to="">
                                     Privacy
                                </Link>
                            </div>
                        </div>                      

                    </div>
                        
                        :<div className="sideBottom artist-bottom mb-4">
                            <div className="container mb-5 pb-5">
                                <div className="ml-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-arrow-down-circle"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                    fill-rule="evenodd"
                                    d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"
                                    />
                                </svg>
                                <Link to="" className="ml-3">
                                     <strong>Install App</strong>
                                </Link>
                                </div>
                                <hr className="my-2" />
                                <div className="d-flex">
                                <img
                                    className="img-fluid avatar-img"
                                    alt="avatar"
                                    src="https://img.icons8.com/officel/30/000000/change-user-male.png"
                                />
                                <p className="ml-2 mt-1"><strong>RabzTims</strong></p>
                                </div>
                            </div>
                            </div>
                     }

            </>

        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(MyNav))
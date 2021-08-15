import React,{ Component, createRef } from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'

class Audio extends Component{
    
    refs = createRef()

    state={
        track:''
    }

   componentDidMount =()=>{
        this.fetchTrack() 
        console.log(this.state.track);
   }       


     componentDidUpdate =(prevProps)=>{
        console.log(prevProps);
       if(this.state.track !== this.props.currentSong.song?.preview){           
           this.fetchTrack()
       }      
        console.log(this.state.track);
     
    } 
    

    fetchTrack =()=>{
        if(this.props.currentSong.song.preview){
            this.setState({
                track:this.props.currentSong.song.preview
            },()=>{
                this.refs.audio.pause()
                this.refs.audio.load()
                this.refs.audio.play()
            })
        }

    } 

    render(){

        return(

           /*  <div>
                <Button onClick={this.togglePlay}>
                    {this.state.play?'Pause':'Play'}

                </Button>
            </div> */
    
       /*  <AudioPlayer src={this.state.track} /> */
    
         <audio src={this.state.track} preload="metadata" ref='audio'>

        </audio> 

        )
    }
}
 
export default connect(s=>s)(Audio);
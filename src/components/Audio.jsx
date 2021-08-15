import { Component } from 'react'
import { Button } from 'react-bootstrap'
class Audio extends Component{

    state={
        track:''
    }

   componentDidMount =()=>{
        this.fetchTrack() 
        console.log(this.state.track);
   }       


     componentDidUpdate =(prevProps)=>{
        console.log(prevProps);
       if(this.state.track !== this.props.track){           
           this.fetchTrack()
       }      
        console.log(this.state.track);
     
    } 

    fetchTrack =()=>{
        if(this.props.track){
            this.setState({
                track:this.props.track
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

        <audio controls autoPlay ref='audio'>
             <source src={this.state.track} type="audio/mpeg"/>
             not compatible
        </audio>

        )
    }
}
 
export default Audio;
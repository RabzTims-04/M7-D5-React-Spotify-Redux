import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "@material-ui/core"
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './components/Home'
import Album from './components/Album'
import Artist from './components/Artist';
import YourLibrary from './components/YourLibrary';

function App() {
  return (
    <div>

      <Router>

      <Route path="/" exact render={(routerProps)=><Home {...routerProps} /> }/>

      <Route path="/artist/:artistName" component={Artist}/>

      <Route path="/album/:albumID" component={Album}/>

      <Route path="/library" exact component={YourLibrary}/>

      </Router>
     
    </div>
  );
}

export default App;

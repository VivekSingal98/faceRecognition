import React, { Component } from 'react';
import Navigation from './Component/Navigation/Navigation';
import './App.css';
import Logo from './Component/Logo/Logo';
import FaceRecognition from './Component/FaceRecognition/FaceRecognition';
import ImageLinkedForm from './Component/ImageLinkedForm/ImageLinkedForm';
import Rank from './Component/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import SignIn from './Component/SignIn/SignIn';
import Register from './Component/Register/Register';

const app = new Clarifai.App({
 apiKey: 'ef16b0b0b9e545d593f30cdccb6beecd'
});


const particleOptions={
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          value_area:800
        }
      }
    }
  
}
class App extends Component {
  constructor() {
    super();
    this.state={
      input: '',
      imageUrl: '',
      box: {},
      route:'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation= (data) => {
      const clarifaiFace= data.outputs[0].data.regions[0].region_info.bounding_box;
      // console.log(clarifaiFace);
      const image=document.getElementById('inputimage');
      const width=Number(image.width);
      const height=Number(image.height);
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width- (clarifaiFace.right_col * width),
        bottomRow: height-(clarifaiFace.bottom_row * height)
      }
    }

    displayFaceBox = (box) => {
      console.log(box);
      this.setState({box:box});
    }
  onInputChange=(event) => {
    this.setState({input: event.target.value});
  }

  onRouteChange=(route) => {
    if(route==='signin') {
      this.setState({isSignedIn: false})
    }
    else if(route==='home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }


  onButtonSubmit=()=> {
    this.setState({imageUrl: this.state.input});
     app.models.predict(
      Clarifai.FACE_DETECT_MODEL
      , this.state.input)
     .then(response =>this.displayFaceBox(this.calculateFaceLocation(response)))
     .catch(err => console.log(err));
      /*function(response) {
        console.log(this.state.input);
        this.displayFaceBox(this.calculateFaceLocation(response));
      },
      function(err) {
        // there was an error
        console.log(this.state.input);
        console.log("errorrrrr");
      }
   );*/
  }
  render() {
    return (
      <div className="App">
        <Particles className='particles'
        params={particleOptions}
        /> 
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
        { this.state.route==='signin' 
          ? <SignIn onRouteChange={this.onRouteChange}/>
          : ( this.state.route==='register'
              ? <Register onRouteChange={this.onRouteChange}/>
              : <div>
                <Logo />
                <Rank/>
                <ImageLinkedForm onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit}/>
                <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box} />
                </div>
            )
      }
      </div>
    );
  }
}

export default App;

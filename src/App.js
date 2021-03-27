import React from 'react';
import './App.css';
import axios from 'axios'
import coverPhoto from './asset/coverPhoto.jpg'

class App extends React.Component {
  state = {
    photo: null
  }
  photoHandler = (e) => {
    e.preventDefault();
    axios.get('http://localhost:8000/api/v1/product/605dce7c085e69505c0655db').then(res => {
      console.log(res.data.data.product.photo[0])
      this.setState({ photo: res.data.data.product.photo[0] })
    }).catch(err => {
      console.log(err)

    })
  }

  render() {

    return (
      <div className="App">
        <button onClick={this.photoHandler}>Click</button>
        <img style={{ width: '500px', height: '500px' }} src={this.state.photo} alt="checking" />

      </div>
    )
  }

}

export default App;

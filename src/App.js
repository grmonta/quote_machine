import React from 'react';

import axios from 'axios';
import './style.css';
// eslint-disable-next-line no-unused-vars

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: '',
      author: '',
      imageURL: ''
    };
  }

  componentDidMount() {
    this.getQuote();
    this.getImage();
  }

  //how to get the quote form a json api with axios
  // then save that bits of data into variables
  //then set state with those variables

  getQuote() {
    let url =
      'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';
    axios.get(url).then(results => {
      let data = results.data.quotes;
      let quoteNum = Math.floor(Math.random() * data.length);
      let randomQuote = data[quoteNum];

      this.setState({
        quote: randomQuote['quote'],
        author: randomQuote['author']
      });
    });
  }

  getImage() {
    let url =
      'https://api.unsplash.com/photos/random/?client_id=a5ec42e211d11a16c16ab8ead611202c86fbf358c7805c86b9471a05f4e8eb12';
    axios.get(url).then(results => {
      let data = results.data;
      console.log(data);
      let imageData = data.urls.small;

      this.setState({
        imageURL: imageData
      });
    });
  }
  getNewImage = () => {
    this.getImage();
  };

  getNewQuote = () => {
    this.getQuote();
  };

  render() {
    return (
      <div className="container page-wrapper" id="page-wrapper">
        <h1 className="text-center" id="title">
          Make a Quote Match an Image
        </h1>
        <div className="container " id="quote-box">
          <div className="quote-container card">
            <img
              src={this.state.imageURL}
              alt="random"
              className=" card-img-top "
            />
            <div className="card-body  text-center">
              <blockquote className="blockquote">
                <p id="text">{this.state.quote}</p>
                <footer id="author">-{this.state.author}</footer>
              </blockquote>
            </div>
            <div className="buttons btn-group d-flex justify-content-center ">
              <Button
                href="https://pinterest.com/pin/create/button/?url=&media=&description="
                icon="fab fa-pinterest"
              />
              <Button
                id="new-quote"
                onClick={this.getNewQuote}
                icon="fas fa-arrow-right"
                name=" next quote"
              />
              <Button
                onClick={this.getNewImage}
                icon="fas fa-arrow-right"
                name=" next image"
              />
            </div>
          </div>
        </div>
        <footer className="container d-flex justify-content-center">
          by Giovan
        </footer>
      </div>
    );
  }
}

const Button = props => {
  return (
    <div>
      <button
        type="button"
        className="btn btn-secondary"
        id={props.id}
        onClick={props.onClick}
      >
        <a href={props.href}>
          <i className={props.icon} />
        </a>
        {props.name}
      </button>
    </div>
  );
};

export default App;

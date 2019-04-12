import React from 'react';

import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import quotes from './quotes';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: '',
      author: ''
    };
  }

  componentDidMount() {
    this.getQuote();
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

  getNewQuote = () => {
    this.getQuote();
  };

  render() {
    return (
      <div className="container" id="quote-box">
        <div className="quote-container">
          <h1 id="text">{this.state.quote}</h1>
          <p id="author"> {this.state.author}</p>
        </div>
        <div className="buttons button-container">
          <a href="twitter.com/intent/tweet">
            <button id="tweet-quote">Twitter</button>
          </a>
          <button>Pinterest</button>
          <button id="new-quote" onClick={this.getNewQuote}>
            next quote
          </button>
        </div>
      </div>
    );
  }
}

export default App;

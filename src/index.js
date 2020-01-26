import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import Axios from "axios";
import "./index.css";

const Quote = props => {
  return (
    <div>
      <p>
        <i className="fa fa-quote-left" />
        &emsp;
        {props.data}
        &emsp;
        <i className="fa fa-quote-right" />
      </p>
    </div>
  );
};
const Author = props => {
  return (
    <div>
      <p>~ {props.data}</p>
    </div>
  );
};

class QuoteBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: this.props.quote,
      quoteauthor: this.props.quoteauthor
    };
    this.getQuotes();
    setInterval(this.newQuote, 10000);
    this.newQuote = this.newQuote.bind(this);
  }
  quotes = [];
  getQuotes = () => {
    Axios.get(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    ).then(response => {
      this.quotes = response.data.quotes;
      return response;
    });
  };
  makeColor = (isText = false) => {
    let colors = "0123456789ABCDEF";
    let colorHex = "#";
    while (colorHex.length < 7) {
      let color = (Math.floor(Math.random() * colors.length) % 9) + 7;
      colorHex += colors[color];
    }
    return colorHex;
  };

  newQuote = () => {
    let rQuoteNum = Math.floor(Math.random() * this.quotes.length);
    let quote = this.quotes[rQuoteNum].quote;
    let quoteauthor = this.quotes[rQuoteNum].author;
    let color = this.makeColor();
    document.body.style.backgroundColor = color;
    document.body.style.color = color;
    $("#new-quote").css("background-color", color);
    $("#new-quote").css("color", "black");
    this.setState({
      quote,
      quoteauthor
    });
  };
  render() {
    return (
      <div>
        <div id="text">
          <Quote data={this.state.quote} />
        </div>
        <div id="author">
          <Author data={this.state.quoteauthor} />
        </div>
        <div id="new-quote-div">
          <button id="new-quote" className="btn" onClick={this.newQuote}>
            <i className="fa fa-refresh"></i>
          </button>
        </div>
      </div>
    );
  }
}
ReactDOM.render(<QuoteBox />, document.getElementById("quote-box"));

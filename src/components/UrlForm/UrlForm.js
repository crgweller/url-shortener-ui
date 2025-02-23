import React, { Component } from "react";

class UrlForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      title: "",
      urlToShorten: "",
      error: "",
    };
  }

  handleNameChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (!this.state.title || !this.state.urlToShorten) {
      return this.setState({ error: "Please fill out all inputs" });
    } else {
      const newUrl = {
        title: this.state.title,
        long_url: this.state.urlToShorten,
      };
      this.props.addUrl(newUrl);
    }
    this.clearInputs();
  };

  clearInputs = () => {
    this.setState({ title: "", urlToShorten: "" });
  };

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Title..."
          name="title"
          value={this.state.title}
          onChange={(e) => this.handleNameChange(e)}
        />

        <input
          type="text"
          placeholder="URL to Shorten..."
          name="urlToShorten"
          value={this.state.urlToShorten}
          onChange={(e) => this.handleNameChange(e)}
        />

        <button onClick={(e) => this.handleSubmit(e)}>Shorten Please!</button>
        <p>{this.state.error}</p>
      </form>
    );
  }
}

export default UrlForm;

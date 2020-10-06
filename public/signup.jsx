class SignUpForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
      this.setState({value: event.target.value});
    }
    handleSubmit(event) {
      alert('A signup was submitted: ' + this.state.value);
      event.preventDefault();
    }
    render() {
      return (
        <form action='/signup' method='POST' onSubmit={this.handleSubmit}>
          <label>
            username:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <label>
            password:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

  ReactDOM.render(<App></App>, document.querySelector('section'))

class SignUpForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        username: '',
        password: ''
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
      this.setState({value: event.target.value});
    }
    handleSubmit(event) {
      alert('A signup was submitted!')
      event.target.reset()
      event.preventDefault();
      console.log(this.state.username);
    }
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            username:
            <input type="text" value={this.username} onChange={this.handleChange} />
          </label>
          <label>
            password:
            <input type="text" value={this.password} onChange={this.handleChange} />
          </label>
          <input type="submit" className="sign-btn modal-close" value="Submit" />
        </form>
      );
    }
  }

  ReactDOM.render(
    <SignUpForm></SignUpForm>,
    document.querySelector('div#signup.modal-content')
  )

class NameForm extends React.Component {
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
      event.target.reset()
      alert('A login was submitted');
      event.preventDefault();
    }
    render() {
      return (
        <form action="/checklogged" method="POST" onSubmit={this.handleSubmit}>
          <label>
            username:
            <input type="text" value={this.username} onChange={this.handleChange} />
          </label>
          <label>
            password:
            <input type="text" value={this.password} onChange={this.handleChange} />
          </label>
          <input type="submit" className="sign-btn modal-close" onClick={this.toggle} value="Submit" />
        </form>
      );
    }
  }

  ReactDOM.render(
    <NameForm></NameForm>,
    document.querySelector('div#signin.modal-content')
  )

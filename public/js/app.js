class App extends React.Component {
    state = {
      title: '',
      post: '',
      mood: '',
      img:'',
      createdAt:'',
      blogs:[]
    }
  componentDidMount = () => {
      axios
      .get('/blogs')
      .then(response => {
        this.setState({
          blogs: response.data
        })
      })
    }
handleChange = event => {
  this.setState({ [event.target.id]: event.target.value})
}
handleSubmit = event => {
  event.preventDefault()
  axios
  .post('/blogs', this.state)
  .then(response =>
    this.setState(
    {
      title: '',
      post: '',
      mood: '',
      img:'',
      blogs: response.data
    })
  )
}
deleteBlog = event => {
  axios.delete('/blogs/' + event.target.value)
  .then(response => {
    this.setState({
      blogs: response.data
    })
  })
}
updateBlogs = (newBlogs) => {
  this.setState({
    blogs: newBlogs
  })
}
updateBlog = (event) => {
  event.preventDefault()
  const id = event.target.id
  axios
    .put('/blogs/' + id, {
      title: this.state.title,
      post: this.state.post,
      mood: this.state.mood,
      img: this.state.img
    })
    .then(response => {
      this.setState({
        title: '',
        post: '',
        mood: '',
        img:'',
        blogs: response.data
      })
    })
}
  render = () => {
    return (
      <div>
          <Modal updateBlogs={this.updateBlogs} />
          <h2 className="recent">Most Recent Blogs Posts </h2>
          <ul>
            {this.state.blogs.map(blog => { return (
            <li key={blog._id}>
            <h5 className="title valign-wrapper left-align">{blog.title}</h5>
            <a href={blog.img} target="_blank">
            <img className="lefti show-on-large hide-on-small-only responsive-img" src={blog.img} alt={blog.title}/>
            <img className="centi show-on-small hide-on-med-and-up responsive-img" src={blog.img} alt={blog.title}/>
            </a>
               <div className="view">
                  <table>
                    <tbody>
                      <tr>
                        <td className="feel"><h6 className="view"> <i className="tiny material-icons">mood</i> mood</h6></td>
                        <td><p className="feels">{blog.mood}</p> </td>
                      </tr>
                      <tr>
                        <td className="feel"><h6 className="view"> <i className="tiny material-icons">mode_comment</i> post</h6></td>
                        <td><p className="feels"> {blog.post} </p></td>
                      </tr>
                      <tr>
                        <td className="feel"><h6 className="view"> <i className="tiny material-icons">schedule</i> posted</h6></td>
                        <td><p className="feels"> {(new Date(blog.createdAt)).toLocaleString()} </p></td>
                      </tr>
                    </tbody>
                  </table>
                  </div>
                  <details>
                  <summary>Edit Post</summary>
                  <form id= {blog._id} onSubmit= {this.updateBlog}  className="edit-sum">
                    <label htmlFor="title">title:</label>
                    <input type="text" id="title" onChange={this.handleChange} value={this.state.name} placeholder="New Title"  /> <br />
                    <label htmlFor="mood">mood</label>
                    <input type="text" id="mood" onChange={this.handleChange} value={this.state.mood} placeholder="Did you misinterpret your mood?" />
                    <label htmlFor="post">post</label>
                    <textarea type="text" id="post" onChange={this.handleChange} value={this.state.post} className="materialize-textarea">New Post</textarea> <br />
                    <label htmlFor="img">image</label>
                    <input type="text" id="img" onChange={this.handleChange} value={this.state.img} placeholder="http://new-image.jpg" /> <br />
                    <input className="update-btn left" type="submit" value="Update Blog" />
                    </form>
                    </details> <br />
                    <button value= {blog._id} onClick= {this.deleteBlog} className="right"> Bad Post! </button>
            </li>
          )})}
          </ul>
        </div>
    )
  }
}
const display = {
  display: 'block'
};
const hide = {
  display: 'none'
};
class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      toggle: false
    }
  }
  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value})
  }
  handleSubmit = event => {
    event.preventDefault()
    event.target.reset()
    axios
    .post('/blogs', this.state)
    .then(response =>
      this.props.updateBlogs(response.data)
    )
  }
  toggle(event) {
    this.setState((prevState) => ({
      toggle: !prevState.toggle
    }));
  }
  render = () => {
    const modalContent = (
      <div className="modal" style={this.state.toggle ? display : hide}>
      <div className="modal-content">
      <div className="modal-header">
        <a className="btn-flat right" onClick={this.toggle}><h1>X</h1></a>
      </div>
        <h4 className="vibes">Post some good vibes!</h4>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title">Title</label>
          <input placeholder="Post Title" type="text" id="title" onChange={this.handleChange}/>
          <br />
          <div className="input-field">
          <i className="material-icons prefix">create</i>
          <label htmlFor="post">Your Post </label>
          <textarea type="text" id="post" onChange={this.handleChange} className="materialize-textarea"></textarea>
          </div>
          <br />
          <label htmlFor="mood">Mood </label>
          <input placeholder="What's your mood" type="text" id="mood" onChange={this.handleChange}/>
          <br />
          <label htmlFor="img">Image </label>
          <input placeholder="http://" type="text" id="img" onChange={this.handleChange}/>
          <br />
          <input type="submit" className="post-btn right" onClick={this.toggle} value="Post!" />
        </form>
      </div>
    </div>
    );
    return (
      <div>
        <a className="waves-effect waves-light btn vibes-btn" onClick={this.toggle}>Post!</a>
        {modalContent}
      </div>
    );
  }
}

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
    (this.state.value);
      event.preventDefault();
      console.log(this.state.username)
    }
    render() {
      return (
        <form action="/signup" method="POST" onSubmit={this.handleSubmit}>
          <label>
            username:
            <input type="text" value={this.username} onChange={this.handleChange} />
          </label>
          <label>
            password:
            <input type="text" value={this.password} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

ReactDOM.render(
  <App></App>,
  document.querySelector('main')
)

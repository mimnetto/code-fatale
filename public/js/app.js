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
          <h2 className="recent">Most Recent Posts Blogs</h2>
          <ul>
            {this.state.blogs.map(blog => { return (
            <li key={blog._id}>
            <h5 className="title">{blog.title}</h5>
            <img className="lefti" src={blog.img} alt={blog.title}/>
               <details className="view">
                  <summary>More info</summary>
                  <p className="view">mood: {blog.mood}</p>
                  <p className="view">post: {blog.post}</p>
                  <p className="view">Posted: {(new Date(blog.createdAt)).toLocaleString()}</p>
                  <details>
                  <summary>Edit info</summary>
                  <form id= {blog._id} onSubmit= {this.updateBlog}>
                    <label htmlFor="title">title:</label>
                    <input
                      type="text"
                      id="title"
                      onChange={this.handleChange}
                      value={this.state.name}
                    /> <br />
                    <label htmlFor="post">post:</label>
                    <input
                      type="text"
                      id="post"
                      onChange={this.handleChange}
                      value={this.state.name}
                    /> <br />
                    <label htmlFor="img">image:</label>
                    <input
                      type="text"
                      id="img"
                      onChange={this.handleChange}
                      value={this.state.name}
                    /> <br />
                    <label htmlFor="mood">mood:</label>
                    <input
                      type="text"
                      id="mood"
                      onChange={this.handleChange}
                      value={this.state.name}
                    /> <br />
                    <input type="submit" value="Update Blog" />
                    </form>
                    </details> <br />
                    <button
                     value= {blog._id}
                     onClick= {this.deleteBlog}
                     >This is a bad blog
                     </button>
                </details>
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
        <a className="btn-flat right" onClick={this.toggle}>X Cancel</a>
      </div>
        <h4 className="vibes">Post some good vibes!</h4>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title">Title</label>
          <input placeholder="Post Title" type="text" id="title" onChange={this.handleChange}/>
          <br />
          <div className="input-field">
          <i class="material-icons prefix">create</i>
          <label htmlFor="post">Your Post </label>
          <textarea type="text" id="post" onChange={this.handleChange} className="materialize-textarea"></textarea>
          </div>
          <br />
          <label htmlFor="mood">Mood: </label>
          <input placeholder="What's your mood" type="text" id="mood" onChange={this.handleChange}/>
          <br />
          <label htmlFor="img">Image: </label>
          <input placeholder="http://" type="text" id="img" onChange={this.handleChange}/>
          <br />
          <input type="submit" onClick={this.toggle} value="Post!" />
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

ReactDOM.render(
  <App></App>,
  document.querySelector('main')
)

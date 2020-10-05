class App extends React.Component {
  state = {
  title: '',
  post: '',
  mood: '',
  img:'',
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
updateBlog = (event) => {
  event.preventDefault()
  const id = event.target.id
  axios
    .put('/blogs/' + id, this.state)
    .then(response => {
      this.setState({
        blogs: response.data,
        title: '',
      })
    })
}
  render = () => {
    return (
      <div>
        <details>
          <summary>Add Blog</summary>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="title">Title: </label>
            <input type="text" id="title" onChange={this.handleChange}/>
            <br />
            <label htmlFor="post">Post: </label>
            <input type="text" id="post" onChange={this.handleChange}/>
            <br />
            <label htmlFor="mood">Mood: </label>
            <input type="text" id="mood" onChange={this.handleChange}/>
            <br />
            <label htmlFor="img">Image: </label>
            <input type="text" id="img" onChange={this.handleChange}/>
            <br />
            <input type="submit" value="Create Blog" />
          </form>
          </details>
          <h2>List of Blogs</h2>
          <ul>
            {this.state.blogs.map(blog => { return (
            <li key={blog._id}>
            <h5 className="title">{blog.title}</h5>
            <img className="lefti" src={blog.img} alt={blog.title}/>
               <details className="view">
                  <summary>More info</summary>
                  <p className="view">mood: {blog.mood}</p>
                  <p className="view">post: {blog.post}</p>
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
          <Profile username={this.state.profile.Username}></Profile>
        </div>
    )
  }
}

//Profile component in React ============================

class Profiles extends React.Component {
  state = {
    username: '',
    profiles: []
  }
  componentDidMount = () => {
    axios.get('/blogs').then(response => {
      this.setState({
        profiles: response.data
      })
    })
  }
  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value})
  }

  handleSubmit = event => {
    event.preventDefault()
    axios
    .post('/profiles', this.state)
    .then(response =>
      this.setState(
      { username: '',
        profiles: response.data
      })
    )
  }
  deleteProfile = event => {
    axios.delete('/profiles/' + event.target.value).then(response => {
      this.setState({
        profiles: response.data
      })
    })
  }
  updateProfile = (event) => {
    event.prevnetDefault()
    const id = event.target.id
    axios
      .put('/blogs/' + id, this.state)
      .then(response => {
        this.setState({
          profiles: response.data,
          username: '',
        })
      })
  }
  render = () => {
    return (
      <div>
        <details>
          <summary>Create User Profile</summary>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input type="text" id="title" onChange={this.handleChange}/>
          <input type="submit" value="create profile user" />
        </form>
        </details>
      }
      </div>


ReactDOM.render(
  <App></App>,
  document.querySelector('main')
)

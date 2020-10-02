class App extends React.component {
    state = {};

    render = () => {
        return (
            <div className="container">
            <iframe width="677" height="381" src="https://www.youtube.com/embed/zmPzbZVUp3g" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector("main"));

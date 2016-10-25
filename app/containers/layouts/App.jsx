class App extends React.Component {

    render() {
        const { children } = this.props;
        return (
            <div id="app-view">
                {children}
            </div>
        );
    }
}

App.propTypes = {
    children: React.PropTypes.element
};

export default App;

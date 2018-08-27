import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  onChange = event => {
    try {
      console.log(event.target.value);
    } catch ({ message }) {} // replace destructuring for instance with err
  };

  render() {
    return (
      <>
        Log this input: <input onChange={this.onChange} />
      </>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

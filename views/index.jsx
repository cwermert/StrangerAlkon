var React = require('react');
var Layout = require('./layout');

import Simple from './components/MessageForm';
// import MessageInput from './components/MessageInput';

// Contrived example to show how one might use Flow type annotations
function countTo(n:number):string {
  var a = [];
  for (var i = 0; i < n; i++ ) {
    a.push(i + 1);
  }
  return a.join(', ');
}

class Index extends React.Component {
  render() {
    return (
      <Layout title={this.props.title}>
        <div className="fullscreen-bg">
          <video loop muted autoPlay poster="app/img/stranger-bg.jpg" className="fullscreen-bg__video">
            <source src="app/video/stranger-bg.webm" type="video/webm" />
            <source src="app/video/stranger-bg.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="container">

            <div className="unread"></div>

            <Simple />

        </div>
      </Layout>
    );
  }
}

const styles = {
  input: {
    fontFamily: 'Libre Baskerville, serif'
  },
  player: {
    width: '1280px',
    height: '720px',
    left: '0px',
    top: '0px'
  }
}

Index.propTypes = {
  title: React.PropTypes.string
};

module.exports = Index;
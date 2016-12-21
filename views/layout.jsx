var React = require('react');

class Layout extends React.Component {
  render() {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
          <link href="https://unpkg.com/basscss@8.0.2/css/basscss.min.css" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Libre+Baskerville" rel="stylesheet" />
          <link rel="stylesheet" href="/app/css/app.css" />
          <script dangerouslySetInnerHTML={{__html:`
            // This is making use of ES6 template strings, which allow for
            // multiline strings. We specified "{jsx: {harmony: true}}" when
            // creating the engine in app.js to get this feature.
            console.log("hello world");
          `}}/>
        </head>
        <body>
          {this.props.children}
        </body>
      </html>
    );
  }
}

Layout.propTypes = {
  title: React.PropTypes.string
};

module.exports = Layout;
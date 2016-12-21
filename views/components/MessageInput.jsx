var React = require('react');
import {Fieldset, Field, createValue} from 'react-forms';

class MessageInput extends React.Component {

  constructor(props) {
    super(props)
    let formValue = createValue({
      value: props.value,
      onChange: this.onChange.bind(this)
    })
    this.state = { formValue }
  }

  onChange(formValue) {
    console.log(formValue);
    this.setState({ formValue })
  }

  render() {
    return (
      <Fieldset formValue={ this.state.formValue }>
        <Field select="message" label="Message" />
      </Fieldset>
    )
  }
}

class MessageForm extends React.Component {

  render() {
    return (
      <div>
        <p>{ this.state.value }</p>
        <MessageForm value={{ message: '' }} />
      </div>
    );
  }
}

const styles = {
  input: {
    fontFamily: 'Libre Baskerville, serif'
  }
}

module.exports = MessageInput;
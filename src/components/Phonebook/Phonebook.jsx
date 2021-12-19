import React, { Component } from 'react'
import PropTypes from 'prop-types'
import s from './Phonebook.module.css'

class Phonebook extends Component {
  state = {
    name: '',
    number: '',
  }

  handleInput = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value,
    })
  }

  handleSubmit = (e) => {
    const { name, number } = this.state
    e.preventDefault()
    this.props.onAddContact(name, number)
    this.formReset()
  }

  formReset = () => {
    this.setState({ name: '', number: '' })
  }

  render() {
    const { name, number } = this.state
    return (
      <>
        <form className={s.mainForm} onSubmit={this.handleSubmit}>
          <label htmlFor="name" className={s.label}>
            Name
            <input
              type="text"
              name="name"
              className={s.input}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              value={name}
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              onChange={this.handleInput}
            />
          </label>
          <label htmlFor="name" className={s.label}>
            Phone
            <input
              type="tel"
              name="number"
              className={s.input}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              value={number}
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              onChange={this.handleInput}
            />
          </label>
          <button type="submit" className={s.button}>
            Add contact
          </button>
        </form>
      </>
    )
  }
}

Phonebook.propTypes = {
  onAddContact: PropTypes.func.isRequired,
}

export default Phonebook
import React, { Component } from 'react'
import { nanoid } from 'nanoid'
import './App.css'
import Container from './components/Container/Container'
import Phonebook from './components/Phonebook/Phonebook'
import Contacts from './components/Contacts/Contacts'
import Filter from './components/Filter/Filter'

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  }

  componentDidMount() {
  const getContacts = JSON.parse(localStorage.getItem("contacts"))
  if(getContacts){
  this.setState({contacts:getContacts})  
  }
  }

  componentDidUpdate(_prevProps, prevState) {
  const{contacts}=this.state
  if(contacts!==prevState.contacts){
  localStorage.setItem("contacts",JSON.stringify(contacts))  
  }
  }

  onAddContact = (name, number) => {
    if (this.onCheckContact(name)) {
      alert(`${name} is already in contacts`)
      return
    }
    const obj = { id: nanoid(), name, number }
    this.setState((prevState) => ({ contacts: [...prevState.contacts, obj] }))
  }

  onCheckContact = (value) => {
    return this.state.contacts.find(
      (el) => el.name.toUpperCase() === value.toUpperCase(),
    )
  }

  onDeleteContacts = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((el, index) => el.id !== id),
    }))
  }

  onFiltering = (value) => {
    this.setState({ filter: value })
  }

  render() {
    const { contacts, filter } = this.state
    return (
      <div className="App">
        <Container title="Phonebook">
          <Phonebook onAddContact={this.onAddContact} />
        </Container>
        <Container title="Contacts">
          {contacts.length >= 2 && (
            <Filter filter={filter} onFilter={this.onFiltering} />
          )}
          <Contacts
            listContacts={contacts.filter((el) =>
              el.name.toUpperCase().includes(filter.toUpperCase()),
            )}
            onDelete={this.onDeleteContacts}
          />
        </Container>
      </div>
    )
  }
}

export default App
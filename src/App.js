import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import './App.css';
import Container from './components/Container/Container';
import Phonebook from './components/Phonebook/Phonebook';
import Contacts from './components/Contacts/Contacts';
import Filter from './components/Filter/Filter';
import { getFromLS, setInLS } from "./utilits/localstorage";

export default function App() {
  const [contacts, setContacts] = useState(getFromLS("contacts"));
  const [filter, setFilter] = useState("");
 
const onCheckContact = (value) => {
  return contacts.find((el) => el.name.toUpperCase() === value.toUpperCase())
    ? true
    : false;
  };
  
 const onAddContact = (name, number) => {
    if (onCheckContact(name)) {
      alert(`${name} is already in contacts`);
      return;
    }
    const obj = { id: nanoid(), name, number };
    setContacts([...contacts, obj]);
  };

 const onDeleteContacts = (id) => {
    setContacts(
      contacts.filter((el) => el.id !== id));
  };

  const filteringContacts = contacts.filter((el) =>
    el.name.toUpperCase().includes(filter.toUpperCase()));

  useEffect(() => {
    setInLS("contacts", contacts);
}, [contacts]);
  
    return (
      <div className="App">
        <Container title="Phonebook">
          <Phonebook onAddContact={onAddContact} />
        </Container>
        <Container title="Contacts">
          {contacts.length >= 2 && (
            <Filter filter={filter} onFilter={setFilter} />
          )}
          <Contacts
            listContacts={filteringContacts}
            onDelete={onDeleteContacts}
          />
        </Container>
      </div>
    );
  }


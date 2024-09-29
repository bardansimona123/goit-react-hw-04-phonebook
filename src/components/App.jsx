import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import styles from './App.module.css';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [notification, setNotification] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') setName(value);
    if (name === 'number') setNumber(value);
  };

  const handleAddContact = (event) => {
    event.preventDefault();
    if (name && number) {
      if (contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())) {
        setNotification(`${name} is already in contacts`);
        setTimeout(() => setNotification(null), 3000);
        return;
      }
      const newContact = { id: nanoid(), name, number };
      setContacts(prevContacts => [...prevContacts, newContact]);
      setName('');
      setNumber('');
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Phonebook</h1>
      <div className={styles.formContainer}>
        <ContactForm
          name={name}
          number={number}
          onChange={handleInputChange}
          onSubmit={handleAddContact}
          styles={styles}
        />
      </div>
      <h2 className={styles.contactsTitle}>Contacts</h2>
      <Filter filter={filter} onChange={handleFilterChange} styles={styles} />
      <ContactList contacts={getFilteredContacts()} styles={styles} />
      {notification && (
        <div className={styles.notification}>
          <span>{notification}</span>
          <button onClick={() => setNotification(null)} className={styles.addContactButton}>OK</button>
        </div>
      )}
    </div>
  );
};

export default App;


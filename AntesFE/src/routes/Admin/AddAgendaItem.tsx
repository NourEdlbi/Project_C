import React, { useState } from 'react';
import { BASE_URL } from '../../consts';

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
};

const formContainerStyle = {
  backgroundColor: '#ffffff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
};

const labelStyle = {
  display: 'block',
  marginBottom: '5px',
};

export default function AddAgendaItem() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    begintime: '',
    endtime: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.endtime < formData.begintime) {
      alert('Eindtijd kan niet eerder zijn dan begintijd.');
      return;
    }

    fetch(`${BASE_URL}/AddAgendaItem`, options).then(res => console.log(res)).catch(error => console.log(error));
    alert('agendapunt toegevoegd!');
    // Handle form submission logic here
    console.log('Form submitted', formData);
  };

  const storedUserInfo = localStorage.getItem('Userinfo');
  const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
  const update = {
    id: userInfo.id,
    title: formData.title,
    description: formData.description,
    date: formData.date,
    begintime: formData.begintime,
    endtime: formData.endtime,
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(update),
  };

  const submitlogin = () => {
    fetch(`${BASE_URL}/AddAgendaItem`, options).then(res => console.log(res)).catch(error => console.log(error));
  };


  return (
    <div style={formStyle}>
      <div style={formContainerStyle}>
        <h1>Agendapunt toevoegen</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Titel:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Titel"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description" style={labelStyle}>Beschrijving:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Beschrijving"
              required
              rows="4"
              cols="50"
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Datum:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="begintime">Begintijd:</label>
            <input
              type="time"
              id="begintime"
              name="begintime"
              value={formData.begintime}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endtime">Eindtijd:</label>
            <input
              type="time"
              id="endtime"
              name="endtime"
              value={formData.endtime}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Toevoegen</button>
        </form>
      </div>
    </div>
  );
}

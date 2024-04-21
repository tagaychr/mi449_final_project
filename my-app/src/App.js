import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';


import React, { useState, useEffect } from 'react';

// import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js';
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://yryrzmcfkwklywykoevq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyeXJ6bWNma3drbHl3eWtvZXZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA3MjMxOTUsImV4cCI6MjAyNjI5OTE5NX0.EUo0LxitPyAIL60ZWgNl4J69gSYsQCTXq-U5yrvoBbQ'
const supabase = createClient(supabaseUrl, supabaseKey)

// function hexToRgb(hex) {
//   // Remove the leading hash if present
//   hex = hex.replace(/^#/, '');

//   // Parse the hex color code into RGB components
//   let r = parseInt(hex.substring(0, 2), 16);
//   let g = parseInt(hex.substring(2, 4), 16);
//   let b = parseInt(hex.substring(4, 6), 16);

//   // Return the RGB color as a string in the format "r-g-b"
//   return `${r}-${g}-${b}`;
// }

function App() {
  let [data, setData] = useState([]); // Define setData using useState

  useEffect(() => {
    async function fetchData() {
      try {
        let { data: fetchedData, error } = await supabase.from('templates').select('*');
        if (error) {
          throw error;
        }
        //console.log('Fetched data:', fetchedData); // Log fetched data to console
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    }

    fetchData();
  }, []); 


  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [bio, setBio] = useState('');
  const [theme, setTheme] = useState('');
  const [businessCard, setBusinessCard] = useState('');
  const [businessCardBack, setBusinessCardBack] = useState('');
  const [link, setLink] = useState(''); // New state for link/URL


  const handleGenerateBusinessCard = () => {
    // Check if all required form fields are filled
  if (!firstName || !lastName || !email || !number || !bio || !theme) {
    alert('Please fill out all fields');
    return;
  }

  // Find the selected theme object based on the theme name
  const selectedTheme = data.find(item => item.name === theme);
  if (!selectedTheme) {
    alert('Selected theme not found');
    return;
  }
  // Generate the business card HTML using the form inputs and selected theme
  let businessCardHTML;

if (selectedTheme.name.includes(' ')) {
  // If there is a space in selectedTheme.name
  const idWithoutSpace = selectedTheme.name.slice(0, selectedTheme.name.indexOf(' '));
  businessCardHTML = `
    <div id="${idWithoutSpace}" class="business-card">
      <div class="top-half">
        <h2>${firstName} ${lastName}</h2>
      </div>
      <div class="bottom-half">
        <div class="contact-info">
            <p>${email} </p>
            <p> ${number}</p>
        </div>
        <div class="bio">
            <p><em>${bio}</em></p>
        </div>
      </div>
    </div>
  `;
} else {
  // If there is no space in selectedTheme.name
  businessCardHTML = `
    <div id="${selectedTheme.name}" class="business-card">
      <div class="top-half">
        <h2>${firstName} ${lastName}</h2>
      </div>
      <div class="bottom-half">
        <div class="contact-info">
            <p>${email} </p>
            <p> ${number}</p>
        </div>
        <div class="bio">
            <p><em>${bio}</em></p>
        </div>
      </div>
    </div>
  `;
  }

  setBusinessCard(businessCardHTML);

  //const rgbColor = hexToRgb("FFFFFF");
  //fetch(`https://api.qrserver.com/v1/create-qr-code/?data=${link}&size=100x100&bgcolor=${rgbColor}`)
  //const rgbColor = hexToRgb("FFFFFF");
  //fetch(`https://api.qrserver.com/v1/create-qr-code/?data=${link}&size=100x100&bgcolor=${rgbColor}`)
  fetch(`https://api.qr-code-generator.com/v1/create?access-token=K9DM1IOt46LB1CjaBDJ-n2oeNqMwosVMFuCUzeoUjkPApASWvPwAOAzkpnTL-rSs`)
  .then(qrCodeImageUrl => {
    console.log(qrCodeImageUrl);
    console.log(qrCodeImageUrl.body);
    // Generate the back side of the business card HTML with the QR code image
    const businessCardBackHTML = `
      <div id="${selectedTheme.name}" class="business-card-back" ">
        <img src="${qrCodeImageUrl}" alt="QR Code" />
      </div>
    `;
    setBusinessCardBack(businessCardBackHTML);
  })
  .catch(error => {
    console.error('Error generating QR code:', error);
    // Handle error if necessary
  });

      };
      
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h1>Generate Business Card</h1>
          <form>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">First Name</label>
            <input type="text" className="form-control" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input type="text" className="form-control" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="number" className="form-label">Phone Number</label>
              <input type="text" className="form-control" id="number" value={number} onChange={(e) => setNumber(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="bio" className="form-label">Bio</label>
              <textarea className="form-control" id="bio" rows="3" value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="bio" className="form-label">Link</label>
              <textarea className="form-control" id="bio" rows="3" value={link} onChange={(e) => setLink(e.target.value)}></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="theme" className="form-label">Theme</label>
              <select className="form-select" id="theme" value={theme} onChange={(e) => setTheme(e.target.value)}>
                <option value="">Select a theme</option>
                {/* Map over themes fetched from Supabase */}
                {data.map(theme => (
                  <option key={theme.id} value={theme.name}>{theme.name}</option>
                ))}
              </select>
            </div>
            <button type="button" className="btn btn-primary" onClick={handleGenerateBusinessCard}>Generate</button>
          </form>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              {/* Placeholder for generated business card */}
              {businessCard && businessCardBack ? (
              <div className='base'>
                <p>Front Side</p>
                <div className='business-card' dangerouslySetInnerHTML={{ __html: businessCard }} />
                <p>Back Side</p>
                <div className='business-card-back'dangerouslySetInnerHTML={{ __html: businessCardBack }}/>
              </div>
              ) : (
                <p>No business card generated</p>
              )}
            </div>
          </div>
          <div className="mt-3">
            {/* Placeholder for QR code */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

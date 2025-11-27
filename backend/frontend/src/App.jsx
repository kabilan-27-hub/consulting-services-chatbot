import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: '👋 Welcome to Consulting Services!\n\nWhat would you like to do?\n1️⃣ Book an appointment\n2️⃣ Reschedule appointment\n3️⃣ Cancel appointment' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState('menu');
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceId: '',
    date: '',
    time: '',
    otp: ''
  });

  // API endpoint
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  // Send message to chatbot
  const sendMessage = async (message) => {
    if (!message.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text: message }]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, step: currentStep })
      });

      const data = await response.json();
      
      // Add bot response
      setMessages(prev => [...prev, { sender: 'bot', text: data.response }]);
      setCurrentStep(data.nextStep);

      // Set services if available
      if (data.data && data.data.services) {
        setServices(data.data.services);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { sender: 'bot', text: '❌ Error: Could not connect to server' }]);
    } finally {
      setLoading(false);
    }
  };

  // Handle service selection
  const selectService = (serviceId) => {
    setFormData(prev => ({ ...prev, serviceId }));
    const service = services.find(s => s.id === serviceId);
    sendMessage(`I want to book ${service.name}`);
  };

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Book appointment
  const bookAppointment = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.serviceId || !formData.date || !formData.time) {
      alert('Please fill all fields');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/appointments/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.success) {
        setMessages(prev => [...prev, { sender: 'bot', text: `✅ Appointment booked successfully!\n\nDetails:\nService: ${formData.serviceId}\nDate: ${formData.date}\nTime: ${formData.time}\n\nConfirmation email sent to ${formData.email}` }]);
        setFormData({ name: '', email: '', phone: '', serviceId: '', date: '', time: '', otp: '' });
        setCurrentStep('menu');
      } else {
        setMessages(prev => [...prev, { sender: 'bot', text: `❌ Error: ${data.message}` }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'bot', text: '❌ Error booking appointment' }]);
    }
  };

  // Get available time slots
  const getTimeSlots = async () => {
    if (!formData.date) {
      alert('Please select a date first');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/appointments/slots`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: formData.date })
      });

      const data = await response.json();
      setMessages(prev => [...prev, { sender: 'bot', text: `📅 Available time slots for ${formData.date}:\n${data.slots.join(', ')}` }]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Send OTP
  const sendOTP = async () => {
    if (!formData.phone) {
      alert('Please enter your phone number');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/otp/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formData.phone })
      });

      const data = await response.json();
      if (data.success) {
        setMessages(prev => [...prev, { sender: 'bot', text: '📱 OTP sent to your phone. Please enter the 6-digit code.' }]);
        setCurrentStep('verify_otp');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>💬 Consulting Services Chatbot</h1>
        <p>Powered by Zoho SalesIQ</p>
      </div>

      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.sender}`}>
            <div className="message-content">
              {msg.text.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        ))}
        {loading && <div className="message bot"><p>Typing...</p></div>}
      </div>

      <div className="chat-input-area">
        {currentStep === 'select_service' && services.length > 0 && (
          <div className="services-carousel">
            <p>Select a service:</p>
            {services.map(service => (
              <button
                key={service.id}
                className="service-button"
                onClick={() => selectService(service.id)}
              >
                <strong>{service.name}</strong><br />
                Duration: {service.duration} min | Price: ₹{service.price}
              </button>
            ))}
          </div>
        )}

        {currentStep === 'appointment_form' && (
          <div className="appointment-form">
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
            <input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
            <input
              type="tel"
              placeholder="Your Phone"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
            <button onClick={sendOTP} className="action-button">📱 Send OTP</button>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
            />
            <button onClick={getTimeSlots} className="action-button">📅 Get Available Slots</button>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => handleInputChange('time', e.target.value)}
            />
            <button onClick={bookAppointment} className="book-button">✅ Book Appointment</button>
          </div>
        )}

        <div className="input-section">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage(input)}
            placeholder="Type 1, 2, or 3 or your message..."
            disabled={loading}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={loading}
            className="send-button"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

# Consulting Services Chatbot - Cliqtrix 2025 🤖

A fully functional appointment booking chatbot for consulting services built with React & Node.js. Designed for the **Cliqtrix 2025** coding contest by Zoho.

## 🎯 Features

✅ Display appointment types via carousel card  
✅ Collect visitor's name, email, phone, preferred date  
✅ OTP verification for phone number  
✅ Fetch available time slots from third-party service  
✅ Allow visitors to pick preferred time slots  
✅ Schedule appointment in third-party service  
✅ Send confirmation email with booking details  
✅ Update/Reschedule appointments  
✅ Cancel appointments  
✅ OAuth 2.0 authentication  
✅ AI functionalities for enhanced conversations  

## 🛠️ Tech Stack

- **Frontend:** React.js, Axios
- **Backend:** Node.js, Express.js
- **Email:** Nodemailer
- **Scheduling APIs:** Google Calendar, Acuity, Appointy
- **Authentication:** OAuth 2.0
- **OTP:** Twilio SMS
- **Deployment:** Heroku

## 📁 Project Structure

```
consulting-services-chatbot/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatBot.jsx
│   │   │   ├── ServiceCarousel.jsx
│   │   │   └── AppointmentForm.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.jsx
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── server.js
│   ├── routes/
│   │   ├── appointments.js
│   │   ├── otp.js
│   │   └── calendar.js
│   ├── utils/
│   │   ├── emailService.js
│   │   ├── otpService.js
│   │   └── googleCalendar.js
│   ├── .env.example
│   ├── package.json
│   └── Procfile
├── README.md
└── .gitignore
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js v14+
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env  # Add your credentials
npm start  # or npm run dev for development
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The chatbot will be available at `http://localhost:5173`

## 📝 Environment Variables

Create a `.env` file in the backend folder:

```
PORT=5000
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
GOOGLE_CALENDAR_API_KEY=your-api-key
```

## 🔌 API Endpoints

### Chat
- `POST /api/chat` - Handle chat messages

### Appointments
- `POST /api/appointments/book` - Book new appointment
- `POST /api/appointments/fetch` - Get user appointments
- `POST /api/appointments/update` - Reschedule appointment
- `POST /api/appointments/cancel` - Cancel appointment
- `POST /api/appointments/slots` - Get available time slots

### OTP
- `POST /api/otp/send` - Send OTP to phone
- `POST /api/otp/verify` - Verify OTP

## ✨ Key Features Explained

### 1. Appointment Booking Flow
1. User selects "Book Appointment"
2. Choose service type from carousel
3. Provide name, email, phone
4. Receive OTP verification
5. Select preferred date
6. Choose time slot
7. Confirm booking
8. Receive email confirmation

### 2. Rescheduling
1. User selects "Reschedule"
2. Provide email address
3. Select appointment from list
4. Choose new date/time
5. Confirm changes

### 3. Cancellation
1. User selects "Cancel"
2. Provide email address
3. Select appointment
4. Confirm cancellation

## 🔐 Security Features

- OTP-based phone verification
- OAuth 2.0 authentication
- Environment variable protection
- CORS enabled
- Input validation

## 📞 Integration with Zoho SalesIQ

This chatbot is designed to integrate with **Zoho SalesIQ**. To integrate:

1. Deploy the backend on Heroku or any hosting platform
2. Get the API endpoint URL
3. In Zoho SalesIQ Bot Builder:
   - Create new bot
   - Connect to external API
   - Use the backend endpoints
   - Test and deploy

## 🧪 Testing

### Test Booking Flow
```bash
curl -X POST http://localhost:5000/api/appointments/book \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "serviceId": 1,
    "date": "2025-12-15",
    "time": "10:00"
  }'
```

## 🚀 Deployment

### Deploy to Heroku

```bash
# Install Heroku CLI
brew tap heroku/brew && brew install heroku

# Login
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set EMAIL_USER=your-email@gmail.com

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

## 📊 Cliqtrix Requirements Met

✅ Display appointment types via carousel  
✅ Collect name, email, phone, date  
✅ OTP phone verification  
✅ Fetch available time slots  
✅ Schedule appointments  
✅ Email notifications  
✅ Reschedule/Cancel support  
✅ OAuth 2.0 integration ready  
✅ AI-ready architecture  

## 📚 Additional Resources

- [Zoho SalesIQ Bot Documentation](https://www.zoho.com/salesiq/)
- [Cliqtrix Contest Rules](https://www.cliqtrix.com)
- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)

## 👤 Author

Built for Cliqtrix 2025 - Zoho's Annual Bot Building Contest

## 📄 License

MIT License - feel free to use this project for your own purposes

## 📞 Contact & Support

For questions or support:
- Email: contact@cliqtrix.com
- GitHub Issues: [Create an issue](https://github.com/kabilan-27-hub/consulting-services-chatbot/issues)

---

**Good Luck with Cliqtrix 2025!** 🚀

# 🕵️‍♂️ WhisperBox - Anonymous Feedback System

WhisperBox is a full-stack web application that allows users to send and receive feedback anonymously. Users can securely register, log in, and view feedback addressed to them, while maintaining complete anonymity of the sender.

---

## 🚀 Features

### 🔐 Authentication

* User registration & login
* JWT-based authentication
* Password encryption using BCrypt

### 🕶️ Anonymous Feedback

* Anyone can send feedback without revealing identity
* No sender data is stored (fully anonymous)

### 👤 User Features

* View feedback received
* Secure dashboard

### 🛡️ Admin Features

* View all feedback
* Delete inappropriate feedback

---

## 🛠️ Tech Stack

### Backend

* Java 17
* Spring Boot 3
* Spring Security
* JWT Authentication

### Frontend

* React (Vite)

### Database

* MySQL

---

## 📁 Project Structure

### Backend

```
com.example.feedbacksystem
│
├── controller
├── service
├── repository
├── model
├── security
└── dto (optional)
```

### Frontend

```
src/
├── components
├── pages
├── services
└── App.jsx
```

---

## ⚙️ Setup Instructions

### 🔧 Backend Setup

1. Clone the repository:

```
git clone https://github.com/your-username/anonfeed.git
cd anonfeed
```

2. Configure MySQL in `application.properties`:

```
spring.datasource.url=jdbc:mysql://localhost:3306/feedback_db
spring.datasource.username=your_username
spring.datasource.password=your_password
```

3. Add JWT config:

```
app.jwtSecret=yourSecretKeyHere
app.jwtExpirationMs=86400000
```

4. Run the backend:

```
mvn spring-boot:run
```

---

### 💻 Frontend Setup

1. Navigate to frontend folder:

```
cd frontend
```

2. Install dependencies:

```
npm install
```

3. Run the app:

```
npm run dev
```

---

## 🔗 API Endpoints

### Auth

* `POST /api/auth/register`
* `POST /api/auth/login`

### Feedback

* `POST /api/feedback` (Public)
* `GET /api/feedback/my` (User)
* `GET /api/feedback/all` (Admin)
* `DELETE /api/feedback/{id}` (Admin)

---

## 🔐 Security

* JWT-based stateless authentication
* Role-based access control (USER / ADMIN)
* Secure password hashing

---

## 🌟 Future Improvements

* UI enhancements
* Notification system
* Feedback reactions
* Spam filtering

---

## 🤝 Contributing

Feel free to fork this repository and submit pull requests!

---

## 📜 License

This project is open-source and available under the MIT License.

---

## 👩‍💻 Author

Developed by [Your Name]

---

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import RegistrationForm from "./RegistrationForm";

function LoginPage() {
    const navigate = useNavigate();
    const [showRegistration, setShowRegistration] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginError, setLoginError] = useState(null);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });
            console.log(username);
            console.log(password);

            if (response.ok) {
                setIsLoggedIn(true);
                console.log('User successfully logged in.');
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            } else {
                setLoginError('Invalid username or password. Please try agagin.');
                console.error('Invalid username or password during login.');
            }
        } catch (error) {
            setLoginError('Invalid username or password. Please try agagin.');
            console.error('Invalid username or password during login.');
        }
    }

    const handleRegisterClick = () => {
        setShowRegistration(true);
    };

    return (
        <>
            <Navbar />
            <div className="login-page">
                {isLoggedIn ? (<p>Welcome, {username}</p>) : (<p>Please log in to access the full website.</p>)}
                <div className="login-form">
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={handleLoginSubmit}>Log in</button>
                    <p>Not a member yet? <span onClick={handleRegisterClick} style={{ textDecoration: "underline", cursor: "pointer" }}>Click here to Register</span></p>
                </div>
                {showRegistration && <RegistrationForm setShowRegistration={setShowRegistration} />}
                <div className="cancel-button">
                    <Link to="/">
                        <button>Home</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default LoginPage;
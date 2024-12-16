import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

import Sidebar from '../../Components/Sidebar/Sidebar'
const Login = ({ sidebar }) => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [avatar, setAvatar] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState(null);

    // To Login
    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch('http://localhost:8000/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.jwtToken);
                localStorage.setItem('uid', data.user._id);
                localStorage.setItem('userName', data.user.userName);
                localStorage.setItem('avatar', data.user.avatar);
                navigate('/');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Login failed. Please try again.');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('An error occurred. Please try again later.');
        }
    };

    // To Register 
    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/users/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userName, email, password, avatar }),
            });



            if (response.ok) {
                alert('Registration successful!');
                setUserName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setAvatar('');
                setIsRegistering(false);
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Registration failed. Please try again.');
            }
        } catch (err) {
            console.error('Registration error:', err);
            setError('An error occurred. Please try again later.');
        }
    };


    return (
        <>
            <Sidebar sidebar={sidebar} />
            <div className={`container ${sidebar ? "" : 'large-container'}`}>
                <div className="create-channel-container">
                    <h2>{isRegistering ? 'Register' : 'Login'}</h2>
                    <form
                        onSubmit={isRegistering ? handleRegister : handleLogin}
                        className="create-channel-form"
                    >
                        {isRegistering && (
                            <div className="form-group">
                                <label htmlFor="userName">Username</label>
                                <input
                                    type="text"
                                    id="userName"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    placeholder="Enter your username"
                                    required
                                />
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        {isRegistering && (
                            <>
                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm your password"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="avatar">Avatar URL</label>
                                    <input
                                        type="text"
                                        id="avatar"
                                        value={avatar}
                                        onChange={(e) => setAvatar(e.target.value)}
                                        placeholder="Enter your avatar URL"
                                    />
                                </div>
                            </>
                        )}

                        <button type="submit" className="create-channel-button">
                            {isRegistering ? 'Register' : 'Login'}
                        </button>
                        {error && <p className="error-message">{error}</p>}
                        <p className="toggle-prompt">
                            {isRegistering
                                ? 'Already have an account? '
                                : "Don't have an account? "}
                            <span
                                className="toggle-link"
                                onClick={() => setIsRegistering(!isRegistering)}
                            >
                                {isRegistering ? 'Login now' : 'Register now'}
                            </span>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;

import { useState } from "react";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/FireBaseConfig";
import "./SignUp.css";

const SignUp = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters long!");
            return;
        }

        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            await signOut(auth);
            alert("Account created successfully! Please log in.");
            navigate("/signin");
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-background">
                <div className="floating-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                    <div className="shape shape-4"></div>
                    <div className="shape shape-5"></div>
                    <div className="shape shape-6"></div>
                    <div className="shape shape-7"></div>
                </div>
            </div>
            
            <div className="signup-content">
                <div className="signup-card">
                    <div className="signup-header">
                        <div className="logo-section">
                            <div className="logo">
                                <span className="logo-icon">📚</span>
                                <span className="logo-text">NoteSphere</span>
                            </div>
                        </div>
                        <h1 className="signup-title">Join NoteSphere</h1>
                        <p className="signup-subtitle">Create your digital library account</p>
                    </div>
                    
                    <form className="signup-form" onSubmit={handleSignup}>
                        <div className="form-row">
                            <div className="input-group">
                                <label htmlFor="firstName">First Name</label>
                                <div className="input-wrapper">
                                    <span className="input-icon">👤</span>
                                    <input
                                        type="text"
                                        id="firstName"
                                        placeholder="First name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                        className="form-input"
                                    />
                                </div>
                            </div>
                            
                            <div className="input-group">
                                <label htmlFor="lastName">Last Name</label>
                                <div className="input-wrapper">
                                    <span className="input-icon">👥</span>
                                    <input
                                        type="text"
                                        id="lastName"
                                        placeholder="Last name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                        className="form-input"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div className="input-group">
                            <label htmlFor="email">Email Address</label>
                            <div className="input-wrapper">
                                <span className="input-icon">✉️</span>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="form-input"
                                />
                            </div>
                        </div>
                        
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <div className="input-wrapper">
                                <span className="input-icon">🔒</span>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Create a strong password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength="6"
                                    className="form-input"
                                />
                            </div>
                        </div>
                        
                        <div className="input-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <div className="input-wrapper">
                                <span className="input-icon">🔒</span>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    minLength="6"
                                    className="form-input"
                                />
                            </div>
                        </div>
                        
                        <button type="submit" className="signup-btn" disabled={loading}>
                            {loading ? (
                                <>
                                    <span className="btn-spinner"></span>
                                    Creating Account...
                                </>
                            ) : (
                                <>
                                    <span className="btn-icon">🚀</span>
                                    Create Account
                                </>
                            )}
                        </button>
                    </form>
                    
                    <div className="signup-footer">
                        <p>Already have an account? <a href="/signin" className="signin-link">Sign In</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;

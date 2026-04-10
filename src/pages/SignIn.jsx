import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/FireBaseConfig";
import "./SignIn.css";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/home");
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signin-container">
            <div className="signin-background">
                <div className="floating-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                    <div className="shape shape-4"></div>
                    <div className="shape shape-5"></div>
                    <div className="shape shape-6"></div>
                </div>
            </div>
            
            <div className="signin-content">
                <div className="signin-card">
                    <div className="signin-header">
                        <div className="logo-section">
                            <div className="logo">
                                <span className="logo-icon">📚</span>
                                <span className="logo-text">NoteSphere</span>
                            </div>
                        </div>
                        <h1 className="signin-title">Welcome Back</h1>
                        <p className="signin-subtitle">Access your digital library</p>
                    </div>
                    
                    <form className="signin-form" onSubmit={handleSignin}>
                        <div className="input-group">
                            <label htmlFor="email">Email Address</label>
                            <div className="input-wrapper">
                                <span className="input-icon">📧</span>
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
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="form-input"
                                />
                            </div>
                        </div>
                        
                        <div className="form-options">
                            <label className="checkbox-label">
                                <input type="checkbox" />
                                <span>Remember me</span>
                            </label>
                            <a href="#" className="forgot-link">Forgot password?</a>
                        </div>
                        
                        <button type="submit" className="signin-btn" disabled={loading}>
                            {loading ? (
                                <>
                                    <span className="btn-spinner"></span>
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    <span className="btn-icon">🚀</span>
                                    Sign In
                                </>
                            )}
                        </button>
                    </form>
                    
                    <div className="signin-footer">
                        <p>New to NoteSphere? <a href="/signup" className="signup-link">Create Account</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
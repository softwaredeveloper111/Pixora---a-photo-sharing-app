import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/AuthPage.module.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  // Login State
  const [identifiers, setIdentifiers] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register State
  const [email, setEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  
  // Unified Error State
  const [errors, setErrors] = useState({});
  
  const navigate = useNavigate();

  const validateLogin = () => {
    let newErrors = {};
    if (!identifiers.trim()) newErrors.identifiers = "Username or email is required";
    if (!loginPassword.trim()) newErrors.loginPassword = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegister = () => {
    let newErrors = {};
    
    if (!fullName.trim()) newErrors.fullName = "Fullname is required";
    else if (fullName.length < 3 || fullName.length > 30) newErrors.fullName = "Name should be between 3 and 30 characters";
    else if (!/^[a-zA-Z\s.'-]+$/.test(fullName)) newErrors.fullName = "allows only letters, spaces, dots (.), apostrophes ('), and hyphens (-) in a full name, for example: Rahul Sharma, A. K. Sharma, O'Connor, and Anne-Marie.";

    if (!username.trim()) newErrors.username = "Username is required";
    else if (username.toLowerCase() !== username) newErrors.username = "Username must be in lowercase";
    else if (username.length < 3 || username.length > 20) newErrors.username = "Username must be between 3 and 20 characters";
    else if (!/^(?!.*[_.]{2})[a-z0-9._]+$/.test(username)) newErrors.username = "allows only lowercase letters, numbers, dots (.), and underscores (_) in a username, while preventing consecutive dots or underscores like .. or __, for example: rahul123, john_doe, and dev.kumar are valid, but john__doe and rahul..123 are invalid.";

    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Email is invalid";
    else if (email.toLowerCase() !== email) newErrors.email = "Email must be in lowercase";

    if (!registerPassword.trim()) newErrors.registerPassword = "Password is required";
    else if (registerPassword.length < 8 || registerPassword.length > 32) newErrors.registerPassword = "Password must be between 8 and 32 characters";
    else if (!/^[a-zA-Z0-9]+$/.test(registerPassword)) newErrors.registerPassword = "Password can only contain letters and numbers";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      if (validateLogin()) {
        console.log("Login Data:", { identifiers, password: loginPassword });
        setErrors({});
        // navigate('/');
      }
    } else {
      if (validateRegister()) {
        console.log("Register Data:", { fullName, username, email, password: registerPassword });
        setErrors({});
        // navigate('/');
      }
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.logoContainer}>
          <h1 className={styles.logo}>Pixora</h1>
          <p className={styles.subtitle}>
            {isLogin 
              ? 'Welcome back. Sign in to your account.' 
              : 'Create an account to start sharing photos.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.authForm} noValidate>
          {!isLogin && (
            <>
              <div className={styles.inputGroup}>
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                {errors.fullName && <span className={styles.errorText}>{errors.fullName}</span>}
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  placeholder="johndoe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && <span className={styles.errorText}>{errors.username}</span>}
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <span className={styles.errorText}>{errors.email}</span>}
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="registerPassword">Password</label>
                <div className={styles.passwordInputWrapper}>
                  <input
                    type={showRegisterPassword ? "text" : "password"}
                    id="registerPassword"
                    placeholder="••••••••"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                  />
                  {showRegisterPassword ? (
                    <i className={`ri-eye-line ${styles.eyeIcon}`} onClick={() => setShowRegisterPassword(false)}></i>
                  ) : (
                    <i className={`ri-eye-off-line ${styles.eyeIcon}`} onClick={() => setShowRegisterPassword(true)}></i>
                  )}
                </div>
                {errors.registerPassword && <span className={styles.errorText}>{errors.registerPassword}</span>}
              </div>
            </>
          )}

          {isLogin && (
            <>
              <div className={styles.inputGroup}>
                <label htmlFor="identifiers">Username or email</label>
                <input
                  type="text"
                  id="identifiers"
                  placeholder="johndoe or name@example.com"
                  value={identifiers}
                  onChange={(e) => setIdentifiers(e.target.value)}
                />
                {errors.identifiers && <span className={styles.errorText}>{errors.identifiers}</span>}
              </div>

              <div className={styles.inputGroup}>
                <div className={styles.labelRow}>
                  <label htmlFor="loginPassword">Password</label>
                  <button type="button" className={styles.forgotBtn} onClick={() => alert('Forgot password clicked (demo)')}>
                    Forgot?
                  </button>
                </div>
                <div className={styles.passwordInputWrapper}>
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    id="loginPassword"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                  {showLoginPassword ? (
                    <i className={`ri-eye-line ${styles.eyeIcon}`} onClick={() => setShowLoginPassword(false)}></i>
                  ) : (
                    <i className={`ri-eye-off-line ${styles.eyeIcon}`} onClick={() => setShowLoginPassword(true)}></i>
                  )}
                </div>
                {errors.loginPassword && <span className={styles.errorText}>{errors.loginPassword}</span>}
              </div>
            </>
          )}

          <button type="submit" className={styles.submitBtn}>
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className={styles.toggleContainer}>
          <span>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
          </span>
          <button 
            type="button" 
            className={styles.toggleBtn}
            onClick={toggleAuthMode}
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

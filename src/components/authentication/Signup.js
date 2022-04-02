    import React, { useRef, useState, useEffect } from 'react';
    import { Link } from 'react-router-dom';
    import {
    faCheck,
    faTimes,
    faInfoCircle,
    } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
    import './../../css/SignUp.css';
    import axios from 'axios';

    const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
    // must start with lower or upercase, must be followed by 3, 23 characters that can be lower, uppercase , digits
    //4-24 characters
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    //requires one lower, one upper, one digit and one special character.
    //4-24 characters

    const SignUp = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        const result = USER_REGEX.test(user);
        setValidName(result);
    }, [user]);

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(pwd);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const signUpUrl =
        'https://desolate-reaches-56728.herokuapp.com/api/users/signup';
        console.log(user, pwd);
        let newUser = {
        email: user,
        password: pwd,
        };
        try {
        const response = await axios.post(signUpUrl, newUser, {
            headers: { 'Content-Type': 'application/json' },
            // withCredentials: true
        });
        console.log(response.data);
        console.log(response.accessToken);
        console.log(response);
        setSuccess(true);
        } catch (error) {
        console.log(error);
        }
    };
    return (
        <>
        {success ? (
            <section className="signup-section">
            <h1> Sign Up Successful!</h1>
            <p>
                <Link className="signintwo-link" to="/signin">
                Sign In
                </Link>
            </p>
            </section>
        ) : (
            <section>
            <p
                ref={errRef}
                className={errMsg ? 'errmsg' : 'offscreen'}
                aria-live="assertive"
            >
                {errMsg}
            </p>
            <h1> Register </h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">
                Username:
                <span className={validName ? 'valid' : 'hide'}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validName || !user ? 'hide' : 'invalid'}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
                </label>
                <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                aria-invalid={validName ? 'false' : 'true'}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                />
                <p
                id="uidnote"
                className={
                    userFocus && user && !validName ? 'instructions' : 'offscreen'
                }
                >
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters.
                <br />
                Must begin with a letter.
                <br />
                Letters, numbers, underscores, hyphens allowed.
                </p>

                <label htmlFor="password">
                Password:
                <span className={validPwd ? 'valid' : 'hide'}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validPwd || !pwd ? 'hide' : 'invalid'}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
                </label>
                <input
                type="password"
                id="passsword"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
                />
                <p
                id="pwdnote"
                className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}
                >
                <FontAwesomeIcon icon={faInfoCircle} />
                8 to 24 characters. <br />
                Must includ uppercase and lowercase letters, a number and a
                special character.
                <br />
                </p>

                <label htmlFor="confirm_pwd">
                Confirm Password:
                <span className={validMatch && matchPwd ? 'valid' : 'hide'}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validMatch || !matchPwd ? 'hide' : 'invalid'}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
                </label>
                <input
                type="password"
                id="confirm_pwd"
                onChange={(e) => setMatchPwd(e.target.value)}
                required
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
                />
                <p
                className={
                    matchFocus && !validMatch ? 'instructions' : 'offscreen'
                }
                >
                <FontAwesomeIcon icon={faInfoCircle} />
                Passwords must match
                </p>
                <button
                className="signup-button"
                disabled={!validName || !validPwd || !validMatch ? true : false}
                >
                Sign Up
                </button>
            </form>
            <p className="already-signedup">
                Already signed up? <br />
                <span className="line">
                <Link className="signup-link-two" to="/signin">
                    Sign In
                </Link>
                </span>
            </p>
            </section>
        )}
        </>
    );
    };

    export default SignUp;

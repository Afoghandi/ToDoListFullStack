import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';
import axios from 'axios';

const AuthBox = ({ register }) => {
	const authContext = useContext(AuthContext);
	const { getCurrentUser, user } = authContext;

	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState({});

	useEffect(() => {
		if (user && navigate) {
			navigate('/dashboard');
		}
	}, [user, navigate]);

	const onSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		let data = {};

		if (register) {
			data = { name, email, password, confirmPassword };
		} else {
			data = { email, password };
		}

		axios
			.post(register ? '/api/auth/register' : '/api/auth/login', data)
			.then(() => {
				getCurrentUser();
			})
			.catch((err) => {
				setLoading(false);
				if (err?.response?.data) {
					setErrors(err.response.data);
				}
			});
	};

	return (
		<div className='auth'>
			<div className='auth__box'>
				<div className='auth__header'>
					<h1>{register ? 'Register' : 'Login'}</h1>
				</div>
				<form onSubmit={onSubmit}>
					{register && (
						<div className='auth__field'>
							<label>Name</label>
							<input
								type='text'
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
							{errors.name && <p className='auth__error'>{errors.name} </p>}
						</div>
					)}

					<div className='auth__field'>
						<label>Email</label>
						<input
							type='text'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						{errors.email && <p className='auth__error'>{errors.name} </p>}
					</div>
					<div className='auth__field'>
						<label>Password</label>
						<input
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						{errors.password && (
							<p className='auth__error'>{errors.password} </p>
						)}
					</div>
					{register && (
						<div className='auth__field'>
							<label>Confirm Password</label>
							<input
								type='password'
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
							{errors.confirmPassword && (
								<p className='auth__error'>{errors.confirmPassword} </p>
							)}
						</div>
					)}
					<div className='auth__footer'>
						{Object.keys(errors).length > 0 && (
							<p className='auth__error'>
								{register ? 'You have some validation errors' : errors.error}
							</p>
						)}

						<button className='btn' type='submit' disabled={loading}>
							{register ? 'Register' : 'Login'}{' '}
						</button>
						{!register ? (
							<div className='auth__register'>
								<p>
									Not a member? <Link to='/register'> Register Now</Link>{' '}
								</p>{' '}
							</div>
						) : (
							<div className='auth__register'>
								<p>
									Already a member? <Link to='/'> Login Now</Link>{' '}
								</p>{' '}
							</div>
						)}
					</div>
				</form>
			</div>
		</div>
	);
};

export default AuthBox;

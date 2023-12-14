"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface LoginData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateInputs(loginData);

    if (validation.isValid) {
      const user = searchUser(loginData.email);

      if (user && user.password === loginData.password) {

        sessionStorage.setItem('user_name', user.user_name);
        sessionStorage.setItem('user_type', user.user_type);

        router.push('/home');
      } else {
        alert('Invalid email or password. Please try again.');
      }
    } else {
      alert(`Validation Error: ${validation.errors.join('\n')}`);
    }
  };

  const validateInputs = (data: LoginData) => {
    const errors: string[] = [];

    if (!/\S+@\S+\.\S+/.test(data.email) || data.email.length >= 50) {
      errors.push('Invalid email address.');
    }

    if (!data.email || !data.password) {
      errors.push('Email and password are required.');
    }

    if (data.password.length < 8 || data.password.length > 20 || !/^[a-zA-Z0-9]+$/.test(data.password)) {
      errors.push('Invalid password. It must be alphanumeric and between 8 to 20 characters.');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  };

  const searchUser = (email: string) => {
    const usersDatabase = [
      { email: 'user@example.com', password: 'password123', user_name: 'User', user_type: 'customer' },
    ];

    return usersDatabase.find((user) => user.email === email);
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
          />
        </label>
        <br />

        <label>
          Password:
          <input
            type="password"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          />
        </label>
        <br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;

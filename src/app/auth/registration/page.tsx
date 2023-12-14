"use client"
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

interface FormData {
  full_name: string;
  user_name: string;
  email: string;
  password: string;
  confirm_password: string;
  address: string;
  company_name: string;
  phone_number: string;
  city: string;
  country: string;
}

const validateInputs = (data : FormData) => {
    const errors = [];
  
    if (!data.full_name || data.full_name.length < 3 || data.full_name.length > 30 || !/^[a-zA-Z]+$/.test(data.full_name)) {
      errors.push('Invalid full name. It must be alphabetic and between 3 to 30 characters.');
    }
  
    if (!data.email || data.email.length < 10 || data.email.length > 50 || !/\S+@\S+\.\S+/.test(data.email)) {
      errors.push('Invalid email address. It must be a valid email syntax and between 10 to 50 characters.');
    }
  
    if (!data.city || !data.country || !data.company_name ||
      data.city.length < 3 || data.city.length > 20 ||
      data.country.length < 3 || data.country.length > 20 ||
      data.company_name.length < 3 || data.company_name.length > 20) {
      errors.push('City, country, and company name must be between 3 to 20 characters.');
    }
  
    if (!data.phone_number || isNaN(Number(data.phone_number)) || data.phone_number.length < 11 || data.phone_number.length > 15) {
      errors.push('Invalid phone number. It must be a numeric value with a length between 11 to 15 digits.');
    }
  
    if (!data.password || data.password.length < 8 || data.password.length > 20 || !/^[a-zA-Z0-9]+$/.test(data.password)) {
      errors.push('Invalid password. It must be alphanumeric and between 8 to 20 characters.');
    }
  
    if (data.password !== data.confirm_password) {
      errors.push('Password and Confirm Password do not match.');
    }
  
    if (!data.full_name || !data.email || !data.user_name || !data.password || !data.confirm_password || !data.phone_number) {
      errors.push('Full name, email, user name, password, confirm password, and phone number cannot be empty.');
    }
  
    const isEmailRegistered = false; 
    const isUserNameRegistered = false; 
  
    if (isEmailRegistered || isUserNameRegistered) {
      errors.push('Email address or user name is already registered.');
    }
  
    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  };
  
const RegistrationPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    full_name: '',
    user_name: '',
    email: '',
    password: '',
    confirm_password: '',
    address: '',
    company_name: '',
    phone_number: '',
    city: '',
    country: '',
  });

  const handleSubmit = async (e : FormEvent) => {
    e.preventDefault();

    const validation = validateInputs(formData);

    if (validation.isValid) {
      const userRecord = {
        full_name: formData.full_name,
        user_name: formData.user_name,
        email: formData.email,
        password: formData.password,
        city: formData.city,
        country: formData.country,
        phone: formData.phone_number,
        company_name: formData.company_name,
        user_type: 'active',
        date_added: new Date().toLocaleDateString(),
        last_updated: null,
      };

      const usersArray = []; 
      usersArray.push(userRecord);

      router.push('/dashboard');
    } else {
      alert(`Validation Error: ${validation.errors.join('\n')}`);
    }
  };

return (
  <div>
    <h1>Registration Page</h1>
    <form onSubmit={handleSubmit}>
      <label>
        Full Name:
        <input
          type="text"
          value={formData.full_name}
          onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
        />
      </label>
<br></br>
      <label>
        User Name:
        <input
          type="text"
          value={formData.user_name}
          onChange={(e) => setFormData({ ...formData, user_name: e.target.value })}
        />
      </label>
<br></br>
      <label>
        Email:
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </label>
      <br></br>

      <label>
        Password:
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
      </label>
      <br></br>

      <label>
        Confirm Password:
        <input
          type="password"
          value={formData.confirm_password}
          onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
        />
      </label>
      <br></br>

      <label>
        Address:
        <input
          type="text"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        />
      </label>
      <br></br>

      <label>
        Company Name:
        <input
          type="text"
          value={formData.company_name}
          onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
        />
      </label>
      <br></br>

      <label>
        Phone Number:
        <input
          type="text"
          value={formData.phone_number}
          onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
        />
      </label>
      <br></br>

      <label>
        City:
        <input
          type="text"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
        />
      </label>
      <br></br>

      <label>
        Country:
        <input
          type="text"
          value={formData.country}
          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
        />
      </label>
      <br></br>

      <button type="submit">Sign Up</button>
    </form>
  </div>
);

};

export default RegistrationPage;

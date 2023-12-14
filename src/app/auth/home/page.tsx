"use client"
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const router = useRouter();

  const handleLogout = () => {

    sessionStorage.removeItem('user_name');
    sessionStorage.removeItem('user_type');

    router.push('/auth/login');
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      
      
      <div>
        <p>
          <a href="/auth/login">Login</a>
        </p>
        <p>
          <a href="/auth/registration">Registration</a>
        </p>
      </div>
      
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default HomePage;

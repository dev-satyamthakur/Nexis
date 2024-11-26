import { useNavigate } from 'react-router-dom'; // Add this import
import { useAuth0 } from '@auth0/auth0-react';
import { axiosInstance } from '../config/axios';
import { DotLoader } from 'react-spinners';
import { useEffect } from 'react';

export function LoginPage() {
  const { user } = useAuth0();
  const navigate = useNavigate(); // Initialize useNavigate
  useEffect(() => {
    const loginUser = async () => {
      try {
        const response = await axiosInstance.post('/api/auth', {
          ...user,
        });
        if (response.status === 200) {
          // Store the JWT token and refresh token in localStorage
          localStorage.setItem('jwtToken', response.data.token); // Save JWT token
          localStorage.setItem('refreshToken', response.data.refreshToken); // Save refresh token
          navigate('/'); // Redirect to homepage
        }
      } catch (err) {
        console.log(err);
      }
    };
    loginUser();
  }, [navigate]); // Add navigate to dependency array
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <DotLoader color="#6B4DE6" />
      <p>Please wait while we Log You In</p>
    </div>
  );
}

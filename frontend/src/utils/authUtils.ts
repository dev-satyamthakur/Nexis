import { axiosInstance } from '../config/axios';

export const refreshAuthToken = async (): Promise<string> => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    const refreshResponse = await axiosInstance.post('/api/auth/refresh', {
      refreshToken: refreshToken,
    });

    const newToken = refreshResponse.data.token;
    const newRefreshToken = refreshResponse.data.refreshToken;

    localStorage.setItem('jwtToken', newToken);
    localStorage.setItem('refreshToken', newRefreshToken);

    return newToken;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    // You might want to handle failed refresh (e.g., logout user)
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('refreshToken');
    // You could either throw the error or handle navigation here
    throw new Error('Authentication failed');
  }
};

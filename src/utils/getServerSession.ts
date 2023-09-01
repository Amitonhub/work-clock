import axios from 'axios';
axios.defaults.withCredentials = true
import { BASE_URL } from '@/constants';

export const getServerSession = async () => {

  try {
    const response = await axios.get(`${BASE_URL}/users/auth`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = response.data;
    if(data){
      return data;
    }else{
      return null;
    }
  } catch (error) {
    console.log("Session Expired!");
    return null;
  }
}
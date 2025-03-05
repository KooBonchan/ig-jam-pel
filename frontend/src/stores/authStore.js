import { create } from 'zustand';
import axios from 'axios';

const useAuthStore = create((set) => ({
  user: null, // { fullname: string, picture: string }
  accessToken: null,

  setAuth: (user, token) => set({user, accessToken: token}),
  clearAuth: () => set({user: null, accessToken: null}),

  fetchUser: (token) => (
    axios.get('http://localhost:8094/api/user', {
      headers: {Authorization: `Bearer ${token}`},
    })
    .then((response) => {
      set({
        user: {
          fullname: response.data.fullname,
          picture: response.data.picture,
        },
        accessToken: token,
      });
      return true;
    })
    .catch(console.error)
    .then(e => {throw e})
  ),
}))
export default useAuthStore;
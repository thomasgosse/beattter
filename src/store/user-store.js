import axios from 'axios';
import create from 'zustand';

import { getData, storeData } from './local-storage';

const BACKEND_URL = 'http://localhost:8082';

const [useUserStore] = create(set => ({
  user: null,
  loading: false,

  getUser: async id => {
    try {
      set({ loading: true });
      const result = await axios.get(`${BACKEND_URL}/users/${id}`);
      set({ user: result.data });
      await storeData('user', JSON.stringify(result.data));
      return result.data;
    } catch (e) {
      const userJson = await getData('user');
      if (userJson) {
        console.log('Could get user in local storage');
        set({ user: JSON.parse(userJson) });
      }
      console.log('Could not get user...');
    } finally {
      set({ loading: false });
    }
  },

  reset: async () => {
    set({ user: null, loading: false });
    await storeData('user', null);
  }
}));

export default useUserStore;

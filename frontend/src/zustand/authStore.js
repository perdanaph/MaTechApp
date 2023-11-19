import { create } from 'zustand';

const useAuthStore = create(set => ({
  dataLogin: {},
  isLogin: false,
  logout: () => {
    localStorage.removeItem('user');
    set({
      isLogin: false,
    });
  },
  checkLogin: () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user == null) {
      set({
        isLogin: false,
      });
    } else {
      set({
        isLogin: true,
      });
      return user;
    }
  },
  getInfoLogin: () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      set({
        dataLogin: user.data,
      });
    }
  },
}));

export default useAuthStore;

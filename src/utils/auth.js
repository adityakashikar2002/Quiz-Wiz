import { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from './storage';

const USERS_KEY = 'quizAppUsers';

// Initialize with a demo user if no users exist
const initializeUsers = () => {
  const users = getFromLocalStorage(USERS_KEY);
  if (!users || users.length === 0) {
    const demoUser = {
      id: '1',
      name: 'Demo User',
      email: 'demo@quizwiz.com',
      password: 'password123',
      createdAt: new Date().toISOString(),
    };
    saveToLocalStorage(USERS_KEY, [demoUser]);
  }
};

initializeUsers();

export const registerUser = async (userData) => {
  const users = getFromLocalStorage(USERS_KEY) || [];
  const userExists = users.some(user => user.email === userData.email);
  
  if (userExists) {
    throw new Error('User with this email already exists');
  }

  const newUser = {
    id: Date.now().toString(),
    ...userData,
    createdAt: new Date().toISOString(),
  };

  saveToLocalStorage(USERS_KEY, [...users, newUser]);
  return newUser;
};

export const loginUser = async ({ email, password }) => {
  const users = getFromLocalStorage(USERS_KEY) || [];
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    throw new Error('Invalid email or password');
  }

  return user;
};
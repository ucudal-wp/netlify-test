import { get, post } from '../utils/api.js';

export const getAll = () => get('/todos');

export const create = (text) => post('/todos', { text });

import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3222;
export const REACT_PROJECT_CREATE = process.env.REACT_PROJECT_CREATE_COMMAND;
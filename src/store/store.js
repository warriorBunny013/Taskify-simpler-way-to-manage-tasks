import {configureStore} from '@reduxjs/toolkit'
import todoReducer from '../Reducers/todoReducer';
import authReducer from '../Reducers/authReducer'

export const store=configureStore({
    reducer:{
      todo:todoReducer,
      auth:authReducer
    }
  })

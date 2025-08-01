import React, { createContext, useReducer } from 'react'

// 1. Crear el contexto global
export const ChatContext = createContext()

// Paso 1 (parte-3): Crear el estado inicial
const initialState = {
  messages: []
}

// Paso 2 (parte-3): Crear la función reductora
const chatReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      console.log('agregando mensaje...')
      console.log(state)
      return { ...state, messages: [...state.messages, action.payload] }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    default:
      return state
  }
}

// 2. Provider
export const ChatProvider = ({ children }) => {
// Paso 3 (parte-3): uso de hook useReducer
  const [state, dispatch] = useReducer(chatReducer, initialState)

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  )
}

import axios from 'axios'
import { useReducer } from 'react'

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
    default:
      return state
  }
}

export const useOllama = () => {
  // Paso 3 (parte-3): uso de hook useReducer
  const [dispatch] = useReducer(chatReducer, initialState)

  const sendMessage = async (userPrompt) => {
    try {
      const res = await axios.post('http://localhost:11434/api/generate', {
        model: 'llama2',
        prompt: userPrompt,
        stream: false
      })
      // Paso 4 (parte-3): Generar los dispatch
      // Dispatch para guardar el mensaje del usuario
      dispatch({ type: 'ADD_MESSAGE', payload: { form: 'user', text: userPrompt } })
      // Dispatch para guardar el mensaje del bot
      dispatch({ type: 'ADD_MESSAGE', payload: { form: 'bot', text: res.data.response } })
    } catch (error) {
      console.error('error: ', error)
    }
  }

  return { sendMessage }
}

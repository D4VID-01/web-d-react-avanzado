import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useContext, useEffect } from 'react'
import { ChatContext } from '../context/ChatContext'
import { useOllama } from '../hooks/useOllama'
import axios from 'axios'

const schema = yup.object({
  userInput: yup
    .string()
    .min(3, 'El mensaje debe tener mínimo 3 caracteres.')
    .required('El mensaje es obligatorio')
})

export const ChatBot = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const { state, dispatch } = useContext(ChatContext)
  const { sendMessage } = useOllama()

  // Post en la BD
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/messages')
        res.data.forEach(m => {
          dispatch({
            type: 'ADD_MESSAGE',
            payload: {
              from: m.sender === 'user' ? 'user' : 'bot',
              text: m.text
            }
          })
        })
      } catch (error) {
        console.error('Error al cargar mensaje', error)
      }
    }
    fetchMessages()
  }, [dispatch])

  const handlePregunta = async data => {
    /// Paso 4 (parte-3): Generar los dispatch
    // Dispatch para guardar el mensaje del usuario
    dispatch({ type: 'ADD_MESSAGE', payload: { form: 'user', text: data.userInput } })
    // Dispatch para guardar el mensaje del bot
    dispatch({ type: 'SET_LOADING', payload: true })

    try {
      // Guardar mensaje del usuario en la base de datos
      await axios.post('http://localhost:3001/api/messages', {
        sender: 'user',
        text: data.userInput
      })
      const res = await sendMessage(data.userInput)

      const botMessage = { from: 'bot', text: res.data.response }

      // Guardar mensaje del bot en la base de datos
      await axios.post('http://localhost:3001/api/messages', {
        sender: 'bot',
        text: res.data.response
      })

      dispatch({ type: 'ADD_MESSAGE', payload: botMessage })
    } catch (error) {
      console.log(error)
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(handlePregunta)}>
        <input
          type='text'
          {...register('userInput')}
          className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
        />
        {errors.userInput && <p>{errors.userInput.message}</p>}
        <button
          className='w-full py-2 rounded transition cursor-pointer bg-blue-600 text-white hover:bg-blue-700'
        >Preguntar
        </button>
      </form>
      {/* <div>
        <p>{loading ? 'Generando respuesta 🚀' : response}</p>
      </div> */}
      <div>
        {state.messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.form === 'user' ? 'Tu' : 'Bot'}</strong>
            : {msg.text}
          </p>
        ))}
        {state.loading && <p>Generando respuesta...🚀</p>}
      </div>
    </>
  )
}

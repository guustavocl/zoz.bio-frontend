import { AuthProvider } from './context/AuthProvider'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProtectedLayout } from './layouts/ProtectedLayout'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/profile' 
            element={
              <ProtectedLayout>
                <h2>aqui é o profile</h2>
              </ProtectedLayout>
            }
          />
          <Route path='/login' 
            element={
              <div>
                teste
              </div>
            }
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

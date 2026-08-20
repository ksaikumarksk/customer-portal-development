import { useEffect, useState } from 'react'
import './styles.css'
import { Login } from './components/auth/Login'
import { Registration } from './components/auth/Registration'
import { Dashboard } from './components/dashboard'
import type { MediaFile } from './components/dashboard/FileList'
import { deleteFile, listFiles, logout, me, uploadFile, type ApiMediaFile } from './api'

function toMediaFile(file: ApiMediaFile): MediaFile {
  const type = file.type.startsWith('image') ? 'image' : file.type.startsWith('video') ? 'video' : 'document'
  return { id: file._id, name: file.name, type, size: `${(file.size / 1024 / 1024).toFixed(1)} MB`, uploadedAt: new Date(file.createdAt).toLocaleDateString() }
}

export default function App() {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState<string | null>(null)
  const [checkingSession, setCheckingSession] = useState(true)
  const [files, setFiles] = useState<MediaFile[]>([])
  const [query, setQuery] = useState('')
  useEffect(() => {
    me()
      .then(({ user }) => setEmail(user.email))
      .catch(() => undefined)
      .finally(() => setCheckingSession(false))
  }, [])
  useEffect(() => { if (email) listFiles().then((items) => setFiles(items.map(toMediaFile))).catch((error: Error) => window.alert(error.message)) }, [email])
  if (checkingSession) return <main className="auth-shell" aria-busy="true" />
  if (!email) return <main className="auth-shell">{mode === 'login' ? <Login onComplete={setEmail} onSwitch={() => setMode('register')} /> : <Registration onComplete={setEmail} onSwitch={() => setMode('login')} />}</main>
  return <Dashboard email={email} files={files} query={query} onQuery={setQuery} onLogout={() => logout().finally(() => setEmail(null))} onDelete={(id) => deleteFile(id).then(() => setFiles((current) => current.filter((file) => file.id !== id))).catch((error: Error) => window.alert(error.message))} onUpload={(file) => uploadFile(file).then((item) => setFiles((current) => [toMediaFile(item), ...current])).catch((error: Error) => window.alert(error.message))} />
}

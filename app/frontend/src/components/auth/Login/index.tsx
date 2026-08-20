import { useState } from 'react'
import { login } from '../../../api'

type Props = { onComplete: (email: string) => void; onSwitch: () => void }

export function Login({ onComplete, onSwitch }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  return <form className="auth-card" onSubmit={(event) => { event.preventDefault(); setError(''); login(email, password).then(({ user }) => onComplete(user.email)).catch((reason: Error) => setError(reason.message)) }}>
    <span className="eyebrow">Welcome back</span><h2>Log in</h2><p className="muted">Continue to your media workspace.</p>
    <label>Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
    <label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
    {error && <p className="error-message">{error}</p>}<button className="primary-button" type="submit">Log in</button><button className="link-button" type="button" onClick={onSwitch}>Need an account? Register</button>
  </form>
}

import { useState } from 'react'
import { register } from '../../../api'

type Props = { onComplete: (email: string) => void; onSwitch: () => void }

export function Registration({ onComplete, onSwitch }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  return <form className="auth-card" onSubmit={(event) => { event.preventDefault(); setError(''); register(email, password).then(({ user }) => onComplete(user.email)).catch((reason: Error) => setError(reason.message)) }}>
    <span className="eyebrow">Create workspace</span><h2>Register</h2><p className="muted">Start organizing your media library.</p>
    <label>Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
    <label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} minLength={8} required /></label>
    {error && <p className="error-message">{error}</p>}<button className="primary-button" type="submit">Create account</button><button className="link-button" type="button" onClick={onSwitch}>Already registered? Log in</button>
  </form>
}

type Props = { email: string; onLogout: () => void }
export function Header({ email, onLogout }: Props) { return <header className="topbar"><div><span className="eyebrow">Multimedia manager</span><h1>Library overview</h1></div><div className="user-actions"><span>{email}</span><button className="ghost-button" onClick={onLogout}>Log out</button></div></header> }

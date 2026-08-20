import { useState } from 'react'

type Props = { onUpload: (file: File) => void }
export function Upload({ onUpload }: Props) { const [file, setFile] = useState<File | null>(null); return <section className="upload-card"><div><span className="eyebrow">Add media</span><h2>Upload a new file</h2><p className="muted">Images, videos, and documents up to 10MB.</p></div><label className="upload-control">{file ? file.name : 'Choose file'}<input type="file" accept="image/*,video/*,.pdf,.doc,.docx,.txt" onChange={(event) => setFile(event.target.files?.[0] || null)} /></label><button className="primary-button" disabled={!file} onClick={() => { if (file) { onUpload(file); setFile(null) } }}>Upload file</button></section> }

import type { MediaFile } from './FileList'
import { Header } from './Header'
import { Stats } from './Stats'
import { Upload } from './Upload'
import { FileList } from './FileList'

type Props = { email: string; files: MediaFile[]; query: string; onQuery: (value: string) => void; onUpload: (file: File) => void; onDelete: (id: string) => void; onLogout: () => void }
export function Dashboard({ email, files, query, onQuery, onUpload, onDelete, onLogout }: Props) { const count = (type: string) => files.filter((file) => file.type === type).length; return <main className="dashboard"><Header email={email} onLogout={onLogout} /><Stats total={files.length} images={count('image')} videos={count('video')} documents={count('document')} /><Upload onUpload={onUpload} /><FileList files={files} query={query} onQuery={onQuery} onDelete={onDelete} /></main> }

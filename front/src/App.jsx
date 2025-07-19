import { useState } from 'react'
import './App.css'

function App() {
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState('')
  const [statusType, setStatusType] = useState('info') // 'info', 'success', 'error'
  const [mp3Url, setMp3Url] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e) => {
    const selected = e.target.files[0]
    if (selected && selected.type !== 'video/mp4') {
      setStatus('Please select a valid MP4 file.')
      setStatusType('error')
      setFile(null)
      setMp3Url(null)
      return
    }
    setFile(selected)
    setStatus('')
    setStatusType('info')
    setMp3Url(null)
  }

  const handleConvert = async (e) => {
    e.preventDefault()
    if (!file) return
    setLoading(true)
    setStatus('Converting...')
    setStatusType('info')
    setMp3Url(null)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/convert', {
        method: 'POST',
        body: formData,
      })
      if (!response.ok) {
        let errorMsg = 'Conversion failed'
        try {
          const errData = await response.json()
          errorMsg = errData.error || errorMsg
        } catch {}
        throw new Error(errorMsg)
      }
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      setMp3Url(url)
      setStatus('Conversion successful!')
      setStatusType('success')
    } catch (err) {
      setStatus('Error: ' + err.message)
      setStatusType('error')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setFile(null)
    setStatus('')
    setStatusType('info')
    setMp3Url(null)
    document.getElementById('file-input').value = ''
  }

  return (
    <div className="container improved-container">
      <h1>MP4 to MP3 Converter</h1>
      <form className="upload-form" onSubmit={handleConvert}>
        <input
          id="file-input"
          type="file"
          accept="video/mp4"
          onChange={handleFileChange}
          disabled={loading}
        />
        {file ? (
          <p className="file-info">Selected file: {file.name}</p>
        ) : (
          <p className="file-info">Please select an MP4 file to convert.</p>
        )}
        <div className="button-row">
          <button type="submit" disabled={!file || loading}>
            {loading ? 'Converting...' : 'Convert to MP3'}
          </button>
          <button type="button" onClick={handleReset} disabled={loading && !file} className="reset-btn">
            Reset
          </button>
        </div>
      </form>
      <div className={`status-message ${statusType}`}>{status && (
        <>
          {loading && <span className="spinner"></span>}
          {status}
        </>
      )}</div>
      {mp3Url && (
        <a href={mp3Url} download="converted.mp3" className="download-link">
          Download MP3
        </a>
      )}
    </div>
  )
}

export default App

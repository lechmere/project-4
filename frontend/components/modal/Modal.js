import React from 'react'
import { Link } from 'react-router-dom'

export default function Modal({ open, children, onClose }) {
  if (!open) return null
  return (
    <>
      <div className="overlay" />
      <div className="modal">
        {children}
        <Link to={'/message-home'} onClick={onClose}><button>Mssages</button></Link>
        <a onClick={onClose}>Keep Swiping</a>
      </div>
    </>
  )
}

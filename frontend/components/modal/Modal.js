import React from 'react'

export default function Modal({ open, children, onClose }) {
  if (!open) return null
  return (
    <>
      <div className="overlay" />
      <div className="modal">
        {children}
        <button onClick={onClose}>chat</button>
        <a onClick={onClose}>Keep Swiping</a>
      </div>
    </>
  )
}

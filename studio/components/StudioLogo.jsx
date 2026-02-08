
import React from 'react'

export const StudioLogo = (props) => {
  const { renderDefault, title } = props
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <img 
        src="/static/logo.png" 
        alt="Ambalan Logo" 
        style={{ height: '24px', width: 'auto' }}
      />
      {renderDefault(props)}
    </div>
  )
}

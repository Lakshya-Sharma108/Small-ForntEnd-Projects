import { useState, useEffect } from 'react'

export default function LoadingScreen() {
  const [hidden, setHidden] = useState(false)
  const [expand, setExpand] = useState(false)

  useEffect(() => {
    const expandTimer = setTimeout(() => setExpand(true), 3250)
    const hideTimer = setTimeout(() => setHidden(true), 4050)

    return () => {
      clearTimeout(expandTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  return (
    <div className={`loading-screen ${hidden ? 'hidden' : ''}`}>
      <div className="ball-container">
        <div 
          className="ball-shadow" 
          style={{ 
            display: expand ? 'none' : 'block',
            animation: expand ? 'none' : 'shadowAnimation 0.8s ease-in-out infinite'
          }}
        ></div>
        <div 
          className={`bouncing-ball ${expand ? 'expand' : ''}`}
          style={{
            animation: expand ? 'none' : 'ballBounce 0.8s ease-in-out infinite'
          }}
        ></div>
      </div>
      <style>{`
        .loading-screen {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f0f0f0;
          transition: opacity 0.5s;
        }
        
        .loading-screen.hidden {
          opacity: 0;
          pointer-events: none;
        }
        
        .ball-container {
          position: relative;
          height: 200px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }
        
        .ball-shadow {
          position: absolute;
          bottom: 0;
          width: 60px;
          height: 10px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 50%;
          filter: blur(5px);
        }
        
        .bouncing-ball {
          width: 50px;
          height: 50px;
          background: #778873;
          border-radius: 50%;
          margin-bottom: 0;
        }
        
        .bouncing-ball.expand {
          animation: expandAnimation 0.5s ease-out forwards !important;
        }
        
        @keyframes ballBounce {
          0% {
            transform: translateY(-150px);
            animation-timing-function: ease-in;
          }
          50% {
            transform: translateY(0);
            animation-timing-function: ease-out;
          }
          100% {
            transform: translateY(-150px);
            animation-timing-function: ease-in;
          }
        }
        
        @keyframes shadowAnimation {
          0% {
            transform: scale(0.4);
            opacity: 0.2;
          }
          50% {
            transform: scale(1);
            opacity: 0.3;
          }
          100% {
            transform: scale(0.4);
            opacity: 0.2;
          }
        }
        
        @keyframes expandAnimation {
          to {
            transform: scale(30);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
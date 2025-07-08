import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import bgm from './bgm.mp3'
import coinSound from './coin.mp3'

export default function App() {
  const [showMain, setShowMain] = useState(false)
  const [copied, setCopied] = useState(false)
  const [wealth, setWealth] = useState(0)
  const [blessings, setBlessings] = useState(0)
  const [fallingCoins, setFallingCoins] = useState([])
  const [showRedEnvelope, setShowRedEnvelope] = useState(false)
  const [fortune, setFortune] = useState('')
  const [isMuted, setIsMuted] = useState(false)
  const contract = "DqWncvpoTj6n6qRCJ5vJ4nqHvcQnKqvQoJZ6oL4Jbonk"
  const audioRef = useRef(null)
  const coinAudioRef = useRef(null)

  const fortunes = [
    "A sudden windfall is coming your way!",
    "Your bags will multiply like rabbits!",
    "The wealth god smiles upon your portfolio!",
    "Generational wealth starts today!",
    "Your diamond hands will be rewarded!",
    "Lambo soon!",
    "To the moon and beyond!",
    "Fortune favors the bold!",
    "Your wealth will grow like bamboo!"
  ]

  const handleCopy = () => {
    navigator.clipboard.writeText(contract)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    addCoins(5)
    addBlessing()
  }

  const startExperience = () => {
    setShowMain(true)
    audioRef.current.play()
  }

  const addCoins = (count) => {
    if (coinAudioRef.current) {
      coinAudioRef.current.currentTime = 0
      coinAudioRef.current.play()
    }

    const newCoins = Array(count).fill().map(() => ({
      id: Math.random(),
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 1 + Math.random() * 2
    }))

    setFallingCoins(prev => [...prev, ...newCoins])
    setWealth(prev => prev + count)
  }

  const addBlessing = () => {
    setBlessings(prev => prev + 1)
  }

  const openRedEnvelope = () => {
    setShowRedEnvelope(true)
    setFortune(fortunes[Math.floor(Math.random() * fortunes.length)])
    addCoins(10)
  }

  const toggleMute = () => {
    setIsMuted(prev => !prev)
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted
    }
  }

  useEffect(() => {
  if (audioRef.current) {
    audioRef.current.loop = true
    audioRef.current.volume = 0.1
  }
}, [])


  return (
    <div className="app">
      <img src="/bg2.png" alt="Background Layer 2" className="bg2-overlay" />
<img src="/COINS.png" alt="Coins Decoration" className="coins-bottom" />
      <img src="/LANTERN1.png" alt="Lantern Left" className="lantern lantern-left" />
<img src="/LANTERN2.png" alt="Lantern Right" className="lantern lantern-right" />
      <audio ref={audioRef} src={bgm} />
      <audio ref={coinAudioRef} src={coinSound} />

      <div className="clouds">
  <img src="/CLOUD3.png" alt="Cloud 3" className="cloud cloud-back" />
  <img src="/CLOUD2.png" alt="Cloud 2" className="cloud cloud-mid" />
  <img src="/CLOUD1.png" alt="Cloud 1" className="cloud cloud-front" />
</div>
<img src="/PAPER.png" alt="Paper" className="paper-overlay" />


      <div className="overlay">
        {/* Mute button */}
        <motion.button
          className="mute-btn"
          onClick={toggleMute}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isMuted ? "🔇" : "🔊"}
        </motion.button>

        <motion.button
  className="red-envelope-btn"
  whileHover={{ scale: 1.05, y: -3 }}
  whileTap={{ scale: 0.98 }}
  onClick={openRedEnvelope}
>
  <span className="red-envelope-inner">🧧</span>
</motion.button>

        {/* Falling coins */}
        <div className="coins-container">
          {fallingCoins.map(coin => (
            <motion.div
              key={coin.id}
              className="coin"
              initial={{ top: -50, left: `${coin.left}%`, opacity: 1 }}
              animate={{ top: '100%', rotate: 360 }}
              transition={{
                duration: coin.duration,
                delay: coin.delay,
                ease: "linear"
              }}
              onAnimationComplete={() => {
                setFallingCoins(prev => prev.filter(c => c.id !== coin.id))
              }}
            />
          ))}
        </div>

        {/* Main content with conditional blur */}
        <motion.div
            className="wealth-counter"
            whileHover={{ scale: 1.05 }}
            onClick={() => addCoins(1)}
          >
            💰 Wealth Collected: {wealth}
          </motion.div>
        <div className="main-body">
        <div className={`content ${!showMain ? 'blurred' : ''}`}>
          

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
<img
  src="/logoscroll.png"
  alt="Logo Scroll"
  className="logo-scroll"
/>
          </motion.div>

          <motion.div
            className="contract-box"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCopy}
          >
            {copied ? "Copied! +💰" : `CA: ${contract}`}
          </motion.div>

          <div className="buttons">
              <div className="buttons-row">
  <motion.a
    href="https://x.com/caishenonbonk"
    target="_blank"
    whileHover={{ scale: 1.05, y: -3 }}
    whileTap={{ scale: 0.98 }}
  >
    <img src="/x.png" alt="X" style={{ height: '70px' }} />
  </motion.a>
  <motion.a
    href="https://dexscreener.com/solana/9fw4guyvdjv6vdyhzxqxdyxikb1zvqebdhx85814ixwn"
    target="_blank"
    whileHover={{ scale: 1.05, y: -3 }}
    whileTap={{ scale: 0.98 }}
  >
    <img src="/dex.png" alt="Dex" style={{ height: '70px' }} />
  </motion.a>
  <motion.a
    href="https://letsbonk.fun/token/DqWncvpoTj6n6qRCJ5vJ4nqHvcQnKqvQoJZ6oL4Jbonk"
    target="_blank"
    whileHover={{ scale: 1.05, y: -3 }}
    whileTap={{ scale: 0.98 }}
  >
    <img src="/bonk_fun.png" alt="Bonk" style={{ height: '70px' }} />
  </motion.a>
    </div>
</div>
          <div className="about">
            <h2>About Caishen</h2>
            <p>
              Caishen is the god of wealth and he's just launched on Bonk.
              If you're praying for generational wealth, this is your red envelope to prosperity.
            </p>
            <p className="blessings">
              Caishen has blessed you {blessings} time{blessings !== 1 ? 's' : ''}!
            </p>
          </div>

          <div className="caishen-image-container">
            <motion.div
              className="caishen-image"
              whileHover={{ scale: 1.05 }}
            >
              <motion.img
                src="/caishen.png"
                alt="Caishen"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                onClick={() => {
                  addCoins(3)
                  addBlessing()
                }}
              />
              <div className="click-me">Click me for blessings!</div>
            </motion.div>
          </div>
        </div>
        </div>

        {/* Red Envelope Modal */}
        <AnimatePresence>
          {showRedEnvelope && (
            <motion.div
              className="red-envelope-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="envelope-content"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <button
                  className="close-envelope"
                  onClick={() => setShowRedEnvelope(false)}
                >
                  ×
                </button>
                <h3>Your Fortune:</h3>
                <div className="fortune">{fortune}</div>
                <div className="fortune-bonus">+10 Wealth Collected!</div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Welcome Modal */}
        <AnimatePresence>
          {!showMain && (
            <motion.div
              className="modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="modal-box floating"
                initial={{ scale: 0.8, y: -30 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 120 }}
              >
                <h2>💰 CAISHEN APPROACHES 💰</h2>
                <p>This site may cause sudden wealth, irrational optimism, and compulsive bag-holding.</p>
                <p>Proceed only if you're ready for unimaginable gains.</p>
                <motion.button
                  className="ready-btn"
                  whileHover={{ scale: 1.1 }}
                  onClick={startExperience}
                >
                  Start
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

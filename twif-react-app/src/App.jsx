import { useNavigate } from 'react-router-dom'
import { AirDrop } from './Airdrop/AD'
import "./App.scss"
import { BottomMenu } from './BottomMenu/BM'
import { ClaimRewards } from './ClaimReward/CR'
import { GameBlock } from './GameBlock/GB'
import { LeaderBoard } from './LeaderBoard/LB'
import { useEffect } from 'react'
import { ReferalSystem } from './ReferalSystem/RS'


export function App() {

  const navigate = useNavigate()

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();

      window.Telegram.WebApp.setHeaderColor("bg_color");

      if (window.Telegram.WebApp.requestFullscreen) {
        window.Telegram.WebApp.requestFullscreen();
      } else {
        console.warn("Fullscreen API недоступен");
      }
    }
  }, []);
  
  useEffect(() => {
    if (window.Telegram.WebApp.platform == "tdesktop") {
      navigate('/mobapp')
    }
    
  }, [])

  console.log(window.Telegram.WebApp.platform)

  return (
    <>
      <GameBlock />
      <div className="bbg">
        <LeaderBoard />
        <ClaimRewards />
        <AirDrop title={"Airdrop"} />
        <ReferalSystem />
        <BottomMenu />
      </div>
    </>
  )
}

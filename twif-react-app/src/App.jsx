import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AirDrop } from './Airdrop/AD'
import "./App.scss"
import { BottomMenu } from './BottomMenu/BM'
import { ClaimRewards } from './ClaimReward/CR'
import { GameBlock } from './GameBlock/GB'
import { LeaderBoard } from './LeaderBoard/LB'
import { ReferalSystem } from './ReferalSystem/RS'

export function App() {

  const navigate = useNavigate()

  useEffect(() => {
    if (window.Telegram.WebApp.platform == "tdesktop" || window.Telegram.WebApp.platform == 'macos' || window.Telegram.WebApp.initData.length == 0) {
      // navigate('/mobapp')
    }
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.setHeaderColor("bg_color");
    window.Telegram.WebApp.disableVerticalSwipes()

    // if (window.Telegram.WebApp.isVersionAtLeast(8.0)) {
    //   window.Telegram.WebApp.requestFullscreen();
    // } else {
    //   console.warn("Fullscreen API недоступен");
    // }
  }, []);


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

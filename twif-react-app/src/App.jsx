import { AirDrop } from './Airdrop/AD'
import "./App.scss"
import { BottomMenu } from './BottomMenu/BM'
import { ClaimRewards } from './ClaimReward/CR'
import { GameBlock } from './GameBlock/GB'
import { LeaderBoard } from './LeaderBoard/LB'


import { ReferalSystem } from './ReferalSystem/RS'


export function App() {

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
  
  console.log(window.Telegram.WebApp.initData)

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

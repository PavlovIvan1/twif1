import { AirDrop } from './Airdrop/AD'
import "./App.scss"
import { BottomMenu } from './BottomMenu/BM'
import { ClaimRewards } from './ClaimReward/CR'
import { GameBlock } from './GameBlock/GB'
import { LeaderBoard } from './LeaderBoard/LB'


import { ReferalSystem } from './ReferalSystem/RS'


export function App() {
  
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
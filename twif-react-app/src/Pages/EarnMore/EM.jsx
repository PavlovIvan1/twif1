import { AirDrop } from '../../Airdrop/AD'
import { BottomMenu } from '../../BottomMenu/BM'
import { ClaimRewards } from '../../ClaimReward/CR'
import { ReferalSystem } from '../../ReferalSystem/RS'
import styles from "./EM.module.scss"

export function EarnMore() {
	return (
		<>
		<div className={styles.pages_bg}>
			<div className={styles.title}>
				<h1>Earn more</h1>
			</div>
			<ReferalSystem />
			<ClaimRewards />
			<AirDrop title={"Tasks"}/>
			<BottomMenu />
		</div>
		</>
	)
}
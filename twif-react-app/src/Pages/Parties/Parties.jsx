import { BottomMenu } from '../../BottomMenu/BM'
import styles from "./Parties.module.scss"
import { TopRated } from './TopRanking/TR'
import { YourParty } from './YourParty/YP'

export function Parties() {
	return (
		<div className={styles.pages_bg}>
			<div className={styles.title}>
				<h1>Parties</h1>
			</div>
			<TopRated />
			<YourParty />
			<BottomMenu />
		</div>
	)
}
import { useNavigate } from 'react-router-dom'
import styles from "./YP.module.scss"

export function YourParty() {

	const navigate = useNavigate()


	return (
		<>
			<div className={styles.title}>
				<h3>Your party</h3>
			</div>
		<div className={styles.YourParty}>
			<div className={styles.YourParty__card} onClick={() => {navigate('/createparty')}}>
				<div className={styles.YourParty__card__content}>
					<div className={styles.YourParty__card__content__text}>
						<h4>Create your party</h4>
						<p>Create your own political party</p>
					</div>
					<img src="/r.svg" alt="" />
				</div>
			</div>
			<div className={styles.YourParty__card}  onClick={() => {navigate('/createsquad')}}>
				<div className={styles.YourParty__card__content}>
					<div className={styles.YourParty__card__content__text}>
						<h4>Create your squad</h4>
						<p>Create your own political party</p>
					</div>
					<img src="/r.svg" alt="" />
				</div>
			</div>
		</div>
		</>
	)
}
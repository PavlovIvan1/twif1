import {useNavigate} from 'react-router-dom';
import {useGlobalStore} from '../useGlobalStore';
import styles from './GB.module.scss';

function TrampToTheMoon() {
	document.getElementById("#tramp").style.left = 500
}

export function GameBlock() {

	const navigate = useNavigate()

	// const dailyBoost = useGlobalStore((state) => state.dailyBoost);

	// const { dailyBoost, setDailyBoost } = useGlobalStore(state => ({
	// 	dailyBoost: state.dailyBoost,
	// 	setDailyBoost: state.setDailyBoost,
	// }));

	const setDailyBoost = useGlobalStore((state) => state.setDailyBoost);
	const dailyBoost = useGlobalStore((state) => state.dailyBoost);

	const setDailyNftBoost = useGlobalStore((state) => state.setDailyNftBoost);
	const dailyNFTBoost = useGlobalStore((state) => state.dailyNftBoost);

	const handleBoostClick = () => {
		fetch('http://188.245.187.190/api/boosts/user_daily_boost', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				initData: window.Telegram.WebApp.initData
			})
		})
		.then(response => response.json())
		.then(data => {
			setDailyBoost(data)
			console.log("DB zustand", dailyBoost)
		})
		.catch(error => {
			console.error("User`s daily bosts error", error);
		})

		// ----

		fetch('https://playcloud.pro/boosts/get_nft_boosts', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				initData: window.Telegram.WebApp.initData
			})
		})
		.then(response => response.json())
		.then(data => {
			setDailyNftBoost(data)
			console.log("User`s daily nft bosts", dailyNFTBoost)
		})
		.catch(error => {
			console.error("User`s daily nft bosts error", error);
		})
	}

	
	return (
    <>
			<div className={styles.Game}>
				<div className={styles.Game__content}>
					<img src="/Tramp.png" alt="" id='tramp' className={styles.tramp} />
					<div className={styles.Game__content__btns}>
						<button className={styles.Game__content__btn} onClick={() => {navigate('/getready')}}>START</button>
						<button className={styles.Game__content__btn} onClick={handleBoostClick}>
							<img src="/Stars.svg" alt="" />
							BOOST</button>
					</div>
				</div>
			</div>
    </>
  )
}
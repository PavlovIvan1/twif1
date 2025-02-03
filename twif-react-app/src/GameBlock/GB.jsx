import { useNavigate } from 'react-router-dom'
import { API_URL } from '../config.js'
import { useGlobalStore } from '../useGlobalStore'
import styles from './GB.module.scss'

function TrampToTheMoon() {
	document.getElementById("#tramp").style.left = 500
}

export function GameBlock() {

	const navigate = useNavigate()

	const setDailyBoost = useGlobalStore((state) => state.setDailyBoost);
	const dailyBoost = useGlobalStore((state) => state.dailyBoost);

	const setDailyNftBoost = useGlobalStore((state) => state.setDailyNftBoost);
	const dailyNFTBoost = useGlobalStore((state) => state.dailyNftBoost);

	const handleBoostClick = () => {
		const fetchUserDailyBoost = async () => {
			try {
				const response = await axios.post(`${API_URL}/boosts/user_daily_boost`, {
					initData: window.Telegram.WebApp.initData,
				});
				setDailyBoost(response.data);
				console.log("DB zustand", dailyBoost);
			} catch (error) {
				console.error("User`s daily bosts error", error);
			}
		};
		
		
		const fetchUserNftBoosts = async () => {
			try {
				const response = await axios.post(`${API_URL}/boosts/get_nft_boosts`, {
					initData: window.Telegram.WebApp.initData,
				});
				setDailyNftBoost(response.data);
				console.log("User`s daily nft bosts", dailyNFTBoost);
			} catch (error) {
				console.error("User`s daily nft bosts error", error);
			}
		};
		
		fetchUserDailyBoost();
		fetchUserNftBoosts();
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
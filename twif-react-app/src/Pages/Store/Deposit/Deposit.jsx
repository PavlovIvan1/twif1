import axios from 'axios'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import { API_URL } from '../../../config.js'
import styles from './Deposit.module.scss'

export function Loader() {
	return (
		<>
			<div className='loading'>
          <img src="/trump_loader.jpg" className="tramp-spin" alt="loadingTramo" />
      </div>
		</>
	)
}

export function Deposit({canBuyDailyBoost, setCanBuyDailyBoost }) {

	const [dailyBoostData, setDailyBoostData] = useState()
	const [selectedId, setSelectedId] = useState(null);
	const [loading, setLoading] = useState(true)

	const ToastErr = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 3000,
    color: "#fff",
    timerProgressBar: true,
    // background: "#009748",
    background: "#DD3634",
    customClass: {
      popup: 'blue-background inter-font'
    },
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
	const ToastSuc = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 3000,
    color: "#fff",
    timerProgressBar: true,
    background: "#009748",
    // background: "#DD3634",
    customClass: {
      popup: 'blue-background inter-font'
    },
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

	useEffect(() => {
		async function fetchDailyBoosts() {
			try {
					const response = await axios.get(`${API_URL}/boosts/daily`);
					const data = response.data;
					console.log("Boosts data", data);
					setDailyBoostData(data);
			} catch (err) {
					console.error("Boost err", err);
			} finally {
					setTimeout(() => {
							setLoading(false);
					}, 1000);
			}
		}

	async function createBoostLink() {
    try {
        const response = await axios.post(`${API_URL}/boosts/create_link`, {
            initData: window.Telegram.WebApp.initData,
            boost_id: selectedId,
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

				console.log("createBoostLink", response)

    } catch (err) {
        console.error("", err);
    } finally {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }
	}
	 
	fetchDailyBoosts()
	createBoostLink();
	}, [])

  if (loading) {
		return (
			<Loader />
		)
	}

	const handleItemClick = (id) => {
		setSelectedId(id);
  };

	const handlePay = () => {
		if (canBuyDailyBoost) {
		fetch(`${API_URL}/boosts/set_user_daily_boost`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				initData: window.Telegram.WebApp.initData,
				boost_id: selectedId
			})
		})
		.then(response => {
			if (response.status === 400) {
				ToastErr.fire(
					{
						icon: 'error',
						title: 'You don`t have much stars to pay'
					}
				)
			}
			return response.status;
		})
		.then(data => {
			ToastSuc.fire(
				{
					icon: 'success',
					title: `You have paid for boost - ${selectedId}`
				}
			)
			setCanBuyDailyBoost(false)
		})
		.catch(err => {
			console.error("Payment err", err)
			ToastErr.fire(
				{
					icon: 'error',
					title: err.message
				}
			)
		})
		} else {
			ToastErr.fire({
				icon: 'error',
				title: 'You arledy have bought daily boost'
			})
		}
	}

	return (
		<>
			<div className={styles.dep}>
			<div className={styles.Deposit}>
				<div className={styles.Deposit__title}><h3>Deposit</h3></div>
				<div className={styles.Deposit__list}>


					{dailyBoostData.map((boost) => (
      			<div key={boost.id} className={styles.Deposit__component} onClick={() => handleItemClick(boost.id)}>
        			<div className={styles.dep_l}>
          			<img src="/Stars.svg" alt="" />
          			<li>{boost.multiplier} - factor</li>
        			</div>
        			<div className={styles.dep_l}>
          			<li>{boost.stars}</li>
          		<	img src="/TGStars.svg" alt="" width={18} />
        		</div>
      			</div>
    			))}

					<button onClick={handlePay}>Pay</button>
				</div>
			</div>
		</div>
		</>
	)
}

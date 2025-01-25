import { BottomMenu } from '../../BottomMenu/BM'
import { Deposit } from './Deposit/Deposit'
import { NFT } from './NFT/NFT'
import styles from './Store.module.scss'


import { Swiper, SwiperSlide } from 'swiper/react'

import { useEffect, useState } from 'react'
import 'swiper/css'

import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

import { useTonConnectUI } from '@tonconnect/ui-react'
import { API_URL } from '../../config.js'




export function Settings({ userFriendlyAddress }) {
	const [TonConnectUI, setOptions] = useTonConnectUI()

	const transaction =  {
		validUntil: Date.now() + 5 * 60 * 1000,
		messages: [
			{
				address: userFriendlyAddress,
				amount: '10000000',
			},
		],
	};

	async function sendTransaction() {
		if (!TonConnectUI.wallet) {
			alert("Pls connect ur wallet")
			return
		}

		try {
			const res = await TonConnectUI.sendTransaction(transaction)
			console.log(res)

			const response = await fetch('https://6adc-178-47-140-82.ngrok-free.app/transaction/send', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					initData: window.Telegram.WebApp.initData,
					boc: res.boc
				}),
			})

			if (!response.ok) {
				throw new Error(
						`Failed to log transaction: ${response.statusText}`				
				)
			}

			const result = await response.json()
			console.log(result)

		} catch {
			alert("Failed to transactopn")
		}
	}

	return (
		<>
			<button onClick={() => sendTransaction()} className={styles.buy_stars}> <img src="/Star.svg" alt="" /> Buy stars</button>
		</>
	)

}


export function Balance({balance}) {
	return (
		<>
			<div className={styles.Balance__Content}>
				<div>
					<img src="/TGStars.svg" alt="" />
					<h2>{balance}</h2>
				</div>
				<Settings userFriendlyAddress={'UQCqvbAOk3AH7LemYeOIWh0va8gZH-63dY8iM538MUYhf_oa'} />
			</div>
		</>
	)
}

export function Carousel() {



	return (
		<Swiper
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      ...
    </Swiper>
	)
}

export function Store() {

	const [userData, setUserData] = useState(null);
	
	const [dailyBoost, setDailyBoost] = useState(false)
  const [canBuyDailyBoost, setCanBuyDailyBoost] = useState(false)
	
	const ToastInfo = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 3000,
    color: "#fff",
    timerProgressBar: true,
    // background: "#009748",
    // background: "#DD3634",
    background: "#0A3161",
    customClass: {
      popup: 'blue-background inter-font'
    },
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

	useEffect(() => {
		fetch(`${API_URL}/users/me`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ initData: window.Telegram.WebApp.initData })
			})
			.then(response => response.json())
			.then(data => {
				setUserData(data)
			})
			.catch(error => {
        console.error('Error fetching user data:', error);
      });


			fetch(`${API_URL}/boosts/user_daily_boost`, {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({ initData: window.Telegram.WebApp.initData })
			})
			.then(response => {
				if (!response.ok) {
					return response.json().then(errorData => {
						if (errorData.detail === "No daily boost selected") {
							ToastInfo.fire({
								icon: "info",
								title: "You haven't bought a daily boost yet"
							});
							setCanBuyDailyBoost(true)
						}
						else {
							ToastInfo.fire({
								icon: "info",
								title: "You have already bought a daily boost"
							});
							setCanBuyDailyBoost(false)
						}
						throw new Error(errorData.detail || "Неизвестная ошибка");
					});
				}
				return response.json();
			})
			.then(data => {
				console.log(data)
				setCanBuyDailyBoost(false)
			})
			.catch(err => {
				console.error(err.message)
			})
	}, [])


	if (!userData) {
		return (
			<div className="spinner"></div>
		)
	}

	return (
		<div className={styles.pages_bg}>
			<div className={styles.title}>
				<h1>Store</h1>
			</div>
			<Balance balance={userData.stars} />
			<Deposit canBuyDailyBoost={canBuyDailyBoost} setCanBuyDailyBoost={setCanBuyDailyBoost} />
			<NFT />
			<BottomMenu />
		</div>
	)
}

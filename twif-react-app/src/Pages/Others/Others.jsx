import { FormControlLabel, Switch } from '@mui/material';
import {
	TonConnectButton,
	useTonAddress
} from '@tonconnect/ui-react';
import React, { useEffect, useState } from 'react';
import { BottomMenu } from '../../BottomMenu/BM';
import styles from './Others.module.scss';
import { API_URL } from '../../config.js';

export function Address() {

	const userFriendlyAddress = useTonAddress()
	const rawAddres = useTonAddress()

	useEffect(() => {
		if (userFriendlyAddress) {
			fetch(` ${API_URL}/users/connect-wallet`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					initData: window.Telegram.WebApp.initData,
					address: userFriendlyAddress
				})
			})
		}
	}, [userFriendlyAddress])
}

export function ConrolLabel() {

	const [checked, setChecked] = useState(false);

	const handleChange = (event) => {
		setChecked(event.target.checked);
	};

	let isToggleOn = false;

	return (
		<>
			<FormControlLabel
				control={
					<Switch
						checked={checked}
						onChange={handleChange}
						color="default"
					/>
				}
				label={checked ? isToggleOn = true : isToggleOn = false}
			/>
		</>
	)
}


export function MyInfo() {

	const [userData, setUserData] = useState(null);

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
	}, [])


	if (!userData) {
		return (
			<div className="spinner"></div>
		)
	}


	return (
		<>
			<div className={styles.MyInfo}>
				<div className={styles.MyInfo__Comp}>
					<div className={styles.MyInfo__UserInfo}>
						<div className={styles.MyInfo__UserInfo__Name}>
							<img src={` ${API_URL}/media/avatars/${userData.avatar}`} alt="" className={styles.avatar} />
							<div>

								<h4>{userData.fullname}</h4>

								<span>ID <span>{userData.id}</span></span>
							</div>
						</div>

						<svg width="19" height="19" viewBox="0 0 19 19" fill="#CCD1D9" xmlns="http://www.w3.org/2000/svg">
							<path d="M1 18.4H3.5C4.8 18.4 6 17.9 6.9 17L17.1999 6.7C18.6999 5.2 18.6999 2.7 17.1999 1.2C16.4999 0.4 15.4999 0 14.4999 0C13.4999 0 12.5 0.4 11.7 1.1L1.4 11.5C0.5 12.4 0 13.7 0 15V17.5C0 18 0.5 18.4 1 18.4ZM2 14.9C2 14.1 2.3 13.4 2.8 12.9L11 4.7L12.4 6C12.5999 6.2 12.9 6.3 13.0999 6.3C13.4 6.3 13.6 6.2 13.8 6C14.2 5.6 14.2 5 13.8 4.6L12.4 3.2L13.0999 2.5C13.4999 2.2 13.9999 2 14.4999 2C14.9999 2 15.5 2.2 15.8 2.6C16.5 3.3 16.5 4.6 15.8 5.3L5.5 15.6C5 16.1 4.2 16.4 3.5 16.4H2V14.9Z" fill="#CCD1D9" />
						</svg>

					</div>
					<hr className={styles.hr} />
					{/* <p>A few words about myself, a short biography, Literally in 2-3 lines.</p> */}
					<TonConnectButton className={styles.ton_btn} />
					<Address />
					{/* <Settings userFriendlyAddress={'UQCqvbAOk3AH7LemYeOIWh0va8gZH-63dY8iM538MUYhf_oa'} /> */}
				</div>
			</div>
		</>
	)
}

export function Others() {

	const manifestUrl = `${API_URL}/static/tonconnect-manifest.json`

	return (
		<>
			<div className={styles.Others}>

				<MyInfo />

				<div className={styles.Notif}>
					<li>Notification</li>
					<ConrolLabel />
				</div>
				<hr />
				<div className={styles.Notif}>
					<li>Help & Feedback</li>
					<img src="/Vector(1).svg" alt="" width={13} height={22} />
				</div>
				<div className={styles.Notif}>
					<li>Settings</li>
					<img src="/Vector(1).svg" alt="" width={13} height={22} />
				</div>
				<hr />
				<div className={styles.Notif}>
					<li>About Us</li>
					<img src="/Vector(1).svg" alt="" width={13} height={22} />
				</div>
				<div className={styles.Logout}>
					<li>Logout</li>
				</div>
				<BottomMenu />
			</div>
		</>
	)
}

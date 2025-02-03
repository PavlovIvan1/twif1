import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { API_URL } from '../config.js'
import { Loader } from '../Loading'
import styles from './RS.module.scss'

export function ReferalSystem() {

	
	const copyRef = useRef(null)

	const copyToClipboard = () => {
		const textToCopy = copyRef.current.innerText;
		navigator.clipboard.writeText(textToCopy)
      .then(() => {
        alert('Copied!');
      })
      .catch(err => {
        console.error('Ошибка при копировании текста: ', err);
      });
  };11

	const [userRef, setUserRef] = useState(null);
	const [loaading, setLoading] = useState(true)

	
	useEffect(() => {
		async function fetchUserRef() {
			setLoading(true);
		
			try {
				const response = await axios.post(`${API_URL}/users/ref`, { initData: window.Telegram.WebApp.initData });
				setUserRef(response.data);
			} catch (error) {
				console.error('Error fetching user data:', error);
				if (error.response) {
					console.error('Data:', error.response.data);
					console.error('Status:', error.response.status);
					console.error('Headers:', error.response.headers);
				}
			} finally {
				setTimeout(() => {
					setLoading(false);
				}, 1000);
			}
		}
		
		fetchUserRef();
	}, [])


	if (loaading) {
		return (
			<Loader />
		)
	}

	return (
			<div className={styles.ReferalSystem}>
				<div className={styles.ReferalSystem__title}><h3>ReferalSystem</h3>
				<li>Just a few sentences about the benefits of the referral program</li>
				</div>
				<div className={styles.ReferalSystem__link}>
					<div className={styles.ReferalSystem__textarea}>
						<span ref={copyRef} >{userRef.link}</span>
						<img src="/Copy.svg" alt="" onClick={copyToClipboard} className={styles.copy} />
					</div>
					<button className={styles.invite_btn}>Invite Friends</button>
				</div>
			</div>
	)	
}

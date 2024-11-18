import {useEffect, useRef, useState} from 'react';
import {Loader} from '../Loading';
import styles from './RS.module.scss';

export function ReferalSystem() {


	// const shareMessage = () => {
  //   const message = "✔🎟🎉✨";
    
	// 	const encodedMessage = encodeURIComponent(message);
  //   const url = `tg://msg_url?url=${encodedMessage}`;

  //   window.open(url, '_blank');
	// }

	
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
		fetch('http://188.245.187.190/api/users/ref', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ initData: window.Telegram.WebApp.initData })
			})
			.then(response => response.json())
			.then(data => {
				setUserRef(data)
			})
			.catch(error => {
        console.error('Error fetching user data:', error);
      })
			.finally(() => {
				setTimeout(() => {
					setLoading(false);
				}, 2500); // Задержка в 2 секунды
			}) 
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
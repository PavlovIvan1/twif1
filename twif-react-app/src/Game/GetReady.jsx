import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../config'
import styles from './Game.module.scss'

export function GetReady() {

	const getAttemptts = async () => {
    try {
      const response = await fetch(`${API_URL}/boosts/get_attempts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          initData: window.Telegram.WebApp.initData
        })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("DATA ATTEMPTS:", data);
      setHeart(data.attempts)
    } catch (err) {
      console.error("Err attempts", err);
    }
  };

	const navigate = useNavigate()
	const [score, setScore] = useState(10)
	const [heart, setHeart] = useState(getAttemptts())


	const OnClick = () => {
		if (heart <= 0) return;
		navigate('/game')
	}

	return  (
		<>
			<div className="getReady" style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
				height: '100vh',
				backgroundImage: 'url("/getE.png")',
				backgroundPosition: 'center'
			}}>
				<button className={styles.score} style={{ border: 'none', width: '95%', fontWeight: '400', fontSize: '20px'}} onClick={() => navigate('/information')}>Information</button>
				<br/>
				<div className="topPanel" style={{
					display: 'flex',
					justifyContent: 'space-between',
					width: '100%',
					alignItems: 'center',
					paddingLeft: '20px',
					paddingRight: '20px',
					boxSizing: 'border-box',
				}}>
					<img src="/l.svg" alt="" width={15} onClick={() => navigate('/')}/>
					<div className={styles.score}><img src="/2.png" alt=""/> {score}</div>

					<div className={styles.hearts} style={{marginLeft: '-70px'}}>
						{Array.from({length: heart}, (_, index) => (
							<svg width="22" height="18" viewBox="0 0 22 18" fill="none"
									 xmlns="http://www.w3.org/2000/svg" key={index}>
								<path className={styles.heart_tr}
											style={{fill: index < heart ? '#C12336' : '#13639A'}}
											d="M21.7494 6.1094C21.7011 7.69476 21.0432 9.2098 20.1338 10.4846C17.7335 13.8494 13.6149 16.4304 11.6752 17.4818H10.3073C8.27357 16.0385 5.46966 13.6431 3.21631 10.4846C2.30691 9.2098 1.649 7.69476 1.60071 6.1094C1.55782 4.70616 2.01229 3.29236 2.8577 2.19639C3.70312 1.10066 5.60513 0 5.60513 0H6.97298C7.3119 0 7.65855 0.0440638 8.00309 0.128207C9.54556 0.505093 11.0491 1.68497 11.6749 3.29916C12.301 1.68497 15.0092 0 15.0092 0H16.3771C16.6192 0 16.8571 0.0225007 17.0884 0.0686739C18.4162 0.335869 19.6469 1.10066 20.4926 2.19639C21.338 3.29236 21.7925 4.70616 21.7494 6.1094Z"/>
								<path className={styles.heart_tr}
											style={{fill: index < heart ? '#E23030' : '#13639A'}}
											d="M20.3815 6.1094C20.3332 7.69476 19.6753 9.2098 18.7659 10.4846C16.3656 13.8494 12.2471 16.4304 10.3073 17.4818C8.36781 16.4304 4.24925 13.8496 1.84871 10.4846C0.939078 9.2098 0.281168 7.69476 0.232885 6.1094C0.189993 4.70616 0.64446 3.29236 1.48988 2.19639C2.33553 1.10066 3.56627 0.335869 4.89404 0.0686739C5.12491 0.0222663 5.36327 0 5.60492 0C5.94384 0 6.29049 0.0440638 6.63503 0.128207C8.17749 0.505093 9.68106 1.68497 10.3069 3.29916C10.9327 1.68497 12.4362 0.505093 13.9789 0.128207C14.3235 0.0440638 14.6699 0 15.0088 0C15.2509 0 15.4888 0.0225007 15.7201 0.0686739C17.0479 0.335869 18.2787 1.10066 19.1243 2.19639C19.9697 3.29236 20.4242 4.70616 20.3811 6.1094H20.3815Z"/>
							</svg>
						))}
					</div>

				</div>


				<h1
					style={{fontFamily: 'Bevan', color: 'white', marginTop: '100px'}}>GET
					READY</h1>
				<img src="/Tramp.png" alt=""
						 style={{marginTop: '70px', marginBottom: '30px'}}/>
				<img src="/tap.png" alt="tap-tap" onClick={
					OnClick
				}/>
			</div>
		</>
	)
}
import { useEffect, useState } from 'react'
import { Loader } from '../Loading'
import { API_URL } from '../config'

export function Claim() {
	const [loading, setLoading] = useState(true);
	const [season, setSeason] = useState(null); 

	useEffect(() => {
		fetch(`${API_URL}/boosts/finished_season`)
			.then(response => response.json())
			.then(data => {
				console.log("finished_season", data)
				if (data.season) {
					setSeason(data.season);
				}
			})
			.catch(err => {
				console.error('Error fetching seasons:', err);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	const ClaimBtn = () => {
		fetch(`${API_URL}/boosts/claim`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				initData: window.Telegram.WebApp.initData
			})
		})
		.then(response => {
			return response.json();
		})
		.then(data => {
			console.log(data)
		})
		.catch(err => {
			console.error('Error fetching claim:', err);
		})
	}


	if (loading) {
		return <Loader />;
	}

	return (
		<>
			<div className="Claim">
				{season ? (
					<>
						<h1 style={{ fontFamily: 'Bevan', fontSize: '19px', color: 'white', letterSpacing: '2px', textAlign: 'center' }}>
							Season {season} is over, claim your tokens</span>
						</h1>
						<button
							style={{
								cursor: 'pointer',
								backgroundColor: 'white',
								borderRadius: '12px',
								width: '95%',
								color: '#51B3F6',
								height: '56px',
								border: 'none',
								fontFamily: 'Inter',
								fontSize: '17px',
								fontWeight: '500',
							}}
							onClick={ClaimBtn}
						>
							Claim
						</button>
					</>
				) : (
					<>
						<h1 style={{ fontFamily: 'Bevan', fontSize: '19px', color: 'white' }}>
							Season is not finished yet.
						</h1>
						<button
							style={{
								cursor: 'not-allowed',
								backgroundColor: 'white',
								borderRadius: '12px',
								width: '95%',
								color: '#51B3F6',
								height: '56px',
								border: 'none',
								fontFamily: 'Inter',
								fontSize: '17px',
								fontWeight: '500',
							}}
							disabled
						>
							Claim
						</button>
					</>
				)}
			</div>
		</>
	);
}

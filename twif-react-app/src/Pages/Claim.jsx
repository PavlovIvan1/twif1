import { useEffect, useState } from 'react'
import { Loader } from '../Loading'

export function Claim() {
	const [loading, setLoading] = useState(true);
	const [season, setSeason] = useState(null); 
	const [error, setError] = useState(null); 

	useEffect(() => {
		fetch(`http://188.245.187.190:4550/boosts/finished_season`)
			.then(response => {
				if (!response.ok) {
					throw new Error('No finished season');
				}
				return response.json();
			})
			.then(data => {
				setSeason(data.season);
			})
			.catch(err => {
				console.error('Error fetching data:', err);
				setError(err.message); 
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	const ClaimBtn = () => {
		fetch(`http://188.245.187.190:4550/boosts/claim`, {
			method: 'POST',
			"init_data": window.Telegram.WebAap.initData
		})
		.then(response => {
			return response.json();
		})
		.then(data => {
			console.log(data)
		})
		.catch(err => {
			console.error('Error fetching data:', err);
			setError(err.message);
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
						<h1 style={{ fontFamily: 'Bevan', fontSize: '19px', color: 'white' }}>
							Season is over, claim your tokens: <span style={{ color: '#51B3F6' }}>{season}</span>
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
								backgroundColor: '#ccc',
								borderRadius: '12px',
								width: '95%',
								color: '#666',
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

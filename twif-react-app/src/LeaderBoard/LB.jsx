import { useEffect, useState } from 'react'
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader'
import { API_URL } from '../config.js'
import styles from './LB.module.scss'

export function LeaderBoard__component({place, photo, name}) {
	return (
		<>
			<div className={styles.LeaderBoard__component}>
				<li>{place}</li>
				<img src={photo} alt="" className={styles.avatar}/>
				<p>{name}</p>
			</div>
		</>
	)
}

export function LeaderBoard() {

	// useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('http://94.198.217.245:5000/users/leaderboard?limit=5&offset=0');
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const result = await response.json();
  //       console.log(result);
  //     } catch (err) {
  //       console.error(err.message);
  //     }
  //   };

  //   fetchData();
  // }, []);

	const [leaderBoard, setLeaderBoard] = useState(null);
	const [loaading, setLoading] = useState(true)
	
	useEffect(() => {
		fetch(`${API_URL}/users/leaderboard?limit=5&offset=0`)
			.then(response => response.json())
			.then(data => {
				console.log(data.leaders)
				setLeaderBoard(data.leaders)
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
			<div className='loading'>
				{/* <ClipLoader
				color={"#FBB601"}
				size={150}
				aria-label="Loading Spinner"
				data-testid="loader"
		  	/> */}
				<ClimbingBoxLoader color='#FBB601' />
			</div>
		)
	}

	return (
		<div className={styles.lb}>
			<div className={styles.LeaderBoard}>
				<div className={styles.LeaderBoard__title}><h3>Leaderboard</h3></div>
				<div className={styles.LeaderBoard__list}>

					{leaderBoard.map((leader, index) => (
        	<div key={leader.id}>
        	  <LeaderBoard__component
							place={index += 1}
        	    photo={`${API_URL}/media/avatars/${leader.avatar}`} 
        	    name={leader.fullname} 
        	  />
        	  <hr />
        	</div>
     			))}

					{/* <LeaderBoard__component place={1} photo={"/Photo.png"} name={"Donald"}/>
					<hr />
					<LeaderBoard__component place={2} photo={"/Photo.png"} name={"Donald"}/>
					<hr />
					<LeaderBoard__component place={3} photo={"/Photo.png"} name={"Donald"}/>
					<hr />
					<LeaderBoard__component place={4} photo={"/Photo.png"} name={"Donald"}/>
					<hr />
					<LeaderBoard__component place={5} photo={"/Photo.png"} name={"Donald"}/> */}
				</div>
			</div>
		</div>
	)	
}
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useGlobalStore} from '../../../useGlobalStore';
import {Loader} from './Load';
import styles from './TR.module.scss';
import {API_URL} from '../../../config.js';


// export function TopRated__component({place, name, photo, people, stat}) {
	
// 	const navigate = useNavigate()

// 	return (
// 	<div className={styles.TopRated__component} onClick={navigate("/aboutparty")}>
// 		<div className={styles.l_info}>
// 			<li>{place}</li>
// 			<img src={photo} alt="" width={32} />
// 			<p>{name}</p>
// 		</div>
// 		<div className={styles.r_info}>
// 			<img src="/Union.svg" alt="" />
// 			<span>{people}</span>
// 			<img src={stat} alt="" />
// 		</div>
// 	</div>
// 	)
// }

// export function TopRated() {


// 	const [leaderBoard, setLeaderBoard] = useState(null);
	
// 	useEffect(() => {
// 		fetch('https://playcloud.pro/party/leaderboard?limit=5')
// 			.then(response => response.json())
// 			.then(data => {
// 				console.log(data)
// 				console.log(data.leaders.title)
// 				setLeaderBoard(data.leaders)
// 			})
// 			.catch(error => {
//         console.error('Error fetching user data:', error);
//       });
// 	}, [])


// 	if (!leaderBoard) {
// 		return (
// 			<div className="spinner"></div>
// 		)
// 	}


// 	return (
// 		<>
// 			<div className={styles.tr}>
// 			<div className={styles.TopRated}>
// 				<div className={styles.TopRated__title}><h3>Top ranking</h3></div>
// 				<div className={styles.TopRated__list}>

// 				{leaderBoard.map((leader, index) => (
//         	<div key={leader.id}>
//         	  <TopRated__component
// 							place={index += 1}
//         	    photo={`https://playcloud.pro/media/logos/${leader.logoURL}`} 
//         	    name={leader.title} 
// 							people={leader.quantity}
							
//         	  />
//         	  <hr />
//         	</div>
//      		))}

// 					{/* <TopRated__component place={1} name={"Name1"} photo={"/USA.png"} people={700} stat={"/up.svg"} />
// 					<hr />
// 					<TopRated__component place={2} name={"Name2"} photo={"/USA.png"} people={345} stat={"/bott.svg"} />
// 					<hr />
// 					<TopRated__component place={3} name={"Name3"} photo={"/USA.png"} people={237} stat={"/up.svg"} />
// 					<hr />
// 					<TopRated__component place={4} name={"Name4"} photo={"/USA.png"} people={121} stat={"/up.svg"} />
// 					<hr />
// 					<TopRated__component place={5} name={"Name5"} photo={"/USA.png"} people={119} stat={"/bott.svg"} /> */}
// 				</div>
// 			</div>
// 		</div>
// 		</>
// 	)
// }


export function TopRated__component({ place, name, photo, people, stat, partyId }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/aboutparty", { state: { partyId } });
  };

  const setIdp = useGlobalStore((state) => state.setIdp);
	const idp = useGlobalStore((state) => state.idp);

  setIdp(partyId)

  useEffect(() => {
    console.log("IDPPP::", idp)
  }, [idp])

  return (
    <div className={styles.TopRated__component} onClick={handleClick}>
      <div className={styles.l_info}>
        <li>{place}</li>
        <img src={photo} alt="" className={styles.avatar} />
        <p>{name}</p>
      </div>
      <div className={styles.r_info}>
        <img src="/Union.svg" alt="" />
        <span>{people}</span>
        <img src={stat} alt="" />
      </div>
    </div>
  );
}

export function TopRated() {
  const [leaderBoard, setLeaderBoard] = useState(null);
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    fetch(` ${API_URL}/party/leaderboard?limit=5`)
      .then(response => response.json())
      .then(data => {
        console.log("lb data", data);
        setLeaderBoard(data.leaders);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      })
      .finally(() => {
				setTimeout(() => {
					setLoading(false);
				}, 2500);
			}) 
  }, []);



  if (loading) {
		return (
			<Loader />
		)
	}


  // if (loading) {
  //   return (
  //     <>
  //       <Loader />
  //     </>
  //   )
  // }  // else if (!leaderBoard) {
  //   return (
  //     <div></div>
  //   )
  // }

  return (
    <div className={styles.tr}>
      <div className={styles.TopRated}>
        <div className={styles.TopRated__title}>
          <h3>Top ranking</h3>
        </div>
        <div className={styles.TopRated__list}>
          {leaderBoard.map((leader, index) => (
            <div key={leader.id}>
              <TopRated__component
                place={index + 1}
                partyId={leader.id} 
                photo={`https://playcloud.pro/media/logos/${leader.logoURL}`} 
                name={leader.title} 
                people={leader.quantity} 
              />
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


// export function TopRated() {
//   const [leaderBoard, setLeaderBoard] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = fetch('https://playcloud.pro/party/leaderboard?limit=5')
//       .then(response => response.json())
//       .then(data => {
//         console.log("lb data", data);
//         setLeaderBoard(data.leaders);
//       })
//       .catch(error => {
//         console.error('Error fetching user data:', error);
//       });

//     // Создаем таймер для минимальной задержки в 2 секунды
//     const delay = new Promise(resolve => setTimeout(resolve, 2000));

//     // Ожидаем завершения и данных, и таймера
//     Promise.all([fetchData, delay]).then(() => {
//       setIsLoading(false);
//     });
//   }, []);

//   return (
//     <div className={styles.tr}>
//       <div className={styles.TopRated}>
//         <div className={styles.TopRated__title}>
//           <h3>Top ranking</h3>
//         </div>
//         <div className={styles.TopRated__list}>
//           {isLoading ? (
//             <Loader />
//           ) : leaderBoard && leaderBoard.length > 0 ? (
//             leaderBoard.map((leader, index) => (
//               <div key={leader.id}>
//                 <TopRated__component
//                   place={index + 1}
//                   partyId={leader.id} 
//                   photo={`https://playcloud.pro/media/logos/${leader.logoURL}`} 
//                   name={leader.title} 
//                   people={leader.quantity} 
//                 />
//                 <hr />
//               </div>
//             ))
//           ) : (
//             <p>No data available</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../../../config.js'
import { useGlobalStore } from '../../../useGlobalStore'
import { Loader } from './Load'
import styles from './TR.module.scss'

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
                photo={`${API_URL}/media/logos/${leader.logoURL}`} 
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
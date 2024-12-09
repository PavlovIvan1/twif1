import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../../../config.js'
import { useGlobalStore } from '../../../useGlobalStore'
import { Loader } from './Load'
import styles from './TR.module.scss'

export function TopRated__component({ place, name, photo, people, partyId }) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (partyId) {
      navigate("/aboutparty", { state: { partyId } });
    } else {
      console.error('partyId is undefined');
    }
  };

  const setIdp = useGlobalStore((state) => state.setIdp);

  useEffect(() => {
    setIdp(partyId);
  }, [partyId]);

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
      </div>
    </div>
  );
}

export function TopRated() {
  const [leaderBoard, setLeaderBoard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/party/leaderboard?limit=5`)
      .then(response => response.json())
      .then(data => {
        if (data && Array.isArray(data.leaders)) {
          setLeaderBoard(data.leaders);
        } else {
          console.error('Unexpected data format', data);
          setLeaderBoard([]); // Устанавливаем пустой массив
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        setLeaderBoard([]); // Устанавливаем пустой массив в случае ошибки
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!leaderBoard || leaderBoard.length === 0) {
    return <div>No data available</div>;
  }

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

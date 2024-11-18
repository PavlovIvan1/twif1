import React, {useCallback, useEffect, useState} from 'react';
import styles from '../Game.module.scss';


const Firework = React.memo(({ currentRound, setSpeed, speed, gameOver, rocketPosition, setFireworkActive, isFireworkActive, setBoostTimer, setIsInvincible, setScore, restarted }) => {
	const [fireworks, setFireworks] = useState([]);
	const [fireworkTimer, setFireworkTimer] = useState(null);
	const [nextFireworkRound, setNextFireworkRound] = useState(1);

	const activateFirework = () => {
    setFireworkActive(true);
    setSpeed(prev => prev * 2);
    setScore(prev => prev); // Очки будут удваиваться при сборе монет
    setBoostTimer(15);

    // Установить таймер для деактивации буста
    const timer = setTimeout(() => {
      setFireworkActive(false);
      setSpeed(7); // Вернуть скорость к норме
    }, 15000); // 15 секунд

    setFireworkTimer(timer);
  };

  const checkForFirework = () => {
    if (currentRound == nextFireworkRound && !isFireworkActive) {
      const newFirework = {
          id: Date.now(),
          left: Math.random() * 10000 + 900,
          bottom: Math.random() * 350 + 100,
      };
      setFireworks(prev => [...prev, newFirework]);

      setNextFireworkRound(prev => prev + 2);
    }
  };

  const checkCollisionWithFirework = useCallback((rocket, firework) => {
    const rocketLeft = 50;
    const rocketRight = rocketLeft + 50;
    const rocketBottom = rocket;
    const rocketTop = rocketBottom + 50;

    const fireworkLeft = firework.left;
    const fireworkRight = fireworkLeft + 50; // Предполагаемый размер буста
    const fireworkBottom = firework.bottom;
    const fireworkTop = fireworkBottom + 50;

    return (
      rocketRight > fireworkLeft &&
      rocketLeft < fireworkRight &&
      rocketTop > fireworkBottom &&
      rocketBottom < fireworkTop
    );
  }, []);

  useEffect(() => {
    if (gameOver) {
      setFireworks([])
    };
    if (restarted) {
      setFireworks([])
    }

    console.log("Fire", {currentRound, nextFireworkRound})

    setFireworks((prevFireworks) =>
			prevFireworks
				.map((firework) => ({
					...firework,
					left: firework.left - speed,
				}))
				.filter((firework) => {
					if (checkCollisionWithFirework(rocketPosition, firework)) {
						activateFirework();
						return false; // Удаляем буст после сбора
					}
					return firework.left + 50 > 0; // Убираем буст, если он вышел за экран
				})
		);

    checkForFirework();
  }, [gameOver, speed, rocketPosition, currentRound, isFireworkActive]);

  return (
    <>
      {/* {canisters.map((canister) => (
        <div
          key={canister.id}
          className={styles.canister}
          style={{
            left: `${canister.left}px`,
            bottom: `${canister.bottom}px`,
          }}
        >
          <img src="/canister.png" alt="Canister" />
        </div>
      ))} */}

			{/* Бусты */}
			{fireworks.map((firework) => (
        <div
          key={firework.id}
          className={styles.firework}
          style={{
            left: `${firework.left}px`,
            bottom: `${firework.bottom}px`,
          }}
        >
          <img src="/OBJECT.png" alt="Firework" />
        </div>
      ))}
    </>
  );
});

export default Firework;

// import styles from '../Game.module.scss'
//
//
// const Firework = React.memo(({ currentRound, setSpeed, speed, gameOver, rocketPosition, setFireworkActive, isFireworkActive, setBoostTimer, setIsInvincible, setScore, restarted }) => {
// 	const [fireworks, setFireworks] = useState([]);
// 	const [fireworkTimer, setFireworkTimer] = useState(null);
// 	const [nextFireworkRound, setNextFireworkRound] = useState(1);
//
// 	const activateFirework = () => {
//     setFireworkActive(true);
//     setSpeed(prev => prev * 2);
//     setScore(prev => prev); // Очки будут удваиваться при сборе монет
//     setBoostTimer(15);
//
//     // Установить таймер для деактивации буста
//     const timer = setTimeout(() => {
//       setFireworkActive(false);
//       setSpeed(7); // Вернуть скорость к норме
//     }, 15000); // 15 секунд
//
//     setFireworkTimer(timer);
//   };
//
//   const checkForFirework = () => {
//     if (currentRound == nextFireworkRound && !isFireworkActive) {
//       const newFirework = {
//           id: Date.now(),
//           left: Math.random() * 10000 + 900,
//           bottom: Math.random() * 350 + 100,
//       };
//       setFireworks(prev => [...prev, newFirework]);
//
//       setNextFireworkRound(prev => prev + 2);
//     }
//   };
//
//   const checkCollisionWithFirework = useCallback((rocket, firework) => {
//     const rocketLeft = 50;
//     const rocketRight = rocketLeft + 50;
//     const rocketBottom = rocket;
//     const rocketTop = rocketBottom + 50;
//
//     const fireworkLeft = firework.left;
//     const fireworkRight = fireworkLeft + 50; // Предполагаемый размер буста
//     const fireworkBottom = firework.bottom;
//     const fireworkTop = fireworkBottom + 50;
//
//     return (
//       rocketRight > fireworkLeft &&
//       rocketLeft < fireworkRight &&
//       rocketTop > fireworkBottom &&
//       rocketBottom < fireworkTop
//     );
//   }, []);
//
//   useEffect(() => {
//     if (gameOver) {
//       setFireworks([])
//     };
//     if (restarted) {
//       setFireworks([])
//     }
//
//     console.log("Fire", {currentRound, nextFireworkRound})
//
//     setFireworks((prevFireworks) =>
// 			prevFireworks
// 				.map((firework) => ({
// 					...firework,
// 					left: firework.left - speed,
// 				}))
// 				.filter((firework) => {
// 					if (checkCollisionWithFirework(rocketPosition, firework)) {
// 						activateFirework();
// 						return false; // Удаляем буст после сбора
// 					}
// 					return firework.left + 50 > 0; // Убираем буст, если он вышел за экран
// 				})
// 		);
//
//     checkForFirework();
//   }, [gameOver, speed, rocketPosition, currentRound, isFireworkActive]);
//
//   return (
//     <>
//       {/* {canisters.map((canister) => (
//         <div
//           key={canister.id}
//           className={styles.canister}
//           style={{
//             left: `${canister.left}px`,
//             bottom: `${canister.bottom}px`,
//           }}
//         >
//           <img src="/canister.png" alt="Canister" />
//         </div>
//       ))} */}
//
// 			{/* Бусты */}
// 			{fireworks.map((firework) => (
//         <div
//           key={firework.id}
//           className={styles.firework}
//           style={{
//             left: `${firework.left}px`,
//             bottom: `${firework.bottom}px`,
//           }}
//         >
//           <img src="/OBJECT.png" alt="Firework" />
//         </div>
//       ))}
//     </>
//   );
// });
//
// export default Firework;
// import React, {useCallback, useEffect, useState} from 'react';
// import styles from '../Game.module.scss';
//
// const Firework = React.memo(({ currentRound, setSpeed, speed, gameOver, rocketPosition, setFireworkActive, isFireworkActive, setBoostTimer, setIsInvincible, setScore, restarted }) => {
//   const [fireworks, setFireworks] = useState([]);
//   const [fireworkTimer, setFireworkTimer] = useState(null);
//   const [nextFireworkRound, setNextFireworkRound] = useState(1);
//   const [fireworkSpawnedInRound, setFireworkSpawnedInRound] = useState(false);
//
//   const activateFirework = () => {
//     setFireworkActive(true);
//     setSpeed(prev => prev * 2);
//     setScore(prev => prev); // Очки будут удваиваться при сборе монет
//     setBoostTimer(15);
//
//     // Установить таймер для деактивации буста
//     const timer = setTimeout(() => {
//       setFireworkActive(false);
//       setSpeed(7); // Вернуть скорость к норме
//     }, 15000); // 15 секунд
//
//     setFireworkTimer(timer);
//   };
//
//   const checkForFirework = () => {
//     if (currentRound === nextFireworkRound && !isFireworkActive && !fireworkSpawnedInRound) {
//       const newFirework = {
//         id: Date.now(),
//         left: Math.random() * 10000 + 900,
//         bottom: Math.random() * 350 + 100,
//       };
//       setFireworks(prev => [...prev, newFirework]);
//
//       setNextFireworkRound(prev => prev + 2);
//       setFireworkSpawnedInRound(true);
//     }
//   };
//
//   const checkCollisionWithFirework = useCallback((rocket, firework) => {
//     const rocketLeft = 50;
//     const rocketRight = rocketLeft + 50;
//     const rocketBottom = rocket;
//     const rocketTop = rocketBottom + 50;
//
//     const fireworkLeft = firework.left;
//     const fireworkRight = fireworkLeft + 50; // Предполагаемый размер буста
//     const fireworkBottom = firework.bottom;
//     const fireworkTop = fireworkBottom + 50;
//
//     return (
//       rocketRight > fireworkLeft &&
//       rocketLeft < fireworkRight &&
//       rocketTop > fireworkBottom &&
//       rocketBottom < fireworkTop
//     );
//   }, []);
//
//   useEffect(() => {
//     if (gameOver || restarted) {
//       setFireworks([]);
//       setFireworkSpawnedInRound(false);
//     }
//
//     setFireworks((prevFireworks) =>
//       prevFireworks
//         .map((firework) => ({
//           ...firework,
//           left: firework.left - speed,
//         }))
//         .filter((firework) => {
//           if (checkCollisionWithFirework(rocketPosition, firework)) {
//             activateFirework();
//             return false; // Удаляем буст после сбора
//           }
//           return firework.left + 50 > 0; // Убираем буст, если он вышел за экран
//         })
//     );
//
//     if (currentRound !== nextFireworkRound) {
//       setFireworkSpawnedInRound(false); // Сбрасываем флаг при переходе к следующему раунду
//     }
//
//     checkForFirework();
//   }, [gameOver, speed, rocketPosition, currentRound, isFireworkActive, restarted, nextFireworkRound]);
//
//   return (
//     <>
//       {fireworks.map((firework) => (
//         <div
//           key={firework.id}
//           className={styles.firework}
//           style={{
//             left: `${firework.left}px`,
//             bottom: `${firework.bottom}px`,
//           }}
//         >
//           <img src="/OBJECT.png" alt="Firework" />
//         </div>
//       ))}
//     </>
//   );
// });
//
// export default Firework;

// import React, {useCallback, useEffect, useState} from 'react';
// import styles from '../Game.module.scss';
//
// const Firework = React.memo(({ currentRound, setSpeed, speed, gameOver, rocketPosition, setFireworkActive, isFireworkActive, setBoostTimer, setIsInvincible, setScore, restarted }) => {
//   const [fireworks, setFireworks] = useState([]);
//   const [fireworkTimer, setFireworkTimer] = useState(null);
//   const [nextFireworkRound, setNextFireworkRound] = useState(1);
//
//   const activateFirework = () => {
//     setFireworkActive(true);
//     setSpeed(prev => prev * 2);
//     setScore(prev => prev); // Очки будут удваиваться при сборе монет
//     setBoostTimer(15);
//
//     const timer = setTimeout(() => {
//       setFireworkActive(false);
//       setSpeed(7); // Вернуть скорость к норме
//     }, 15000); // 15 секунд
//
//     setFireworkTimer(timer);
//   };
//
//   const checkForFirework = () => {
//     if (currentRound === nextFireworkRound && !isFireworkActive) {
//       const newFirework = {
//         id: Date.now(),
//         left: Math.random() * 10000 + 900,
//         bottom: Math.random() * 350 + 100,
//       };
//       setFireworks(prev => [...prev, newFirework]);
//       setNextFireworkRound(prev => prev + 2);
//     }
//   };
//
//   const checkCollisionWithFirework = useCallback((rocket, firework) => {
//     const rocketLeft = 50;
//     const rocketRight = rocketLeft + 50;
//     const rocketBottom = rocket;
//     const rocketTop = rocketBottom + 50;
//
//     const fireworkLeft = firework.left;
//     const fireworkRight = fireworkLeft + 50; // Предполагаемый размер буста
//     const fireworkBottom = firework.bottom;
//     const fireworkTop = fireworkBottom + 50;
//
//     return (
//       rocketRight > fireworkLeft &&
//       rocketLeft < fireworkRight &&
//       rocketTop > fireworkBottom &&
//       rocketBottom < fireworkTop
//     );
//   }, []);
//
//   useEffect(() => {
//     if (gameOver || restarted) {
//       setFireworks([]);
//     }
//
//     // Обновляем позиции фейерверков и проверяем столкновение
//     setFireworks((prevFireworks) =>
//       prevFireworks
//         .map((firework) => ({
//           ...firework,
//           left: firework.left - speed,
//         }))
//         .filter((firework) => {
//           if (checkCollisionWithFirework(rocketPosition, firework)) {
//             activateFirework();
//             return false; // Удаляем буст после сбора
//           }
//           return firework.left + 50 > 0; // Убираем буст, если он вышел за экран
//         })
//     );
//   }, [gameOver, speed, rocketPosition, isFireworkActive, restarted]);
//
//   useEffect(() => {
//     // Проверка на необходимость появления нового фейерверка только при изменении текущего раунда
//     if (currentRound === nextFireworkRound) {
//       checkForFirework();
//     }
//   }, [currentRound, nextFireworkRound]);
//
//   return (
//     <>
//       {fireworks.map((firework) => (
//         <div
//           key={firework.id}
//           className={styles.firework}
//           style={{
//             left: `${firework.left}px`,
//             bottom: `${firework.bottom}px`,
//           }}
//         >
//           <img src="/OBJECT.png" alt="Firework" />
//         </div>
//       ))}
//     </>
//   );
// });
//
// export default Firework;

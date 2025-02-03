// import React, { useCallback, useEffect, useState } from 'react'
// import styles from '../Game.module.scss'

// const Canister = React.memo(({ currentRound, isCanisterActive, setIsCanisterActive, setBoostTimer, speed, setCanisters, rocketPosition }) => {
//   const [canisters, setCanistersState] = useState([]);
//   const [canisterCreatedThisRound, setCanisterCreatedThisRound] = useState(false);
//   const [canisterTimer, setCanisterTimer] = useState(null);

//   const activateCanister = useCallback(() => {
//     setIsCanisterActive(true);
//     setBoostTimer(15); 

//     // Установить таймер для деактивации буста
//     const timer = setTimeout(() => {
//       setIsCanisterActive(false); // Деактивировать неуязвимость
//     }, 15000); // 15 секунд

//     setCanisterTimer(timer);
//   }, []);

//   const checkForCanister = useCallback(() => {
//     if (!isCanisterActive && !canisterCreatedThisRound) {
//       const newCanister = {
//         id: Date.now(),
//         left: 500,
//         bottom: Math.random() * 350 + 100,
//       };
//       setCanistersState((prev) => [...prev, newCanister]);
//       setCanisterCreatedThisRound(true);
//     }
//   }, []);

//   const checkCollisionWithCanister = useCallback((rocket, canister) => {
//     const rocketLeft = 50;
//     const rocketRight = rocketLeft + 50;
//     const rocketBottom = rocket;
//     const rocketTop = rocketBottom + 50;

//     const canisterLeft = canister.left;
//     const canisterRight = canisterLeft + 50; // Предполагаемый размер канистры
//     const canisterBottom = canister.bottom;
//     const canisterTop = canisterBottom + 50;

//     return (
//       rocketRight > canisterLeft &&
//       rocketLeft < canisterRight &&
//       rocketTop > canisterBottom &&
//       rocketBottom < canisterTop
//     );
//   }, []);

//   useEffect(() => {

//     setCanisters((prevCanisters) =>
//       prevCanisters
//         .map((canister) => ({
//           ...canister,
//           left: canister.left - speed,
//         }))
//         .filter((canister) => {
//           if (checkCollisionWithCanister(rocketPosition, canister)) {
//             activateCanister();
//             return false; // Удаляем канистру после сбора
//           }
//           return canister.left + 50 > 0; // Убираем канистру, если она вышла за экран
//         })
//     );

// 		checkForCanister();

//   }, [currentRound, isCanisterActive, speed, rocketPosition]);

//   return (
//     <>
//       {canisters.map((canister) => (
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
//       ))}
//     </>
//   );
// });

// export default Canister;

import React, { useCallback, useEffect, useState } from 'react'
import styles from '../Game.module.scss'


const Canister = React.memo(({ currentRound, setSpeed, speed, gameOver, rocketPosition, setCanistersActive, isCanistersActive, setBoostTimer, setIsInvincible, restarted }) => {
  const [canisters, setCanisters] = useState([]);
  const [canisterTimer, setCanisterTimer] = useState(null);
  const [nextCanistersRound, setNextCanistersRound] = useState(1);

  const activateCanister = useCallback( () => {
    setIsInvincible(true);
    setCanistersActive(true);
    setBoostTimer(15); 
    
    const timer = setTimeout(() => {
      setCanistersActive(false);
      setSpeed(6);
    }, 15000);

    setCanisterTimer(timer);
  }, []);

  const checkForCanister = () => {
    if (currentRound === nextCanistersRound && !isCanistersActive) {

      const newCanister = {
        id: Date.now(),
        left: Math.random() * 8000 + 1500,
        bottom: Math.random() * 350 + 100,
      };
      setCanisters(prev => [...prev, newCanister]);

      setNextCanistersRound(prev => prev + 2);
    }
  };

  const checkCollisionWithCanister = useCallback( (rocket, canister) => {
    const rocketLeft = 50;
    const rocketRight = rocketLeft + 50;
    const rocketBottom = rocket;
    const rocketTop = rocketBottom + 50;

    const canisterLeft = canister.left;
    const canisterRight = canisterLeft + 50;
    const canisterBottom = canister.bottom;
    const canisterTop = canisterBottom + 50;

    return (
      rocketRight > canisterLeft &&
      rocketLeft < canisterRight &&
      rocketTop > canisterBottom &&
      rocketBottom < canisterTop
    );
  }, []);

  useEffect(() => {
    if (gameOver) {
      setCanisters([])
    };
    if (restarted) {
      setCanisters([])
    }

    console.log("Canist", {currentRound, nextCanistersRound})

    setCanisters((prevCanisters) =>
      prevCanisters
        .map((canister) => ({
          ...canister,
          left: canister.left - speed,
        }))
        .filter((canister) => {
          if (checkCollisionWithCanister(rocketPosition, canister)) {
            activateCanister();
            return false;
          }
          return canister.left + 50 > 0;
        })
    );

    checkForCanister();
  }, [gameOver, speed, rocketPosition, currentRound, isCanistersActive]);

  return (
    <>
      {canisters.map((canister) => (
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
      ))}
    </>
  );
});

export default Canister;


// import React, { useCallback, useEffect, useState } from 'react'
// import styles from '../Game.module.scss'

// const Canister = React.memo(({ currentRound, setSpeed, speed, gameOver, rocketPosition, setCanistersActive, isCanistersActive, setBoostTimer, setIsInvincible }) => {
//   const [canisters, setCanisters] = useState([]);
//   const [canisterTimer, setCanisterTimer] = useState(null);
//   const [nextCanistersRound, setNextCanistersRound] = useState(1);
//   const [canisterSpawnedInRound, setCanisterSpawnedInRound] = useState(false); // Новое состояние для отслеживания спавна в раунде

//   const activateCanister = useCallback(() => {
//     setIsInvincible(true);
//     setCanistersActive(true);
//     setBoostTimer(15);

//     const timer = setTimeout(() => {
//       setCanistersActive(false);
//       setSpeed(6);
//     }, 15000);

//     setCanisterTimer(timer);
//   }, []);

//   const checkForCanister = useCallback(() => {
//     if (currentRound === nextCanistersRound && !isCanistersActive && !canisterSpawnedInRound) {
//       const newCanister = {
//         id: Date.now(),
//         left: Math.random() * 8000 + 1500,
//         bottom: Math.random() * 350 + 100,
//       };
//       setCanisters(prev => [...prev, newCanister]);

//       setNextCanistersRound(prev => prev + 2);
//       setCanisterSpawnedInRound(true); // Устанавливаем, что канистра появилась в текущем раунде
//     }
//   }, [currentRound, isCanistersActive, nextCanistersRound, canisterSpawnedInRound]);

//   const checkCollisionWithCanister = useCallback((rocket, canister) => {
//     const rocketLeft = 50;
//     const rocketRight = rocketLeft + 50;
//     const rocketBottom = rocket;
//     const rocketTop = rocketBottom + 50;

//     const canisterLeft = canister.left;
//     const canisterRight = canisterLeft + 50;
//     const canisterBottom = canister.bottom;
//     const canisterTop = canisterBottom + 50;

//     return (
//       rocketRight > canisterLeft &&
//       rocketLeft < canisterRight &&
//       rocketTop > canisterBottom &&
//       rocketBottom < canisterTop
//     );
//   }, []);

//   // Этот useEffect будет срабатывать при изменении раунда
//   useEffect(() => {
//     if (gameOver) return;

//     // Устанавливаем, что канистра еще не появлялась в новом раунде
//     setCanisterSpawnedInRound(false);
//     checkForCanister();
//   }, [currentRound, gameOver, checkForCanister]);

//   useEffect(() => {
//     if (gameOver) return;
//     console.log("Canist", {currentRound, nextCanistersRound})

//     setCanisters((prevCanisters) =>
//       prevCanisters
//         .map((canister) => ({
//           ...canister,
//           left: canister.left - speed,
//         }))
//         .filter((canister) => {
//           if (checkCollisionWithCanister(rocketPosition, canister)) {
//             activateCanister();
//             return false;
//           }
//           return canister.left + 50 > 0;
//         })
//     );
//   }, [gameOver, speed, rocketPosition, activateCanister, checkCollisionWithCanister]);

//   return (
//     <>
//       {canisters.map((canister) => (
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
//       ))}
//     </>
//   );
// });

// export default Canister;
//ВОТВОТ
// import React, { useEffect, useState } from 'react'
// import styles from '../Game.module.scss'

// const Canister = ({ currentRound, setSpeed, speed, gameOver, rocketPosition, setCanistersActive, isCanistersActive, setBoostTimer, setIsInvincible }) => {
//   const [canisters, setCanisters] = useState([]);
//   const [canisterTimer, setCanisterTimer] = useState(null);
//   const [nextCanistersRound, setNextCanistersRound] = useState(1);
//   const [canisterAddedThisRound, setCanisterAddedThisRound] = useState(false);

//   const activateCanister = () => {
//     setIsInvincible(true);
//     setCanistersActive(true);
//     setBoostTimer(15);

//     const timer = setTimeout(() => {
//       setCanistersActive(false);
//       setSpeed(6);
//       setIsInvincible(false);
//     }, 15000);

//     setCanisterTimer(timer);
//   };

//   const checkForCanister = () => {
//     console.log("Checking for canister:", { currentRound, nextCanistersRound, isCanistersActive, canisterAddedThisRound });
    
//     if (currentRound === nextCanistersRound && !isCanistersActive && !canisterAddedThisRound) {
//       const newCanister = {
//         id: Date.now(),
//         left: Math.random() * 8000 + 1500,
//         bottom: Math.random() * 350 + 100,
//       };
//       setCanisters((prev) => [...prev, newCanister]);
//       setNextCanistersRound((prev) => prev + 2); // Следующий раунд через 2
//       setCanisterAddedThisRound(true); // Канистра добавлена в этом раунде
//     }
//   };

//   const checkCollisionWithCanister = (rocket, canister) => {
//     const rocketLeft = 50;
//     const rocketRight = rocketLeft + 50;
//     const rocketBottom = rocket;
//     const rocketTop = rocketBottom + 50;

//     const canisterLeft = canister.left;
//     const canisterRight = canisterLeft + 50;
//     const canisterBottom = canister.bottom;
//     const canisterTop = canisterBottom + 50;

//     return (
//       rocketRight > canisterLeft &&
//       rocketLeft < canisterRight &&
//       rocketTop > canisterBottom &&
//       rocketBottom < canisterTop
//     );
//   };

//   useEffect(() => {
//     if (gameOver) return;

//     // Проверяем, добавляем ли канистру, и сбрасываем флаг в начале каждого нового раунда
//     if (currentRound !== nextCanistersRound - 2) {
//       setCanisterAddedThisRound(false);
//     }
    
//     checkForCanister();
//   }, [currentRound, gameOver]);

//   useEffect(() => {
//     if (gameOver) return;

//     setCanisters((prevCanisters) =>
//       prevCanisters
//         .map((canister) => ({
//           ...canister,
//           left: canister.left - speed,
//         }))
//         .filter((canister) => {
//           if (checkCollisionWithCanister(rocketPosition, canister)) {
//             activateCanister();
//             return false;
//           }
//           return canister.left + 50 > 0;
//         })
//     );
//   }, [gameOver, speed, rocketPosition]);

//   return (
//     <>
//       {canisters.map((canister) => (
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
//       ))}
//     </>
//   );
// };

// export default Canister;

// import React, { useCallback, useEffect, useState } from 'react'
// import styles from '../Game.module.scss'

// const Canister = ({ currentRound, setSpeed, speed, gameOver, rocketPosition, setCanistersActive, isCanistersActive, setBoostTimer, setIsInvincible }) => {
//   const [canisters, setCanisters] = useState([]);
//   const [nextCanistersRound, setNextCanistersRound] = useState(1);
//   const [canisterAddedThisRound, setCanisterAddedThisRound] = useState(false);

//   const activateCanister = useCallback(() => {
//     if (!isCanistersActive) {
//       console.log("Activating canister!");
//       setIsInvincible(true);
//       setCanistersActive(true);
//       setBoostTimer(15);
//       setSpeed((prevSpeed) => prevSpeed * 2);

//       setTimeout(() => {
//         setCanistersActive(false);
//         setIsInvincible(false);
//         setSpeed(6);
//       }, 15000);
//     }
//   }, [isCanistersActive, setCanistersActive, setBoostTimer, setIsInvincible, setSpeed]);

//   const checkForCanister = () => {
//     // Добавляем канистру в каждом 2 раунде
//     if (currentRound === nextCanistersRound && !isCanistersActive && !canisterAddedThisRound) {
//       const newCanister = {
//         id: Date.now(),
//         left: Math.random() * 8000 + 1500,
//         bottom: Math.random() * 350 + 100,
//       };
//       setCanisters((prev) => [...prev, newCanister]);
//       setNextCanistersRound((prev) => prev + 2);
//       setCanisterAddedThisRound(true);
//       console.log("Added canister for round:", currentRound);
//     }
//   };

//   const checkCollisionWithCanister = (rocket, canister) => {
//     const rocketLeft = 50;
//     const rocketRight = rocketLeft + 50;
//     const rocketBottom = rocket;
//     const rocketTop = rocketBottom + 50;

//     const canisterLeft = canister.left;
//     const canisterRight = canisterLeft + 50;
//     const canisterBottom = canister.bottom;
//     const canisterTop = canisterBottom + 50;

//     return (
//       rocketRight > canisterLeft &&
//       rocketLeft < canisterRight &&
//       rocketTop > canisterBottom &&
//       rocketBottom < canisterTop
//     );
//   };

//   useEffect(() => {
//     if (gameOver) return;

//     // Сбрасываем флаг в начале нового раунда
//     if (canisterAddedThisRound && currentRound !== nextCanistersRound - 2) {
//       setCanisterAddedThisRound(false);
//     }

//     checkForCanister();
//   }, [currentRound, gameOver, canisterAddedThisRound, nextCanistersRound]);

//   useEffect(() => {
//     if (gameOver) return;

//     setCanisters((prevCanisters) =>
//       prevCanisters
//         .map((canister) => ({
//           ...canister,
//           left: canister.left - speed,
//         }))
//         .filter((canister) => {
//           if (checkCollisionWithCanister(rocketPosition, canister)) {
//             activateCanister();
//             return false;
//           }
//           return canister.left + 50 > 0;
//         })
//     );
//   }, [gameOver, speed, rocketPosition, activateCanister]);

//   return (
//     <>
//       {canisters.map((canister) => (
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
//       ))}
//     </>
//   );
// };

// export default Canister;

// import React, { useCallback, useEffect, useState } from 'react'
// import styles from '../Game.module.scss'

// const Canister = ({ currentRound, setSpeed, speed, gameOver, rocketPosition, setCanistersActive, isCanistersActive, setBoostTimer, setIsInvincible }) => {
//   const [canisters, setCanisters] = useState([]);
//   const [nextCanistersRound, setNextCanistersRound] = useState(1);
//   const [canisterAddedThisRound, setCanisterAddedThisRound] = useState(false);

//   const activateCanister = useCallback(() => {
//     if (!isCanistersActive) {
//       console.log("Activating canister boost at round:", currentRound);
//       setIsInvincible(true);
//       setCanistersActive(true);
//       setBoostTimer(15);
//       setSpeed((prevSpeed) => prevSpeed * 2);

//       setTimeout(() => {
//         setCanistersActive(false);
//         setIsInvincible(false);
//         setSpeed(6);
//         console.log("Canister boost ended at round:", currentRound);
//       }, 15000);
//     }
//   }, [isCanistersActive, setCanistersActive, setBoostTimer, setIsInvincible, setSpeed, currentRound]);

//   const checkForCanister = () => {
//     if (currentRound === nextCanistersRound && !isCanistersActive) {
//       const newCanister = {
//         id: Date.now(),
//         left: Math.random() * 8000 + 1500,
//         bottom: Math.random() * 350 + 100,
//       };
//       setCanisters((prev) => [...prev, newCanister]);
//       setNextCanistersRound((prev) => prev + 2);
//       setCanisterAddedThisRound(true);
//       console.log("Added new canister at round:", currentRound);
//     }
//   };

//   const checkCollisionWithCanister = (rocket, canister) => {
//     const rocketLeft = 50;
//     const rocketRight = rocketLeft + 50;
//     const rocketBottom = rocket;
//     const rocketTop = rocketBottom + 50;

//     const canisterLeft = canister.left;
//     const canisterRight = canisterLeft + 50;
//     const canisterBottom = canister.bottom;
//     const canisterTop = canisterBottom + 50;

//     return (
//       rocketRight > canisterLeft &&
//       rocketLeft < canisterRight &&
//       rocketTop > canisterBottom &&
//       rocketBottom < canisterTop
//     );
//   };

//   useEffect(() => {
//     if (gameOver) return;
  
//     checkForCanister();
//   }, [currentRound, gameOver, canisterAddedThisRound, nextCanistersRound]);
  

//   useEffect(() => {
//     if (gameOver) return;

//     console.log("Canister", {currentRound, nextCanistersRound});
    
//     if (currentRound !== nextCanistersRound) return;

//     setCanisters((prevCanisters) =>
//       prevCanisters
//         .map((canister) => ({
//           ...canister,
//           left: canister.left - speed,
//         }))
//         .filter((canister) => {
//           if (checkCollisionWithCanister(rocketPosition, canister)) {
//             console.log("Rocket collided with canister at position:", canister);
//             activateCanister();
//             return false;
//           }
//           return canister.left + 50 > 0;
//         })
//     );
//   }, [gameOver, speed, rocketPosition, activateCanister]);

//   return (
//     <>
//       {canisters.map((canister) => (
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
//       ))}
//     </>
//   );
// };

// export default Canister;

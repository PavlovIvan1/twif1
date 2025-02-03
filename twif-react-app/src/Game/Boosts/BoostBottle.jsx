import React, { useCallback, useEffect, useState } from 'react'
import styles from '../Game.module.scss'


const Bottle = React.memo(({ currentRound, setSpeed, speed, gameOver, rocketPosition, setBottleActive, isBottleActive, setBoostTimer, setIsInvincible, setScore, restarted }) => {
	const [bottles, setBottles] = useState([]);
	const [bottleTimer, setBottleTimer] = useState(null);
	const [nextBottleRound, setNextBottleRound] = useState(2);

	const activateBottle = () => {
    setIsInvincible(true);
    setBottleActive(true);
    setSpeed(prev => prev / 2);
    setBoostTimer(15); 

    // Установить таймер для деактивации буста
    const timer = setTimeout(() => {
        setBottleActive(false); // Деактивировать неуязвимость
        setSpeed(6);
    }, 15000); // 15 секунд

    setBottleTimer(timer);
  };

  const checkForBottle = () => {
    if (currentRound == nextBottleRound && !isBottleActive) {
      const newBottle = {
          id: Date.now(),
          left: Math.random() * 5000 + 1800,
          bottom: Math.random() * 350 + 100,
      };
      setBottles(prev => [...prev, newBottle]);

      setNextBottleRound(prev => prev + 2);
    }
  };

  const checkCollisionWithBottle = useCallback((rocket, bottle) => {
    const rocketLeft = 50;
    const rocketRight = rocketLeft + 50;
    const rocketBottom = rocket;
    const rocketTop = rocketBottom + 50;

    const canisterLeft = bottle.left;
    const canisterRight = canisterLeft + 50; // Предполагаемый размер канистры
    const canisterBottom = bottle.bottom;
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
      setBottles([])
    };
    if (restarted) {
      setBottles([])
    }

    console.log("Bottle", {currentRound, nextBottleRound})

    setBottles((prevBottles) =>
      prevBottles
          .map((bottle) => ({
              ...bottle,
              left: bottle.left - speed,
          }))
          .filter((bottle) => {
              if (checkCollisionWithBottle(rocketPosition, bottle)) {
                  activateBottle();
                  return false; // Удаляем канистру после сбора
              }
              return bottle.left + 50 > 0; // Убираем канистру, если она вышла за экран
          })
    );

    checkForBottle();
  }, [gameOver, speed, rocketPosition, currentRound, isBottleActive]);

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
			{/* {fireworks.map((firework) => (
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
      ))} */}

      
      {/* Бутылка */}
      {bottles.map((bottle) => (
          <div
              key={bottle.id}
              className={styles.canister}
              style={{
                  left: `${bottle.left}px`,
                  bottom: `${bottle.bottom}px`,
              }}
          >
              <img src="/Bottle.png" alt="Bottle" />
          </div>
      ))}
    </>
  );
});

export default Bottle;
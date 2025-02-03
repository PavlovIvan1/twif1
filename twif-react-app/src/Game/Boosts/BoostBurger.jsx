import React, { useCallback, useEffect, useState } from 'react'

const Burger = React.memo(({ currentRound, setIsInvincible, setSeconds, setSpeed, speed, gameOver, rocketPosition, restarted }) => {
  const [burgers, setBurgers] = useState([]);
  const [isBurgerActive, setBurgerActive] = useState(false);
  const [burgerTimer, setBurgerTimer] = useState(null);
  const [nextBurgerRound, setNextBurgerRound] = useState(2);
  const [burgerCreatedThisRound, setBurgerCreatedThisRound] = useState(false);

  const activateBurger = useCallback( () => {
    setIsInvincible(true);
    setBurgerActive(true);
    setSeconds((prevSeconds) => prevSeconds + 15);
    
    // Установить таймер для деактивации буста
    const timer = setTimeout(() => {
      setBurgerActive(false);
      setSpeed(6);
    }, 15000); // 15 секунд

    setBurgerTimer(timer);
  }, []);

  const checkForBurger = () => {
    if (currentRound === nextBurgerRound && !isBurgerActive) {

      const newBurger = {
        id: Date.now(),
        left: Math.random() * 6500 + 1500,
        bottom: Math.random() * 350 + 100,
      };
      setBurgers((prev) => [...prev, newBurger]);
      setNextBurgerRound((prev) => prev + 2); // Увеличиваем периодичность появления
      setBurgerCreatedThisRound(true);
    }
  };

  const checkCollisionWithBurger = useCallback( (rocket, burger) => {
    const rocketLeft = 50;
    const rocketRight = rocketLeft + 50;
    const rocketBottom = rocket;
    const rocketTop = rocketBottom + 50;

    const burgerLeft = burger.left;
    const burgerRight = burgerLeft + 50;
    const burgerBottom = burger.bottom;
    const burgerTop = burgerBottom + 50;

    return (
      rocketRight > burgerLeft &&
      rocketLeft < burgerRight &&
      rocketTop > burgerBottom &&
      rocketBottom < burgerTop
    );
  }, []);

  useEffect(() => {
    if (gameOver) {
      setBurgers([])
    };
    if (restarted) {
      setBurgers([])
    }

    console.log("Burger", {currentRound, nextBurgerRound})

    setBurgers((prevBurgers) =>
      prevBurgers
        .map((burger) => ({
          ...burger,
          left: burger.left - speed,
        }))
        .filter((burger) => {
          if (checkCollisionWithBurger(rocketPosition, burger)) {
            activateBurger();
            return false; // Удаляем бургер после сбора
          }
          return burger.left + 50 > 0; // Убираем бургер, если он вышел за экран
        })
    );

    // Проверка на необходимость появления буста
    checkForBurger();
  }, [gameOver, speed, rocketPosition, currentRound, isBurgerActive]);

  return (
    <>
			{burgers.map((burger) => (
        <div
          key={burger.id}
          className="burger"
          style={{
            left: `${burger.left}px`,
            bottom: `${burger.bottom}px`,
            position: 'absolute',
          }}
        >
          <img src="/Burger.png" alt="Burger" />
        </div>
      ))}
    </>
  );
});

export default Burger;
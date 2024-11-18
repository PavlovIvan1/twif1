import { useEffect } from 'react'
import styles from './Game.module.scss'
import { useGameStore } from './useGameStore'

export function Burger({ currentRound }) {
	// Позиция ракеты
	const rocketPosition = useGameStore(state => state.rocketPosition);
	const setRocketPosition = useGameStore(state => state.setRocketPosition);

	// Полеты
	const isFlying = useGameStore(state => state.isFlying);
	const setIsFlying = useGameStore(state => state.setIsFlying);

	// Препятствия
	const obstacles = useGameStore(state => state.obstacles);
	const setObstacles = useGameStore(state => state.setObstacles);

	// Воздушные препятствия
	const skyObstacles = useGameStore(state => state.skyObstacles);
	const setSkyObstacles = useGameStore(state => state.setSkyObstacles);

	// Монеты
	const coins = useGameStore(state => state.coins);
	const setCoins = useGameStore(state => state.setCoins);

	// Бусты
	const fireworks = useGameStore(state => state.fireworks);
	const setFireworks = useGameStore(state => state.setFireworks);

	// Очки
	const score = useGameStore(state => state.score);
	const setScore = useGameStore(state => state.setScore);

	// Игра окончена
	const gameOver = useGameStore(state => state.gameOver);
	const setGameOver = useGameStore(state => state.setGameOver);

	// Позиция фона
	const backgroundPosition = useGameStore(state => state.backgroundPosition);
	const setBackgroundPosition = useGameStore(state => state.setBackgroundPosition);

	// Мьют
	const isMuted = useGameStore(state => state.isMuted);
	const setIsMuted = useGameStore(state => state.setIsMuted);

	// Скорость
	const speed = useGameStore(state => state.speed);
	const setSpeed = useGameStore(state => state.setSpeed);

	// Падение
	const isFalling = useGameStore(state => state.isFalling);
	const setIsFalling = useGameStore(state => state.setIsFalling);

	// Жизни
	const heart = useGameStore(state => state.heart);
	const setHeart = useGameStore(state => state.setHeart);

	// Буст Бургер
	const burgers = useGameStore(state => state.burgers);
	const setBurgers = useGameStore(state => state.setBurgers);
	const isBurgerActive = useGameStore(state => state.isBurgerActive);
	const setBurgerActive = useGameStore(state => state.setBurgerActive);
	const burgerTimer = useGameStore(state => state.burgerTimer);
	const setBurgerTimer = useGameStore(state => state.setBurgerTimer);
	const nextBurgerRound = useGameStore(state => state.nextBurgerRound);
	const setNextBurgerRound = useGameStore(state => state.setNextBurgerRound);
	const burgerCreatedThisRound = useGameStore(state => state.burgerCreatedThisRound);
	const setBurgerCreatedThisRound = useGameStore(state => state.setBurgerCreatedThisRound);

	// Общий буст
	const boostActive = useGameStore(state => state.boostActive);
	const setBoostActive = useGameStore(state => state.setBoostActive);
	const boostTimer = useGameStore(state => state.boostTimer);
	const setBoostTimer = useGameStore(state => state.setBoostTimer);


	const seconds = useGameStore(state => state.seconds);
	const setSeconds = useGameStore(state => state.setSeconds);


	const activateBurger = () => {
    setIsInvincible(true);
    setBurgerActive(true);
    setSeconds(prevSeconds => prevSeconds + 15)
    setBoostTimer(15); 

    // Установить таймер для деактивации буста
    const timer = setTimeout(() => {
        setBurgerActive(false); // Деактивировать неуязвимость
        setBurgerActive(false);
        setSpeed(6);
    }, 15000); // 15 секунд

    setBurgerTimer(timer);
  };



	useEffect(() => {
    const newBurgers = [];
    let currentLeft = 500; // Начальная позиция для первой вороны

    for (let i = 0; i < 2 + 5; i++) {
      newBurgers.push({
        left: currentLeft,
        bottom: 400,
        isVisible: true,
        burgerFrame: 0,
      });

      // Обновляем текущую позицию, добавляя смещение
      currentLeft += 5000; // Добавляем 4000 пикселей к позиции для следующей вороны
    }

    setBurgers(newBurgers);
  }, []);

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setBurgers((prevBurgers) =>
        prevBurgers.map((burger) => ({
          ...burger,
          burgerFrame: burger.burgerFrame === 0 ? 1 : 0,
        }))
      );
    }, 500);

    return () => clearInterval(animationInterval);
  }, []);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      setBurgers((prevBurgers) =>
        prevBurgers.map((burger) => {
          if (!burger.isVisible) return burger; // Пропускаем скрытых ворон
          const newLeft = burger.left - 8;

          if (
            newLeft < 50 &&
            newLeft > 0 &&
            rocketPosition < burger.bottom + 40 &&
            rocketPosition > burger.bottom - 40
          ) {
            activateBurger(); // Вызываем функцию столкновения
            return { ...burger, isVisible: false }; // Скрываем ворону при столкновении
          }

          // Скрываем ворону, если она уходит за пределы экрана
          if (newLeft < -40) return { ...burger, isVisible: false };

          // Обновляем позицию вороны
          return { ...burger, left: newLeft };
        })
      );
    }, 30);

    return () => clearInterval(moveInterval);
  }, [rocketPosition]);




	return (
		<>
			{burgers.map((burger) => (
          <div
              key={burger.id}
              className={styles.canister}
              style={{
                  left: `${burger.left}px`,
                  bottom: `${burger.bottom}px`,
              }}
          >
              <img src="" alt="HAHAHAHAHHA" />
          </div>
      ))}
		</>
	)


}
import React, { useEffect, useRef, useState } from 'react'
import { IoIosArrowDown } from "react-icons/io"
import { MdArrowUpward, MdOutlineMusicNote, MdOutlineMusicOff } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import Crow from './Crow'
import styles from './Game.module.scss'

const Game = () => {

  const navigate = useNavigate()

  const [rocketPosition, setRocketPosition] = useState(200);
  const [isFlying, setIsFlying] = useState(false);
  const [obstacles, setObstacles] = useState([{ left: 300, bottom: 50, type: 'box' }]);
  const [coins, setCoins] = useState([{ left: 300, bottom: Math.random() * 300 + 80 }]);
  const [fireworks, setFireworks] = useState([]); // Состояние для бустов
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [backgroundPosition, setBackgroundPosition] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [speed, setSpeed] = useState(6);
  const [isFalling, setIsFalling] = useState(false); // Для анимации падения
  const [heart, setHeart] = useState(6);
  
  const [isFireworkActive, setFireworkActive] = useState(false); // Состояние активного буста
  const [fireworkTimer, setFireworkTimer] = useState(null); // Таймер для буста
  const [currentRound, setCurrentRound] = useState(0); // Текущий раунд
  const [nextFireworkRound, setNextFireworkRound] = useState(getRandomRound()); // Рунд для следующего буста
  const [fireworkCreatedThisRound, setFireworkCreatedThisRound] = useState(false);

  // Канистра
  const [canisters, setCanisters] = useState([]); // Для хранения канистр
  const [isCanisterActive, setCanisterActive] = useState(false); // Для отслеживания активного буста
  const [canisterTimer, setCanisterTimer] = useState(null); // Таймер для деактивации буста
  const [nextCanisterRound, setNextCanisterRound] = useState(getRandomRound()); // Рунд для следующей канистры
  const [canisterCreatedThisRound, setCanisterCreatedThisRound] = useState(false); // Флаг для отслеживания создания канистры
  const [isInvincible, setIsInvincible] = useState(false);
  // 

  // Бургер

  const [burgers, setBurgers] = useState([]);
  const [isBurgerActive, setBurgerActive] = useState(false);
  const [burgerTimer, setBurgerTimer] = useState(null);
  const [nextBurgerRound, setNextBurgerRound] = useState(getRandomRound());
  const [burgerCreatedThisRound, setBurgerCreatedThisRound] = useState(false);

  // бутылка
  
  const [bottles, setBottles] = useState([]);
  const [isSlowMoActive, setIsSlowMoActive] = useState(false);
  const [isBottleActive, setBottleActive] = useState(false);
  const [bottleTimer, setBottleTimer] = useState(null);
  const [nextBottleRound, setNextBottleRound] = useState(getRandomRound());
  const [bottleCreatedThisRound, setBottleCreatedThisRound] = useState(false);

  // Таймер раунд 

  const [seconds, setSeconds] = useState(20)
  let timerRef = useRef(null);

  const startTimerR = () => {
    timerRef.current = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds <= 1) {
          clearInterval(timerRef.current); // Останавливаем таймер
          setHeart(prevH => prevH - 1);
          setGameOver(true);
          return 20; // Сбрасываем таймер для следующего раунда
        }
        return prevSeconds - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    startTimerR();
    return () => clearInterval(timerRef.current);
  }, []);

  // useEffect(() => {
  //   if (seconds <= 0) {
  //     console.log('Время истекло!');
  //     setHeart(prevH => prevH - 1)
  //     setGameOver(true)
  //     return; 
  //   }
  //   const timer = setInterval(() => {
  //     setSeconds(prevSeconds => prevSeconds - 1);
  //     console.log(seconds)
  //   }, 1000);
  //   return () => clearInterval(timer);
  // }, [seconds]);

  // const restartStartRoundTimer = () => {
  //   if (seconds <= 0) {
  //     console.log('Время истекло!');
  //     setHeart(prevH => prevH - 1)
  //     setGameOver(true)
  //     return; 
  //   }
  //   const timer = setInterval(() => {
  //     setSeconds(prevSeconds => prevSeconds - 1);
  //     console.log(seconds)
  //   }, 1000);
  //   return () => clearInterval(timer);
  // }

  // const [bottle, setBottle] = useState(null);
  // const [isSlowMoActive, setIsSlowMoActive] = useState(false);

  // Сердце - буст

  const [hearts, setHearts] = useState([]); // Для хранения сердец
  const [isHeartActive, setHeartActive] = useState(false); // Для отслеживания активного сердца
  const [nextHeartRound, setNextHeartRound] = useState(getRandomRound()); // Рунд для следующего сердца
  const [heartCreatedThisRound, setHeartCreatedThisRound] = useState(false); //  Флаг для отслеживания создания сердца

  const checkForHeart = () => {
    if (currentRound >= nextHeartRound && !isHeartActive && !heartCreatedThisRound) {
      const newHeart = {
        id: Date.now(),
        left: 500,
        bottom: Math.random() * 350 + 100,
      };
      setHearts(prev => [...prev, newHeart]);
      
      setNextHeartRound(currentRound + getRandomRound()); // Устанавливаем следующий раунд для сердца
      setHeartCreatedThisRound(true); // Помечаем, что сердце было создано
    }
  };

  const checkCollisionWithHeart = (rocket, heart) => {
    const rocketLeft = 50;
    const rocketRight = rocketLeft + 50;
    const rocketBottom = rocket;
    const rocketTop = rocketBottom + 50;
  
    const heartLeft = heart.left;
    const heartRight = heartLeft + 30; // Размер сердца
    const heartBottom = heart.bottom;
    const heartTop = heartBottom + 30;
  
    return (
      rocketRight > heartLeft &&
      rocketLeft < heartRight &&
      rocketTop > heartBottom &&
      rocketBottom < heartTop
    );
  };
  

  
  // Ворона

  const [crows, setCrows] = useState([]);
  const [nextCrowRound, setNextCrowRound] = useState(getRandomRound()); 
  const [crowCreatedThisRound, setCrowCreatedThisRound] = useState(false);

  const checkCollisionWithCrow = (rocket, crow) => {
    const rocketLeft = 50;
    const rocketRight = rocketLeft + 50; // Ширина ракеты
    const rocketBottom = rocket;
    const rocketTop = rocketBottom + 50; // Высота ракеты

    const crowLeft = crow.left;
    const crowRight = crowLeft + 50; // Ширина вороны
    const crowBottom = crow.bottom;
    const crowTop = crowBottom + 50; // Высота вороны

    return (
        rocketRight > crowLeft &&
        rocketLeft < crowRight &&
        rocketTop > crowBottom &&
        rocketBottom < crowTop
    );
  };

  const checkForCrow = () => {
    if (currentRound >= nextCrowRound && !crowCreatedThisRound) {
        const newCrow = {
            id: Date.now(),
            left: 500,
            bottom: Math.random() * 350 + 100, // Случайная высота
        };
        setCrows(prev => [...prev, newCrow]);
        setNextCrowRound(currentRound + getRandomRound());
        setCrowCreatedThisRound(true);
    }
  };


  // таймер

  const [boostActive, setBoostActive] = useState(false);
  const [boostTimer, setBoostTimer] = useState(15);
                
                
  const audioRef = useRef(null);
  const rocketSoundRef = useRef(null);
  const collisionSoundRef = useRef(null); // Реф для звука столкновения


  // 60 секунд
  // const [roundTime, setRoundTime] = useState(60);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const handleRoundEnd = () => {
  //   setGameOver(true)
  //   if (heart != 0) {
  //     setHeart(prev => Math.max(prev - 1, 0));
  //   }
  // };
  // const startTimer = () => {
  //   const game_timer = setInterval(() => {
  //       setRoundTime(prev => {
  //           if (prev <= 1) {
  //               handleRoundEnd();
  //               return 0;
  //           }
  //           return prev - 1;
  //       });
  //   }, 1000);
  //   return game_timer; // Верните таймер, чтобы можно было его остановить
  // };

  // useEffect(() => {
  //   let game_timer_e;
  //   if (!gameOver) {
  //     game_timer_e = startTimer();
  //   }

  //   return () => clearInterval(game_timer_e);
  // }, [gameOver]);


  const gravity = -3;
  const lift = -4;

  // Функция для генерации случайного раунда (2-7)
  function getRandomRound() {
    return Math.floor(Math.random() * 6) + 2; // 2-7
  }

  const handleFly = () => {
    setIsFlying(true);
    if (rocketSoundRef.current && !isMuted) {
      rocketSoundRef.current.play();
    }
  };

  const stopFlying = () => {
    setIsFlying(false);
    if (rocketSoundRef.current) {
      rocketSoundRef.current.pause();
      rocketSoundRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        handleFly();
      }
    };

    const handleKeyUp = (e) => {
      if (e.code === 'Space') {
        stopFlying();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // таймер

  useEffect(() => {
    let timer;
    if (isFireworkActive || isCanisterActive || isBottleActive || isBurgerActive) {
      timer = setInterval(() => {
        setBoostTimer(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setFireworkActive(false);
            setCanisterActive(false);
            setBottleActive(false);
            setBurgerActive(false)
            return 0; // Сброс таймера
          }
          return prev - 1;
        });
      }, 1000);
    }
  
    return () => clearInterval(timer);
  }, [isFireworkActive, isCanisterActive, isBottleActive, isBurgerActive]);

  useEffect(() => {
    const handleMouseDown = () => {
      handleFly();
    };

    const handleMouseUp = () => {
      stopFlying();
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const checkCollisionWithCoin = (rocket, coin) => {
    const rocketLeft = 50;
    const rocketRight = rocketLeft + 50;
    const rocketBottom = rocket;
    const rocketTop = rocketBottom + 50;

    const coinLeft = coin.left;
    const coinRight = coinLeft + 30;
    const coinBottom = coin.bottom;
    const coinTop = coinBottom + 30;

    return (
      rocketRight > coinLeft &&
      rocketLeft < coinRight &&
      rocketTop > coinBottom &&
      rocketBottom < coinTop
    );
  };

  const checkCollisionWithObstacle = (rocket) => {
    if (isCanisterActive) {
      return false;
    }
    const rocketLeft = 70;
    const rocketRight = rocketLeft + 70;
    const rocketBottom = rocket;
    const rocketTop = rocketBottom + 70;

    for (let obstacle of obstacles) {
      const obstacleLeft = obstacle.left;
      const obstacleRight = obstacleLeft + 50;
      const obstacleBottom = obstacle.bottom;
      const obstacleTop = obstacleBottom + 50;

      if (
        rocketRight > obstacleLeft &&
        rocketLeft < obstacleRight &&
        rocketTop > obstacleBottom &&
        rocketBottom < obstacleTop
      ) {
        return true;
      }
    }
    return false;
  };

  const checkCollisionWithFirework = (rocket, firework) => {
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
  };

  const minusHeart = () => {
    setHeart(prevHeart => prevHeart - 1);
  }

  // Канистра

  const activateCanister = () => {
    setIsInvincible(true);
    setCanisterActive(true);
    setBoostTimer(15); 

    // Установить таймер для деактивации буста
    const timer = setTimeout(() => {
        setCanisterActive(false); // Деактивировать неуязвимость
        setCanisterActive(false);
    }, 15000); // 15 секунд

    setCanisterTimer(timer);
  };

  
  const checkForCanister = () => {
    if (!isCanisterActive && !canisterCreatedThisRound) {
        // console.log(`Канистра будет появляться в раунде ${currentRound}!`); // Логируем, что канистра появится
        const newCanister = {
            id: Date.now(),
            left: 500,
            bottom: Math.random() * 350 + 100,
        };
        setCanisters(prev => [...prev, newCanister]);

        // Помечаем, что в этом раунде канистра была создана
        setCanisterCreatedThisRound(true);
    } else {
        // console.log(`Канистра уже была создана в раунде ${currentRound}.`); // Логируем, что канистра не появится
    }
  };

  const checkCollisionWithCanister = (rocket, canister) => {
    const rocketLeft = 50;
    const rocketRight = rocketLeft + 50;
    const rocketBottom = rocket;
    const rocketTop = rocketBottom + 50;

    const canisterLeft = canister.left;
    const canisterRight = canisterLeft + 50; // Предполагаемый размер канистры
    const canisterBottom = canister.bottom;
    const canisterTop = canisterBottom + 50;

    return (
        rocketRight > canisterLeft &&
        rocketLeft < canisterRight &&
        rocketTop > canisterBottom &&
        rocketBottom < canisterTop
    );
  };

  // Бургер

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

  
  const checkForBurger = () => {
    if (!isBurgerActive && !burgerCreatedThisRound) {
        // console.log(`Бутылка будет появляться в раунде ${currentRound}!`); // Логируем, что канистра появится
        const newBurger = {
            id: Date.now(),
            left: 800,
            bottom: Math.random() * 350 + 100,
        };
        setBurgers(prev => [...prev, newBurger]);

        // Помечаем, что в этом раунде канистра была создана
        setBurgerCreatedThisRound(true);
    } else {
        // console.log(`Бутылка уже была создана в раунде ${currentRound}.`); // Логируем, что канистра не появится
    }
  };

  const checkCollisionWithBurger = (rocket, burger) => {
    const rocketLeft = 50;
    const rocketRight = rocketLeft + 50;
    const rocketBottom = rocket;
    const rocketTop = rocketBottom + 50;

    const burgerLeft = burger.left;
    const burgerRight = burgerLeft + 50; // Предполагаемый размер канистры
    const burgerBottom = burger.bottom;
    const burgerTop = burgerBottom + 50;

    return (
        rocketRight > burgerLeft &&
        rocketLeft < burgerRight &&
        rocketTop > burgerBottom &&
        rocketBottom < burgerTop
    );
  };

  // Бутылка

  const activateBottle = () => {
    setIsInvincible(true);
    setBottleActive(true);
    setSpeed(prev => prev / 2);
    setBoostTimer(15); 

    // Установить таймер для деактивации буста
    const timer = setTimeout(() => {
        setBottleActive(false); // Деактивировать неуязвимость
        setBottleActive(false);
        setSpeed(6);
    }, 15000); // 15 секунд

    setBottleTimer(timer);
  };

  
  const checkForBottle = () => {
    if (!isBottleActive && !bottleCreatedThisRound) {
        // console.log(`Бутылка будет появляться в раунде ${currentRound}!`); // Логируем, что канистра появится
        const newBottle = {
            id: Date.now(),
            left: 500,
            bottom: Math.random() * 350 + 100,
        };
        setBottles(prev => [...prev, newBottle]);

        // Помечаем, что в этом раунде канистра была создана
        setBottleCreatedThisRound(true);
    } else {
        // console.log(`Бутылка уже была создана в раунде ${currentRound}.`); // Логируем, что канистра не появится
    }
  };

  const checkCollisionWithBottle = (rocket, bottle) => {
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
  };

  // 

  const activateFirework = () => {
    setFireworkActive(true);
    setSpeed(prev => prev * 2); // Удвое увеличить скорость
    // Удваиваем очки за монеты, используя multiplier
    setScore(prev => prev); // Очки будут удваиваться при сборе монет
    setBoostTimer(15); 

    // Установить таймер для деактивации буста
    const timer = setTimeout(() => {
      setFireworkActive(false);
      setSpeed(prev => prev / 2); // Вернуть скорость к норме
    }, 15000); // 15 секунд

    setFireworkTimer(timer);
  };

  const checkForFirework = () => {
    if (currentRound >= nextFireworkRound && !isFireworkActive && !fireworkCreatedThisRound) {
        // Проверка, что буст должен появляться только раз в 5 раундов
        if ((currentRound % 5 === 0) && currentRound !== 0) {
            const newFirework = {
                id: Date.now(),
                left: 500,
                bottom: Math.random() * 350 + 100,
            };
            setFireworks(prev => [...prev, newFirework]);

            setNextFireworkRound(currentRound + getRandomRound());

            setFireworkCreatedThisRound(true);
        }
    }
  };

  const startNewRound = () => {
    setFireworkCreatedThisRound(false);
    setCanisterActive(false);
  };


  useEffect(() => {

    const gameLoop = setInterval(() => {
      if (!gameOver) {
        setRocketPosition((prev) => {
          const newPosition = isFlying ? prev - lift : prev + gravity;
          return Math.max(newPosition, 0);
        });

        if (checkCollisionWithObstacle(rocketPosition)) {
          if (collisionSoundRef.current && !isMuted) {
            collisionSoundRef.current.play(); // Воспроизвести звук столкновения
          }
          setIsFalling(true); // Установить флаг падения
          setGameOver(true);
          minusHeart();
        }

        // Обновление препятствий
        setObstacles((prevObstacles) => {
          const updatedObstacles = prevObstacles
            .map((obstacle) => ({
              ...obstacle,
              left: obstacle.left - speed,
            }))
            .filter((obstacle) => {
              if (obstacle.left + 50 > 0) {
                return true;
              } else {
                // Препятствие прошло экран, считаем раунд
                setCurrentRound(prevRound => prevRound + 1);
                return false;
              }
            });
          return updatedObstacles;
        });

        // Сердце - буст
        setHearts((prevHearts) =>
          prevHearts
            .map((heart) => ({
              ...heart,
              left: heart.left - speed,
            }))
            .filter((heart1) => {
              if (checkCollisionWithHeart(rocketPosition, heart1)) {
                console.log("Collision detected!");
                console.log("Current hearts:", heart);
                if (heart < 6) {
                  setHeart((prev) => {
                      console.log("Adding heart!");
                      return prev + 1;
                  });
                } 
                return false;
              }
              return heart1.left + 50 > 0; // Убираем сердце, если оно вышло за экран
            })
        );
        
        // setHearts((prevHearts) =>
        //   prevHearts
        //     .map((heart) => ({
        //       ...heart,
        //       left: heart.left - speed,
        //     }))
        //     .filter((heart) => {
        //       if (checkCollisionWithHeart(rocketPosition, heart)) {
        //         if (heart < 6) { // Здесь нужно использовать правильное состояние
        //           setHeart(prev => prev + 1); // Добавляем сердце, если их меньше 6
        //         }
        //         return false; // Удаляем сердце после подбора
        //       }
        //       return heart.left + 50 > 0; // Убираем сердце, если оно вышло за экран
        //     })
        // );
        
        // setHearts((prevHearts) =>
        //   prevHearts
        //     .map((heart) => ({
        //       ...heart,
        //       left: heart.left - speed,
        //     }))
        //     .filter((heart) => {
        //       if (checkCollisionWithHeart(rocketPosition, heart)) {
        //         if (prev != 6) {
        //           setHeart(prev => prev + 1); // Добавляем сердце, если их меньше 6
        //         }
        //         return false; // Удаляем сердце после подбора
        //       }
        //       return heart.left + 50 > 0; // Убираем сердце, если оно вышло за экран
        //     })
        // );
        

        // Ворона

        setCrows((prevCrows) =>
          prevCrows
              .map((crow) => ({
                  ...crow,
                  left: crow.left - speed,
              }))
              .filter((crow) => {
                  if (checkCollisionWithCrow(rocketPosition, crow)) {
                      setScore(0); // Обнуляем счёт
                      return false; // Удаляем ворону после столкновения
                  }
                  return crow.left + 50 > 0; // Убираем ворону, если она вышла за экран
              })
      );
      

        // Обновление монет
        setCoins((prevCoins) =>
          prevCoins
            .map((coin) => ({
              ...coin,
              left: coin.left - speed,
            }))
            .filter((coin) => {
              if (checkCollisionWithCoin(rocketPosition, coin)) {
                setScore((prevScore) => prevScore + (isFireworkActive ? 2 : 1));
                return false;
              }
              return coin.left + 30 > 0;
            })
        );

        // Обновление бустов
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

        // Канстра

        setCanisters((prevCanisters) =>
          prevCanisters
              .map((canister) => ({
                  ...canister,
                  left: canister.left - speed,
              }))
              .filter((canister) => {
                  if (checkCollisionWithCanister(rocketPosition, canister)) {
                      activateCanister();
                      return false; // Удаляем канистру после сбора
                  }
                  return canister.left + 50 > 0; // Убираем канистру, если она вышла за экран
              })
        );

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

        // Бургер
        setBurgers((prevBurgers) =>
          prevBurgers
              .map((burger) => ({
                  ...burger,
                  left: burger.left - speed,
              }))
              .filter((burger) => {
                  if (checkCollisionWithBurger(rocketPosition, burger)) {
                      activateBurger();
                      return false; // Удаляем канистру после сбора
                  }
                  return burger.left + 50 > 0; // Убираем канистру, если она вышла за экран
              })
        );

        

        // Увеличение скорости
        setSpeed((prevSpeed) => Math.min(prevSpeed + 0.001, 10));
        setBackgroundPosition((prev) => prev + speed * 0.5);

        // Проверка на необходимость появления буста
        checkForFirework();
        checkForCanister();
        checkForBottle();
        checkForHeart();
        checkForBurger();
      }
    }, 30);

    return () => clearInterval(gameLoop);
  }, [isFlying, rocketPosition, gameOver, speed, isFireworkActive, currentRound, nextFireworkRound]);

  useEffect(() => {
    const obstacleInterval = setInterval(() => {
      const types = ['box', 'mailbox', 'puddle'];
      const randomType = types[Math.floor(Math.random() * types.length)];

      setObstacles((prevObstacles) => [
        ...prevObstacles,
        { left: 500, bottom: Math.random() * 50 + 20, type: randomType },
      ]);
    }, 3000);

    const coinInterval = setInterval(() => {
      setCoins((prevCoins) => [
        ...prevCoins,
        { left: 500, bottom: Math.random() * 350 + 100 },
      ]);
    }, 5000);

    return () => {
      clearInterval(obstacleInterval);
      clearInterval(coinInterval);
    };
  }, []);

  const restartGame = () => {
    if (heart > 0) {
      setRocketPosition(200);
      setIsFlying(false);
      setObstacles([{ left: 300, bottom: 50, type: 'box' }]);
      setCoins([{ left: 300, bottom: Math.random() * 350 +  100 }]);
      setFireworks([]); // Сбрасываем бусты
      setScore(0);
      setGameOver(false);
      setBackgroundPosition(0);
      setSpeed(6);
      setIsFalling(false);
      setCurrentRound(0);
      setNextFireworkRound(getRandomRound());
      setCanisterActive(false);
      // setRoundTime(60); // Сброс времени
      // startTimer(); // Запускаем новый
      clearInterval(timerRef.current);
      setSeconds(20)
      startTimerR();

      if (fireworkTimer) {
        clearTimeout(fireworkTimer);
        setFireworkTimer(null);
      }

      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
      alert("No hearts")
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.7;
      if (!isMuted) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }

    if (rocketSoundRef.current) {
      rocketSoundRef.current.volume = 0.5;
    }

    if (gameOver && audioRef.current) {
      audioRef.current.pause();
      // setIsGameActive(false);
    }
  }, [gameOver, isMuted]);

  const toggleMute = () => {
    setIsMuted((prevMuted) => !prevMuted);
  };

  return (
    <div className={styles.game_container} style={{ backgroundPositionX: `${-backgroundPosition}px` }}>
      <audio ref={audioRef} src="/game-music-teste-204327.mp3" loop />
      <audio ref={rocketSoundRef} src="/rocket-in-flight_z1i4ba4_.mp3" />
      <audio ref={collisionSoundRef} src="/583699913672e65.mp3" /> {/* Звук столкновения */}

      <div className={styles.top_panel}>
        <div className={styles.left_arrow} onClick={() => {navigate('/')}}>
          <MdArrowUpward style={{ transform: 'rotate(-90deg)' }} size={30} color="black" />
        </div>

        <div className={styles.score}> <img src="/2.png" alt="" /> {score}</div>

        <div className={styles.sound_toggle} onClick={toggleMute}>
          {isMuted ? <MdOutlineMusicOff size={30} color='black' /> : <MdOutlineMusicNote size={30} color='black' />}
        </div>

      </div>
      <div className={styles.heart_panel}>
        <div className={styles.hearts}>
          {Array.from({ length: heart }, (_, index) => (
            <svg width="22" height="18" viewBox="0 0 22 18"  fill="none" xmlns="http://www.w3.org/2000/svg" key={index}>
              <path className={styles.heart_tr}  style={{ fill: index < heart ? '#C12336' : '#13639A' }} d="M21.7494 6.1094C21.7011 7.69476 21.0432 9.2098 20.1338 10.4846C17.7335 13.8494 13.6149 16.4304 11.6752 17.4818H10.3073C8.27357 16.0385 5.46966 13.6431 3.21631 10.4846C2.30691 9.2098 1.649 7.69476 1.60071 6.1094C1.55782 4.70616 2.01229 3.29236 2.8577 2.19639C3.70312 1.10066 5.60513 0 5.60513 0H6.97298C7.3119 0 7.65855 0.0440638 8.00309 0.128207C9.54556 0.505093 11.0491 1.68497 11.6749 3.29916C12.301 1.68497 15.0092 0 15.0092 0H16.3771C16.6192 0 16.8571 0.0225007 17.0884 0.0686739C18.4162 0.335869 19.6469 1.10066 20.4926 2.19639C21.338 3.29236 21.7925 4.70616 21.7494 6.1094Z"/>
              <path className={styles.heart_tr} style={{ fill: index < heart ? '#E23030' : '#13639A' }} d="M20.3815 6.1094C20.3332 7.69476 19.6753 9.2098 18.7659 10.4846C16.3656 13.8494 12.2471 16.4304 10.3073 17.4818C8.36781 16.4304 4.24925 13.8496 1.84871 10.4846C0.939078 9.2098 0.281168 7.69476 0.232885 6.1094C0.189993 4.70616 0.64446 3.29236 1.48988 2.19639C2.33553 1.10066 3.56627 0.335869 4.89404 0.0686739C5.12491 0.0222663 5.36327 0 5.60492 0C5.94384 0 6.29049 0.0440638 6.63503 0.128207C8.17749 0.505093 9.68106 1.68497 10.3069 3.29916C10.9327 1.68497 12.4362 0.505093 13.9789 0.128207C14.3235 0.0440638 14.6699 0 15.0088 0C15.2509 0 15.4888 0.0225007 15.7201 0.0686739C17.0479 0.335869 18.2787 1.10066 19.1243 2.19639C19.9697 3.29236 20.4242 4.70616 20.3811 6.1094H20.3815Z"/>
            </svg>
          ))}
        </div>
      </div>
      

      <div
        className={`${styles.rocket} ${isFlying ? styles.flying : ''} ${isFalling ? styles.falling : ''}`} 
        style={{ bottom: `${rocketPosition}px` }}
      />

        <div className={styles.timers}>
          {/* таймер */}
          {(isFireworkActive || isCanisterActive || isBottleActive || isBurgerActive) && (
            <div className={styles.boost_timer}  style={{width: '50px'}}>
              {boostTimer}
            </div>
          )}
          {/* 60 секунд */}
          <div className={styles.round_timer}>
            <div>
              Seconds left: {seconds}
            </div>
          </div>
        </div>

      {/* Сердце - буст */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          style={{
            position: 'absolute',
            left: heart.left,
            bottom: heart.bottom,
            width: '30px', // Задайте нужный размер
            height: '30px',
          }}
        >
          <img src="/Heart.svg" alt="Heart" style={{ width: '100%', height: '100%' }} />
        </div>
      ))}


      {/* Crow */}
      <Crow
        currentRound={currentRound}
        rocketPosition={rocketPosition}
        onCollision={() => {
          setScore(0); // При столкновении сбрасываем очки
        }}
      />

      {/* Препятствия */}
      {obstacles.map((obstacle, index) => (
        <div
          key={index}
          className={`${styles.obstacle} ${styles[obstacle.type]}`} // Исправлено
          style={{
            left: `${obstacle.left}px`,
            bottom: `${obstacle.bottom}px`,
          }}
        />
      ))}

      {/* {obstacles.map((obstacle, index) => (
        <div
          key={index}
          className={`${styles.obstacle} ${obstacle.type}`}
          style={{
            left: `${obstacle.left}px`,
            bottom: `${obstacle.bottom}px`,
          }}
        />
      ))} */}

      {/* Ворона */}
      {crows.map((crow) => (
        <img className={styles.crow} key={crow.id} src="/crow.png" alt="Crow" style={{ position: 'absolute', left: crow.left, bottom: crow.bottom }} />
      ))}

      {/* Монеты */}
      {coins.map((coin, index) => (
        <div
          key={index}
          className={styles.coin}
          style={{
            left: `${coin.left}px`,
            bottom: `${coin.bottom}px`,
          }}
        />
      ))}

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

      {/* Канистры */}
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

      {/* Бургер */}
      {burgers.map((burger) => (
          <div
              key={burger.id}
              className={styles.canister}
              style={{
                  left: `${burger.left}px`,
                  bottom: `${burger.bottom}px`,
              }}
          >
              <img src="/Burger.png" alt="Burger" />
          </div>
      ))}


      {/* {bottle && (
        <div
          className="bottle"
          style={{ left: bottle.left, bottom: bottle.bottom, position:  'absolute', width: '50px', height: '50px', backgroundImage: 'url(/ Bottle.png)', backgroundSize: 'contain', backgroundRepeat:   'no-repeat' }}
        />
      )} */}
      {/* {bottle && (
        <div
          className="bottle"
          style={{ left: `${bottle.left}px`, bottom: `${bottle.bottom}px` }}
        >
          <img src="/Bottle.png" alt="Bottle" />
        </div>
      )} */}



        {/* {isModalOpen && (
          <div className="modal">
            <h2>Раунд завершён!</h2>
            <button onClick={() => setIsModalOpen(false)}>Закрыть</button>
          </div>
        )} */}



      {/* Если игра окончена */}
      {gameOver && (
        <div className={styles.game_over}>
          <h1>There are <img src="/Heart.svg" alt="" /> <span>{heart}</span> <br />
          more attempts</h1>
          <hr />
          <span className={styles.text_next}>Next free in</span>
          <button onClick={restartGame} className={styles.try_again} style={{
             backgroundColor: heart === 0 ? 'grey' : '#51B3F6' }} > <img src="/Heart.svg" alt="" /> Try again</button>
          <a onClick={() => {navigate('/')}}>No, thanks</a>
        </div>
      )}

      {/* Кнопка управления полетом */}
      <div
        className={styles.flight_button}
        onMouseDown={handleFly}
        onMouseUp={stopFlying}
        onTouchStart={handleFly}  // Для мобильных устройств
        onTouchEnd={stopFlying}   // Для мобильных устройств
      >
        <IoIosArrowDown size={40} color="black" className={styles.arrow} />
      </div>
    </div>
  );
};

export default Game;
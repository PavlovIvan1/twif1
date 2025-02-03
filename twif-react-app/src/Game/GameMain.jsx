import {Howl} from 'howler';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  MdArrowUpward,
  MdOutlineMusicNote,
  MdOutlineMusicOff
} from 'react-icons/md';
import {useNavigate} from 'react-router-dom';
import {useGlobalStore} from '../useGlobalStore';
import Bottle from './Boosts/BoostBottle';
import Burger from './Boosts/BoostBurger';
import Canister from './Boosts/BoostCanister';
import Firework from './Boosts/BoostFirework';
import Crow from './Crow';
import styles from './Game.module.scss';
import RedBird from './RedBird';
import {API_URL} from '../config.js';


const rocketSound = new Howl({
  src: ['/rocket-in-flight_z1i4ba4_.mp3'],
  volume: 0.3, 
});

const collisionSound = new Howl({
  src: ['/583699913672e65.mp3'],
  volume: 0.6,
});

const backgroundMusic = new Howl({
  src: ['/game-music-teste-204327.mp3'],
  volume: 0.5,
  loop: true,
});


const coinMusic = new Howl({
  src: ['/coinSond.wav'],
  volume: 0.3,
});

const winSound = new Howl({
  src: ['/Win1.mp3'],
  volume: 0.6,
});


let isCoinCollected = false;


const Game = () => {

  const addAttemptts = async () => {
    try {
      const response = await fetch(`${API_URL}/boosts/add_attempt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          initData: window.Telegram.WebApp.initData
        })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("add ATTEMPTS:", data);
      setHeart(data.attempts)
    } catch (err) {
      console.error("Err attempts", err);
    }
  }

  const navigate = useNavigate()

  // 
  const dailyBoost = useGlobalStore((state) => state.dailyBoost);
	console.log("DB:", dailyBoost)

  const dailyNftBoost = useGlobalStore((state) => state.dailyNftBoost);
  console.log("DNB:", dailyNftBoost)

  const multiplierNft = dailyNftBoost?.boosts.result || 1;
  const multiplier = dailyBoost?.multiplier || 1;

  const getAttemptts = async () => {
    try {
      const response = await fetch(`${API_URL}/boosts/get_attempts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          initData: window.Telegram.WebApp.initData
        })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("DATA ATTEMPTS:", data);
      setHeart(data.attempts)
    } catch (err) {
      console.error("Err attempts", err);
    }
  };

  const [started, setStarted] = useState(false)
  const [st, setSt] = useState(false)

  const [restarted, setRestarted] = useState(false)

  const [rocketPosition, setRocketPosition] = useState(240);
  const [isFlying, setIsFlying] = useState(false);
  const [obstacles, setObstacles] = useState([{ left: 300, bottom: 50, type: 'box' }]);
  const [skyObstacles, setSkyObstacles] = useState([{ left: -10, bottom: 300, type: 'shoot' }]);
  const [coins, setCoins] = useState([{ left: 300, bottom: Math.random() * 300 + 80, isOp: false, isCollected: false}]);
  // const [fireworks, setFireworks] = useState([]); // Состояние для бустов
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [backgroundPosition, setBackgroundPosition] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [speed, setSpeed] = useState(6);
  const [isFalling, setIsFalling] = useState(false); // Для анимации падения
  const [heart, setHeart] = useState(getAttemptts());
  
  const [isFireworkActive, setFireworkActive] = useState(false); // Состояние активного буста
  // const [fireworkTimer, setFireworkTimer] = useState(null); // Таймер для буста
  const [currentRound, setCurrentRound] = useState(1); // Текущий раунд
  // const [nextFireworkRound, setNextFireworkRound] = useState(getRandomRoundFirework()); // Рунд для следующего буста
  // const [fireworkCreatedThisRound, setFireworkCreatedThisRound] = useState(false);

  // Канистра
  const [canisters, setCanisters] = useState([]); // Для хранения канистр
  const [isCanisterActive, setCanisterActive] = useState(false); // Для отслеживания активного буста
  const [canisterTimer, setCanisterTimer] = useState(null); // Таймер для деактивации буста
  const [nextCanisterRound, setNextCanisterRound] = useState(getRandomRound()); // Рунд для следующей канистры
  const [canisterCreatedThisRound, setCanisterCreatedThisRound] = useState(false); // Флаг для отслеживания создания канистры
  const [isInvincible, setIsInvincible] = useState(false);
  // 

  // Бургер

  // const [burgers, setBurgers] = useState([]);
  const [isBurgerActive, setBurgerActive] = useState(false);
  // const [, setBurgerTimer] = useState(null);
  // const [nextBurgerRound, setNextBurgerRound] = useState(getRandomRoundBurger());
  // const [burgerCreatedThisRound, setBurgerCreatedThisRound] = useState(false);

  // бутылка

  const [isBottleActive, setBottleActive] = useState(false);
  const [bottleTimer, setBottleTimer] = useState(null);
  const [nextBottleRound, setNextBottleRound] = useState(getRandomRoundBottle());

  // Сохранение игры

  const sendSave = async () => {
    try {
      const response = await fetch(`${API_URL}/boosts/save_game`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          initData: window.Telegram.WebApp.initData,
          points: score
        })
      });
    
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    
      const data = await response.text();
      console.log("Save", data, heart);
    } catch (err) {
      console.error("Err save", err);
    }
  };
  

  // Таймер раунд 

  const [seconds, setSeconds] = useState(60)
  let timerRef = useRef(null);
  const [roundC, setRoundC] = useState(0)

  const startTimerR = () => {
    timerRef.current = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds <= 1) {
          clearInterval(timerRef.current); // Останавливаем таймер
          setCurrentRound(prevRound => prevRound + 1);
          console.log("Current Round", currentRound)
          setGameOver(true);
          winSound.play()
          sendSave();
          return 60;
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
        left: Math.random() * 4000 + 1200,
        bottom: Math.random() * 350 + 100,
      };
      setHearts(prev => [...prev, newHeart]);
      
      setNextHeartRound(getRandomRound()); // Устанавливаем следующий раунд для сердца
      setHeartCreatedThisRound(true); // Помечаем, что сердце было создано
    }
  };

  const checkCollisionWithHeart = useCallback( (rocket, heart) => {
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
  }, []);
  

  
  // Ворона

  const [crows, setCrows] = useState([]);
  const [nextCrowRound, setNextCrowRound] = useState(getRandomRound()); 
  const [crowCreatedThisRound, setCrowCreatedThisRound] = useState(false);

  const checkCollisionWithCrow = useCallback( (rocket, crow) => {
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
  }, []);

  const checkForCrow = () => {
    if (currentRound >= nextCrowRound) {
        const newCrow = {
            id: Date.now(),
            left: 500,
            bottom: Math.random() * 350 + 100, // Случайная высота
        };
        setCrows(prev => [...prev, newCrow]);
        setNextCrowRound(currentRound + 1);
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


  const gravity = -5;
  const lift = -5;

  // Функция для генерации случайного раунда (2-7)
  // function getRandomRound() {
  //   return Math.floor(Math.random() * 6) + 2; // 2-7
  // }
  // function getRandomRound() {
  //   return Math.floor(Math.random() * 5) + 3; // Вернет 2 или 3
  // }
  // function getRandomRoundBurger() {
  //   return Math.floor(Math.random() * 4) + 2; // Вернет 2 или 3
  // }
  // function getRandomRoundFirework() {
  //   return Math.floor(Math.random() * 3) + 1; // Вернет 2 или 3
  // }
  // function getRandomRoundBottle() {
  //   return Math.floor(Math.random() * 6) + 4; // Вернет 2 или 3
  // }

  // function getRandomRound() {
  //   return Math.floor(Math.random() * 5) + 4; // Вернет 2 или 3
  // }
  // function getRandomRoundBurger() {
  //   return Math.floor(Math.random() * 4) + 3; // Вернет 2 или 3
  // }
  // function getRandomRoundFirework() {
  //   return Math.floor(Math.random() * 3) + 2;

  // }
  // function getRandomRoundBottle() {
  //   return Math.floor(Math.random() * 2) + 1;
  // }

  
  function getRandomRound() {
    return 1;
  }
  function getRandomRoundBottle() {
    return 2;
  }



  const handleFly = () => {
    setIsFlying(true);
    if (rocketSound && !isMuted) {
      rocketSound.play();
    }
  };

  const stopFlying = () => {
    setIsFlying(false);
    if (rocketSound) {
      rocketSound.pause();
      rocketSound.currentTime = 0;
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

      // Обработчики для касания на мобильных устройствах
    const handleTouchStart = () => {
      handleFly();
    };
  
    const handleTouchEnd = () => {
      stopFlying();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd)
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

  const checkCollisionWithCoin = useCallback( (rocket, coin) => {
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
  }, []);

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

  const checkCollisionWithSkyObstacle =  (rocket) => {
    if (isCanisterActive) {
      return false;
    }
    const rocketLeft = 70;
    const rocketRight = rocketLeft + 70;
    const rocketBottom = rocket;
    const rocketTop = rocketBottom + 70;

    for (let skyObstacle of skyObstacles) {
      const skyObstacleLeft = skyObstacle.left;
      const skyObstacleRight = skyObstacleLeft + 50;
      const skyObstacleBottom = skyObstacle.bottom;
      const skyObstacleTop = skyObstacleBottom + 50;

      if (
        rocketRight > skyObstacleLeft &&
        rocketLeft < skyObstacleRight &&
        rocketTop > skyObstacleBottom &&
        rocketBottom < skyObstacleTop
      ) {
        return true;
      }
    }
    return false;
  };

  const minusHeart = () => {
    sendSave();
  }

  
  
  // const checkForCanister = () => {
  //   if (!isCanisterActive && !canisterCreatedThisRound) {
  //       // console.log(`Канистра будет появляться в раунде ${currentRound}!`); // Логируем, что канистра появится
  //       const newCanister = {
  //           id: Date.now(),
  //           left: 500,
  //           bottom: Math.random() * 350 + 100,
  //       };
  //       setCanisters(prev => [...prev, newCanister]);

  //       // Помечаем, что в этом раунде канистра была создана
  //       setCanisterCreatedThisRound(true);
  //   } else {
  //       // console.log(`Канистра уже была создана в раунде ${currentRound}.`); // Логируем, что канистра не появится
  //   }
  // };
  // 




  const startNewRound = () => {
    setCanisterActive(false);
  };

  const gameContainerRef = useRef(null);

  // Определите максимальную высоту ракеты, чтобы она не выходила за 70% высоты контейнера
  const maxHeight = gameContainerRef.current ? gameContainerRef.current.clientHeight * 0.7 : 0;


  const [hasStarted, setHasStarted] = useState(false); // Флаг для отслеживания начала игры
  // Состояния для отслеживания собранной монеты
  const [isCoinCollected, setIsCoinCollected] = useState(false);
  const [collectedCoinId, setCollectedCoinId] = useState(null);
  const [isUpdatingScore, setIsUpdatingScore] = useState(false); // Флаг  обновления счёта

  useEffect(() => {
    if (isCoinCollected && collectedCoinId !== null && !isUpdatingScore) {
      setIsUpdatingScore(true); // Устанавливаем флаг, чтобы предотвратить дублирование
  
      // Обновляем счёт только один раз при сборе монеты
      setScore((prevScore) => prevScore + (isFireworkActive ? 2 : 1) * multiplier * multiplierNft);
      coinMusic.play();
  
      // Удаляем монету с задержкой, чтобы успел отобразиться эффект opacity
      setTimeout(() => {
        setCoins((coins) => coins.filter((coin) => coin.id !== collectedCoinId));
        setCollectedCoinId(null); // Сбрасываем ID собранной монеты
        setIsCoinCollected(false); // Сбрасываем флаг сбора монеты
        setIsUpdatingScore(false); // Сбрасываем флаг обновления счёта
      }, 500); // 500 мс задержка для анимации opacity
    }
  }, [isCoinCollected, collectedCoinId, isUpdatingScore, isFireworkActive, multiplier, multiplierNft]);        



  useEffect(() => {
    if (rocketPosition === 240) {
      setHasStarted(true);
    }
  }, [rocketPosition]);


  useEffect(() => {

    if (!hasStarted) {
      setSt(true)
      setIsFlying(true); // Устанавливаем isFlying в true
  
      setTimeout(() => {
        setIsFlying(false); // Возвращаем isFlying в false через 100 миллисекунд
      }, 100);
      return 
    }
        
    const gameLoop = setInterval(() => {
      
      if (!gameOver) {
        setRocketPosition((prev) => {
          const newPosition = isFlying ? prev - lift : prev + gravity;
          return Math.max(Math.min(newPosition, maxHeight), 0);
        });
        // setRocketPosition((prev) => {
        //   const newPosition = isFlying ? prev - lift : prev + gravity;
        //   return Math.max(newPosition, 0);
        // });
      
        if (rocketSoundRef.current && !isMuted) {
          rocketSoundRef.current.play();
        }
        setSt(false)
        setRestarted(false)
        // setRocketPosition((prev) => {
        //   const newPosition = isFlying ? prev - lift : prev + gravity;
        
        //   // Убедимся, что новая позиция не выходит за границы
        //   return Math.min(Math.max(newPosition, 0), maxHeight);
        // });
        // setRocketPosition((prev) => {
        //   const newPosition = isFlying ? prev - lift : prev + gravity;
  
        //   // Отладочные сообщения
        //   console.log('Prev Position:', prev);
        //   console.log('New Position:', newPosition);
          
        //   const boundedPosition = Math.max(newPosition, 0); // Ограничение по нижней границе
        //   const finalPosition = Math.min(boundedPosition, maxHeight); // Ограничение по верхней границе
          
        //   // Отладочные сообщения
        //   console.log('Bounded Position:', finalPosition);
          
        //   return finalPosition;
        // });
        // setRocketPosition((prev) => {
        //   const newPosition = isFlying ? prev - lift : prev + gravity;
          
        //   // Ограничение по нижней границе
        //   const positionWithLowerBound = Math.max(newPosition, 0);
          
        //   // Ограничение по верхней границе (например, 100)
        //   return Math.min(positionWithLowerBound, maxHeight); // Замените 100 на нужное значение
        // });
        // setRocketPosition((prev) => {
        //   const newPosition = isFlying ? prev - lift : prev + gravity;
        //   return Math.max(newPosition, 0);

        // });
        

        if (checkCollisionWithObstacle(rocketPosition)) {
          if (collisionSound && !isMuted) {
            collisionSound.play(); // Воспроизвести звук столкновения
          }
          setIsFalling(true); // Установить флаг падения
          setGameOver(true);
          sendSave()
          setHeart(prev => prev - 1)
        }
        if (checkCollisionWithSkyObstacle(rocketPosition)) {
          if (collisionSound && !isMuted) {
            collisionSound.play(); // Воспроизвести звук столкновения
          }
          setIsFalling(true); // Установить флаг падения
          setGameOver(true);
          sendSave()
          setHeart(prev => prev - 1)
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
                return false;
              }
            });
          return updatedObstacles;
        })

        setSkyObstacles((prevSkyObstacles) => {
          const updatedSkyObstacles = prevSkyObstacles
            .map((skyObstacle) => ({
              ...skyObstacle,
              // left: skyObstacle.left - speed,
              left: skyObstacle.left - 13,
            }))
            .filter((skyObstacle) => {
              if (skyObstacle.left + 50 > 0) {
                return true;
              } else {
                // Препятствие прошло экран, считаем раунд
                return false;
              }
            });
          return updatedSkyObstacles;
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
                  // setHeart((prev) => {
                  //     console.log("Adding heart!");
                  //     return prev + 1;
                  // });
                  addAttemptts()
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
        // setCoins((prevCoins) =>
        //   prevCoins
        //     .map((coin) => ({
        //       ...coin,
        //       left: coin.left - speed,
        //     }))
        //     .filter((coin) => {
        //       if (checkCollisionWithCoin(rocketPosition, coin) && !isCoinCollected) {
                
        //         coin.isOp = true

        //         // return {
        //         //   ...coin,
        //         //   scale: Math.max(0, coin.scale - 0.1), // Уменьшаем масштаб
        //         // };

        //         setScore((prevScore) => prevScore + (isFireworkActive ? 2 : 1));
        //         setScore((prevScore) => prevScore * multiplier)
        //         setScore((prevScore) => prevScore * multiplierNft)
        //         coinMusic.play()

        //         setTimeout(() => {
        //           setCoins((coins) =>
        //             coins.filter((c) => c.id !== coin.id)
        //           )
        //         }, 500); // Задержка для анимации opacity
        
        //         return true; 

        //         // return false
        //       }
        //       return coin.left + 30 > 0;
        //     })
        // );
        // setCoins((prevCoins) => {
        //   return prevCoins
        //     .map((coin) => {
        //       const updatedCoin = {
        //         ...coin,
        //         left: coin.left - speed,
        //       };
        
        //       // Проверка на столкновение и флаги
        //       if (checkCollisionWithCoin(rocketPosition, coin) && !isCoinCollected && !isUpdatingScore) {
        //         updatedCoin.isOp = true; // Устанавливаем для анимации opacity
        //         setIsCoinCollected(true); // Устанавливаем флаг сбора монеты
        //         setCollectedCoinId(coin.id); // Сохраняем ID собранной монеты
        //       }
        
        //       return updatedCoin;
        //     })
        //     .filter((coin) => coin.left + 30 > 0); // Оставляем только монеты в пределах экрана
        // });
        // setCoins((prevCoins) => {
        //   return prevCoins.map((coin) => {
        //     const updatedCoin = {
        //       ...coin,
        //       left: coin.left - speed,
        //     };
        
        //     // Проверка на столкновение
        //     if (checkCollisionWithCoin(rocketPosition, coin) && !isCoinCollected && !isUpdatingScore) {
        //       updatedCoin.isOp = true; // Устанавливаем для анимации opacity
        //       setIsCoinCollected(true); // Устанавливаем флаг сбора монеты
        //       setCollectedCoinId(coin.id); // Сохраняем ID собранной монеты
        //     }
        
        //     return updatedCoin;
        //   }).filter((coin) => coin.left + 30 > 0); // Оставляем только монеты в пределах экрана
        // });
        setCoins((prevCoins) => {
          return prevCoins.map((coin) => {
            const updatedCoin = {
              ...coin,
              left: coin.left - speed,
            };
      
            // Проверка на столкновение
            if (checkCollisionWithCoin(rocketPosition, coin) && !coin.isCollected) {
              updatedCoin.isCollected = true; // Флаг для этой монеты, чтобы отслеживать, что она собрана
              updatedCoin.isOp = true; // Для анимации opacity
              setScore((prevScore) => prevScore + (isFireworkActive ? 2 : 1) * multiplier * multiplierNft);
              coinMusic.play();
              
              // Запускаем таймер удаления монеты после анимации
              setTimeout(() => {
                setCoins((coins) => coins.filter((c) => c.id !== coin.id));
              }, 500); // 500 мс для анимации
            }
      
            return updatedCoin;
          }).filter((coin) => coin.left + 30 > 0); // Оставляем только монеты в пределах экрана
        });

        

        // Увеличение скорости
        setSpeed((prevSpeed) => Math.min(prevSpeed + 0.001, 10));
        setBackgroundPosition((prev) => prev + speed * 0.5);

        // Проверка на необходимость появления буста
        checkForHeart();
      }

    }, 30);



    return () => clearInterval(gameLoop);
  }, [isFlying, rocketPosition, gameOver, speed, isFireworkActive, currentRound]);


  useEffect(() => {

    const obstacleInterval = setInterval(() => {
      const types = ['box', 'mailbox', 'puddle'];
      const randomType = types[Math.floor(Math.random() * types.length)];

      setObstacles((prevObstacles) => [
        ...prevObstacles,
        { left: 500, bottom: Math.random() * 120 + 10, type: randomType },
      ]);
      // setObstacles((prevObstacles) => [
      //   ...prevObstacles,
      //   { left: 500, bottom: 90, type: randomType },
      // ]);
    }, 2500);
    const skyObstacleInterval = setInterval(() => {
      const types = ['box', 'mailbox', 'puddle'];
      const randomType = types[Math.floor(Math.random() * types.length)];

      // setObstacles((prevObstacles) => [
      //   ...prevObstacles,
      //   { left: 500, bottom: Math.random() * 80 + 20, type: randomType },
      // ]);
      setSkyObstacles((prevSkyObstacles) => [
        ...prevSkyObstacles,
        { left: 500, bottom: Math.random() * 200 + 300, type: randomType },
      ]);
    }, 5000);

    // const coinInterval = setInterval(() => {
    //   setCoins((prevCoins) => [
    //     ...prevCoins,
    //     { left: 500, bottom: Math.random() * 500 + 0, isOp: false, isCollected: false},
    //   ]);
    // }, 1500);
    const coinInterval = setInterval(() => {
      setCoins((prevCoins) => [
        ...prevCoins,
        {
          id: Date.now() + Math.random(), // Уникальный ID
          left: 500,
          bottom: Math.random() * 500 + 0,
          isOp: false,
          isCollected: false, // Добавляем флаг
        },
      ]);
    }, 1500);
    // КОИН ИНТЕРВАЛ

    return () => {
      clearInterval(obstacleInterval);
      clearInterval(skyObstacleInterval)
      clearInterval(coinInterval);
    };
  }, []);

  const restartGame = () => {
    if (heart > 0) {
      setRestarted(true)
      setRocketPosition(240);
      setIsFlying(false);
      setObstacles([{ left: 300, bottom: 50, type: 'box' }]);
      setSkyObstacles([{ left: 300, bottom: 3000, type: 'box' }]);
      setCoins([{ left: 300, bottom: Math.random() * 350 +  100, isCollected: false }]);
      setScore(0);
      setGameOver(false);
      setBackgroundPosition(0);  
      setSpeed(6);
      setIsFalling(false);
      setCanisterActive(false);
      // setRoundTime(60); // Сброс времени
      // startTimer(); // Запускаем новый
      clearInterval(timerRef.current);
      setSeconds(60)
      startTimerR();
      setCurrentRound(prevRound => prevRound + 1);

      if (fireworkTimer) {
        clearTimeout(fireworkTimer);
      }

      if (backgroundMusic) {
        backgroundMusic.currentTime = 0;
        backgroundMusic.play();
      }
    } else {
      alert("No hearts")
    }
  };

  useEffect(() => {
    if (backgroundMusic) {
      backgroundMusic.volume = 0.7;
      if (!isMuted) {
        backgroundMusic.play();
      } else {
        backgroundMusic.pause();
      }
    }

    if (rocketSoundRef.current) {
      rocketSoundRef.current.volume = 0.5;
    }

    if (gameOver && backgroundMusic) {
     backgroundMusic.pause();
      // setIsGameActive(false);
    }
  }, [gameOver, isMuted]);

  const toggleMute = () => {
    setIsMuted((prevMuted) => !prevMuted);
  };

  const handleBackBtn = () => {
    backgroundMusic.pause();
    rocketSound.pause();
    collisionSound.pause();
    navigate('/')
  }



  useEffect(() => {
    const getAttemptts = async () => {
      try {
        const response = await fetch(`${API_URL}/boosts/get_attempts`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            initData: window.Telegram.WebApp.initData
          })
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
        console.log("DATA ATTEMPTS:", data);
        setHeart(data.attempts)
        // вот тут сердца
      } catch (err) {
        console.error("Err attempts", err);
      }
    };
    

    const intervalAttempts = setInterval(getAttemptts, 2000);

    return () => clearInterval(intervalAttempts);
  }, []);

  useEffect(() => {
    const getAttemptts = async () => {
      try {
        const response = await fetch(`${API_URL}/boosts/get_attempts`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            initData: window.Telegram.WebApp.initData
          })
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
        console.log("DATA ATTEMPTS:", data);
        setHeart(data.attempts)
        // Вот тут сердца
      } catch (err) {
        console.error("Err attempts", err);
      }
    }
    getAttemptts()
  }, [heart]);




  return (

    <div className={`${styles.game_container} ${!st ? styles.visible : styles.transparent}`}  style={{ backgroundPositionX: `${-backgroundPosition}px` }} ref={gameContainerRef}>
      {/* <audio ref={audioRef} src="/game-music-teste-204327.mp3" loop />
      <audio ref={rocketSoundRef} src="/rocket-in-flight_z1i4ba4_.mp3" />
      <audio ref={collisionSoundRef} src="/583699913672e65.mp3" /> Звук столкновения */}

    {st && 
      <h1 style={{color: 'white'}} className='getReady'>Get Ready!</h1>
    }


      <div className={styles.top_panel}>
        <div className={styles.left_arrow} onClick={handleBackBtn}>
          <MdArrowUpward style={{ transform: 'rotate(-90deg)' }} size={30} color="black" />
        </div>

          <div className={styles.score}> <img src="/2.png" alt="" /> {score}</div>


        <div className={styles.sound_toggle} onClick={toggleMute}>
          {isMuted ? <MdOutlineMusicOff size={20} color='black' /> : <MdOutlineMusicNote size={20} color='black' />}
        </div>

      </div>

      <div className={styles.heart_panel}>
        <div className={styles.hearts}>

          {Array.from({ length: 6 }).map((_, index) => (
          <svg
            width="22"
            height="18"
            viewBox="0 0 22 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            key={index}
          >
          <path
            className={styles.heart_tr}
            style={{ fill: index < heart ? '#C12336' : '#13639A' }}
            d="M21.7494 6.1094C21.7011 7.69476 21.0432 9.2098 20.1338 10.4846C17.7335 13.8494 13.6149 16.4304 11.6752 17.4818H10.3073C8.27357 16.0385 5.46966 13.6431 3.21631 10.4846C2.30691 9.2098 1.649 7.69476 1.60071 6.1094C1.55782 4.70616 2.01229 3.29236 2.8577 2.19639C3.70312 1.10066 5.60513 0 5.60513 0H6.97298C7.3119 0 7.65855 0.0440638 8.00309 0.128207C9.54556 0.505093 11.0491 1.68497 11.6749 3.29916C12.301 1.68497 15.0092 0 15.0092 0H16.3771C16.6192 0 16.8571 0.0225007 17.0884 0.0686739C18.4162 0.335869 19.6469 1.10066 20.4926 2.19639C21.338 3.29236 21.7925 4.70616 21.7494 6.1094Z"
          />
          <path
            className={styles.heart_tr}
            style={{ fill: index < heart ? '#E23030' : '#13639A' }}
            d="M20.3815 6.1094C20.3332 7.69476 19.6753 9.2098 18.7659 10.4846C16.3656 13.8494 12.2471 16.4304 10.3073 17.4818C8.36781 16.4304 4.24925 13.8496 1.84871 10.4846C0.939078 9.2098 0.281168 7.69476 0.232885 6.1094C0.189993 4.70616 0.64446 3.29236 1.48988 2.19639C2.33553 1.10066 3.56627 0.335869 4.89404 0.0686739C5.12491 0.0222663 5.36327 0 5.60492 0C5.94384 0 6.29049 0.0440638 6.63503 0.128207C8.17749 0.505093 9.68106 1.68497 10.3069 3.29916C10.9327 1.68497 12.4362 0.505093 13.9789 0.128207C14.3235 0.0440638 14.6699 0 15.0088 0C15.2509 0 15.4888 0.0225007 15.7201 0.0686739C17.0479 0.335869 18.2787 1.10066 19.1243 2.19639C19.9697 3.29236 20.4242 4.70616 20.3811 6.1094H20.3815Z"
          />
          </svg>
          ))}

          {/* {Array.from({ length: heart }, (_, index) => (

            

            <svg width="22" height="18" viewBox="0 0 22 18"  fill="none" xmlns="http://www.w3.org/2000/svg" key={index}>
              <path className={styles.heart_tr}  style={{ fill: index < heart ? '#C12336' : '#13639A' }} d="M21.7494 6.1094C21.7011 7.69476 21.0432 9.2098 20.1338 10.4846C17.7335 13.8494 13.6149 16.4304 11.6752 17.4818H10.3073C8.27357 16.0385 5.46966 13.6431 3.21631 10.4846C2.30691 9.2098 1.649 7.69476 1.60071 6.1094C1.55782 4.70616 2.01229 3.29236 2.8577 2.19639C3.70312 1.10066 5.60513 0 5.60513 0H6.97298C7.3119 0 7.65855 0.0440638 8.00309 0.128207C9.54556 0.505093 11.0491 1.68497 11.6749 3.29916C12.301 1.68497 15.0092 0 15.0092 0H16.3771C16.6192 0 16.8571 0.0225007 17.0884 0.0686739C18.4162 0.335869 19.6469 1.10066 20.4926 2.19639C21.338 3.29236 21.7925 4.70616 21.7494 6.1094Z"/>
              <path className={styles.heart_tr} style={{ fill: index < heart ? '#E23030' : '#13639A' }} d="M20.3815 6.1094C20.3332 7.69476 19.6753 9.2098 18.7659 10.4846C16.3656 13.8494 12.2471 16.4304 10.3073 17.4818C8.36781 16.4304 4.24925 13.8496 1.84871 10.4846C0.939078 9.2098 0.281168 7.69476 0.232885 6.1094C0.189993 4.70616 0.64446 3.29236 1.48988 2.19639C2.33553 1.10066 3.56627 0.335869 4.89404 0.0686739C5.12491 0.0222663 5.36327 0 5.60492 0C5.94384 0 6.29049 0.0440638 6.63503 0.128207C8.17749 0.505093 9.68106 1.68497 10.3069 3.29916C10.9327 1.68497 12.4362 0.505093 13.9789 0.128207C14.3235 0.0440638 14.6699 0 15.0088 0C15.2509 0 15.4888 0.0225007 15.7201 0.0686739C17.0479 0.335869 18.2787 1.10066 19.1243 2.19639C19.9697 3.29236 20.4242 4.70616 20.3811 6.1094H20.3815Z"/>
            </svg>
          ))} */}
        </div>
        <div className={styles.timers}>
          {/* таймер */}
          {(isFireworkActive || isCanisterActive || isBottleActive) && (
            <div className={styles.boost_timer}  style={{width: '50px', display: 'flex', alignItems: 'center'}}>
              <img src="/rocket.png" alt="" width={20} height={19}/>
              {boostTimer}
            </div>
          )}
          {/* 60 секунд */}
          <div className={styles.round_timer}>
            <div style={{display: 'flex', alignItems:'center'}}>
              <img src="/finish.svg" alt="" />
              {seconds}
            </div>
          </div>
        </div>
      </div>
      

      <div
        className={`${styles.rocket} ${isFlying ? styles.flying : ''} ${isFalling ? styles.falling : ''}`} 
        style={{ bottom: `${rocketPosition}px` }}
      />

        {/* <div className={styles.timers}>
          {(isFireworkActive || isCanisterActive || isBottleActive) && (
            <div className={styles.boost_timer}  style={{width: '50px', display: 'flex'}}>
              {boostTimer}
            </div>
          )}
          <div className={styles.round_timer}>
            <div style={{display: 'flex', alignItems:'center'}}>
              <img src="/finish.svg" alt="" />
              {seconds}
            </div>
          </div>
        </div> */}

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
      {/* Crow */}
      <RedBird
        currentRound={currentRound}
        rocketPosition={rocketPosition}
        onCollision={() => {
          setSeconds(prev => prev - 15)
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
        {/* Препятствия небо */}
        {skyObstacles.map((skyObstacle, index) => (
        <div
          key={index}
          className={`${styles.skyObstacle} ${styles[skyObstacle.type]}`} // Исправлено
          style={{
            left: `${skyObstacle.left}px`,
            bottom: `${skyObstacle.bottom}px`,
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
      {/* {crows.map((crow) => (
        <img className={styles.crow} key={crow.id} src="/crow.png" alt="Crow" style={{ position: 'absolute', left: crow.left, bottom: crow.bottom }} />
      ))} */}

      {/* Монеты */}
      {coins.map((coin, index) => (
        <div
          key={index}
          // className={styles.coin }
          className={`${styles.coin} ${coin.isOp ? styles.isOp : styles.coin}`}
          style={{
            left: `${coin.left}px`,
            bottom: `${coin.bottom}px`,
          }}
        />
      ))}

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

      {/* Канистры */}
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


      <Canister 
        currentRound={currentRound} 
        setSpeed={setSpeed}
        gameOver={gameOver}
        setCanistersActive={setCanisterActive}
        isCanistersActive={isCanisterActive} 
        setIsCanisterActive={setCanisterActive}
        setCanisterActive={setCanisterTimer} 
        setBoostTimer={setBoostTimer} 
        setIsInvincible={setIsInvincible}
        speed={speed} 
        rocketPosition={rocketPosition}
        restarted={restarted}
      />  

      {/* <Firework 
        currentRound={currentRound} 
        setSpeed={setSpeed}
        gameOver={gameOver}
        setCanistersActive={setCanisterActive}
        isCanistersActive={isCanisterActive} 
        setIsCanisterActive={setCanisterActive}
        setCanisterActive={setCanisterTimer} 
        setBoostTimer={setBoostTimer} 
        setIsInvincible={setIsInvincible}
        speed={speed} 
        rocketPosition={rocketPosition}
      /> */}

      <Firework 
        currentRound={currentRound} 
        setSpeed={setSpeed} 
        speed={speed} 
        gameOver={gameOver} 
        rocketPosition={rocketPosition} 
        setFireworkActive={setFireworkActive} 
        isFireworkActive={isFireworkActive} 
        setBoostTimer={setBoostTimer} 
        setScore={setScore}
        restarted={restarted}
      />  
      <Bottle 
        currentRound={currentRound} 
        setSpeed={setSpeed} 
        speed={speed} 
        gameOver={gameOver} 
        rocketPosition={rocketPosition} 
        setBottleActive={setBottleActive} 
        isBottleActive={isBottleActive} 
        setBoostTimer={setBoostTimer}
        setIsInvincible={setIsInvincible}
        setScore={setScore}
        restarted={restarted}
      />    


      {/* Бутылка */}
      {/* {bottles.map((bottle) => (
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
      ))} */}

      {/* Бургер */}
      {/* {burgers.map((burger) => (
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
      ))} */}

      <Burger
        currentRound={currentRound}
        setIsInvincible={setIsInvincible}
        setSeconds={setSeconds}
        setSpeed={setSpeed}
        speed={speed}
        gameOver={gameOver}
        rocketPosition={rocketPosition}
        restarted={restarted}
      />




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
             backgroundColor: heart <= 0 ? 'grey' : '#51B3F6' }} > <img src="/Heart.svg" alt="" /> Try again</button>
          <a onClick={() => {
            navigate('/')
          }}>No, thanks</a>
        </div>
      )}

      {/* Кнопка управления полетом */}
      {/* <div
        className={styles.flight_button}
        onMouseDown={handleFly}
        onMouseUp={stopFlying}
        onTouchStart={handleFly} 
        onTouchEnd={stopFlying}  
      >
      </div> */}
    </div>
  );
};

export default Game;

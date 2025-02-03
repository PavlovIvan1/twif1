import { create } from 'zustand'

// Функция для генерации случайного раунда
const getRandomRound = (min = 2, max = 7) => Math.floor(Math.random() * (max - min + 1)) + min;

// Основное хранилище состояния игры
export const useGameStore = create((set) => ({
    // Позиция ракеты
    rocketPosition: 120,
    setRocketPosition: (position) => set({ rocketPosition: position }),

    // Полеты
    isFlying: false,
    setIsFlying: (isFlying) => set({ isFlying }),

    // Препятствия
    obstacles: [{ left: 300, bottom: 50, type: 'box' }],
    setObstacles: (obstacles) => set({ obstacles }),

    skyObstacles: [{ left: 300, bottom: 300, type: 'shoot' }],
    setSkyObstacles: (skyObstacles) => set({ skyObstacles }),

    // Монеты
    coins: [{ left: 300, bottom: Math.random() * 300 + 80 }],
    setCoins: (coins) => set({ coins }),

    // Бусты
    fireworks: [],
    setFireworks: (fireworks) => set({ fireworks }),
    score: 0,
    setScore: (score) => set({ score }),
    gameOver: false,
    setGameOver: (gameOver) => set({ gameOver }),
    backgroundPosition: 0,
    setBackgroundPosition: (position) => set({ backgroundPosition: position }),
    isMuted: false,
    setIsMuted: (isMuted) => set({ isMuted }),
    speed: 6,
    setSpeed: (speed) => set({ speed }),
    isFalling: false,
    setIsFalling: (isFalling) => set({ isFalling }),
    heart: 6,
    setHeart: (heart) => set({ heart }),

    // Буст Фейерверк
    isFireworkActive: false,
    setFireworkActive: (isActive) => set({ isFireworkActive: isActive }),
    fireworkTimer: null,
    setFireworkTimer: (timer) => set({ fireworkTimer: timer }),
    currentRound: 0,
    setCurrentRound: (round) => set({ currentRound: round }),
    nextFireworkRound: getRandomRound(),
    setNextFireworkRound: (round) => set({ nextFireworkRound: round }),
    fireworkCreatedThisRound: false,
    setFireworkCreatedThisRound: (created) => set({ fireworkCreatedThisRound: created }),

    // Буст Канистра
    canisters: [],
    setCanisters: (canisters) => set({ canisters }),
    isCanisterActive: false,
    setCanisterActive: (isActive) => set({ isCanisterActive: isActive }),
    canisterTimer: null,
    setCanisterTimer: (timer) => set({ canisterTimer: timer }),
    nextCanisterRound: getRandomRound(),
    setNextCanisterRound: (round) => set({ nextCanisterRound: round }),
    canisterCreatedThisRound: false,
    setCanisterCreatedThisRound: (created) => set({ canisterCreatedThisRound: created }),
    isInvincible: false,
    setIsInvincible: (isInvincible) => set({ isInvincible }),

    // Буст Бургер
    burgers: [],
    setBurgers: (burgers) => set({ burgers }),
    isBurgerActive: false,
    setBurgerActive: (isActive) => set({ isBurgerActive: isActive }),
    burgerTimer: null,
    setBurgerTimer: (timer) => set({ burgerTimer: timer }),
    nextBurgerRound: getRandomRound(),
    setNextBurgerRound: (round) => set({ nextBurgerRound: round }),
    burgerCreatedThisRound: false,
    setBurgerCreatedThisRound: (created) => set({ burgerCreatedThisRound: created }),

    // Буст Бутылка
    bottles: [],
    setBottles: (bottles) => set({ bottles }),
    isSlowMoActive: false,
    setIsSlowMoActive: (isActive) => set({ isSlowMoActive: isActive }),
    isBottleActive: false,
    setBottleActive: (isActive) => set({ isBottleActive: isActive }),
    bottleTimer: null,
    setBottleTimer: (timer) => set({ bottleTimer: timer }),
    nextBottleRound: getRandomRound(),
    setNextBottleRound: (round) => set({ nextBottleRound: round }),
    bottleCreatedThisRound: false,
    setBottleCreatedThisRound: (created) => set({ bottleCreatedThisRound: created }),

    // Сердца
    hearts: [],
    setHearts: (hearts) => set({ hearts }),
    isHeartActive: false,
    setHeartActive: (isActive) => set({ isHeartActive: isActive }),
    nextHeartRound: getRandomRound(),
    setNextHeartRound: (round) => set({ nextHeartRound: round }),
    heartCreatedThisRound: false,
    setHeartCreatedThisRound: (created) => set({ heartCreatedThisRound: created }),

    // Общий буст
    boostActive: false,
    setBoostActive: (isActive) => set({ boostActive: isActive }),
    boostTimer: 15,
    setBoostTimer: (time) => set({ boostTimer: time }),

		seconds: 60,
    setSeconds: (time) => set({ seconds: time }),

}));
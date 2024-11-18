// import React, { useEffect, useState } from 'react'

// const Crow = ({ currentRound, rocketPosition, onCollision }) => {
//   const [crowPosition, setCrowPosition] = useState({ left: 500, bottom: getRandomBottom() });
//   const [crowCreatedThisRound, setCrowCreatedThisRound] = useState(0); // Счетчик созданных ворон в текущем раунде
//   const [isVisible, setIsVisible] = useState(false); // Изначально ворона невидима
//   const [crowFrame, setCrowFrame] = useState(0); // Состояние для анимации

//   useEffect(() => {
//     // Обнуляем счетчик ворон при каждом новом раунде
//     setCrowCreatedThisRound(0);
//   }, [currentRound]);

//   useEffect(() => {
//     // Спавним ворону, если в текущем раунде их меньше 3
//     if (crowCreatedThisRound < 3) {
//       setCrowPosition({ left: getRandomLeft(), bottom: getRandomBottom() });
//       setCrowCreatedThisRound((prev) => prev + 1);
//       setIsVisible(true); // Показываем ворону
//     }
//   }, [currentRound, crowCreatedThisRound]);

//   useEffect(() => {
//     // Анимация смены кадров
//     const animationInterval = setInterval(() => {
//       setCrowFrame((prevFrame) => (prevFrame === 0 ? 1 : 0)); // Меняем кадр между 0 и 1
//     }, 100); // Частота смены кадров (100 мс)

//     return () => clearInterval(animationInterval);
//   }, []);

//   useEffect(() => {
//     if (isVisible) {
//       const moveInterval = setInterval(() => {
//         setCrowPosition((prev) => ({ ...prev, left: prev.left - 8 }));

//         // Проверка столкновения с ракетой
//         if (
//           crowPosition.left < 50 && crowPosition.left > 0 && // Координаты ракеты по оси X
//           rocketPosition < crowPosition.bottom + 40 && rocketPosition > crowPosition.bottom - 40 // Координаты ракеты по оси Y
//         ) {
//           setIsVisible(false); // Скрываем ворону сразу при столкновении
//           onCollision(); // Вызываем функцию столкновения
//         }

//         // Убираем ворону, если она выходит за пределы экрана
//         if (crowPosition.left < -40) {
//           setIsVisible(false);
//         }
//       }, 30);

//       return () => clearInterval(moveInterval);
//     }
//   }, [crowPosition, rocketPosition, isVisible]);

//   const crowImage = crowFrame === 0 ? '/Crow.png' : '/Crow2.png'; // Выбор изображения для анимации

//   return isVisible ? (
//     <div
//       style={{
//         position: 'absolute',
//         width: '60px',
//         height: '60px',
//         backgroundImage: `url(${crowImage})`, // Меняем изображение в зависимости от кадра
//         backgroundSize: 'contain',
//         backgroundRepeat: 'no-repeat',
//         left: `${crowPosition.left}px`,
//         bottom: `${crowPosition.bottom}px`,
//       }}
//     />
//   ) : null;
// };

// export default Crow;

// // Helper функции
// function getRandomBottom() {
//   const minBottom = 50;
//   const maxBottom = 260;
//   return Math.random() * (maxBottom - minBottom) + minBottom;
// }

// function getRandomLeft() {
//   const minLeft = 500;
//   const maxLeft = 4000;
//   return Math.random() * (maxLeft - minLeft) + minLeft;
// }

// import React, { useEffect, useState } from 'react'

// const Crow = ({ currentRound, rocketPosition, onCollision }) => {
//   const [crowPosition, setCrowPosition] = useState({ left: 500, bottom: getRandomBottom() });
//   const [crowCreatedThisRound, setCrowCreatedThisRound] = useState(0); // Счетчик созданных ворон в текущем раунде
//   const [isVisible, setIsVisible] = useState(false); // Изначально ворона невидима
//   const [crowFrame, setCrowFrame] = useState(0); // Состояние для анимации

//   useEffect(() => {
//     // Обнуляем счетчик ворон при каждом новом раунде
//     setCrowCreatedThisRound(0);
//   }, [currentRound]);

//   useEffect(() => {
//     // Спавним ворону, если в текущем раунде их меньше 5
//     if (crowCreatedThisRound < 100) {
//       setCrowPosition({ left: getCloseRandomLeft(), bottom: getRandomBottom() });
//       setCrowCreatedThisRound((prev) => prev + 1);
//       setIsVisible(true); // Показываем ворону
//     }
//   }, [currentRound, crowCreatedThisRound]);

//   useEffect(() => {
//     const animationInterval = setInterval(() => {
//       setCrowFrame((prevFrame) => (prevFrame === 0 ? 1 : 0));
//     }, 100)

//     return () => clearInterval(animationInterval);
//   }, []);

//   useEffect(() => {
//     if (isVisible) {
//       const moveInterval = setInterval(() => {
//         setCrowPosition((prev) => ({ ...prev, left: prev.left - 8 }));

//         // Проверка столкновения с ракетой
//         if (
//           crowPosition.left < 50 && crowPosition.left > 0 && // Координаты ракеты по оси X
//           rocketPosition < crowPosition.bottom + 40 && rocketPosition > crowPosition.bottom - 40 // Координаты ракеты по оси Y
//         ) {
//           setIsVisible(false); // Скрываем ворону сразу при столкновении
//           onCollision(); // Вызываем функцию столкновения
//         }

//         // Убираем ворону, если она выходит за пределы экрана
//         if (crowPosition.left < -40) {
//           setIsVisible(false);
//         }
//       }, 30);

//       return () => clearInterval(moveInterval);
//     }
//   }, [crowPosition, rocketPosition, isVisible]);

//   const crowImage = crowFrame === 0 ? '/Crow.png' : '/Crow2.png'; // Выбор изображения для анимации

//   return isVisible ? (
//     <div
//       style={{
//         position: 'absolute',
//         width: '60px',
//         height: '60px',
//         backgroundImage: `url(${crowImage})`, // Меняем изображение в зависимости от кадра
//         backgroundSize: 'contain',
//         backgroundRepeat: 'no-repeat',
//         left: `${crowPosition.left}px`,
//         bottom: `${crowPosition.bottom}px`,
//       }}
//     />
//   ) : null;
// };

// export default Crow;

// // Helper функции
// function getRandomBottom() {
//   const minBottom = 50;
//   const maxBottom = 260;
//   return Math.random() * (maxBottom - minBottom) + minBottom;
// }

// // Создаем воронов с меньшим разбросом по left, чтобы они шли близко друг к другу
// function getCloseRandomLeft() {
//   const minLeft = 500;
//   const maxLeft = 3000; // Уменьшаем максимальный left для меньшего расстояния между воронами
//   return Math.random() * (maxLeft - minLeft) + minLeft;
// }

// import React, { useEffect, useState } from 'react'

// const Crow = ({ currentRound, rocketPosition, onCollision }) => {
//   const maxCrowsPerRound = Math.random() < 0.5 ? 2 : 3;
//   const [crows, setCrows] = useState([]);

//   useEffect(() => {
//     const newCrows = [];
//     const occupiedPositions = new Set(); // Массив для хранения занятых позиций

//     while (newCrows.length < maxCrowsPerRound) {
//       const left = getRandomLeft();
//       if (!occupiedPositions.has(left)) { // Проверяем, свободна ли позиция
//         occupiedPositions.add(left); // Добавляем позицию в занятые
//         newCrows.push({
//           left,
//           bottom: getRandomBottom(),
//           isVisible: true,
//           crowFrame: 0,
//         });
//       }
//     }

//     setCrows(newCrows);
//   }, [currentRound]);

//   useEffect(() => {
//     const animationInterval = setInterval(() => {
//       setCrows((prevCrows) =>
//         prevCrows.map((crow) => ({
//           ...crow,
//           crowFrame: crow.crowFrame === 0 ? 1 : 0,
//         }))
//       );
//     }, 100);

//     return () => clearInterval(animationInterval);
//   }, []);

//   useEffect(() => {
//     const moveInterval = setInterval(() => {
//       setCrows((prevCrows) =>
//         prevCrows.map((crow) => {
//           if (!crow.isVisible) return crow; // Пропускаем скрытых ворон
//           const newLeft = crow.left - 12;

//           // Проверка столкновения с ракетой
//           if (
//             newLeft < 50 &&
//             newLeft > 0 &&
//             rocketPosition < crow.bottom + 40 &&
//             rocketPosition > crow.bottom - 40
//           ) {
//             onCollision(); // Вызываем функцию столкновения
//             return { ...crow, isVisible: false }; // Скрываем ворону при столкновении
//           }

//           // Скрываем ворону, если она уходит за пределы экрана
//           if (newLeft < -40) return { ...crow, isVisible: false };

//           // Обновляем позицию вороны
//           return { ...crow, left: newLeft };
//         })
//       );
//     }, 30);

//     return () => clearInterval(moveInterval);
//   }, [rocketPosition, onCollision]);

//   return (
//     <>
//       {crows.map(
//         (crow, index) =>
//           crow.isVisible && (
//             <div
//               key={index}
//               style={{
//                 position: 'absolute',
//                 width: '60px',
//                 height: '60px',
//                 backgroundImage: `url(${crow.crowFrame === 0 ? '/Crow.png' : '/Crow2.png'})`,
//                 backgroundSize: 'contain',
//                 backgroundRepeat: 'no-repeat',
//                 left: `${crow.left}px`,
//                 bottom: `${crow.bottom}px`,
//               }}
//             />
//           )
//       )}
//     </>
//   );
// };

// export default Crow;

// // Helper функции
// function getRandomBottom() {
//   const minBottom = 50;
//   const maxBottom = 260;
//   return Math.random() * (maxBottom - minBottom) + minBottom;
// }

// // Генерация случайной позиции по оси left с учетом диапазона
// function getRandomLeft() {
//   const minLeft = 500; // Минимальная позиция слева
//   const maxLeft = 800; // Максимальная позиция слева (можно изменить)
//   return Math.floor(Math.random() * (maxLeft - minLeft + 1)) + minLeft; // Генерируем случайное значение в заданном диапазоне
// }

// import React, { useEffect, useState } from 'react'

// const Crow = ({ currentRound, rocketPosition, onCollision }) => {
//   const maxCrowsPerRound = Math.random() < 0.5 ? 2 : 3;
//   const [crows, setCrows] = useState([]); // Массив ворон

//   useEffect(() => {
//     // Обновляем массив ворон при начале нового раунда
//     const newCrows = Array.from({ length: maxCrowsPerRound }, () => ({
//       left: getCloseRandomLeft(),
//       bottom: getRandomBottom(),
//       isVisible: true,
//       crowFrame: 0,
//     }));
//     setCrows(newCrows);
//   }, [currentRound]);

//   useEffect(() => {
//     const animationInterval = setInterval(() => {
//       setCrows((prevCrows) =>
//         prevCrows.map((crow) => ({
//           ...crow,
//           crowFrame: crow.crowFrame === 0 ? 1 : 0,
//         }))
//       );
//     }, 500);

//     return () => clearInterval(animationInterval);
//   }, []);

//   useEffect(() => {
//     const moveInterval = setInterval(() => {
//       setCrows((prevCrows) =>
//         prevCrows.map((crow) => {
//           if (!crow.isVisible) return crow; // Пропускаем скрытых ворон
//           const newLeft = crow.left - 12;

//           // Проверка столкновения с ракетой
//           if (
//             newLeft < 50 &&
//             newLeft > 0 &&
//             rocketPosition < crow.bottom + 40 &&
//             rocketPosition > crow.bottom - 40
//           ) {
//             onCollision(); // Вызываем функцию столкновения
//             return { ...crow, isVisible: false }; // Скрываем ворону при столкновении
//           }

//           // Скрываем ворону, если она уходит за пределы экрана
//           if (newLeft < -40) return { ...crow, isVisible: false };

//           // Обновляем позицию вороны
//           return { ...crow, left: newLeft };
//         })
//       );
//     }, 30);

//     return () => clearInterval(moveInterval);
//   }, [rocketPosition, onCollision]);

//   return (
//     <>
//       {crows.map(
//         (crow, index) =>
//           crow.isVisible && (
//             <div
//               key={index}
//               style={{
//                 position: 'absolute',
//                 width: '60px',
//                 height: '60px',
//                 backgroundImage: `url(${crow.crowFrame === 0 ? '/Crow.png' : '/Crow2.png'})`,
//                 backgroundSize: 'contain',
//                 backgroundRepeat: 'no-repeat',
//                 left: `${crow.left}px`,
//                 bottom: `${crow.bottom}px`,
//               }}
//             />
//           )
//       )}
//     </>
//   );
// };

// export default Crow;

// function getRandomBottom() {
//   const minBottom = 50;
//   const maxBottom = 260;
//   return Math.random() * (maxBottom - minBottom) + minBottom;
// }

// function getCloseRandomLeft() {
//   const minLeft = 10000; // Начальная позиция
//   const maxLeft = 12000; // Увеличенное расстояние
//   return Math.random() * (maxLeft - minLeft) + minLeft;
// }

import React, { useEffect, useState } from 'react'

const Crow = React.memo( ({ currentRound, rocketPosition, onCollision }) => {
  const maxCrowsPerRound = Math.random() < 0.5 ? 2 : 3;
  const [crows, setCrows] = useState([]); // Массив ворон

  useEffect(() => {
    // Обновляем массив ворон при начале нового раунда
    const newCrows = [];
    let currentLeft = getCloseRandomLeft(); // Начальная позиция для первой вороны

    for (let i = 0; i < maxCrowsPerRound + 5; i++) {
      newCrows.push({
        left: currentLeft,
        bottom: getRandomBottom(),
        isVisible: true,
        crowFrame: 0,
      });

      // Обновляем текущую позицию, добавляя смещение
      currentLeft += 5000; // Добавляем 4000 пикселей к позиции для следующей вороны
    }

    setCrows(newCrows);
  }, [currentRound]);

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setCrows((prevCrows) =>
        prevCrows.map((crow) => ({
          ...crow,
          crowFrame: crow.crowFrame === 0 ? 1 : 0,
        }))
      );
    }, 500);

    return () => clearInterval(animationInterval);
  }, []);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      setCrows((prevCrows) =>
        prevCrows.map((crow) => {
          if (!crow.isVisible) return crow; // Пропускаем скрытых ворон
          const newLeft = crow.left - 12;

          // Проверка столкновения с ракетой
          if (
            newLeft < 50 &&
            newLeft > 0 &&
            rocketPosition < crow.bottom + 40 &&
            rocketPosition > crow.bottom - 40
          ) {
            onCollision(); // Вызываем функцию столкновения
            return { ...crow, isVisible: false }; // Скрываем ворону при столкновении
          }

          // Скрываем ворону, если она уходит за пределы экрана
          if (newLeft < -40) return { ...crow, isVisible: false };

          // Обновляем позицию вороны
          return { ...crow, left: newLeft };
        })
      );
    }, 30);

    return () => clearInterval(moveInterval);
  }, [rocketPosition, onCollision]);

  return (
    <>
      {crows.map(
        (crow, index) =>
          crow.isVisible && (
            <div
              key={index}
              style={{
                position: 'absolute',
                width: '60px',
                height: '60px',
                backgroundImage: `url(${crow.crowFrame === 0 ? '/Crow.png' : '/Crow2.png'})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                left: `${crow.left}px`,
                bottom: `${crow.bottom}px`,
              }}
            />
          )
      )}
    </>
  );
});

export default Crow;

function getRandomBottom() {
  const minBottom = 250;
  const maxBottom = 500;
  return Math.random() * (maxBottom - minBottom) + minBottom;
}

function getCloseRandomLeft() {
  const minLeft = 2000; // Установите минимальное расстояние здесь
  const maxLeft = 4000; // Максимальное расстояние
  return Math.random() * (maxLeft - minLeft) + minLeft;
}


// function getCloseRandomLeft() {
//   const minLeft = 500;
//   const maxLeft = 3000;
//   return Math.random() * (maxLeft - minLeft) + minLeft;
// }

// function getCloseRandomLeft(index) {
//   const baseLeft = 100; // Начальная позиция
//   const spacing = 100; // Расстояние между воронами
//   return baseLeft + spacing; // Увеличиваем позицию для каждой 
// }

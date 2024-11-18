import React, { useEffect, useState } from 'react'

const Heart = ({ rocketPosition, onCollect, speed }) => {
    const [heartPosition, setHeartPosition] = useState({
        x: window.innerWidth, // Начальная позиция сердца за правой границей экрана
        y: Math.random() * window.innerHeight // Случайная позиция по высоте
    });

    // Обновляем позицию сердца на каждом кадре
    useEffect(() => {
        const intervalId = setInterval(() => {
            setHeartPosition(prevPosition => ({
                x: prevPosition.x - speed, // Двигаем сердце влево
                y: prevPosition.y
            }));

            // Проверка на столкновение с ракетой
            if (
                heartPosition.x < rocketPosition.x + 50 &&
                heartPosition.x + 50 > rocketPosition.x &&
                heartPosition.y < rocketPosition.y + 50 &&
                heartPosition.y + 50 > rocketPosition.y
            ) {
                onCollect(); // Вызываем функцию при сборе
                setHeartPosition({ x: window.innerWidth, y: Math.random() * window.innerHeight }); // Перемещаем сердце за экран
            }

            // Перемещаем сердце обратно, если оно вышло за левую границу экрана
            if (heartPosition.x < 0) {
                setHeartPosition({ x: window.innerWidth, y: Math.random() * window.innerHeight });
            }
        }, 1000 / 60); // 60 FPS

        return () => clearInterval(intervalId);
    }, [rocketPosition, heartPosition, onCollect, speed]);

    return (
        <img
            src="/Heart.png"
            alt="Heart"
            style={{
                position: 'absolute',
                left: heartPosition.x,
                top: heartPosition.y,
                width: '50px',
                height: '50px',
            }}
        />
    );
};

export default Heart;

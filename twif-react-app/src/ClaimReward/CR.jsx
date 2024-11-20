// import { useRef } from "react"
// import styles from "./CR.module.scss"

// export function ClaimRewards() {

// 	const handleClick = () => {
//     const element = document.getElementById("Not_Complited");
//     if (element) {
//       element.style.background = "black"
//     }
//   };

// 	const buttonRef = useRef(null)
// 	const buttonRef2 = useRef(null)

// 	const onClick = () => {
// 		buttonRef.current.style.backgroundColor = "#009748"
// 		buttonRef.current.style.transition = "300ms background-color"
// 		buttonRef.current.style.boxShadow = "0 0 2rem #009748"
// 		buttonRef.current.innerText = "✓"
// 	}

// 	const onClick2 = () => {
// 		buttonRef2.current.style.backgroundColor = "#009748"
// 		buttonRef2.current.style.transition = "0.4s background-color"
// 		buttonRef2.current.style.boxShadow = "0 0 2rem #009748"
// 		buttonRef2.current.innerText = "✓"
// 	}

// 	return (
// 		<>


// 			<div className={styles.ClaimRewards}>
// 				<div className={styles.ClaimRewards__title}><h3>Claim rewards</h3> <span>🕦 23:12:56</span></div>
// 				<div className={styles.ClaimRewards__list}>
// 					<div className={styles.ClaimRewards__task}>
// 						<div className={styles.ClaimRewards__content}>
// 							<div className={styles.ClaimRewards__content__text}>
// 								<h4>Follow on X.com</h4>
// 								<p>Brief description of action</p>
// 							</div>
// 							<button ref={buttonRef} onClick={onClick}>Start</ button>
// 						</div>
// 					</div>
// 					<div className={styles.ClaimRewards__task}>
// 						<div className={styles.ClaimRewards__content}>
// 							<div className={styles.ClaimRewards__content__text}>
// 								<h4>Follow on X.com</h4>
// 								<p>Brief description of action</p>
// 							</div>
// 							<button ref={buttonRef2} onClick={onClick2}>Start</ button>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</>
// 	)
// }

import React, {useEffect, useState} from 'react';
import styles from './CR.module.scss';
import {API_URL} from '../config.js';

export function ClaimRewards() {
    const [tasks, setTasks] = useState([]);
    // const [completedTasks, setCompletedTasks] = useState({});

    const [completedTasks, setCompletedTasks] = useState(() => {
        const savedTasks = localStorage.getItem('completedTasks');
        return savedTasks ? JSON.parse(savedTasks) : {};
    });
    
    useEffect(() => {
      localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    }, [completedTasks]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(`${API_URL}/tasks/all`);
                const data = await response.json();
                setTasks(data.tasks || []); // Заполняем массив задач
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    const onClick = (taskId) => {
        setCompletedTasks((prevCompletedTasks) => ({
            ...prevCompletedTasks,
            [taskId]: true, // Отмечаем задачу как завершённую
        }));
        fetch(`${API_URL}/tasks/complete`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ 
                initData: window.Telegram.WebApp.initData,
                'task_id': taskId 
            })
		})
    };

    return (
        <>
            <div className={styles.ClaimRewards}>
                <div className={styles.ClaimRewards__title}>
                    <h3>Claim rewards</h3> {/* <span>🕦 23:12:56</span>} */}
                </div>
                <div className={styles.ClaimRewards__list}>
                    {tasks.map((task) => (
                        <div key={task.id} className={styles.ClaimRewards__task}>
                            <div className={styles.ClaimRewards__content}>
                                <div className={styles.ClaimRewards__content__text}>
                                    <h4>{task.text}</h4>
                                    {/* <p>{task.text}</p> */}
                                </div>
                                <a href={task.url} target="_blank" rel="noopener noreferrer">
                                    <button
                                        onClick={() => onClick(task.id)}
                                        style={{
                                            backgroundColor: completedTasks[task.id] ? '#009748' : '#0A3161',
                                            color: completedTasks[task.id] ? '#fff' : '#fff',
                                            boxShadow: completedTasks[task.id] ? '0 0 2rem #009748' : '#0A3161',
                                            transition: '0.4s background-color',
                                        }}
                                    >
                                        {completedTasks[task.id] ? '✓' : 'Start'}
                                    </button>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

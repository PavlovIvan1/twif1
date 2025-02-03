import React, { useEffect, useState } from 'react'
import { API_URL } from '../config.js'
import styles from './CR.module.scss'

export function ClaimRewards() {
    const [tasks, setTasks] = useState([]);

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
                setTasks(data.tasks || []);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    const onClick = (taskId) => {
        setCompletedTasks((prevCompletedTasks) => ({
            ...prevCompletedTasks,
            [taskId]: true,
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
                    <h3>Claim rewards</h3> 
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

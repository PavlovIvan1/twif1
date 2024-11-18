import { useRef } from "react"
import styles from "./AD.module.scss"

export function AirDrop({title}) {

	const buttonRef = useRef(null)

	const onClick = () => {
		buttonRef.current.style.backgroundColor = "#009748"
		buttonRef.current.style.transition = "0.4s background-color"
		buttonRef.current.style.boxShadow = "0 0 1rem #009748"
		buttonRef.current.innerText = "✓"
	}

	return (
		<>
			<div className={styles.AirDrop}>
				<div className={styles.AirDrop__title}><h3>{title}</h3></div>
				<div className={styles.AirDrop__list}>
					<div className={styles.AirDrop__task}>
						<div className={styles.AirDrop__content}>
							<div className={styles.AirDrop__content__text}>
								<h4>Follow on X.com</h4>
								<p>Brief description of action</p>
							</div>
							<a href="https://www.geeksforgeeks.org/how-to-create-an-html-button-that-acts-like-a-link/" target="_blank">
								<button ref={buttonRef} onClick={onClick}>Start</ button>
							</a>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

// import React, { useEffect, useState } from 'react'
// import styles from "./AD.module.scss"

// export function AirDrop({ title }) {
//     const [tasks, setTasks] = useState([]);
//     const [completedTasks, setCompletedTasks] = useState({}); // Хранит состояние завершенных задач

//     useEffect(() => {
//         // Выполняем запрос к API для получения списка задач
//         const fetchTasks = async () => {
//             try {
//                 const response = await fetch('https://playcloud.pro/tasks/all');
//                 const data = await response.json();
// 								console.log(data)
//                 setTasks(data.tasks); // Сохраняем задачи в стейт
//             } catch (error) {
//                 console.error('Error fetching tasks:', error);
//             }
//         };

//         fetchTasks();
//     }, []);

//     const onClick = (id) => {
//         // Меняем состояние конкретной задачи
//         setCompletedTasks((prevState) => ({
//             ...prevState,
//             [id]: true, // Помечаем задачу как выполненную
//         }));
//     };

//     return (
//         <>
//             <div className={styles.AirDrop}>
//                 <div className={styles.AirDrop__title}>
//                     <h3>{title}</h3>
//                 </div>
//                 <div className={styles.AirDrop__list}>
//                     {tasks.map((task) => (
//                         <div key={task.id} className={styles.AirDrop__task}>
//                             <div className={styles.AirDrop__content}>
//                                 <div className={styles.AirDrop__content__text}>
//                                     <h4>{task.text}</h4>
//                                     <p>{task.text}</p>
//                                 </div>
//                                 <a href={task.url} target="_blank" rel="noopener noreferrer">
//                                     <button
//                                         onClick={() => onClick(task.id)}
//                                         style={{
//                                             backgroundColor: completedTasks[task.id] ? '#009748' : '#fff',
//                                             color: completedTasks[task.id] ? '#fff' : '#000',
//                                             boxShadow: completedTasks[task.id] ? '0 0 1rem #009748' : 'none',
//                                             transition: '0.4s background-color',
//                                         }}
//                                     >
//                                         {completedTasks[task.id] ? '✓' : 'Start'}
//                                     </button>
//                                 </a>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </>
//     );
// }

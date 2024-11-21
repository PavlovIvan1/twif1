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
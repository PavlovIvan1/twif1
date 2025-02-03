import { useLocation, useNavigate } from "react-router-dom"
import styles from "./BM.module.scss"

export function BottomMenu() {
	const navigate = useNavigate()
	const location = useLocation()
	const Home = location.pathname === '/'
	const Parties = location.pathname === '/parties'
	const Store = location.pathname === '/store'
	const EarnMore = location.pathname === '/earnmore'
	const Others = location.pathname === '/others'
	const Claim = location.pathname === '/claim'

	return (
		<div className="pageas_bg">
			<div className={styles.BottomMenu}>

			<svg width="25" id='Home' onClick={() => {navigate('/')}} viewBox="0 0 18 19"  xmlns="http://www.w3.org/2000/svg" style={{ fill: Home ? "black" : "#AAB2BD"  }}>
				<path fill-rule="evenodd" clip-rule="evenodd" d="M10.35 0.3375L17.1 3.6675C17.64 3.9375 18 4.4775 18 5.1075V7.1775C18 8.0775 17.28 8.7975 16.38 8.7975H1.62C0.72 8.7975 0 8.0775 0 7.1775V5.1075C0 4.5675 0.36 3.9375 0.9 3.6675L7.65 0.3375C8.46 -0.1125 9.45 -0.1125 10.35 0.3375ZM1.8 6.9975H16.2V5.2875L9.63 1.9575C9.27 1.7775 8.82 1.7775 8.46 1.9575L1.8 5.1975V6.9975ZM15.57 16.2674H17.1C17.64 16.2674 18 16.6274 18 17.1674C18 17.7074 17.64 18.0674 17.1 18.0674H0.9C0.36 18.0674 0 17.7074 0 17.1674C0 16.6274 0.36 16.2674 0.9 16.2674H2.43V11.0474C2.43 10.5074 2.79 10.1474 3.33 10.1474C3.87 10.1474 4.23 10.5074 4.23 11.0474V16.2674H6.21V11.0474C6.21 10.5074 6.57 10.1474 7.11 10.1474C7.65 10.1474 8.01 10.5074 8.01 11.0474V16.2674H9.99V11.0474C9.99 10.5074 10.35 10.1474 10.89 10.1474C11.43 10.1474 11.79 10.5074 11.79 11.0474V16.2674H13.77V11.0474C13.77 10.5074 14.13 10.1474 14.67 10.1474C15.21 10.1474 15.57 10.5074 15.57 11.0474V16.2674Z"/>
			</svg>


			<svg width="25" onClick={() => {navigate('/parties')}} viewBox="0 0 20 22" xmlns="http://www.w3.org/2000/svg" style={{ fill: Parties ? "black" : "#AAB2BD"  }} >
				<path d="M17.0652 3.63H14.2391C12.9348 3.63 11.6304 3.08 10.7609 2.2C9.4565 0.77 7.71739 0 5.76087 0H2.82609C1.30435 0 0 1.32 0 2.86V3.74V12.54V20.9C0 21.56 0.43478 22 1.08696 22C1.73913 22 2.17391 21.56 2.17391 20.9V12.65V3.85V2.86C2.17391 2.53 2.5 2.2 2.82609 2.2H5.76087C7.06522 2.2 8.3696 2.75 9.2391 3.63C10.5435 4.95 12.3913 5.72 14.2391 5.72H17.0652C17.5 5.72 17.7174 6.05 17.7174 6.38V14.3C17.7174 14.74 17.3913 14.96 17.0652 14.96H14.2391C12.9348 14.96 11.6304 14.41 10.7609 13.53C9.4565 12.21 7.6087 11.44 5.76087 11.44H4.67391C4.02174 11.44 3.58696 11.88 3.58696 12.54C3.58696 13.2 4.02174 13.64 4.67391 13.64H5.86957C7.17391 13.64 8.4783 14.19 9.3478 15.07C10.6522 16.39 12.5 17.16 14.3478 17.16H17.1739C18.8043 17.16 20 15.84 20 14.3V6.49C20 4.95 18.6957 3.63 17.0652 3.63Z"/>
			</svg>

				<svg width="25" onClick={() => {navigate('/store')}} viewBox="0 0 20 16" xmlns="http://www.w3.org/2000/svg" style={{ fill: Store ? "black" : "#AAB2BD"  }}>
					<path d="M17 4.7H14.2C12.4 4.7 10.9 6.2 10.9 8V8.1C10.9 9.9 12.4 11.4 14.2 11.4H16V12C16 13.2 15.1 14.1 14.1 14.1H3.9C2.9 14 2 13.1 2 11.9V4.1C2 2.9 2.9 2 3.9 2H14.1C14.8 2 15.5 2.4 15.8 3.2C16 3.7 16.6 3.9 17.1 3.7C17.6 3.5 17.8 2.9 17.6 2.4C17 0.9 15.6 0 14.1 0H3.9C1.8 0 0 1.8 0 4.1V11.9C0 14.2 1.8 16 3.9 16H14.1C16.3 16 18 14.2 18 11.9V11.1C18.9 10.7 19.5 9.8 19.5 8.8V7.2C19.5 5.8 18.4 4.7 17 4.7ZM12.9 8.1V7.9C12.9 7.2 13.5 6.6 14.2 6.6H17C17.3 6.6 17.5 6.8 17.5 7.1V8.8C17.5 9.1 17.3 9.3 17 9.3H14.2C13.5 9.3 12.9 8.8 12.9 8.1Z" />
				</svg>

				<svg id='earnmore' viewBox="0 0 22 22"
					 xmlns="http://www.w3.org/2000/svg" onClick={() => {navigate('/earnmore')}} style={{ fill: EarnMore ? "black" : "#AAB2BD"  }}>
					<path fill-rule="evenodd" clip-rule="evenodd" d="M13.6998 14.2C13.8998 14.5 14.1998 14.7 14.5998 14.7C14.9998 14.7 15.2998 14.5 15.4998 14.3L16.6998 12.2C17.2998 11.1 18.2998 10.1 19.3998 9.5L21.4998 8.3C21.7998 8.1 21.9998 7.8 21.9998 7.4C21.9998 7 21.7998 6.7 21.4998 6.5L19.3998 5.3C18.2998 4.7 17.2998 3.7 16.6998 2.6L15.4998 0.5C15.2998 0.2 14.9998 0 14.5998 0C14.2998 0 13.8998 0.2 13.7998 0.5L12.5998 2.6C11.9998 3.8 10.9998 4.7 9.89975 5.3L7.7998 6.5C7.4998 6.7 7.2998 7 7.2998 7.4C7.2998 7.7 7.4998 8.1 7.7998 8.2L9.89975 9.4C10.9998 10 11.9998 11 12.4998 12.1L13.6998 14.2ZM10.8998 7.7L10.3998 7.4L10.8998 7.1C12.3998 6.3 13.5998 5.1 14.3998 3.6L14.6998 3.1L14.9998 3.6C15.7998 5.1 16.9998 6.3 18.4998 7.1L18.9998 7.4L18.4998 7.7C16.9998 8.5 15.7998 9.7 14.9998 11.2L14.6998 11.7L14.3998 11.2C13.5998 9.7 12.3998 8.5 10.8998 7.7ZM4.6 21.4998C4.8 21.7998 5.1 21.9998 5.5 21.9998C5.9 21.9998 6.2 21.7998 6.5 21.4998L7.1 20.2998C7.6 19.2998 8.4 18.4998 9.4 17.9998L10.5 17.3998C10.8 17.1998 11 16.8998 11 16.4998C11 16.0998 10.8 15.7998 10.5 15.5998L9.3 14.9998C8.3 14.4998 7.5 13.6998 7 12.6998L6.4 11.4998C6 10.8998 5 10.8998 4.6 11.4998L4 12.6998C3.5 13.6998 2.7 14.4998 1.7 14.9998L0.5 15.5998C0.2 15.7998 0 16.0998 0 16.4998C0 16.7998 0.2 17.1998 0.5 17.3998L1.7 17.9998C2.7 18.4998 3.5 19.2998 4 20.2998L4.6 21.4998ZM5.6 18.9998C5 17.9998 4.1 17.0998 3.1 16.4998C4.1 15.7998 4.9 14.9998 5.5 13.9998C6.2 14.9998 7 15.7998 8.1 16.4998C7.1 17.0998 6.2 17.9998 5.6 18.9998Z"/>
				</svg>

				<svg 
					onClick={() => {navigate('/others')}}
					viewBox="0 0 18 12" xmlns="http://www.w3.org/2000/svg" style={{ fill: Others ? "black" : "#AAB2BD"  }}>
					<path fill-rule="evenodd" clip-rule="evenodd" d="M0 1C0 0.447715 0.447715 0 1 0H17C17.5523 0 18 0.447715 18 1C18 1.55228 17.5523 2 17 2H1C0.447716 2 0 1.55228 0 1ZM0 6C0 5.44772 0.447715 5 1 5H17C17.5523 5 18 5.44772 18 6C18 6.55228 17.5523 7 17 7H1C0.447716 7 0 6.55228 0 6ZM1 10C0.447715 10 0 10.4477 0 11C0 11.5523 0.447715 12 1 12H11C11.5523 12 12 11.5523 12 11C12 10.4477 11.5523 10 11 10H1Z"/>
				</svg>

				<img src="/Claim.svg" alt="claim" onClick={() => {navigate('/claim')}} />


			</div>
		</div>
	)	
}

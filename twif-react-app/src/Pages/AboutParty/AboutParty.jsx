import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import { API_URL } from '../../config.js'
import { useGlobalStore } from '../../useGlobalStore'
import styles from './AboutParty.module.scss'
import { useTonConnectUI } from '@tonconnect/ui-react';

export function LeaderBoard__component({ place, photo, name, tag, colorClass, partyId }) {

	switch (tag) {
		case 'creator':
			colorClass = styles.ProjectColor;
			break;
		case 'members':
			colorClass = styles.MembersColor;
			break;
		case 'vote':
			colorClass = styles.VoteColor;
			break;
		default:
			colorClass = styles.DefaultColor;
			break;
	}


	return (
		<>
			<div className={styles.LeaderBoard__component}>
				<li>{place}</li>
				<img src={`${API_URL}/${photo}`} alt="" className={styles.avatar} />

				<div className={styles.info}>
					<p>{name}</p>
					<div className={styles.Tag}>
						{tag && <span className={colorClass}>{tag}</span>}
					</div>
					{/* <div className={styles.Tag}>
						{tag ? <span className={styles[colorClass]} >{tag}</span> : <></>}
					</div> */}
				</div>

			</div>
		</>
	)
}


export function AboutPartyComp({ partyId, description }) {

	const [partyUsers, setPartyUsers] = useState(null)
	const [deadline, setDeadline] = useState(null)


	useEffect(() => {
		fetch(`	${API_URL}/party/get_party_members?party_id=${partyId}`)
			.then(response => response.json())
			.then(data => {
				console.log("Data:", data);
				setPartyUsers(data.members)
			})
			.catch(err => {
				console.error("Err", err)
			})

		fetch(`${API_URL}/boosts/deadline`)
			.then(response => response.json())
			.then(data => {
				setDeadline(data.deadline)
				console.log("BOOST d.:", data.deadline);
			})
			.catch(err => {
				console.error("Err", err)
			})

	}, [])

	if (!partyUsers) {
		return <div></div>;
	}
	// if (!deadline) {
	// 	return <div></div>;
	// }

	const handleVote = () => {
		fetch(`${API_URL}/party/vote`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				initData: window.Telegram.WebApp.initData,
				party_id: partyId
			})
		})
			.then(response => response.json())
			.then(data => {
				console.log("Vote:", data)
			})
			.catch(error => {
				console.error('Error vote:', error);
			});
	}


	return (
		<>
			<div className={styles.AboutPartyComp}>
				<div className={styles.AboutPartyComp__title}>
					<h3>About party</h3>
				</div>
				<div className={styles.AboutPartyComp__info}>
					{/* <p>The Republican Party, also known as the GOP (Grand Old Party), is one of the two major contemporary political parties in the United States.</p> */}
					<p>{description}</p>
				</div>
				<hr />
				<div className={styles.AboutPartyComp__title}>
					<h3>Distribution</h3>
				</div>
				<div className={styles.AboutPartyComp__stat}>
					<div className={styles.Founder}>
						<label>Founder</label>
						<div className={styles.Founder__comp}></div>
					</div>
					<div className={styles.Members}>
						<label>Members</label>
						<div className={styles.Members__comp}></div>
					</div>
					<div className={styles.Project}>
						<label>Project</label>
						<div className={styles.Project__comp}></div>
					</div>
					<div className={styles.Voted}>
						<label>Voted</label>
						<div className={styles.Voted__comp}></div>
					</div>
				</div>
			</div>

			<div className={styles.Vote}>
				<div className={styles.time}>
					<img src="/Union(1).svg" alt="" />
					<h1>{deadline || "There is no season.."}</h1>
				</div>
				<div className={styles.buttonVote}>
					<button onClick={handleVote}>Vote</button>
				</div>
			</div>

			<div className={styles.lb}>
				<div className={styles.LeaderBoard}>
					<div className={styles.LeaderBoard__title}><h3>Party Members</h3></div>
					<div className={styles.LeaderBoard__list}>


						{/* {partyUsers.map((user, index) => (
				<LeaderBoard__component
          key={user.id}
          place={index + 1} 
          photo={user.avatar} 
          name={user.fullname}
					tag={user.status}/>
      	))} */}

						{partyUsers.map((user, index) => (
							<div key={user.id}>
								<LeaderBoard__component
									place={index + 1}
									photo={user.avatar}
									name={user.fullname}
									tag={user.status}
								/>
								<hr />
							</div>
						))}


						{/* <LeaderBoard__component place={1} photo={"/Photo.png"} name={"Donald"} tag={"Founder"}/>
					<hr />
					<LeaderBoard__component place={2} photo={"/Photo.png"} name={"Donald"} tag={"Project"} colorClass={"Project-Color"} />
					<hr />
					<LeaderBoard__component place={3} photo={"/Photo.png"} name={"Donald"} tag={"Vote"} colorClass={"Vote-Color"}/>
					<hr />
					<LeaderBoard__component place={4} photo={"/Photo.png"} name={"Donald"} tag={"Members"} colorClass={"Members-Color"} />
					<hr />
					<LeaderBoard__component place={5} photo={"/Photo.png"} name={"Donald"} tag={"Members"} colorClass={"Members-Color"} /> */}
					</div>
				</div>
			</div>

		</>
	)
}

export function AboutParty() {
	const [tonConnectUI, setOptions] = useTonConnectUI();

	const Toast = Swal.mixin({
		toast: true,
		position: "top",
		showConfirmButton: false,
		timer: 3000,
		color: "#fff",
		timerProgressBar: true,
		background: "#009748",
		// background: "#DD3634",
		customClass: {
			popup: 'blue-background inter-font'
		},
		didOpen: (toast) => {
			toast.onmouseenter = Swal.stopTimer;
			toast.onmouseleave = Swal.resumeTimer;
		}
	});

	const ToastErr = Swal.mixin({
		toast: true,
		position: "top",
		showConfirmButton: false,
		timer: 3000,
		color: "#fff",
		timerProgressBar: true,
		// background: "#009748",
		background: "#DD3634",
		customClass: {
			popup: 'blue-background inter-font'
		},
		didOpen: (toast) => {
			toast.onmouseenter = Swal.stopTimer;
			toast.onmouseleave = Swal.resumeTimer;
		}
	});

	const navigate = useNavigate()

	const location = useLocation();
	const { state } = location;

	const { partyId } = state || {};

	const [partyData, setPartyData] = useState(null)
	const [partyImg, setPartyImg] = useState('')
	const [partyD, setPartyD] = useState('')

	useEffect(() => {
		fetch(`${API_URL}/party/get?party_id=${partyId}`)
			.then(response => response.json())
			.then(data => {
				console.log("Datades", data);
				setPartyData(data.title)
				setPartyImg(data.logoURL)
				setPartyD(data.description)
			})
			.catch(err => {
				console.error("Err", err)
			})
	}, [])

	const partyJoin = () => {
		const params = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				initData: window.Telegram.WebApp.initData,
				party_id: partyId
			})
		}
		fetch(`${API_URL}/party/join`, params)
			.then(response => {
				console.log(response.status);
				if (response.status === 402) {
					return response.json().then(transactionData => {
						console.log(transactionData.sender_jetton_wallet_address, transactionData.payload); 

						const myTransaction = {
							validUntil: Math.floor(Date.now() / 1000) + 360,
							messages: [
								{
									address: transactionData.sender_jetton_wallet_address,
									amount: "50000000",
									payload: transactionData.payload
								}
							]
						};

						return tonConnectUI.sendTransaction(myTransaction); // Return the next Promise
					}).then(result => {
						if (result.boc) {
							fetch(`${API_URL}/party/join`, params).then(response => {
								if (response.status == 200) {
									Toast.fire(
										{
											icon: 'success',
											title: 'Successfully joined'
										}
									)
								}
								else {
									ToastErr.fire(
										{
											icon: 'error',
											title: 'Payment error'
										}
									)
								}
							})
						}		
					});
				}
				if (response.status === 400) {
					return response.json().then(data => {
						ToastErr.fire(
							{
								icon: 'error',
								title: data.detail
							}
						)
					})
					console.log(response);
					alert('Ошибка');
				}

			})
	}

	const setSquadFounders = useGlobalStore((state) => state.setSquadFounders);
	const squadFounders = useGlobalStore((state) => state.squadFounders);

	const setSquadFoundersIds = useGlobalStore((state) => state.setSquadFoundersIds);
	const squadFoundersIds = useGlobalStore((state) => state.squadFoundersIds);

	const [userIds, setUserIds] = useState([]);

	useEffect(() => {
		const fetchUserIds = () => {
			squadFounders.forEach((user) => {
				fetch(`${API_URL}/users/search?query=${user.name}`)
					.then(response => response.json())
					.then(data => {
						if (data.users && data.users.length > 0) {
							const userId = data.users[0].id;
							setUserIds(prevIds => [...prevIds, userId]);
						} else {
							console.log(`User not found for ${user.name}`);
						}
					})
					.catch(error => console.error(`Error ${user.name}:`, error));
			});
		};

		fetchUserIds();
		setSquadFoundersIds(userIds)
	}, [squadFounders]);

	const partyJoinAsFounder = () => {
		fetch(`${API_URL}/party/join_as_founder`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				initData: window.Telegram.WebApp.initData,
				party_id: partyId
			})
		})
			.then(response => response.text())
			.then(data => {
				Toast.fire({
					icon: 'success',
					title: 'Success'
				})
			})
			.catch(error => {
				console.error('Error:', error);
			});
	}



	// const navigate2 = useNavigate()

	// const handleClickEd = () => {
	//   navigate2("/editing", { state: { idp } });
	// };

	// const navigate2 = useNavigate();
	// const [idp1, setIdp1] = useState(""); // Пример id

	// const handleNavigate = () => {
	//     navigate('/editing', { state: { idp1 } });
	// };

	// const setIdp = useGlobalStore((state) => state.setIdp);
	// const idp = useGlobalStore((state) => state.idp);

	// console.log("Party id", partyId)
	// const handleNavigate = () => {
	//     setIdp(partyId)
	// 		console.log("IDP::", idp)
	// 		navigate('/editing')
	// };

	// const setIdp = useGlobalStore((state) => state.setIdp);
	// const idp = useGlobalStore((state) => state.idp);

	// const handleNavigate = () => {
	//   setIdp(partyId);
	//   navigate('/editing');
	// };

	// useEffect(() => {
	//   console.log("Updated IDP:", idp);
	// }, [idp]);

	// const handleNavigate = () => {
	// 	navigate('/editing', {state: { partyId }})
	// }

	return (
		<>
			<div className={styles.pages_bg}>
				<div className={styles.title}>
					<img src="/Group 36866.png" alt="back" width={48} height={48} onClick={() => navigate('/parties')} />
					<div className={styles.party_name}>
						<img src={partyImg} alt="" className={styles.avatar} />
						<h2>{partyData}</h2>
					</div>
					<img src="/Vector.svg" alt="" width={18.32} height={18.4} onClick={() => navigate("/editing")} />
				</div>
				<AboutPartyComp partyId={partyId} description={partyD} />
				<div className={styles.join}>
					<button onClick={partyJoin} style={{ cursor: 'pointer', backgroundColor: 'white', borderRadius: '12px', width: '95%', color: '#51B3F6', height: '56px', border: 'none', fontFamily: 'Inter', fontSize: '17px', fontWeight: '500' }}>Join</button>
					{/* <h3>Join</h3> */}
				</div>
				<div className={styles.join}>
					<h3 onClick={partyJoinAsFounder} style={{ cursor: 'pointer' }}>Join as founder</h3>
				</div>
			</div>
		</>
	)
}

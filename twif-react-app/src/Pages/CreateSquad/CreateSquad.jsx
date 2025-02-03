// import { FormControlLabel, Switch } from '@mui/material'
// import Slider from '@mui/material/Slider'
// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { toast, ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
// import Swal from 'sweetalert2'
// import 'sweetalert2/src/sweetalert2.scss'
// import { API_URL } from '../../config.js'
// import { useGlobalStore } from '../../useGlobalStore'
// import styles from './CreateSquad.module.scss'
// import { FileUploader } from './FileUploader'
// import PartyMemberSelect from './Select'


// export function ControlLabel({ checked, onChange }) {
//   return (
//     <FormControlLabel
//       control={
//         <Switch
//           checked={checked}
//           onChange={onChange}
//           color="primary"
//         />
//       }
      
//     />
//   );
// }

// let main_title = "Title"

// export function CreateSquadComp() {

//   const Toast = Swal.mixin({
//     toast: true,
//     position: "top",
//     showConfirmButton: false,
//     timer: 3000,
//     color: "#fff",
//     timerProgressBar: true,
//     background: "#009748",
//     // background: "#DD3634",
//     customClass: {
//       popup: 'blue-background inter-font'
//     },
//     didOpen: (toast) => {
//       toast.onmouseenter = Swal.stopTimer;
//       toast.onmouseleave = Swal.resumeTimer;
//     }
//   });

//   const ToastErr = Swal.mixin({
//     toast: true,
//     position: "top",
//     showConfirmButton: false,
//     timer: 3000,
//     color: "#fff",
//     timerProgressBar: true,
//     // background: "#009748",
//     background: "#DD3634",
//     customClass: {
//       popup: 'blue-background inter-font'
//     },
//     didOpen: (toast) => {
//       toast.onmouseenter = Swal.stopTimer;
//       toast.onmouseleave = Swal.resumeTimer;
//     }
//   });

//   const navigate = useNavigate()


//   const [uploadedFile, setUploadedFile] = useState(null);

//   // Функция для обработки файла из FileUploader
//   const handleFileUpload = (file) => {
//       setUploadedFile(file); // Сохраняем файл в стейт родителя
//   };



//   const [nftChecked, setNftChecked] = useState(false);
//   const [twifChecked, setTwifChecked] = useState(false);

//   const handleNftChange = (event) => {
//     setNftChecked(event.target.checked);
//   };

//   const handleTwifChange = (event) => {
//     setTwifChecked(event.target.checked);
//     console.log(twifChecked)
//   };

//   const [selectNftValue, setselectNftValue] = useState("")

//   const select_value = (event) => {
//     setselectNftValue(event.target.value)
//     console.log(event.target.value)
//   }

//   let [title, setTitle] = useState('h')
//   const [quantity, setQuantity] = useState(0)

//   const titleChange = (event) => {
//     setTitle(event.target.value)
//     console.log(event.target.value)
//   }
//   const quantityChange = (event) => {
//     setQuantity(event.target.value)
//     console.log(event.target.value)
//   }

//   const [nftCollections, setnftCollections] = useState(null);
	
// 	useEffect(() => {
// 		fetch(` ${API_URL}/nft/collection/colors`)
// 			.then(response => response.json())
// 			.then(data => {
// 				console.log(data.colors)
// 				setnftCollections(data.colors)
// 			})
// 			.catch(error => {
//         console.error('Error fetching user data:', error);
//       });

// 	}, [])

//     const [title2, setT2] = useState("Title")

//     const calert = () => {
//       toast.success("Success!");
//     }

//     const setSquadFoundersIds = useGlobalStore((state) => state.setSquadFoundersIds);
//     const squadFoundersIds = useGlobalStore((state) => state.squadFoundersIds);

//     // const create_party_btn = () => {
//     //   let formData = new FormData();
//     //   formData.append('logo', uploadedFile);
//     //   formData.append('founder_ids', JSON.stringify(squadFoundersIds))

//     //   console.log(window.Telegram.WebApp.initData)

//     //   const data = {
//     //     initData: window.Telegram.WebApp.initData,
//     //     title: title,
//     //     quantity: quantity,
//     //     founder_share: 0.3,
//     //     members_share: 0.4,
//     //     project_share: 0.2,
//     //     voters_share: 0.1,
//     //   };
    
//     //   const params = new URLSearchParams(data).toString();

//     //   fetch(` ${API_URL}/party/squad/create?` + params, {
//     //     method: 'POST',
//     //     headers: {
//     //       'accept': 'application/json'
//     //     },
//     //     body: formData
//     //   })
//     //     .then(response => {
//     //       console.log(response)
//     //       return response.json()
//     //     })
//     //     .then(data => {
//     //       console.log("Ответ от сервера:", data.detail);
//     //       if (data.detail) {
//     //         ToastErr.fire({
//     //           icon: "error",
//     //           title: data.detail
//     //         });
//     //       } else {
//     //         Toast.fire({
//     //           icon: "success",
//     //           title: "Created!"
//     //         });
//     //       } 
//     //       navigate("/parties")
//     //     })
//     //     .catch((error) => {
//     //       console.error("Err:", error)
//     //       ToastErr.fire({
//     //         icon: "error",
//     //         title: "Somph went wrong!"
//     //       });
//     //     })
//     // }


//   const create_party_btn = () => {
//     var formData = new FormData();

//     if (uploadedFile) {
//       console.log('uploadedFile exists');
//       formData.append('logo', uploadedFile);
//       formData.append('founder_ids', JSON.stringify(squadFoundersIds))
//     }
//     else {
//       formData = null
//     }

//     const data = {
//       initData: window.Telegram.WebApp.initData,
//       title: title,
//       quantity: quantity,
//       founder_share: 0.3,
//       members_share: 0.4,
//       project_share: 0.2,
//       voters_share: 0.1
//     };

//     const params = new URLSearchParams(data).toString();

//     fetch(`${API_URL}/squad/create?${params}`, {
//       method: 'POST',
//       body: formData
//     })
//       .then(response => {
//         if (!response.ok) {
//           response.json().then(errData => {
//             ToastErr.fire({
//               icon: "error",
//               title: errData.detail || 'Ошибка при создании'
//             });
//           });
//         }
//         else {
//           Toast.fire({
//             icon: "success",
//             title: "Created!"
//           });
//           navigate("/parties")
//         };
//       })
//     }


// 	if (!nftCollections) {
// 		return (
// 			<div className="spinner"></div>
// 		)
// 	}

//   return (
//     <>
//      <ToastContainer
//         position="top"
//         autoClose={2000}
//         hideProgressBar
//         newestOnTop
//         closeOnClick
//         rtl={false}
//         pauseOnHover
//         draggable
//         pauseOnFocusLoss
//       />
//     <div className={styles.CreateNewParty}>
//       <FileUploader onFileSelect={handleFileUpload} />
//       {/* {uploadedFile && <p>Выбранный файл: {uploadedFile.name}</p>} */}
//       <div className={styles.title_field}>
//         <label>Title</label>
//         <input type="text" onChange={titleChange} />
//       </div>
//       <div className={styles.title_field}>
//         <label>Quantity</label>
//         <input type="text" onChange={quantityChange} />
//       </div>
// 			<PartyMemberSelect />

//       <div className={styles.chs_nft}>
//         <div className={styles.top_nft}>
//           <h3>NFT</h3>
//           <ControlLabel 
//             checked={nftChecked} 
//             onChange={handleNftChange} 
//           />
//         </div>
//         {/* {nftChecked && (
//           <select className={styles.selectNFT__list}>
//             <option disabled value="Choise">Choose NFT</option>
//             <option value="NFT1">NFT1</option>
//           </select>
//         )} */}
//         {nftChecked && (
//           <select className={styles.selectNFT__list} onChange={select_value}>
//             <option>NONE</option>
//               {nftCollections.map((collection, index) => (
//                 <option key={index} value={collection}>
//                   {collection}
//                 </option>
//               ))}
//           </select>
//         )}

//       </div>

//       <div className={styles.chs_twif}>
//         <h3>TWIF</h3>
//         <ControlLabel 
//           checked={twifChecked} 
//           onChange={handleTwifChange} 
//         />
//       </div>

// 			{ twifChecked && (
// 			 <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" className={styles.slider} />
// 			)}
//     </div>
//     <div className={styles.create}>
//       <button onClick={create_party_btn} style={{ cursor: 'pointer', backgroundColor: 'white', borderRadius: '12px', width: '95%', color: '#51B3F6', height: '56px', border: 'none', fontFamily: 'Inter', fontSize: '17px', fontWeight: '500' }}>Create</button>
//       {/* <h3 onClick={create_party_btn} >Create</h3> */}
//     </div>
//     </>
//   );
// }

// export function CreateSquad() {
//   const navigate = useNavigate()

//   return (
//     <div className={styles.pages_bg}>
//       <div className={styles.title}>
//         <img src="/Group 36866.png" alt="back" onClick={() => {navigate('/parties')}} />
//         <h2>Create new squad</h2>
//       </div>
      
//       <CreateSquadComp />
//     </div>
//   );
// }


import { FormControlLabel, Switch } from '@mui/material'
import Slider from '@mui/material/Slider'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import { API_URL } from '../../config.js'
import { useGlobalStore } from '../../useGlobalStore'
import styles from './CreateSquad.module.scss'
import { FileUploader } from './FileUploader'
import PartyMemberSelect from './Select'


export function ControlLabel({ checked, onChange }) {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={checked}
          onChange={onChange}
          color="primary"
        />
      }
      
    />
  );
}

let main_title = "Title"

export function CreateSquadComp() {

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


  const [uploadedFile, setUploadedFile] = useState(null);

  // Функция для обработки файла из FileUploader
  const handleFileUpload = (file) => {
      setUploadedFile(file); // Сохраняем файл в стейт родителя
  };



  const [nftChecked, setNftChecked] = useState(false);
  const [twifChecked, setTwifChecked] = useState(false);

  const handleNftChange = (event) => {
    setNftChecked(event.target.checked);
  };

  const handleTwifChange = (event) => {
    setTwifChecked(event.target.checked);
    console.log(twifChecked)
  };

  const [selectNftValue, setselectNftValue] = useState("")
  const [twifSlideValue, setTwifSlideValue] = useState(0)

  const select_value = (event) => {
    setselectNftValue(event.target.value)
  }
  const twif_sl_value = (event) => {
    setTwifSlideValue(event.target.value)
  }

  let [title, setTitle] = useState('h')
  const [quantity, setQuantity] = useState(0)

  const titleChange = (event) => {
    setTitle(event.target.value)
    console.log(event.target.value)
  }
  const quantityChange = (event) => {
    setQuantity(event.target.value)
    console.log(event.target.value)
  }

  const [nftCollections, setnftCollections] = useState(null);
	
	useEffect(() => {
		fetch(` ${API_URL}/nft/collection/colors`)
			.then(response => response.json())
			.then(data => {
				console.log(data.colors)
				setnftCollections(data.colors)
			})
			.catch(error => {
        console.error('Error fetching user data:', error);
      });

	}, [])

    const [title2, setT2] = useState("Title")

    const calert = () => {
      toast.success("Success!");
    }

    const setSquadFoundersIds = useGlobalStore((state) => state.setSquadFoundersIds);
    const squadFoundersIds = useGlobalStore((state) => state.squadFoundersIds);

    // const create_party_btn = () => {
    //   let formData = new FormData();
    //   formData.append('logo', uploadedFile);
    //   formData.append('founder_ids', JSON.stringify(squadFoundersIds))

    //   console.log(window.Telegram.WebApp.initData)

    //   const data = {
    //     initData: window.Telegram.WebApp.initData,
    //     title: title,
    //     quantity: quantity,
    //     founder_share: 0.3,
    //     members_share: 0.4,
    //     project_share: 0.2,
    //     voters_share: 0.1,
    //   };
    
    //   const params = new URLSearchParams(data).toString();

    //   fetch(` ${API_URL}/party/squad/create?` + params, {
    //     method: 'POST',
    //     headers: {
    //       'accept': 'application/json'
    //     },
    //     body: formData
    //   })
    //     .then(response => {
    //       console.log(response)
    //       return response.json()
    //     })
    //     .then(data => {
    //       console.log("Ответ от сервера:", data.detail);
    //       if (data.detail) {
    //         ToastErr.fire({
    //           icon: "error",
    //           title: data.detail
    //         });
    //       } else {
    //         Toast.fire({
    //           icon: "success",
    //           title: "Created!"
    //         });
    //       } 
    //       navigate("/parties")
    //     })
    //     .catch((error) => {
    //       console.error("Err:", error)
    //       ToastErr.fire({
    //         icon: "error",
    //         title: "Somph went wrong!"
    //       });
    //     })
    // }


  const create_party_btn = () => {
    var formData = new FormData();

    if (uploadedFile) {
      console.log('uploadedFile exists');
      formData.append('logo', uploadedFile);
      formData.append('founder_ids', JSON.stringify(squadFoundersIds))
    }
    else {
      formData = null
    }

    const data = {
      initData: window.Telegram.WebApp.initData,
      title: title,
      quantity: quantity,
      founder_share: 0.3,
      members_share: 0.4,
      project_share: 0.2,
      voters_share: 0.1, 
      twif_requirement: twifSlideValue,
      nft_requirement: selectNftValue
    };

    const params = new URLSearchParams(data).toString();

    fetch(`${API_URL}/squad/create?${params}`, {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (!response.ok) {
          response.json().then(errData => {
            ToastErr.fire({
              icon: "error",
              title: errData.detail || 'Ошибка при создании'
            });
          });
        }
        else {
          Toast.fire({
            icon: "success",
            title: "Created!"
          });
          navigate("/parties")
        };
      })
    }


	if (!nftCollections) {
		return (
			<div className="spinner"></div>
		)
	}

  return (
    <>
     <ToastContainer
        position="top"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
    <div className={styles.CreateNewParty}>
      <FileUploader onFileSelect={handleFileUpload} />
      {/* {uploadedFile && <p>Выбранный файл: {uploadedFile.name}</p>} */}
      <div className={styles.title_field}>
        <label>Title</label>
        <input type="text" onChange={titleChange} />
      </div>
      <div className={styles.title_field}>
        <label>Quantity</label>
        <input type="text" onChange={quantityChange} />
      </div>
			<PartyMemberSelect />

      <div className={styles.chs_nft}>
        <div className={styles.top_nft}>
          <h3>NFT</h3>
          <ControlLabel 
            checked={nftChecked} 
            onChange={handleNftChange} 
          />
        </div>
        {/* {nftChecked && (
          <select className={styles.selectNFT__list}>
            <option disabled value="Choise">Choose NFT</option>
            <option value="NFT1">NFT1</option>
          </select>
        )} */}
        {nftChecked && (
          <select className={styles.selectNFT__list} onChange={select_value}>
            <option>NONE</option>
              {nftCollections.map((collection, index) => (
                <option key={index} value={collection}>
                  {collection}
                </option>
              ))}
          </select>
        )}

      </div>

      <div className={styles.chs_twif}>
        <h3>TWIF</h3>
        <ControlLabel 
          checked={twifChecked} 
          onChange={handleTwifChange} 
        />
      </div>

			{ twifChecked && (
			 <Slider defaultValue={0} aria-label="Default" valueLabelDisplay="auto" className={styles.slider} onChange(twif_sl_value) />
			)}
    </div>
    <div className={styles.create}>
      <button onClick={create_party_btn} style={{ cursor: 'pointer', backgroundColor: 'white', borderRadius: '12px', width: '95%', color: '#51B3F6', height: '56px', border: 'none', fontFamily: 'Inter', fontSize: '17px', fontWeight: '500' }}>Create</button>
      {/* <h3 onClick={create_party_btn} >Create</h3> */}
    </div>
    </>
  );
}

export function CreateSquad() {
  const navigate = useNavigate()

  return (
    <div className={styles.pages_bg}>
      <div className={styles.title}>
        <img src="/Group 36866.png" alt="back" onClick={() => {navigate('/parties')}} />
        <h2>Create new squad</h2>
      </div>
      
      <CreateSquadComp />
    </div>
  );
}

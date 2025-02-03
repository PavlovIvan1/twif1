import {FormControlLabel, Switch} from '@mui/material';
import Slider from '@mui/material/Slider';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useGlobalStore} from '../../useGlobalStore';
import styles from '../CreateParty/CreateParty.module.scss';
import {FileUploader} from './FileUploader';
import {API_URL} from '../../config.js';


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

export function CreatePartyComp({ party_id }) {

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

	const [valueTwif, setValueTwif] = useState(0);
	const handleTwifValue = (event, newValueTwif) => {
    setValueTwif(newValueTwif)
		console.log(valueTwif);
  };

	const [valueFounder, setValueFounder] = useState(0);
	const handleFouunderValue = (event, newValueFounder) => {
    setValueFounder(newValueFounder)
		console.log(valueFounder);
  };

	const [valueProject, setValueProject] = useState(0);
	const handleProjectValue = (event, newValueProject) => {
    setValueProject(newValueProject)
		console.log(valueProject);
  };

	const [valueVote, setValueVote] = useState(0);
	const handleVoteValue = (event, newValueVote) => {
    setValueVote(newValueVote)
		console.log(valueVote);
  };

	const [valueMember, setValueMember] = useState(0);
	const handleMemberValue = (event, newValueMember) => {
    setValueMember(newValueMember)
		console.log(valueMember);
  };

	const maxTotal = 1;
	const totalValue = (valueFounder + valueProject + valueVote + valueMember) / 100;

	
	const handleSliderChange = (setter) => (event, newValue) => {
    const newTotalValue = (newValue + valueFounder + valueProject + valueVote + valueMember - setter(newValue)) / 100;
    
    if (newTotalValue <= maxTotal) {
      setter(newValue);
    }
  };

  const [selectNftValue, setselectNftValue] = useState("")

  const select_value = (event) => {
    setselectNftValue(event.target.value)
    console.log(event.target.value)
  }

  let [title, setTitle] = useState('h')
  const [quantity, setQuantity] = useState(0)
  const [about, setAbout] = useState(0)

  const titleChange = (event) => {
    setTitle(event.target.value)
    console.log(event.target.value)
  }
  const quantityChange = (event) => {
    setQuantity(event.target.value)
    console.log(event.target.value)
  }
	const aboutChange = (event) => {
    setAbout(event.target.value)
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


	if (!nftCollections) {
		return (
			<div className="spinner"></div>
		)
	}

	const updateParty = () => {
		console.log(uploadedFile);
      console.log("Title and q", title, quantity)
  
      const formData = new FormData();
      formData.append('logo', uploadedFile);
  
      console.log(window.Telegram.WebApp.initData)

			console.log("Data for req:", title)
			console.log("Data for req:", quantity)
			console.log("Data for req:", valueFounder)
			console.log("Data for req:", valueMember)
			console.log("Data for req:", valueProject)
			console.log("Data for req:", valueVote)
			console.log("Data for req:", about)
			console.log("Data for req:", party_id)

      const data = {
        initData: window.Telegram.WebApp.initData,
        title: title,
        quantity: quantity,
        // founder_share: valueFounder,
        // members_share: valueMember,
        // project_share: valueProject,
        // voters_share: valueVote,
				founder_share: 0.2,
        members_share: 0.4,
        project_share: 0.3,
        voters_share: 0.1,
				description: about,
				party_id: party_id
      };
    
      const params = new URLSearchParams(data).toString();

      fetch(' http://188.245.187.190/api/party/update?' + params, {
        method: 'POST',
        headers: {
          'accept': 'application/json'
        },
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          calert()
          console.log("Save!", data)
          navigate("/parties")
          alert("Партия успешно обновлена")
        })
        .catch((error) => {
          console.error("Err:", error)
          alert("Ошибка")
        })
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
			<div className={styles.title_field}>
        <label>About</label>
        <input type="text" onChange={aboutChange} />
      </div>

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
			 <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" className={styles.slider} onChange={handleTwifValue} />
			)}
    </div>
		<div className={styles.Distribution}>
				<div className={styles.Distribution__title}>Distribution</div>
				<div className={styles.Distribution__content}>
					<div className={styles.Distribution__content__Founder}>
						<label>Founder</label>
						<Slider defaultValue={0} aria-label="Default" 	valueLabelDisplay="auto" className={styles.slider} size='' onChange={handleSliderChange(setValueFounder)}  disabled={totalValue >= maxTotal && valueFounder + totalValue <= maxTotal}
						/>
					</div>
					<div className={styles.Distribution__content__Members}>
						<label>Members</label>
						<Slider defaultValue={0} aria-label="Default" 	valueLabelDisplay="auto" className={styles.slider} size=''  onChange={handleSliderChange(setValueMember)} disabled={totalValue >= maxTotal && valueMember + totalValue <= maxTotal}
						/>
					</div>
					<div className={styles.Distribution__content__Project}>
						<label>Project</label>
						<Slider defaultValue={0} aria-label="Default" 	valueLabelDisplay="auto" className={styles.slider} size='' onChange={handleSliderChange(setValueProject)}  disabled={totalValue >= maxTotal && valueProject + totalValue <= maxTotal}
					/>
					</div>
					<div className={styles.Distribution__content__Voted}>
						<label>Voted</label>
						<Slider defaultValue={0} aria-label="Default" 	valueLabelDisplay="auto" className={styles.slider} size='' onChange={handleSliderChange(setValueVote)} disabled={totalValue >= maxTotal && valueVote + totalValue <= maxTotal}
						/>
					</div>
				</div>
			</div>
    <div className={styles.create}>
      <h3 onClick={updateParty} style={{cursor: 'pointer'}} >Save</h3>
    </div>
    </>
  );
}

export function Editing() {
  const navigate = useNavigate()

	const idp = useGlobalStore((state) => state.idp);
	console.log("IDP:", idp)

  return (
    <div className={styles.pages_bg}>
      <div className={styles.title}>
        <img src="/Group 36866.png" alt="back" onClick={() => {navigate('/aboutparty')}} />
        <h2>Edit party</h2>
      </div>
      
      <CreatePartyComp party_id={idp} />
    </div>
  );
}
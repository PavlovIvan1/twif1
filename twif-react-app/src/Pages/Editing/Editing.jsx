import { FormControlLabel, Switch } from '@mui/material'
import Slider from '@mui/material/Slider'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import styles from "./Editing.module.scss"
import { FileUploader } from './FileUploader'

export function ConrolLabel() {

	const [checked, setChecked] = useState(false);

	const handleChange = (event) => {
			setChecked(event.target.checked);
	};

	let isToggleOn = false;

	return (
		<>
			<FormControlLabel
            control={
                <Switch
                    checked={checked}
                    onChange={handleChange}
                    color="primary"
                />
            }
            label={checked ? isToggleOn = true : isToggleOn = false}
        />
		</>
	)
}

export function CreatePartyComp() {

	return (
		<>
		<div className={styles.CreateNewParty}>
			<FileUploader />
			<div className={styles.title_field}>
				<label>Title</label>
				<input type="text"/>
			</div>
			<div className={styles.title_field}>
				<label>About</label>
				<textarea name="" id="" className='about' rows={4} cols={10}></textarea>
			</div>
			
			<div className={styles.chs_nft}>
				<div className={styles.top_nft}>
					<h3>NFT</h3>
					<ConrolLabel />
				</div>
				<select className={styles.selectNFT__list}>
    			<option disabled value="Choise">Choise NFT</option>
    			<option value="NFT1">NFT1</option>
				</select>
			</div>
			<div className={styles.chs_twif}>
				<h3>TWIF</h3>
				<ConrolLabel />
			</div>
      <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" className={styles.slider} size='' />
    </div>
		</>
	)
}

export function Distrib() {
	return (
		<>
			<div className={styles.Distribution}>
				<div className={styles.Distribution__title}>Distribution</div>
				<div className={styles.Distribution__content}>
					<div className={styles.Distribution__content__Founder}>
						<label>Founder</label>
						<Slider defaultValue={50} aria-label="Default" 	valueLabelDisplay="auto" className={styles.slider} size='' />
					</div>
					<div className={styles.Distribution__content__Members}>
						<label>Members</label>
						<Slider defaultValue={50} aria-label="Default" 	valueLabelDisplay="auto" className={styles.slider} size='' />
					</div>
					<div className={styles.Distribution__content__Project}>
						<label>Project</label>
						<Slider defaultValue={50} aria-label="Default" 	valueLabelDisplay="auto" className={styles.slider} size='' />
					</div>
					<div className={styles.Distribution__content__Voted}>
						<label>Voted</label>
						<Slider defaultValue={50} aria-label="Default" 	valueLabelDisplay="auto" className={styles.slider} size='' />
					</div>
				</div>
			</div>
		</>
	)
}

export function Editing() {

	
	const location = useLocation();
  const { id } = location;

  const { partyId } = id || {};
	console.log(partyId)

	return (
		<>
		<div className={styles.pages_bg}>
			<div className={styles.title}>
				<img src="/Group 36866.png" alt="back" />
				<h2>Editing</h2>
			</div>
			<CreatePartyComp />
			<Distrib />
			<div className={styles.create}>
				<h3>Save</h3>
			</div>
		</div>
		</>
	)
}
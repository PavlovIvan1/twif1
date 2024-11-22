import {
  Autocomplete,
  Avatar,
  Box,
  Chip,
  Popper,
  TextField,
  Typography
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { API_URL } from '../../config.js'
import { useGlobalStore } from '../../useGlobalStore'



export default function PartyMemberSelect() {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);

  const { squadFounders, setSquadFounders } = useGlobalStore();

  console.log("Sq founders", squadFounders)

  const handleIconClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
		fetch(`${API_URL}/users/leaderboard?limit=10&offset=0`)
			.then(response => response.json())
			.then(data => {
				const transformedOptions = data.leaders.map(user => ({ fullname: user.fullname }));
        setOptions(transformedOptions);
			})
			.catch(error => {
        console.error('Error fetching user data:', error);
      })
			.finally(() => {
				setTimeout(() => {
					setLoading(false);
				}, 1000); // Задержка в 2 секунды
			}) 
	}, [])


  const setSquadFoundersIds = useGlobalStore((state) => state.setSquadFoundersIds);
  const squadFoundersIds = useGlobalStore((state) => state.squadFoundersIds);


  
  const [ids, setIds] = useState([]);
  console.log("IDS", ids);
  console.log("OPtions", options)
  console.log("SquadF", squadFounders)



  const namesToBackend = async () => {
    try {
      const promises = squadFounders.map((founder) =>
        fetch(` ${API_URL}/users/search?query=${founder.fullname}`)
          .then((response) => response.json())
          .then((data) => {
            if (data.users && data.users.length > 0) {
              return data.users[0].id;
            }
            return null;
          })
          .catch((error) => {
            console.error('Ошибка:', error);
            return null;
          })
      );
  
      const results = await Promise.all(promises);
      const uniqueIds = Array.from(new Set(results.filter((id) => id !== null)));
  
      setIds(uniqueIds);
      console.log("Updated IDS:", uniqueIds);
      setSquadFoundersIds(uniqueIds)
    } catch (error) {
      console.error("Ошибка при отправке запросов:", error);
    }
  };
  
  useEffect(() => {
    console.log("Calling namesToBackend");
    namesToBackend();
  }, [squadFounders]);


  return (
    <Box 
      display="flex" 
      alignItems="center" 
      borderRadius="12px" 
      border="1px solid #e0e0e0" 
      p={1} 
      sx={{ width: '85%', marginTop: '10px'}}
    >
      <Autocomplete
        multiple
        options={options}
        getOptionLabel={(option) => option.fullname}
        value={squadFounders} // Значение из Zustand
        onChange={(event, newValue) => {
          setSquadFounders(newValue); // Обновляем Zustand при изменении выбранных участников
        }}
        open={open}
        onClose={() => setOpen(false)}
        PopperComponent={(props) => <Popper {...props} placement="bottom-start" />}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant="outlined"
              label={option.fullname}
              {...getTagProps({ index })}
              sx={{
                backgroundColor: '#e0e0e0',
                borderRadius: '16px',
                padding: '4px',
                fontWeight: 500,
              }}
            />
          ))
        }
        renderInput={(params) => (
          <Box>
            <Typography variant="caption" color="textSecondary">
              Party members
            </Typography>
            <TextField
              {...params}
              variant="standard"
              placeholder="Search..."
              sx={{
                minWidth: '200px',
                '& .MuiAutocomplete-endAdornment': { display: 'none' } // Скрывает стрелку вниз
              }}
              onFocus={() => setOpen(true)} // Открываем при фокусе на поле поиска
            />
          </Box>
        )}
      />
      <Box ml={1} onClick={handleIconClick}>
        <Avatar sx={{ backgroundColor: '#5ac8fa', cursor: 'pointer' }}>
          {/* <PersonAddIcon /> */}
          <img src="/Union(2).svg" alt="" width={18} />
        </Avatar>
      </Box>
    </Box>
  );
}


// const options = [
//   { name: 'John Snow' },
//   { name: 'Donald Trump' },
//   { name: 'Richard Stoddard' },
//   { name: 'Anna Brown' },
//   { name: 'Michael Scott' },
//   { name: 'Emma Watson' },
//   { name: 'Tom Hanks' },
// ];

// export default function PartyMemberSelect() {
//   // const [selectedMembers, setSelectedMembers] = useState([]);
//   const [open, setOpen] = useState(false);

//   const { squadFounders, setSquadFounders } = useGlobalStore();

//   const handleIconClick = () => {
//     setOpen(!open);
//   };

//   return (
//     <Box 
//       display="flex" 
//       alignItems="center" 
//       borderRadius="8px" 
//       border="1px solid #e0e0e0" 
//       p={1} 
//       sx={{ maxWidth: 300 }}
//     >
//       <Autocomplete
//         multiple
//         options={options}
//         getOptionLabel={(option) => option.name}
//         value={selectedMembers}
//         onChange={(event, newValue) => {
//           setSelectedMembers(newValue);
//         }}
//         open={open}
//         onClose={() => setOpen(false)}
//         PopperComponent={(props) => <Popper {...props} placement="bottom-start" />}
//         renderTags={(value, getTagProps) =>
//           value.map((option, index) => (
//             <Chip
//               variant="outlined"
//               label={option.name}
//               {...getTagProps({ index })}
//               sx={{
//                 backgroundColor: '#e0e0e0',
//                 borderRadius: '16px',
//                 padding: '4px',
//                 fontWeight: 500,
//               }}
//             />
//           ))
//         }
//         renderInput={(params) => (
//           <Box>
//             <Typography variant="caption" color="textSecondary" sx={{ paddingLeft: '8px' }}>
//               Party members
//             </Typography>
//             <TextField
//               {...params}
//               variant="standard"
//               placeholder="Search..."
//               sx={{
//                 minWidth: '200px',
//                 '& .MuiAutocomplete-endAdornment': { display: 'none' } // скрывает стрелку вниз
//               }}
//               onFocus={() => setOpen(true)} // Открываем при фокусе на поле поиска
//             />
//           </Box>
//         )}
//       />
//       <Box ml={1} onClick={handleIconClick}>
//         <Avatar sx={{ backgroundColor: '#5ac8fa', cursor: 'pointer' }}>
//           <PersonAddIcon />
//         </Avatar>
//       </Box>
//     </Box>
//   );
// }

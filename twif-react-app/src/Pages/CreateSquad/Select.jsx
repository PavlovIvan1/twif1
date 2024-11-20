// import PersonAddIcon from '@mui/icons-material/PersonAdd'
// import { Autocomplete, Box, Chip, IconButton, TextField } from '@mui/material'
// import React, { useState } from 'react'

// const membersList = [
//   { name: 'John Snow' },
//   { name: 'Donald Trump' },
//   { name: 'Richard Stoddard' },
//   { name: 'Jane Doe' },
//   { name: 'Alice Johnson' },
//   { name: 'Bob Smith' }
// ];

// function PartyMemberSelect() {
//   const [selectedMembers, setSelectedMembers] = useState([]);

//   const handleMemberChange = (event, value) => {
//     setSelectedMembers(value);
//   };

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         alignItems: 'center',
//         border: '1px solid #E0E0E0',
//         borderRadius: '8px',
//         padding: '8px',
//         width: '300px',
//         backgroundColor: '#F7F8FA'
//       }}
//     >
//       <Autocomplete
//         multiple
//         options={membersList}
//         getOptionLabel={(option) => option.name}
//         filterSelectedOptions
//         onChange={handleMemberChange}
//         value={selectedMembers}
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             variant="standard"
//             placeholder="Party members"
//             InputProps={{
//               ...params.InputProps,
//               disableUnderline: true,
//               style: { paddingLeft: '8px', fontSize: '0.875rem', color: '#9E9E9E' }
//             }}
//           />
//         )}
//         renderTags={(value, getTagProps) =>
//           value.map((option, index) => (
//             <Chip
//               key={index}
//               label={option.name}
//               {...getTagProps({ index })}
//               sx={{
//                 margin: '4px 4px 4px 0',
//                 backgroundColor: '#E0E0E0',
//                 color: '#424242',
//                 fontSize: '0.875rem'
//               }}
//             />
//           ))
//         }
//         sx={{
//           flex: 1,
//           '& .MuiAutocomplete-inputRoot': {
//             padding: '0px'
//           }
//         }}
//       />
//       <IconButton color="primary" size="small" sx={{ marginLeft: 'auto' }}>
//         <PersonAddIcon />
//       </IconButton>
//     </Box>
//   );
// }

// export default PartyMemberSelect;

// import PersonAddIcon from '@mui/icons-material/PersonAdd'
// import { Autocomplete, Avatar, Box, Chip, Popper, TextField, Typography } from '@mui/material'
// import React, { useState } from 'react'

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
//   const [selectedMembers, setSelectedMembers] = useState([]);
//   const [open, setOpen] = useState(false);

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
//               sx={{ minWidth: '200px' }}
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


import {
  Autocomplete,
  Avatar,
  Box,
  Chip,
  Popper,
  TextField,
  Typography
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useGlobalStore} from '../../useGlobalStore';
import {API_URL} from '../../config.js';


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
//   const [open, setOpen] = useState(false);

//   // Подключаем Zustand Store
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
//       sx={{
//         maxWidth: 300,
//         flexWrap: 'wrap',  // Разрешаем перенос на следующую строку
//         gap: '4px',
//       }}
//     >
//       <Autocomplete
//         multiple
//         options={options}
//         getOptionLabel={(option) => option.name}
//         value={squadFounders} // Значение из Zustand
//         onChange={(event, newValue) => {
//           // Ограничиваем выбор максимум до 3 участников
//           if (newValue.length <= 3) {
//             setSquadFounders(newValue);
//           }
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
//                 fontSize: '0.875rem', // Уменьшаем размер шрифта
//                 margin: '2px 4px', // Добавляем небольшой отступ между строками
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
//                 '& .MuiAutocomplete-endAdornment': { display: 'none' } // Скрывает стрелку вниз
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
//   const [open, setOpen] = useState(false);

//   // Подключаем Zustand Store
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
//       sx={{
//         maxWidth: 300,
//         whiteSpace: 'nowrap',  // Отключаем перенос строк
//         overflowX: 'auto',    // Горизонтальный скролл при переполнении
//         overflowY: 'hidden',  // Скрываем вертикальный скролл
//         scrollbarWidth: 'thin',  // Тонкий скролл (для Firefox)
//         '&::-webkit-scrollbar': { height: '6px' },  // Настройка скролла для Chrome
//         '&::-webkit-scrollbar-thumb': { backgroundColor: '#c0c0c0', borderRadius: '4px' },
//       }}
//     >
//       <Autocomplete
//         multiple
//         options={options}
//         getOptionLabel={(option) => option.name}
//         value={squadFounders} // Значение из Zustand
//         onChange={(event, newValue) => {
//           setSquadFounders(newValue); // Обновляем Zustand при изменении выбранных участников
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
//                 marginRight: '4px',
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
//                 '& .MuiAutocomplete-endAdornment': { display: 'none' } // Скрывает стрелку вниз
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

// const options = [
//   {
//     leaders: [
//       { 
//         name: 'IVAN | FRONT' 
//       },
//       { 
//         name: 'Zahar Dimidov' 
//       },
//     ]
//   }
// ];

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
				}, 2500); // Задержка в 2 секунды
			}) 
	}, [])

  // const [ids, setIds] = useState([]);
  // console.log("IDS", ids)
  

  // const namesToBackend = () => {

  //   const sendName = (name, index) => {
  //     fetch(`https://playcloud.pro/users/search?query=${name}`)
  //     .then(response => response.json())
  //     .then(data => {
  //       ids.push(data.id);
  //       if (index < squadFounders.length - 1) {
  //         sendName(squadFounders[index + 1], index + 1);
  //       } else {
  //         console.log("IDS2",ids)
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Ошибка:', error);
  //     });
  //     console.log("IDS",ids) 
  //   }
  // }

  // useEffect(() => {
  //   namesToBackend();
  // }, [squadFounders])

  // const namesToBackend = () => {
  //   const sendName = (name, index) => {
  //     fetch(`https://playcloud.pro/users/search?query=${name}`)
  //       .then(response => response.json())
  //       .then(data => {
  //         setIds(prevIds => [...prevIds, data.users.id]);
  //         if (index < squadFounders.length - 1) {
  //           sendName(squadFounders[index + 1], index + 1);
  //         } else { 
  //         console.log("IDS2", ids);
  //         }
  //       })
  //       .catch(error => {
  //         console.error('Ошибка:', error);
  //       });
  //     console.log("IDS", ids);
  //   };

  //   // Запускаем первую отправку
  //   if (squadFounders.length > 0) {
  //   sendName(squadFounders[0], 0);
  //   }
  // };

  // const namesToBackend = () => {
  //   const sendName = (name, index) => {
  //     fetch(`https://playcloud.pro/users/search?query=${name}`)
  //       .then(response => response.json())
  //       .then(data => {
  //         if (data.users.length > 0) {
  //           setIds(prevIds => [...prevIds, data.users[0].id]); 
  //         }
  
  //         if (index < squadFounders.length - 1) {
  //           sendName(squadFounders[index + 1], index + 1);
  //         } else { 
  //           console.log("IDS2", ids); // ids все еще будут отображать старое значение
  //         }
  //       })
  //       .catch(error => {
  //         console.error('Ошибка:', error);
  //       });
        
  //     console.log("IDS", ids); // это все еще будет показывать старое значение
  //   };
  
  //   // Запускаем первую отправку
  //   if (squadFounders.length > 0) {
  //     sendName(squadFounders[0], 0);
  //   }
  // };
  

  // useEffect(() => {
  //   namesToBackend();
  // }, [squadFounders]);



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

  // const namesToBackend = () => {
  //   const sendName = (name, index) => {
  //     fetch(`https://playcloud.pro/users/search?query=${name}`)
  //       .then(response => response.json())
  //       .then(data => {
  //         if (data.users && data.users.length > 0) {
  //           // Добавляем id в массив ids
  //           setIds(prevIds => [...prevIds, data.users[0].id]);
  //           console.log("A", ids)
  //         }

  //         if (index < squadFounders.length - 1) {
  //           sendName(squadFounders[index + 1], index + 1);
  //           console.log("AA", ids)
  //         }
  //       })
  //       .catch(error => {
  //         console.error('Ошибка:', error);
  //       })
  //   };

  //   if (squadFounders.length > 0) {
  //     sendName(squadFounders[0], 0);
  //   }
  // };

  // useEffect(() => {
  //   console.log("Calling namesToBackend");
  //   namesToBackend()
  // }, [squadFounders]);

  // useEffect(() => {
  //   console.log("Updated IDS:", ids);
  //   alert(ids)
  // }, [ids]);


  // const namesToBackend = async () => {
  //   const tempIds = []; // Временный массив для хранения ID

  //   for (let i = 0; i < squadFounders.length; i++) {
  //     const name = squadFounders[i];
  //     try {
  //       const response = await fetch(`https://playcloud.pro/users/search?query=${name}`);
  //       const data = await response.json();
        
  //       if (data.users && data.users.length > 0) {
  //         tempIds.push(data.users[0].id); // Добавляем id во временный массив
  //       }
  //     } catch (error) {
  //       console.error('Ошибка при запросе:', error);
  //     }
  //   }

  //   // Обновляем состояние ids после завершения всех запросов
  //   setIds(tempIds);
  // };

  // useEffect(() => {
  //   namesToBackend();
  // }, [squadFounders]);

  // useEffect(() => {
  //   console.log("Updated IDS:", ids); // Теперь выводит актуальный массив ids после всех запросов
  // }, [ids]);



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

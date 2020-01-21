// import React, { Component ,useState } from 'react'
// import { fade, makeStyles } from '@material-ui/core/styles'
// import ResultExpansion from './ResultExpansion'
// import gql from 'graphql-tag';
// import { useQuery } from '@apollo/react-hooks';
// import TextField from '@material-ui/core/TextField';
// import Autocomplete from '@material-ui/lab/Autocomplete';
// import { map } from 'lodash'
// import { withApollo } from 'react-apollo';

// // query generators
// const searchTerm = (term) => {
//   return gql`
//     query {
//       search(type: "city", searchString:"${term}")
//     }
//   `;
// }
// const getStationsByCityId = (cityId) => {
//   return gql`
//   query{
//     normalizedSearch(nodelabel:"city",settings:{
//       relative: {
//         nodelabel: "station"
//       }
//       searchInput: "${cityId}"
//     })
//   }
// `;
// const useStyles = makeStyles(theme => ({
//   grow: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     display: 'none',
//     [theme.breakpoints.up('sm')]: {
//       display: 'block',
//     },
//   },
//   search: {
//     position: 'relative',
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: fade(theme.palette.common.white, 0.15),
//     '&:hover': {
//       backgroundColor: fade(theme.palette.common.white, 0.25),
//     },
//     marginRight: theme.spacing(2),
//     marginLeft: 0,
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//       marginLeft: theme.spacing(3),
//       width: 'auto',
//     },
//   },
//   searchIcon: {
//     width: theme.spacing(7),
//     height: '100%',
//     position: 'absolute',
//     pointerEvents: 'none',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   inputRoot: {
//     color: 'inherit',
//   },
//   inputInput: {
//     padding: theme.spacing(1, 1, 1, 7),
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: 200,
//     },
//   },

// }))

// // export default function PrimarySearchAppBar() {
//   // const classes = useStyles()
//   // const [anchorEl, setAnchorEl] = React.useState(null)

// function Search (props){

//   const executeQuery = (querySignature, input) => {
//     props.client.query({
//       query: querySignature(input)
//     })
//     .then(result => {
//       console.log(result)
//       // send data to redux here
//     })
//     .catch(error => console.error(error));  
//   }


//   const [AutocompleteOptions, setAutocompleteOptions] = useState(
//     [ 
//       {
//         country: { name: 'USA', id: '7c80192c-02e9-4f3c-976c-f4ccb3acf5da' },
//         city: { name: 'los angeles', id: 'df5055dc-c386-419d-8f74-1ede39caca85' }
//       }, 
//       {
//         country: { name: 'USA', id: '7c80192c-02e9-4f3c-976c-f4ccb3acf5da' },
//         city: { name: 'los angeles', id: 'df5055dc-c386-419d-8f74-1ede39caca85' }
//       }, 
//       {
//         country: { name: 'USA', id: '7c80192c-02e9-4f3c-976c-f4ccb3acf5da' },
//         city: { name: 'los angeles', id: 'df5055dc-c386-419d-8f74-1ede39caca85' }
//       }, 
//     ]
//   )
  
//   const handleAutocompleteChange = (event, option) => {
//     option ? executeQuery(getStationsByCityId, option.city.id) : console.log("No option is selected")
//   }
//   const handleTextFieldChange =(event)=>{
//     // console.log('onchange',executeQuery(searchTerm(event.target.value)))
//     console.log('searchTerm: ', event.target.value)
//     event.target.value ? executeQuery(searchTerm, event.target.value) : console.log("No search term")
//   }

//   return (
//     <>
//       <Autocomplete
//         options={AutocompleteOptions /*should get data from redux*/ }
//         getOptionLabel={option => `${option.country.name}, ${option.city.name}`}
//         // style={{ width: 300 }}
//         onChange={handleAutocompleteChange}
//         renderInput={params => (
//           <TextField {...params} label="Search" onChange={handleTextFieldChange} variant="outlined" fullWidth />
//         )}
//       />
//     </>
//   )
// }

// export default withApollo(Search)

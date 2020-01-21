<<<<<<< HEAD
import React, { Component ,useState } from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import ResultExpansion from './ResultExpansion'
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {connect } from 'react-redux'
import { withApollo } from 'react-apollo';
import uuid from '../helpers/uuid'
import {gun} from './subscription/initGun'
import { normalizedMapDispatchToProps } from "../helpers/dispatchers";
import { map } from 'lodash'

// query generators
const searchTerm = (term) => {
  return gql`
  query{
    normalizedSearch(nodelabel:"city",settings:{
      searchProp: "name"
      searchInput: "${term}"
    })
  }
  `;
}
const getCountryByCityId = (cityId) => {
  return gql`
  query{
    normalizedSearch(nodelabel:"city",settings:{
      relative: {
        nodelabel: "country"
      }
      searchInput: "${cityId}"
    })
  }
  `;
}
const getStationsByCityId = (cityId) => {
  return gql`
  query{
    normalizedSearch(nodelabel:"city",settings:{
      relative: {
        nodelabel: "station"
      }
      searchInput: "${cityId}"
    })
  }
  `;
}

class Search extends Component{
   
  executeQuery = (querySignature, input, reducerName) => {
    return this.props.client.query({
      query: querySignature(input)
    })
    .then(result => {
      console.log('result',result)
      // send data to redux here 
      map(result.data.normalizedSearch,res=>{
        console.log('res',res)
        res.id = res.id ? res.id : uuid()
        gun.get(reducerName).put({[res.id]:res})
        this.props.add(reducerName,res)
      })
      return result
      
    })
    .catch(error => console.error(error));

  }
  
  
  //  AutocompleteOptions = 
  //   [ 
  //     {
  //       country: { name: 'USA', id: '7c80192c-02e9-4f3c-976c-f4ccb3acf5da' },
  //       city: { name: 'los angeles', id: 'df5055dc-c386-419d-8f74-1ede39caca85' }
  //     }, 
  //     {
  //       country: { name: 'USA', id: '7c80192c-02e9-4f3c-976c-f4ccb3acf5da' },
  //       city: { name: 'los angeles', id: 'df5055dc-c386-419d-8f74-1ede39caca85' }
  //     }, 
  //     {
  //       country: { name: 'USA', id: '7c80192c-02e9-4f3c-976c-f4ccb3acf5da' },
  //       city: { name: 'los angeles', id: 'df5055dc-c386-419d-8f74-1ede39caca85' }
  //     }, 
  //   ]
    
    
     handleAutocompleteChange = (event, option) => {
      option ? this.executeQuery(getStationsByCityId, option.id,"stationByCity") : console.log("No option is selected")
    }

     handleTextFieldChange =(event)=>{
      // console.log('onchange',executeQuery(searchTerm(event.target.value)))
      console.log('searchTerm: ', event.target.value)
      const result = this.executeQuery(searchTerm, event.target.value , "cityOptions")
      result.then(result => {
        console.log('query result', result))
        map(result.data.normalizedSearch, cityObj => {
          this.executeQuery(getCountryByCityId, cityObj.id, )
        })
      }
      event.target.value ? result : console.log("No search term")
    }
    
    render(){
      // console.log(map(this.props.data.stationByCity, option => option))
      return (
        <>
          <Autocomplete
            options={map(this.props.state.cityOptions, option => option)}
            getOptionLabel={option => `${option.name}, ${option.name}`}
            // style={{ width: 300 }}
            onChange={this.handleAutocompleteChange}
            renderInput={params => (
              <TextField {...params} label="Search" onChange={this.handleTextFieldChange} variant="outlined" fullWidth />
            )}
          />
        </>
      )
  }
}

// get data from redux
const mapStateToProps = state => {
  return {
    state: state
  };
};

export default withApollo(connect(mapStateToProps, normalizedMapDispatchToProps)(Search));
=======
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
>>>>>>> b47e8ff2424916f7ca88855c188633f9b8275689

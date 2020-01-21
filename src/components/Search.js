import React, { Component ,useState } from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import ResultExpansion from './ResultExpansion'
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { map } from 'lodash'

export default function Search (props){
  
  const [queryResult,setqueryResult] = useState(
    [ 
      {
        country: { name: 'USA', id: '7c80192c-02e9-4f3c-976c-f4ccb3acf5da' },
        city: { name: 'los angeles', id: 'df5055dc-c386-419d-8f74-1ede39caca85' }
      }, 
      {
        country: { name: 'USA', id: '7c80192c-02e9-4f3c-976c-f4ccb3acf5da' },
        city: { name: 'los angeles', id: 'df5055dc-c386-419d-8f74-1ede39caca85' }
      }, 
      {
        country: { name: 'USA', id: '7c80192c-02e9-4f3c-976c-f4ccb3acf5da' },
        city: { name: 'los angeles', id: 'df5055dc-c386-419d-8f74-1ede39caca85' }
      }, 
    ]
  )
  // query generators
  const searchTerm = (term) => {
    return gql`
      query {
        search(type: "city", searchString:"${term}")
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
  
  // const { data, loading, error } = useQuery(searchTerm("ca"))
  // execute queries and get data
  const executeQuery = (query) => {
    const { loading, error, data } = useQuery(query);
    if (loading) return <p>Loading...</p>;
    if (error) return (console.log(error),<p>Error :(</p>);
    console.log("queryseat",data.search)
    return data.search
  }
  const data = executeQuery(searchTerm("ca"))

  // const handleAutocompleteChange = (event, option) => {
  //   console.log('city: ', option ? option.city.id : "nothing is selected")
     
  //   let data = option ? executeQuery(getStationsByCityId(option.city.id)) : "nothing is selected"
  //   console.log("da",data)
  // }
  // const handleTextFieldChange =(event)=>{
  //   // console.log('onchange',executeQuery(searchTerm(event.target.value)))
  //   setqueryResult(executeQuery(searchTerm(event.target.value)))
  // }

  return (
    <>
    <div>{JSON.stringify(data)}</div>
    {/* // <Autocomplete
    //   id="combo-box-demo"
    //   options={queryResult}
    //   getOptionLabel={option => `${option.country.name}, ${option.city.name}`}
    //   // style={{ width: 300 }}
    //   onChange={handleAutocompleteChange}
    //   renderInput={params => (
    //     //console.log('onchange',makeQuery(searchTerm(params.inputProps.value))),
    //     console.log(queryResult),
    //     <TextField {...params} label="Search" onChange={handleTextFieldChange} variant="outlined" fullWidth />
    //   )}
    // /> */}
    </>
  )
}

import React,{useState,useEffect} from 'react';
import {InputLabel,Select,MenuItem,Button,Grid,Typography} from '@material-ui/core';
import {useForm,FormProvider} from 'react-hook-form';
import FormInput from './CustomTextFeild';
import {commerce} from '../../lip/commerce'
import {Link} from 'react-router-dom'
const AddressForm = ({checkoutToken,Next}) => {

const [shippingCountries, setShippingCountries] = useState([]);
const [shippingCountry, setShippingCountry] = useState('');
const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
const [shippingSubdivision, setShippingSubdivision] = useState('');
const [shippingOptions, setShippingOptions] = useState([]);
const [shippingOption, setShippingOption] = useState('');
const methods= useForm();
const countries=Object.entries(shippingCountries).map(([code,name])=>({id:code,label:name}));
const subdivisions=Object.entries(shippingSubdivisions).map(([code,name])=>({id:code,label:name}));
const options =shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` }))
console.log(subdivisions);
const fetchShippingCountries=async(checkoutTokenId)=>{
    const {countries}=await commerce.services.localeListShippingCountries(checkoutTokenId);
    
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0])

}
const fetchShippingSubdivisions=async(countryCode)=>{
  const {subdivisions}=await commerce.services.localeListSubdivisions(countryCode);
  console.log(subdivisions);
  setShippingSubdivisions(subdivisions);
  setShippingSubdivision(Object.keys(subdivisions)[0]);};

const fetchShippingOptions =async (checkoutTokenId,country,region=null)=>{
  const options= await commerce.checkout.getShippingOptions(checkoutTokenId,{country,region});
  console.log(shippingOptions)
  setShippingOptions(options);
  setShippingOption(options[0].id);
}
useEffect(()=>{
fetchShippingCountries(checkoutToken.id)
},[checkoutToken.id])
useEffect(()=>{
if(shippingCountry) fetchShippingSubdivisions(shippingCountry);
},[shippingCountry])
useEffect(()=>{
 if(shippingSubdivision) fetchShippingOptions(checkoutToken.id,shippingCountry,shippingSubdivision);
},[shippingSubdivision])
  return (
    <>
    <Typography variant='h6' gutterBottom >Shipping Address </Typography>
    <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => Next({ ...data, shippingCountry, shippingSubdivision, shippingOption }))} >
            <Grid container spacing={3}>
             <FormInput required name='firstname' label='First Name'/>
             <FormInput required name='lastname' label='Last Name'/>
             <FormInput required name='address' label='Address'/>
             <FormInput required name='email' label='E-mail'/>
             <FormInput required name='city' label='City'/>
             <FormInput required name='zip' label='Zip or Postal code'/>
              <Grid item xs={12} sm={6}>
                 <InputLabel>Shipping Country</InputLabel>
               <Select value={shippingCountry} fullWidth onChange={(e)=>setShippingCountry(e.target.value)}>
                 {countries.map((country)=>(
             <MenuItem key={country.id} value={country.id}>
             {country.label}
             </MenuItem>
                 ))}
      
               </Select>
             </Grid>
           <Grid item xs={12} sm={6}>
                 <InputLabel>Shipping Subdivision</InputLabel>
                 <Select value={shippingSubdivision} fullWidth onChange={(e)=>setShippingSubdivision(e.target.value)}>
                 {subdivisions.map((country)=>(
             <MenuItem key={country.id} value={country.id}>
             {country.label}
             </MenuItem>
                 ))}
               </Select>
             </Grid>
              <Grid item xs={12} sm={6}>
                 <InputLabel>Shipping Optons</InputLabel>
               <Select value={shippingOption} fullWidth onChange={(e)=>setShippingOption}>
                 {options.map((option)=>(
                   <MenuItem key={option.id} value={option.id}>
                   {option.label}
                   </MenuItem>))}
               </Select>
            </Grid>
            </Grid>
            <br/>
            <div style={{display:'flex', justifyContent:'space-between'}}>
           <Button variant='outlined' component={Link} to ='/cart'>Back to cart</Button>
           <Button variant='contained'type='submit' color='primary' >Next</Button>
            </div>

        </form>
    </FormProvider>
    
    </>
  )
}

export default AddressForm
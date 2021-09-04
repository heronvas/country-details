import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { makeStyles, alpha } from '@material-ui/core';
import City from './assets/city1.jpg'
import axios from 'axios';
import { Card, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Typist from 'react-typist';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReactDOM from 'react-dom'



const useStyles = makeStyles((theme) => ({
  
  wrapper:{
    padding: "100px 50px" 
  },
  container:{
    backgroundImage: `url(${City})`,
      height: "60vh",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      fontFamily:"'Montserrat', sans-serif"
  },
  citywrapper:{
    background: "#F0F7FF",
    padding: "50px 50px 50px 50px",
    
  },
  images:{
    backgroundSize: "cover",
    height: "200px",
    
  },
  bt:{
    float: "right",
    borderRadius: "5px",
    backgroundColor: alpha(theme.palette.common.white, 0.0),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
      color:"#FFFFFF"
    },
    fontSize:"25px",
    color:"#FFFFFF",
    margin: "5px 20px"
    
  }
  
}));



function App() {
  const [city, setCity] = useState([])
  const [isLoading, setisLoading] = useState(true);

  

  
  const [count, setCount] = useState(1);

  useEffect(() => {
    console.log("Count: " + count);
    setCount(1);
  }, [count]);

  useEffect(() => {
    document.title = "Asian Countries"
  })


  const getcities = () =>{
    setisLoading(true)
    axios.get(`https://restcountries.eu/rest/v2/region/asia`)
    .then(function (response) {
      // handle success
      console.log(response);
      setCity([...response.data])
      setisLoading(false)
  
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
  }
  
  const [cityval, setCityval] = useState("asia")

  let border = ""
  let languages = ""

  const mapper = new Map()

  const classes = useStyles()
  console.log(`https://restcountries.eu/rest/v2/region/${cityval}`)
  

  useEffect(() => {
    getcities()
     
  }, [])

  
  console.log(city)
  city.map(ct => {
    mapper.set(ct.alpha3Code, ct.name)
  })
  console.log("mapper", mapper)
  return (
    <div>

<div className={classes.container}>
    <nav>
      <Button  onClick={getcities} className={classes.bt}  variant='outlined'>Reload</Button>
    </nav>
      <div className={classes.wrapper}>

<div >
            <div >
            {count ? (
        <Typist showCursor = {false} avgTypingDelay={200} onTypingDone={() => setCount(0)}>
          <span style={{fontSize: "50px", color:"#FBFDFF", fontFamily:"'Montserrat', sans-serif"}}>ASIAN COUNTRIES</span>
          
        </Typist>
      ) : (
        ""
      )}
            </div>
            
          </div>
          

      </div>
      
    </div>
    <div className={classes.citywrapper}>

    {
      (isLoading)?(
        <CircularProgress style={{margin: "5% 50%"}}/>
      ):
      (
        <Row xs={1} md={3} className="g-4">
    {
      city.map(p => (
        
        <Col>
      <Card>
        <Card.Img variant="top" src={p.flag} className={classes.images}/>
        <Card.Body>
          <Card.Title>{p.name}</Card.Title>
          <Card.Text>
            Capital: {p.capital}
          </Card.Text>
          <Card.Text>
            Region: {p.region}
          </Card.Text>
          <Card.Text>
            Subregion: {p.subregion}
          </Card.Text>
          <Card.Text>
            Population: {p.population}
          </Card.Text>
          <Card.Text>
           {border = ""} 
              {
              p.borders.map(b => { 

                if(typeof(mapper.get(b)) != "undefined"){
                  border += mapper.get(b) + ", "
                }
              }
                )
                
              }
              Borders: {
              (border.length >0)?(
                border.slice(0, border.length-2)
              ):
              (
                <span>No Borders</span>
              )
              }
            
          </Card.Text>

          <Card.Text>
          {languages = ""} 
                {
                  p.languages.map(l => {languages += l.name + ", "})
                }

                Languages: {languages.slice(0, languages.length - 2)}

          </Card.Text>

          
        </Card.Body>
      </Card>
    </Col>
  
      ))
    }
</Row>
      )

    }


    </div>
    
    </div>
    
  );
}

export default App;

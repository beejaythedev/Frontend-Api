import { useState, useRef, useEffect} from 'react'
function Weather(){

    const inputRef = useRef();
    const [city, setCity] = useState('')
    const [weatherData, setWeatherData] = useState(null)
    const [error, setError] = useState('')

    function handleData(){
        const cityName = inputRef.current.value.trim();
        if(cityName === ""){
            alert("Enter a city");
            return;
        }
        setCity(cityName);
        setError('')
    }

    const fetchdata = async (city) =>{

        if(!city){
            return;
        }

        try{
            const dataUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_URI}`

            const response = await fetch(dataUrl);

            if(!response.ok){
                throw new Error("City not found")
            }
            const data = await response.json()
            setWeatherData(data)
            setError('')

        }
        catch(error){
            console.log("error", error.message)
            setError(error.message)
            setWeatherData(null)
        }
    }

    useEffect( () =>{ 
            fetchdata(city)
    }, [city])

    

    return(
        <>
            <div  className="container">
                <h1>My Weather App</h1>
                <div className='search'>
                    <input ref= {inputRef} type="text" placeholder="Enter the city" />
                    <button className='btn'onClick={handleData}>Search</button>
                </div>
                {weatherData ? (
                    <>
                        <div className='data'>
                            <p>City: {weatherData.name}</p>
                            <p>Temperatre: {Math.round(weatherData.main.temp - 273)} Celcius</p>
                            <p>Humidity: {weatherData.main.humidity}</p>

                        </div>
                    </>
                    )
                    :
                    (   <>
                        {error && <p className='data'style={{color: 'red'}}>Error: {error}</p>}
                        </>
                    )

                }
            </div>
     </>   
    )
}

export default Weather;
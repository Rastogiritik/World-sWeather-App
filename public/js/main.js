// ye hm use kr rhe hai taki hmara textarea ka pta rhe  
const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');

// get output here pr error show krnae ke liye usko get kr rhe hai
const city_name = document.getElementById('city_name');

// ab mujhe temp wala elemet or temp_status wale element ko get krna hai
const temp = document.getElementById('temp');
const temp_status = document.getElementById('temp_status');
const temp_val = document.getElementById('temp_val');

// this is for select the query by the class
const dataHide = document.querySelector('.middle_layer');

const getInfo = async(event) => {
    event.preventDefault();
    // isse hme textarea me likha hua text mil jayega
    let cityval = cityName.value;
    if(cityval === ""){
        // kuch is trah inner Html di jati hai texys ko
        city_name.innerText = 'Plz write the city name before search'
        // data_hide krne ke liye
        dataHide.classList.add('data_hide');
    }
    else{
        // try ko hm galtiya krne ke liye use krte hai 
        try{
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityval}&units=metric&appid=42dc47dd5e0f57554b11829f8196fe4c`
        // this is for fetch api kese use krte hai. 
        // await use kra kyuki json se data lene ke liye time to lega isliye hm async await ka use krte hai
        const response = await fetch(url);
        const data = await response.json();
        // ab mujhe ye data array me convert krna hoga
        const arrData = [data];

        // aise hm do data ek sath le skte hai
        city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
        // ab mai temp wale element ko inner value duga
        temp_val.innerHTML = arrData[0].main.temp;
        // it is use for assure the image of weather
        const tempMood = arrData[0].weather[0].main;

        // coundition to check sunny or cloudy
        if(tempMood == "Clear") {
            temp_status.innerHTML ="<i class='fas fa-sun' style='color: #eccc68;'></i>"
        }
        else if (tempMood == "Clouds") {
            temp_status.innerHTML ="<i class='fas fa-cloud' style='color: #f1f2f6;'></i>"
        }
        else if (tempMood == "Rain") {
            temp_status.innerHTML ="<i class='fas fa-cloud-rain' style='color: #a4b0be;'></i>"
        }
        else {
            temp_status.innerHTML ="<i class='fas fa-sun' style='color: #eccc68;'></i>"
        }

        dataHide.classList.remove('data_hide');
        
    }catch{
        city_name.innerText = 'Plz write the right city name';
        dataHide.classList.add('data_hide');
    }
    }
}   

submitBtn.addEventListener('click', getInfo);
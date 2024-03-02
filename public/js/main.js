const cityName=document.getElementById('cityName');
const submitBtn=document.getElementById('submitBtn');
const city_name=document.getElementById('city_name');
const temp_status=document.getElementById('temp_status');
const temp=document.getElementById('temp_real');
const day=document.getElementById('day');
const today_date=document.getElementById("today_date");
const datahide=document.querySelector('.middle_layer');


const d = new Date();
            const weekday = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];
            day.innerText=weekday[d.getDay()];
        
            var months = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "June",
                "July",
                "Aug",
                "Sept",
                "Oct",
                "Nov",
                "Dec",
            ];

            today_date.innerText=`${d.getDate()} | ${months[ d.getMonth() ]}`;


const getInfo= async(event)=>{
    event.preventDefault();
   let cityVal=cityName.value;

    if(cityVal=== "")
    {
        city_name.innerText=`Please Enter The City Name Before You Search`;
        datahide.classList.add("data_hide");
    }else{
        try{
            let url=`https://api.openweathermap.org/data/2.5/forecast?q=${cityVal}&units=metric&appid=d6095d7cf2b747fe7dbdad1c07b048bf`;
        const response=await fetch(url);
        const data=await response.json();
        const arrData=[data];
        console.log(arrData);
        datahide.classList.remove("data_hide");        
        city_name.innerText=`${arrData[0].city.name} | ${arrData[0].city.country}`;
        temp.innerHTML=arrData[0].list[0].main.temp;
        const tempMood=arrData[0].list[0].weather[0].main;
        //consition to check sunny or cloudy
        if(tempMood==="Clear")
        {
            temp_status.innerHTML="<i class='fas fa-sun' style='color: #eccc68;'></i>";
        }
        else if(tempMood==="Clouds")
        {
            temp_status.innerHTML="<i class='fas fa-cloud' style='color: #f1f2f6;'></i>";
        }
        else if(tempMood==="Rain")
        {
        temp_status.innerHTML="<i class='fas fa-cloud-rain' style='color: #a4b0be;'></i>";
        }
        else{
            temp_status.innerHTML="<i class='fas fa-cloud' style='color: #f1f2f6;'></i>";
        }

    }catch{
            city_name.innerText=`Please Enter The City Name Properly`;
           datahide.classList.add("data_hide");
        }
    }


}
submitBtn.addEventListener('click',getInfo);
console.log('Javascript!!');




const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const error = document.querySelector('.msg-1');
const forecast = document.querySelector('.msg-2');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const address = search.value;
  error.textContent = ''
  forecast.textContent = ''
  
  fetch('http://localhost:3000/weather?address='+address).then((response) => {
    response.json().then((data) => {
      if(data.error){
        error.textContent = data.error;
      }else{
        forecast.textContent = data.Forecast;
      }
    })
  })

})

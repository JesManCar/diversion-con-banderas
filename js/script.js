const countriesList = document.getElementById("countries-list"); 


const getCountries = async () => {
    try {
        console.log("CARGANDO...");
      const response = await fetch(
        `https://restcountries.com/v3/all`
      );
      if (!response.ok) {
        throw new Error('Problema con el fetch', response.status);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener los datos: ', error);
    }
  };



const templateCountry = (country) => {
   // console.log(country)
    text =  `<div class="master">
            <div class="country">
                <img src=${country.flags[1]}></img>
                <h3>${country.name.common}</h3>
            </div>
            <div class="extra-info">
                <div class="principal-extra">
                <img src=${country.flags[1]}></img>
                <p>Name: ${country.name.common}</p>
                </div>
                <p>Capital: ${country.capital}</p>
                <p>Poblacion: ${country.population}</p>
                `;
    if(country.currencies) {
        text+=`<p>Moneda: ${Object.entries(country.currencies)[0][0]} ${Object.entries(country.currencies)[0][1].symbol}<p>`
    }

    text+=`</div></div></div>`
    return text;
}

const orderFunction = (a,b) => {
    //console.log(a)
    if (a.name.common.toUpperCase() < b.name.common.toUpperCase()){
        return -1
    } else if (a.name.common.toUpperCase() > b.name.common.toUpperCase()){
        return 1
    }
    return 0;
}

const loadingDiv = () => {
    countriesList.innerHTML = 
    `<div class="loading" id="loading">
    <img src="./img/loading-7528_256.gif" ></img>
    </div>`
}
const notShowloadingDiv = () => {
    const loading = document.getElementById("loading").className = "hide";
}


loadingDiv();

getCountries().then((datos) => {
    datos.sort(orderFunction)
    datos.forEach(element => countriesList.innerHTML += templateCountry(element));
    notShowloadingDiv();
    console.log("CARGA COMPLETADA");
})
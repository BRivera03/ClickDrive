

"use strict";

let currentPage = 1;
const itemsPerPage = 10;
let carsData = [];

const init = () => {
  const carContainer = document.getElementById("car-container");
  carContainer.classList.add("car-container-flex");

  fetch("js/cars.json")
    .then((response) => response.json())
    .then((data) => {
      carsData = data;
      renderPage();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

const renderPage = () => {
  const carContainer = document.getElementById("car-container");
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedCars = carsData.slice(start, end);

  let carHTML = '';
  paginatedCars.forEach((car) => {
    carHTML += `
      <div class="carsCards">
        <img src="${car.img}" class="card-img" alt="${car.model}">
        <div>
          <h5 class="card-title mb-2">${car.make} ${car.model}</h5>
          <p class="mb-1">
            <i class="bi bi-people-fill"></i> ${car.seats} Seats &nbsp; 
            <i class="bi bi-gear"></i> Automatic &nbsp; 
            <i class="bi bi-infinity"></i> Unlimited Mileage
          </p>
          <p class="mb-1"><i class="bi bi-geo-alt"></i> MIA Airport</p>
          <p class="text-success mb-1">Cancellation Available</p>
          <p class="text-primary mb-3">Pay Now and Save</p>
        </div>
        <div class="priceButton">
      <button class="btn-reserve" onclick="reserveCar('${car.make}', '${car.model}', '${car.img}', ${car.price}, '${car.seats}')">RESERVE</button>
        </div>
      </div>
    `;
  });

  carContainer.innerHTML = carHTML;
  updatePaginationControls();
};

const updatePaginationControls = () => {
  const pageInfo = document.getElementById("pageInfo");
  pageInfo.textContent = `Page ${currentPage} of ${Math.ceil(carsData.length / itemsPerPage)}`;

  document.getElementById("prevPage").disabled = currentPage === 1;
  document.getElementById("nextPage").disabled = currentPage === Math.ceil(carsData.length / itemsPerPage);
};

const prevPage = () => {
  if (currentPage > 1) {
    currentPage--;
    renderPage();
  }
};

const nextPage = () => {
  if (currentPage < Math.ceil(carsData.length / itemsPerPage)) {
    currentPage++;
    renderPage();
  }
};

function reserveCar(make, model, img, price, seats) {
  const url = `reserve.html?make=${encodeURIComponent(make)}&model=${encodeURIComponent(model)}&img=${encodeURIComponent(img)}&price=${encodeURIComponent(price)}&seats=${encodeURIComponent(seats)}`;
  window.location.href = url;
}

window.onload = init;
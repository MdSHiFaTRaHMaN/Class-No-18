const loadPhone = async (searchText = '13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}
const displayPhones = (phones, isShowAll) => {
    // console.log(phones)

    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    const showAllContainer = document.getElementById('show-all-container')
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    }
    else {
        showAllContainer.classList.add('hidden');
    }
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
        // console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 p-4 shadow-xl border-2 border-black`;
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title text-2xl">${phone.phone_name}</h2>
            <span class="text-xl"> <span class="font-bold">Brand: </span>${phone.brand}</span>
            <span class="text-xl"> <span class="font-bold">Price:</span> 1 kidney</span>
            <p class="text-xl"><span class="font-bold">Kidney Sell Number:</span> 01724683220</p>
            <div class="card-actions justify-center">
                <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary rounded-xl">Show Details</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });

    // hide loading spinner
    toggleLoadingSpinner(false);
}

// 
const handleShowDetail = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    // console.log(phone)
    showPhoneDetails(phone)

}

const showPhoneDetails = (phone) => {
    console.log(phone);
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');

    showDetailContainer.innerHTML = `
        <div  class="text-center justify-center ml-[140px] mb-5">
        <img src="${phone.image}" alt="" />
        </div>
        <p class="font-bold"><span class="text-center font-bold text-xl">Storage:</span>${phone?.mainFeatures?.storage}</p>
        <p class="font-bold"><span class="font-bold text-xl">GPS:</span>${phone.others?.GPS || 'No GPS available'}</p>
        <p class="font-bold"><span class="font-bold text-xl">GPS:</span>${phone.others?.GPS ? phone.others.GPS : 'No GPS available in this device'}</p>
    `

    show_details_modal.showModal();
}


// handle search button
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll);
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden')
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}

// handle show all
const handleShowAll = () => {
    handleSearch(true);
}

loadPhone();
const loadPhone = async (searchText, isShow) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    const phone = data.data
    displayPhone(phone, isShow)
}

const displayPhone = (phones, isShow) => {
    const container = document.getElementById('phone-container')
    container.textContent = ''

    const showBtn = document.getElementById('showAllButton')
    if (phones.length > 12 && !isShow) {
        showBtn.classList.remove('hidden')
    }
    else {
        showBtn.classList.add('hidden')
    }

    if (!isShow) {
        phones = phones.slice(0, 12)
    }
    phones.forEach(phone => {
        // console.log(phone)
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="card bg-base-100 shadow-xl">
            <figure><img src="${phone.image}" alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title flex justify-center">${phone.phone_name}</h2>
                <p>There are many variations of passages of available, but the majority have suffered</p>
                <div class="card-actions justify-center">
                <button onclick="showMobileDetails('${phone.slug}')" class="btn btn-primary mt-5">Show Details</button>
                </div>
            </div>
            </div>
                  `
        container.appendChild(div)
    });

    loadSpinner(false)
}

const searchPhone = (isShow) => {
    loadSpinner(true)
    const text = document.getElementById('insertedText')
    const phoneName = text.value
    console.log(phoneName)
    loadPhone(phoneName, isShow)
}

const loadSpinner = (isSpin) => {
    const spinner = document.getElementById('loading-spinner')
    if (isSpin) {
        spinner.classList.remove('hidden')
    }
    else {
        spinner.classList.add('hidden')
    }
}

const showAllButton = () => {
    searchPhone(true)
}

const showMobileDetails = async(id) => {
    console.log(id)

    // show single phone details
    const res= await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data= await res.json()
    console.log(data)
    const phone= data.data
    displayPhoneDetails(phone)
}

const displayPhoneDetails= (phone) =>{
    show_details_modal.showModal()
    console.log(phone)

    const details= document.getElementById('modal-details')
    details.innerHTML=`
    <img src="${phone.image}" alt="">
    <h3 class="font-bold text-3xl mt-5">${phone.name}</h3>
    <p class="text-base"></p>
    <p class="py-4 text-lg"><span class="font-semibold">Storage: </span>${phone.mainFeatures.storage}</p>
    <p class="py-4 text-lg"><span class="font-semibold">Display Size: </span>${phone.mainFeatures.displaySize}</p>
    <p class="py-4 text-lg"><span class="font-semibold">Chipset: </span>${phone.mainFeatures.chipSet}</p>
    <p class="py-4 text-lg"><span class="font-semibold">Memory: </span>${phone.mainFeatures.memory}</p>
    <p class="py-4 text-lg"><span class="font-semibold">Slug: </span>${phone.slug}</p>
    <p class="py-4 text-lg"><span class="font-semibold">Release Date: </span>${phone.releaseDate}</p>
    <p class="py-4 text-lg"><span class="font-semibold">Brand: </span>${phone.brand}</p>
    <p class="py-4 text-lg"><span class="font-semibold">GPS: </span>${phone.others.GPS}</p>
    `
}
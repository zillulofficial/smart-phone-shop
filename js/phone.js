const loadPhone = async (searchText, isShow) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    const phone = data.data
    displayPhone(phone, isShow)
}

const displayPhone = (phones, isShow) => {
    const container = document.getElementById('phone-container')
    container.textContent= ''

    const showBtn= document.getElementById('showAllButton')
    if(phones.length > 12 && !isShow){
        showBtn.classList.remove('hidden')
    }
    else{
        showBtn.classList.add('hidden')
    }

    if(!isShow){
        phones= phones.slice(0, 12)
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
                <button class="btn btn-primary mt-5">Show Details</button>
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
    loadPhone(phoneName,isShow)
}

const loadSpinner= (isSpin) =>{
    const spinner= document.getElementById('loading-spinner')
    if(isSpin){
        spinner.classList.remove('hidden')
    }
    else{
        spinner.classList.add('hidden')
    }
}

const showAllButton= () =>{
    searchPhone(true)
}
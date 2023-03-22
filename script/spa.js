let content = document.querySelector('.content');
let page = 1;

const modalCreate = (e) => {
    let fonModal = document.createElement('div');
    fonModal.className = 'fonModal'
    fonModal.addEventListener('click',() => {
        fonModal.style.display = 'none'
    })
    window.addEventListener('keydown',(e) => {
        e.key === 'Escape'?fonModal.style.display = 'none':true
    })
    document.body.appendChild(fonModal)
    const cardModal = document.createElement('div');
    cardModal.className = 'cardModal'
    fonModal.appendChild(cardModal)
// вставлям изображение
    const img = document.createElement('div')
    img.className = 'img'
    img.style.background = 'url(' + e.currentTarget.datas.image + ')';
    img.style.backgroundSize = ' contain';
    cardModal.appendChild(img)
// наполняем модальное окно данными
   console.log(e.currentTarget.datas)
    const description = document.createElement('div')
    description.className = 'description'
    cardModal.appendChild(description)
    let tth = `
        <div class="big">
            Name:
        </div>
        <div class="big">
            Origin:
        </div>
        <div>
            ${e.currentTarget.datas.name}
        </div>
        <div>
            ${e.currentTarget.datas.origin.name}
        </div>
        <div class="big">
            Status:
        </div>
        <div class="big">
            Location:
        </div>
        <div>
            ${e.currentTarget.datas.status}
        </div>
        <div>
            ${e.currentTarget.datas.location.name}
        </div>
        <div class="big">
            Spacies:
        </div>
        <div class="big">
            Gender:
        </div>
        <div>
            ${e.currentTarget.datas.species}
        </div>
        <div>
            ${e.currentTarget.datas.gender}
        </div>
    `
    
    description.innerHTML = tth
}

const createCard = (data) =>{
       
    data.results.forEach((v)=>{
        
        const card = document.createElement('div');
        card.datas = v;
        card.addEventListener('click',modalCreate)
        card.className = 'card'
        const div =  document.createElement('div');
        div.className = 'avatar';
        const img = document.createElement('img')
        div.appendChild(img)
        img.src = v.image
        const name = document.createElement("div");
        name.className = "nameAvatar";
        const nameText = document.createTextNode(v.name)
        name.appendChild(nameText)
        card.appendChild(div);
        card.appendChild(name)
        content.appendChild(card)
    })
}
const bildCard = (page) =>{
    fetch('https://rickandmortyapi.com/api/character/?page='+page)  
        .then(response => response.json()) 
        .then (data => data.error=='There is nothing here'?true:createCard(data))
       
}
bildCard(page)
const checkPositon = () =>{
    const height = document.body.offsetHeight
    const screenHeight = window.innerHeight
    const scrolled = window.scrollY
    const threshold = height - screenHeight / 5
    const position = scrolled + screenHeight
    if (position >= threshold) {
        
        if (page<42){
            page++
            bildCard(page)
        }
        
      }
}
window.addEventListener('scroll',(e)=>{
    
    checkPositon()
})
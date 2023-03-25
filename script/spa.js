let content = document.querySelector('.content');
let page = 1;

const modalCreate = (e) => {
    let fonModal = document.createElement('div');
    fonModal.className = 'fonModal'
    fonModal.addEventListener('click',() => {
        fonModal.style.display = 'none'
    })
    // убираем модальное окно по кнопке Esc
    window.addEventListener('keydown',(e) => {
        e.key === 'Escape'?fonModal.style.display = 'none':true
    })
    // аппендим модалку в боди, тк position:fixed 
    document.body.appendChild(fonModal)
    const cardModal = document.createElement('div');
    cardModal.className = 'cardModal'
    fonModal.appendChild(cardModal)
// вставлям изображение
    const img = document.createElement('div')
    img.className = 'img'
    img.style.background = 'url(' + e.currentTarget.datas.image + ')';
    img.style.backgroundSize = 'cover';
    cardModal.appendChild(img)
// наполняем модальное окно данными
    const description = document.createElement('div')
    description.className = 'description'
    cardModal.appendChild(description)
    let tth = `
        <div class="big">Name:</div>
        <div class="big">Origin:</div>
        <div>${e.currentTarget.datas.name}</div>
        <div>${e.currentTarget.datas.origin.name}</div>
        <div class="big">Status:</div>
        <div class="big">Location:</div>
        <div>${e.currentTarget.datas.status}</div>
        <div>${e.currentTarget.datas.location.name}</div>
        <div class="big">Spacies:</div>
        <div class="big">Gender:</div>
        <div>${e.currentTarget.datas.species}</div>
        <div>${e.currentTarget.datas.gender}</div>`
    description.innerHTML = tth
}

const createCard = (data) =>{
       // строим столько карточек сколько пришло от сервера данных в массиве и добавляем их в конец дочерних элементов 
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
// page хранит информацию о странице которую необходимо подгрузить, по умалчанию 1. 
const bildCard = (page) =>{
    fetch('https://rickandmortyapi.com/api/character/?page='+page)  
        .then(response => response.json()) 
        .then (data => data.error=='There is nothing here'?true:createCard(data))
       
}
// определяем что пользователь пролистал почти до конца страницы и соответственно подгружаем данные
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
// считывает событие скрола и проверят нужна ли подгрузка дополниетельных блоков
window.addEventListener('scroll',(e)=>{
    checkPositon()
})
window.onscroll = function () {scrollFunction()};
//включает и выключает кнопку toUp 
const scrollFunction = () => {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = 'block';
    } else {
        document.getElementById("myBtn").style.display = 'none';
        
    }
}
// проматывает страницу вверх
const topFunction = () => { 
            document.body.scrollTop = 0 // Safari
            document.documentElement.scrollTop = 0 // Chrome, Firefox, IE and Opera
}
// анимация для кнопки toUp
document.getElementById('myBtn').addEventListener('hover',()=>{
    this.style.backgroundColor = '#555'
})
document.getElementById('myBtn').addEventListener('mouseout ',()=>{
    this.style.backgroundColor = 'rgb(175, 175, 175)'
})
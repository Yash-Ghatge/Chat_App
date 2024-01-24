const socket=io('http://localhost:8000')


const form = document.getElementById('form') 
const messageinp=document.getElementById('messageinp')
const megacontainer = document.getElementById('container')
var audio = new Audio('ring.mp3');

const append =(message,position)=> {
    const messagecreate = document.createElement('div')
    messagecreate.innerText= message;
    messagecreate.classList.add('message')
    messagecreate.classList.add(position)
    megacontainer.append(messagecreate)
    if(position == 'left'){
        audio.play();
    }
}
const Name = prompt("Enter a user name:");
socket.emit('new-user-join', Name );

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageinp.value;
    append(`You:${message}`,'right')
    socket.emit('send',message )
    messageinp.value='';
})

socket.on('user-join',name=>{
    append(`${name} join the chat`,'right')
})

socket.on('receive',data =>{
    append(`${data.name}:${data.message}`,'left')
})

socket.on('leve',name =>{
    append(`${name} left the chat`,'left')
})

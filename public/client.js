// io we are getting from client library, we are saving it in socket variable
const socket = io()

// for username

let name;

// whenever we write some message and press enter we have to send message

let textarea = document.querySelector('#textarea')

let messageArea = document.querySelector('.message_area')

do{
    name = prompt('Please enter yout name: ')
}while(!name)   // until user gives a name we will keep giving prompt


textarea.addEventListener('keyup', (e) =>{
    // we want to check if the key presse is"enter", e is event here
    if(e.key === 'Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    // we are formatting the message recived
    let msg = {
        user: name,
        // to add name with the ,message
        message: message.trim()
    }

    // append

    appendMessage(msg,'outgoing')

    // removing the message after enter
    textarea.value =''

    scrollToBottom()

    // send to server via web socket

    socket.emit('message',msg)
}

function appendMessage(msg,type){
    let mainDiv =  document.createElement('div')
    let className = type
    mainDiv.classList.add(className,'message')

    let markup = `
        <h4>${msg.user}</h4>    
        <p>${msg.message}</p>
    `

    mainDiv.innerHTML = markup

    messageArea.appendChild(mainDiv)
}

// recieve message

socket.on('message',(msg)=>{
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}
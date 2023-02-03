// Accessing buttons 
const mode = document.querySelector('#light-dark-mode');
const ball = document.querySelector('#light-dark-mode-circle');
const searchBox = document.querySelector('#search-box');
const searchBtn = document.querySelector('#search-btn');
const info = document.querySelector('#info');
const searchWord = document.querySelector('#search-word');
const searchWordinput = document.querySelector('#search-word-input');
const phonetics = document.querySelector('#phonetics');

//Event listener for light dark mode change 
mode.addEventListener('click', ()=>{
    if(mode.getAttribute('data-mode')=="light"){
        ball.style.left = "24px";
        mode.style.backgroundColor="var(--dark-violet)";
        document.body.style.color = "var(--light-text-color)";
        searchBox.style.backgroundColor = "#404258";
        document.body.style.backgroundColor = "var(--dark-background)";
        searchWordinput.style.color = "var(--violet)";
        mode.setAttribute('data-mode', 'dark');
    }else{
        ball.style.left = "5px";
        mode.style.backgroundColor="gray";
        document.body.style.color = "var(--dark-text-color)";
        searchBox.style.backgroundColor = "var(--light-violet)";
        document.body.style.backgroundColor = "var(--light-background)";
        searchWordinput.style.color = "var(--dark-text-color)";
        mode.setAttribute('data-mode', 'light');
    }
})

searchBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const searchWord = searchWordinput.value;
    const response = getResponse(searchWord);    
})

// fetching data from api
async function getResponse(word){
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const response = await fetch(url);
    const responseText = await response.json();
    console.log(responseText);
    implementOnHtml(responseText);
}

function implementOnHtml(response){
    if(response.title){
        console.log("nothing found");
        alert("No definition found! Either enter word is incorrect or we have not that word");
        document.querySelector('#search-word-input').value = "";
    }else{
        searchWord.innerText = response[0].word;
        info.innerHTML="";
        for(let i=0; i<response[0].meanings.length; i++){
            const definitions = makeDefinition(response[0].meanings[i].definitions);
            const template = `<div class="word-info">\n\t<h2>${response[0].meanings[i].partOfSpeech}</h2>\n\t<h3>Meanings</h3>\n\t${definitions}\n</div>`;
            console.log(template);
            info.innerHTML+=template;
        }
    }
    

}

function makeDefinition(definitions){
    let template = `<ul class="definition-list">\n`;
    for(let i=0; i<definitions.length; i++){
        template+=`\t\t<li>${definitions[i].definition}</li>\n`;
    }
    template+=`\t</ul>`;
    return template;

}






 const form =document.getElementById('form');
 const search =document.getElementById('inSearch');
 const result =document.getElementById('result');
 const more =document.getElementById('more');

const apiURL = 'https://api.lyrics.ovh';

// //Search by song
// function searchSongs(term){
//     fetch( `${apiURL}/suggest/${term}`)
//     .then(res => res.json())
//     .then(data => console.log(data)); searchSongs(searchTerm);

// }


//Asynchronous Way
async function searchSongs(term){
    const res = await fetch( `${apiURL}/suggest/${term}`);
    const data = await res.json();
    console.log(data);
    showdata(data);
}
async function getLyrics(artist,songt){
    console.log(artist,songt);
    const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${songt}`);
    data = await res.json();
    const final = data.lyrics.replace(/(\r\n|\n|\r)/g,'<br>');
    console.log(data);
    result.innerHTML = `<h2><strong>${songt}</strong> - ${artist}</h2>
  <span>${final}</span>`;
}

//Show Song lists
function showdata(data){
    var output =   `${
        data.data.map(
            song => `<li>
            <span><strong>${song.title}</strong> - ${song.artist.name}</span>
            <button class="btn" data-artist="${song.artist.name}" data-song="${song.title}">Get Lyrics</button>
                        </li>`
                    ).join()};
            `
    result.innerHTML= `
    <ul class="songs">
        ${output}
    </ul>
    `;
    if(data.prev || data.next){
        more.innerHTML= `
        ${data.prev ? `<button class="btn" onclick="getMore(${data.prev})">Prev</button>`: ''}
        ${data.next ? `<button class="btn" onclick="getMore(${data.next })">Next</button>`: ''}
        `
    }
    else{
        more.innerHTML='';
    }
}
//Get Previous and Next Songs
async   function getMore(url){
    const res = await fetch( `https://cors-anywhere.herokuapp.com/${url}`);
    const data = await res.json();
    console.log(data);
    showdata(data);
}
//Event Listeners
form.addEventListener('submit',e => {
    e.preventDefault();
    const searchTerm = search.value.trim();
    console.log(searchTerm)
    if(!searchTerm){

    }
    else{
        searchSongs(searchTerm);
    }
    
});
result.addEventListener('click', e => {
    const getb = e.target;
    if(getb.tagName ==='BUTTON'){
        console.log("moveon");
        getLyrics(getb.getAttribute('data-artist'),getb.getAttribute('data-song'));
    }
});
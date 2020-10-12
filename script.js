let token;

//Spotify clientID and clientSecret. Please do not copy and use them without Haoqi's consent. Thanks!
const clientId = 'fe37533bb7ed430cb2ab139323ea4411';
const clientSecret = '9253f8e1b48343ad942ddbc120496e30';

// Get the Token
function getToken() {
  fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
      },
      body: 'grant_type=client_credentials'
  })
  .then( result => result.json())
  .then(data => {
    console.log(data.access_token)
    // token = data.access_token;
    getNewRelease(data.access_token);
  }).catch(err=> {
    console.log(err);
  })
}

window.addEventListener('load', function() {
    console.log('hello');
    getToken();
  })

  let albumElement = document.getElementById('_albumName');
  let dateElement = document.getElementById('_releaseDate');
  let artistElement = document.getElementById('_artistName');
  let imageElement = document.getElementById('_albumImage');
  let button = document.getElementById('project_button');
  let backgroundImage = document.getElementById('_backgroundImage')
  let titleWords = document.getElementById('project_title')
  let listenButton = document.getElementById('_listenLinks')
  let albumArray;


  //Fetch the JSON data.
function getNewRelease(token) {
  console.log(token);
  fetch ('https://api.spotify.com/v1/browse/new-releases',{
              method: 'GET',
              headers:{'Authorization': 'Bearer ' + token}
          })
          .then( result => {
            return result.json()
          })
          .then(data => {
            console.log(data);
            albumArray = data.albums.items;
            console.log(albumArray)

            //when 'find' clicked, display the info
            button.addEventListener('click', function() {
                let randomNumber = Math.floor(Math.random()*albumArray.length);
                albumElement.innerHTML = albumArray[randomNumber].name;
                dateElement.innerHTML = "Released on " + albumArray[randomNumber].release_date;
                artistElement.innerHTML = "by " + albumArray[randomNumber].artists[0].name;

                //reveal the p5 sketch.
                readyToGo = true;

                //reset the small ball position of the p5 sketch.
                a=90;

                for(let i=1; i< albumArray[randomNumber].artists.length;i++) {
                    let elt = document.createElement('p');
                    elt.innerHTML = "and " + albumArray[randomNumber].artists[i].name;
                    artistElement.appendChild(elt);
                    // console.log(artistElement.innerHTML);
                }
                imageElement.src = albumArray[randomNumber].images[0].url;

                listenButton.style.display= "block";

                // when spotify button is click, direct to the spotify url                        
                listenButton.onclick = function() {
                    console.log("button was clicked.");
                    let a= document.createElement('a');
                    a.target= '_blank';
                    a.href= albumArray[randomNumber].external_urls.spotify;
                    a.click();
                }

                // change "reveal" to "find another album" //
                button.innerHTML = 'Another';
                })
          })
          .catch(err=> {
            console.log(err);
          })
          

}

// console.log(albumArray[randomNumber].images[0].url)


  // -------- P5 CODE --------//
  let r, x, y, a;
  let readyToGo=false;
  function setup() {
    let myCanvas= createCanvas(300, 300);
    myCanvas.parent("canvas_container");
    r = 125;
    a=90;
    fill(200);
  }

  function draw() {
  if (readyToGo){
    background (110);
    x = 150 + cos(a) * r;
    y = 150 + sin(a) * r;
    circle(x, y, 39);
    circle(150,150,175);
    noStroke();
    // albumArray[randomNumber].images[0].url
    a = a + 0.0013;
  }
  }

  // ------- end of P5 CODE -------//





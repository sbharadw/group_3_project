
for(let i =0; i< 5; i++){

//Making elements nessary to display infomration displayed from api. Based on user input.
let section = document.querySelector('.section'); // Id section
let container = document.createElement('div'); //class="container"
let card = document.createElement('div'); // class="card"
let cardImage = document.createElement('div'); // class="card-image"
let figure = document.createElement('figure'); // class="image is-500x500"
let img = document.createElement('img'); //src="https://www.prospertrading.com/wp-content/uploads/2019/03/Options-961x641.jpg" alt="Placeholder image">
let lastDiv = document.createElement('div');//class="media-content 
let p1 = document.createElement('p'); //<p class="title is-4">John Smith</p>
let p2 = document.createElement('p'); //<p class="subtitle is-6">@johnsmith</p>
let content = document.createElement('div');
let a1 = document.createElement('a');
let a2 = document.createElement('a');
let br = document.createElement('br');
let time = document.createElement('time');

//Setting attributes for elements after creating them above.
container.setAttribute('class','container');
card.setAttribute('class', 'card');
cardImage.setAttribute('class','card-image');
figure.setAttribute('class',"image is-500x500")
img.setAttribute('src','https://www.prospertrading.com/wp-content/uploads/2019/03/Options-961x641.jpg');
lastDiv.setAttribute('class','media-content');
p1.setAttribute('class', 'title');
p2.setAttribute('class','subtitle');
content.setAttribute('class', 'content');
a1.setAttribute('href','#');
a2.setAttribute('href','#');
time.setAttribute('datetime', '2016-1-1');

//adding text to the p tags
p1.innerHTML = 'John Smith';
p2.innerHTML = '@johnsmith';
content.innerHTML =  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. <a>@bulmaio</a>. '
a1.innerHTML =  '#css';
a2.innerHTML = ' #responsive', '2016-1-1';
time.innerHTML = '11:09 PM - 1 Jan 2016';
//appending elements to the dom
section.appendChild(container);
container.appendChild(card);
card.appendChild(cardImage);
cardImage.appendChild(figure);
 figure.appendChild(img);
section.appendChild(lastDiv)
lastDiv.appendChild(p1);
lastDiv.appendChild(p2);
section.appendChild(content);
content.appendChild(a1);
content.appendChild(a2);
content.appendChild(br);
content.appendChild(time);

}







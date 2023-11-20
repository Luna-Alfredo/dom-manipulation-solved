/**
 * LOCAL STORAGE AND DOM MANIPULATION
 * In this task you will write some functions to let the browser save
 * some of your actions results and retrieve them when the page is reloaded.
 * You will be working with the localStorage.
 * Make sure to read the following exercise-info file/files before you start
 * * 03 LocalStorage.md
 * * 04 EventDelegation.md
 * Local Storage might be shortened to "LS" in the comments beneath.
 * @requirement
 * Event delegation MUST be used
 */

/**
 * @task
 * Implement the 'click' event that solves several tasks by the item click:
 * * If the item is NOT in favorites LS and has white background color
 * * * Changes the color of the box to red
 * * * Add the item's id to the local storage
 * * Else if the box is in favorites LS and has white red color
 * * * Changes the color of the box to white
 * * * Add the item's id to the local storage
 * * Make all the items that are listed in the favorites LS save the red background color when the page is reloaded
 */

/**
 * @hint
 * Here is a plan of how you can structure your code. You can follow it or choose your own way to go
 * * Select the container that holds all the items
 * * Create a function that sets the background to be red for the item with an id listed in favorites LS
 * * Run this function
 * * Create a function that adds an id to favorites LS by id passed as an argument
 * * Create a function that deletes an id from favorites LS by id passed as an argument
 * * Create a callback function that updates the element background color and does the
 * * /~/ action with the item's id depending on if it is in LS or not. The function should
 * * /~/ do that to a specific item that has a specific class value
 * * add the event listener to the container, pass the callback.
 */

// Your code goes here...
const cardsContainer = document.querySelector('.cardsContainer');
const allCards = document.querySelectorAll('.card');

if (!localStorage.getItem('favorites')) {
  localStorage.setItem('favorites', '');
}


const makeRed = () => {
  const storageArr = localStorage.getItem('favorites').split(',');
  for (const card of allCards) {
    if (storageArr.includes(card.id)) {
      document.getElementById(card.id).style.backgroundColor = 'red';
      card.dataset.fav = 'true';
  }
}
}

const addToLS = (id) => {
  const add = id;
  const storageArr = localStorage.getItem('favorites').split(',')
  if (!storageArr.includes(add.toString())) {
  storageArr.push(add.toString());
  localStorage.setItem('favorites', storageArr.join(','));
  }
}

const removeFromLS = (id) => {
  const storageArr = localStorage.getItem('favorites').split(',')
  storageArr.splice(storageArr.indexOf(id.toString()), 1);
  localStorage.setItem("favorites", storageArr.join(','));
  document.getElementById(id).style.backgroundColor = 'white';

}
const callbackFn = (e) => {
  const item = e.target;
  const itemId = e.target.id;

  
  if (item.dataset.fav === 'false') {
    item.dataset.fav = 'true';
    addToLS(itemId);
    makeRed();

  } else if (item.dataset.fav === 'true') {
    item.dataset.fav = 'false';
    removeFromLS(itemId);
  }
 
};
makeRed();
cardsContainer.addEventListener('click', callbackFn);




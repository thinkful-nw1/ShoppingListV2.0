'use strict';

const STORE = [
  { name: 'apples', checked: false },
  { name: 'oranges', checked: false },
  { name: 'milk', checked: true },
  { name: 'bread', checked: false }
];

function renderShoppingList(){
  console.log('render shopping list ran');
  //first add a hardcoded list item string using the function to see if it works

  const shoppingListItemsString = generateShoppingItemsString(STORE);
  $('.js-shopping-list').html(shoppingListItemsString);
}
function generateItemElement(item, itemIndex, template) {
  return `
<li class="js-item-index-element"
    data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}
//generate the list item string
function generateShoppingItemsString(shoppingList){
  console.log('Generating shopping list element');

  const items = shoppingList.map((item, index) => generateItemElement(item, index));

  return items.join('');

}


function handleDeleteItem(){
  console.log('handle delete item ran');
  $('ul').on('click', '.shopping-item-delete', function () {
    console.log('hello');
    let no = $(this).parents('li').data('item-index');
    console.log(no);
    STORE.splice (no, 1);
    console.log(STORE);
    renderShoppingList();


  });
}
//add an event listner to the class js-shopping-list-form
//store the delete button in a variable
// let del = $('.js-shopping-list-form').find('js-item-delete');
// $('.js-shopping-list-form').on ('click',del,function(){
//   delete
// })
// When the user clicks delete the item remove the item
// from the store.
//call the render function again to render the new list

function handleItemChecked(){
  console.log('handle item checked ran');
  //get the index no of the item and check store if
  //item is checked and toggle the value
  $('ul').on('click', '.js-item-toggle', function () {
    console.log('toggle clicked');
    let no = $(this).parents('li').data('item-index');
    console.log(no);
    if(STORE[no].checked){
      STORE[no].checked = false;
    }
    else {STORE[no].checked = true;}
    
    renderShoppingList();
  });
  // console.log(STORE[no].checked);

}

function handleNewItemSubmit(){
  // when the user adds an item to the list, add the
  //item to the store and re-render the shopping list with
  //new item.
  $('#js-shopping-list-form').on('submit',
    function (e) {
      e.preventDefault();
      console.log('clicked');
      //capture the new list item
      let newItem = $('input[name = shopping-list-entry]').val();
      console.log(newItem);
      STORE.push ({name:newItem,checked:false});
      console.log(STORE);
      $('.js-shopping-list-entry').val ('');
      renderShoppingList();

    });

}
function handleShoppingList(){
  renderShoppingList();
  handleDeleteItem();
  handleItemChecked();
  handleNewItemSubmit();
}

$(handleShoppingList);
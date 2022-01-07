console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();

}); // end doc ready

function setupClickListeners() {
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      gender: $('#genderIn').val(),
      readyForTransfer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val(),
    };
    console.log('this is koalaToSend', koalaToSend)
    // call saveKoala with the new obejct
    saveKoala( koalaToSend );

    //working through the delete button 
    //now let's call the delete function upon click of the delete button
    $(document).on('click', '.deleteButton', deleteKoala);
  }); 
}

//now let's write the delete button function : 

function deleteKoala(){
  let koalaId = $(this).parents('tr').data('id');
  $.ajax({
    method: 'DELETE',
    url: `/koalas/${koalaId}`
  })
  .then((res) => {
    console.log('delete success!!!');
    renderKoalas();
  })
  .catch((err) => {
    console.log('delete failed', err);
  })
};

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    type: 'GET',
    url: '/koalas'
  }).then(function (response) {
    console.log(response);
    renderKoalas(response);
  }).catch(function (error) {
    console.log('error in GET', error);
  });
  
} // end getKoalas


function renderKoalas(koala) {
  console.log('koala is', koala);
  
  $('#viewKoalas').empty();
  for (let i = 0; i < koala.length; i += 1) {
  let koalas = koala[i]
  if(koalas.ready_to_transfer === false){
     $('#viewKoalas').append(`
     <tr data-id= "${koalas.id}">
        <td>${koalas.name}</td>
        <td>${koalas.gender}</td>
        <td>${koalas.age}</td>
        <td>${koalas.ready_to_transfer}</td>
        <td>${koalas.notes}</td>
        <td><button class="deleteButton">delete</button></td>
        <td><button class="readyToTransfer">ready to transfer</button></td>
      </tr>
    `);
  }
  else {
    $('#viewKoalas').append(`
      <tr data-id= "${koalas.id}" >
        <td>${koalas.name}</td>
        <td>${koalas.gender}</td>
        <td>${koalas.age}</td>
        <td>${koalas.ready_to_transfer}</td>
        <td>${koalas.notes}</td>
        <td><button class="deleteButton">delete</button></td>
      </tr>
    `);
  }
    // For each koala, append a new row to our table
   
  }
}

function saveKoala( koalaToSend ){
  console.log( 'in saveKoala', koalaToSend );
  // ajax call to server to get koalas
  $.ajax({
    type: 'POST',
    url: '/koalas',
    data: koalaToSend
  })
    .then( function (response) {
      $('#nameIn').val(''),
      $('#ageIn').val(''),
      $('#genderIn').val(''),
      $('#readyForTransferIn').val(''),
      $('#notesIn').val('')
      getKoalas()
    })
 
}

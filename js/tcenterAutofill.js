/*
 * @name tcenterAutofill
 * @package TCenter
 *
*/



function tooltip(message) {

  $("<div></div>").class("dsr-tooltip").text(message);

};


$('#mainContent').prepend("<a data-toggle='modal' href='#modal-tcAutofill' id='btn-tcAutofill' class='btn btn-info'>Autofill this ticket with SuperDSR</a>");


console.log('button created');


$('#btn-tcAutofill').on('click', (function() {

   $('#u_f_id').focus();

}))




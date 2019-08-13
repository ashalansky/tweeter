$(document).ready(function() {
  $("textarea").keydown(updateCount);
  
  function updateCount() {
    let charLength = 140 - $(this).val().length; //max length
    if (this.value.length >= 140) ;
    $(".counter").text(charLength);
  }
});

// $('#customText').on('keyup', function(event) {
//   var len = $(this).val().length;
//   if (len >= 40) {
//      $(this).val($(this).val().substring(0, len-1));
//   }
// });
$(document).ready(function() {
  $("textarea").keydown(function() {
    const maxLength = 140;
    let length =  $(this).val().length;
    length = maxLength - length;
    $(".counter").text(length);
  
  if ($(this).val().length > maxLength - 1) {
    $(".counter").addClass("red");
  } else if ($(this).val().length < maxLength) {
    $(".counter").removeClass("red");
  }
  });
});



// Check off Specific todos by clicking
$('ul').on("click", "li", function(){
  $(this).toggleClass("completed");
});

// Click X to remove to-do
$('ul').on("click", "span", function(event){
  $(this).parent().fadeOut(500,function(){
    $(this).remove();
  });
  event.stopPropagation();  // jQuery method to stop event bubbling from propogating to parent elements
});

$('input[type="text"]').keypress(function(e){
  if(e.which === 13){
    let todoText = $(this).val();
    $(this).val("");
    //create a new li and add to ul
    $('ul').append(`<li><span><i class="fa fa-trash"></i></span> ${todoText}</li>`);
  }
});

$('.fa-plus').on('click', function(){
  $('input[type="text"]').fadeToggle();
})

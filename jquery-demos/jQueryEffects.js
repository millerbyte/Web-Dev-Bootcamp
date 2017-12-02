$('button').on('click', () => {
  $('div').fadeToggle(1000, function(){
  console.log('Fade Completed!');
  // $(this).remove();
  });
})

// let width = Math.floor((Math.random()*100)+ 350);
// let height = Math.floor((Math.random()*50)+ 200);

let campgrounds = getData;

  function getData() {
    return (
      [{
        name: 'Rocky Mountain National Park',
        image: 'http://via.placeholder.com/420x200'
      },
      {
        name: 'Camp Morningwood',
        image: 'http://via.placeholder.com/420x200'
      },
      {
        name: 'Camp Eveningwood',
        image: 'http://via.placeholder.com/420x200'
      },
      {
        name: 'Rocky Mountain National Park',
        image: 'http://via.placeholder.com/420x200'
      },
      {
        name: 'Camp Morningwood',
        image: 'http://via.placeholder.com/420x200'
      },
      {
        name: 'Camp Eveningwood',
        image: 'http://via.placeholder.com/420x200'
      },
    ]
  )
  }

module.exports = getData;

var update = document.getElementById('update');
var del = document.getElementById('delete');

update.addEventListener('click', function() {
  console.log("Making fetch");
  fetch('quotes', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'name': 'Darth Vader',
      'quote': 'I find your lack of faith disturbing.'
    })
  }).then(res => {
    console.log("inside 1st resolve")
    if (res.ok) return res.json();
  })
  .then (data => {
    window.location.reload(true);
    console.log(data);
  })
})

del.addEventListener('click', function() {
  console.log("Making fetch");
  fetch('quotes', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': 'Darth Vader'
    })
  })
  .then(res => {
    console.log("res:", res);
    if (res.ok) return res.json();
  })
  .then(data => {
    window.location.reload();
    console.log("Received res.json()")
    console.log(data);
  })
})

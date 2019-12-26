const button = document.getElementById('sendMessageButton')

button.addEventListener('click', evt => {
  evt.preventDefault()

  let email = document.getElementById('email').value
  let sender = document.getElementById('name').value
  let content = document.getElementById('message').value

  if (email && sender && content) {
    let templateParams = {
      email,
      sender,
      content
    }

    let serviceId = 'default_service'
    let templateId = 'contact_form'
    emailjs.send(serviceId, templateId, templateParams).then(
      function(response) {
        console.log('SUCCESS!', response.status, response.text)
      },
      function(error) {
        console.log('FAILED...', error)
      }
    )

    document.getElementById('email').value = ''
    document.getElementById('name').value = ''
    document.getElementById('message').value = ''

    location.hash = 'thanks'
    setTimeout(function() {
      location.hash = ''
    }, 5000)
    if (document.getElementById('addedNode')) {
      document.getElementById('addedNode').remove()
    }
  } else if (!document.getElementById('addedNode')) {
    let node = document.createElement('LI')
    node.innerText = 'Please fill out all fields before submitting!'
    node.id = 'addedNode'
    document.getElementById('contactActions').appendChild(node)
  }
})

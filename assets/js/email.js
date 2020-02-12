const button = document.getElementById('sendMessageButton')

button.addEventListener('click', evt => {
  evt.preventDefault()

  let user_email = document.getElementById('email').value
  let user_name = document.getElementById('name').value
  let content = document.getElementById('message').value

  if (user_email && user_name && content) {
    let templateParams = {
      user_email,
      user_name,
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

    if (document.getElementById('addedNode')) {
      document.getElementById('addedNode').remove()
    }
    let successNode = document.createElement('P')
    successNode.innerText =
      "Thanks for reaching out! An email has been sent to me and I'll be in touch as soon as possible. \n All the best, \n Sam"
    successNode.id = 'successNode'
    document.getElementById('contact-form').appendChild(successNode)
  } else if (!document.getElementById('addedNode')) {
    if (document.getElementById('successNode')) {
      document.getElementById('successNode').remove()
    }
    let node = document.createElement('P')
    node.innerText = 'Please fill out all fields before submitting!'
    node.id = 'addedNode'
    document.getElementById('contact-form').appendChild(node)
  }
})

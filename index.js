
var canvas = new fabric.Canvas('c', {
  width: 450,
  height: 540,
})

// function to let the user choose the t-shirt color by setting the background color of the canvas (our image is png , so it is transparent and will take the same background color of our canvas)
document.getElementById('shirt-background').onchange = function (e) {
  document.getElementById('c').style.backgroundColor = e.target.value
}

// insert the png image into the canvas and center it ;)
const img = document.getElementById('my-image')
const tshirt = new fabric.Image(img, {
  opacity: 0.85,
})
tshirt.set('selectable', false)
canvas.add(tshirt)
canvas.renderAll()

// function to add text
function insertText() {
  var text = new fabric.IText('Enter your text here 😃', {
    left: 40,
    top: 100,
    fill: 'white',
  })
  canvas.add(text)
  canvas.renderAll()
}
// button to add the text on the canvas (t-shirt)
var addTextBtn = document.querySelector('button.add-text')
addTextBtn.addEventListener('click', insertText)

// function to set the style of the text
const styleHandler = function (id, event, styleProp) {
  document.getElementById(id)[event || 'onclick'] = function (e) {
    if (id === 'text-color') {
      canvas.getActiveObject().set({ fill: e.target.value })
    } else if (id === 'text-bg-color') {
      canvas.getActiveObject().set({ backgroundColor: e.target.value })
    } else {
      canvas.getActiveObject().set(styleProp)
    }
    canvas.renderAll()
  }
}
// change the color of the text
styleHandler('text-color', 'onchange')
// change the background color of the text
styleHandler('text-bg-color', 'onchange')

// change font family of the text
styleHandler('Festival', 'onclick', { fontFamily: 'Festive' })
styleHandler('Monoton', 'onclick', { fontFamily: 'Monoton' })
styleHandler('ZCOOL-KuaiLe', 'onclick', { fontFamily: 'ZCOOL KuaiLe' })
styleHandler('Fredericka', 'onclick', { fontFamily: 'Fredericka the Great' })

// delete object from the canvas
function deleteObjects() {
  var activeGroup = canvas.getActiveObjects()
  console.log(activeGroup.length)
  if (activeGroup.length == 0) {
    alert(
      'no element(s) selected ,please select at least one element to delete it',
    )
  }
  if (activeGroup && activeGroup.length !== 0) {
    if (confirm('Delete element(s) ?')) {
      activeGroup.forEach(function (obj) {
        canvas.remove(obj)
      })
    }
  }
}
document.getElementById('delete-object').onclick = deleteObjects

// LET the user upload his own logo or image ....
document.getElementById('imgLoader').onchange = function handleImage(e) {
  var reader = new FileReader()
  reader.readAsDataURL(e.target.files[0])
  reader.onload = function (event) {
    var imgObj = new Image()
    imgObj.src = event.target.result
    imgObj.onload = function () {
      var image = new fabric.Image(imgObj)

      image.scaleToWidth(200)
      canvas.centerObject(image)
      canvas.add(image)
      canvas.renderAll()
    }
  }
}

// if the user click on the text input we show him the text options
canvas.on('mouse:down', function (e) {
  if (e.target.type === 'i-text') {
    document.querySelector('div#textMenu').className = 'displayOperations'
  }
})

canvas.on('before:selection:cleared', function () {
  document.querySelector('div#textMenu').className = 'hideOperations'
})

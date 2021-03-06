# t-shirt-design-vanilla-javascript
-this web application allow the users to create their own t-shirt design with a logo or image and text , it has been made with fabric.js and vanilla javascript, HTML5 and CSS3
-you can also use  fabric.js with a framwork (React.js /vue.js ...etc).

-Exemple with React.js
1-download fabric.js with the package manager of your choice (npm install fabric  or yarn add fabric)
2-import fabric.js  (import { fabric } from "fabric") 
3- then you have to use some other hooks to make it happen 

=> PS: i'am using tailwind.css with react to style element, feel free to use any other css framework (bootstrap,styled Components ..etc).

import React,{ useEffect, useRef, useState, useMemo } from 'react;
function App() {
  // refs
  const canvasRef = useRef(null)
  // states
  const [color, setColor] = useState(null)
  const [textColor, setTextColor] = useState("black")
  const [removeText, setRemoveText] = useState(false)
  const [userImage, setUserImage] = useState(null)
  // callback function to update fabrics propreties

  // add text
  const myText = useMemo(() => {
    var text = new fabric.IText("tapez ici ...", {
      left: 200,
      top: 200,
      fill: textColor,
    })
    return text
  }, [textColor])

  // add user image
  const addUserPhoto = function (e) {
    var reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    var imgObj = new Image()
    reader.onload = (e) => {
      imgObj.src = e.target.result
      var myImg = new fabric.Image(imgObj)
      setUserImage(myImg)
      console.log(myImg)
      return myImg
    }
  }

  useEffect(() => {
    let canvas = new fabric.Canvas(canvasRef.current, {
      backgroundColor: color,
      selectionColor: "dodgerblue",
      width: window.innerWidth / 2,
      height: window.innerHeight,
    })

    // tshirt image
    new fabric.Image.fromURL("/images/shirt.png", function (myImg) {
      canvas.add(myImg)
      myImg.set("selectable", false)
      myImg.set({
        left: 100,
        top: 100,
        opacity: 0.85,
      })
      canvas.renderAll()
    })
    canvas.add(myText)
    if (removeText) canvas.remove(myText)
    if (userImage !== null) {
      canvas.add(userImage)
    }
    canvas.renderAll()

    return () => canvas.dispose()
  }, [color, myText, removeText, userImage])

  return (
    <div className="w-screen flex">
      {/* canvas */}
      <canvas ref={canvasRef} />

      {/* controllors */}
      <div className="flex items-center m-3 bg-black flex-col flex-wrap px-4">
        {/* shirt options */}
        <p className="text-white font-semibold my-2">Couleur du t-shirt :</p>
        <div className="flex">
          <div
            className="rounded-full bg-red-600 mx-2 w-10 h-10 border-2 border-white cursor-pointer"
            onClick={() => {
              setColor("#ff4542")
            }}
          ></div>
          <div
            className="rounded-full bg-yellow-600 mx-2 w-10 h-10 border-2 border-white cursor-pointer"
            onClick={() => {
              setColor("gold")
            }}
          ></div>
          <div
            className="rounded-full bg-blue-600 mx-2 w-10 h-10 border-2 border-white cursor-pointer"
            onClick={() => {
              setColor("#0978da")
            }}
          ></div>
        </div>
        {/* download logo */}
        <p className="text-white font-semibold my-2">
          telecharger votre logo :
        </p>
        <input
          type="file"
          className="outline-none border-0 bg-purple-600 rounded-md "
          onChange={addUserPhoto}
        />
        {/* text options */}
        <div className="flex flex-col items-center mt-6">
          <p className="text-white font-semibold">Options pour le text :</p>
          <input
            type="color"
            onChangeCapture={(e) => setTextColor(e.target.value)}
            className="my-2"
          />
          {!removeText ? (
            <button
              onClick={() => setRemoveText(true)}
              className="border-0 outline-none bg-red-500 rounded-xl max-h-8 text-white px-2"
            >
              Supprimer le text
            </button>
          ) : (
            <button
              onClick={() => setRemoveText(false)}
              className="border-0 outline-none bg-green-500 rounded-xl max-h-8 text-white px-2"
            >
              ajouter du text
            </button>
          )}
        </div>
      </div>
    </div>
  )
}


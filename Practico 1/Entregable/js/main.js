var canvas = document.getElementById("canvas");
/*canvas.addEventListener('mousemove', function(evt) {
        var mousePos = getMousePos(canvas, evt);
        document.getElementById("Xcord").innerHTML = mousePos.x-canvas.offsetLeft;
        document.getElementById("Ycord").innerHTML = mousePos.y;

});*/
canvas.addEventListener('mousedown',pulsaRaton,false);
canvas.addEventListener('mousemove',mueveRaton,false);
canvas.addEventListener('mouseup',levantaRaton,false);
var ctx2 = canvas.getContext("2d");
var imageOrig = document.getElementById("original");
var width = 760;
var height = 550;
var imageData2;
var r = 0;
var g = 0;
var b = 0;
var estoyDibujando=false;
var herramienta="lapiz";


window.onload = function(){
  var input = document.getElementById('file-input');
    input.addEventListener('change', mostrarImagen);
}
function getMousePos(canvas, evt) {
        return {
          x: evt.clientX,
          y: evt.clientY
        };
      }
function mostrarImagen(e){
  var image1 = new Image;
  image1.src = URL.createObjectURL(e.target.files[0]);
  imageOrig.src = image1.src;
  image1.onload = function(){
    ctx2.drawImage(image1, 0, 0, width, height);
    imageData2 = ctx2.getImageData(0, 0, width, height);
  }
}
function getContexData(){
            imageData2 = ctx2.getImageData(0, 0, width, height);
}


  function getRojo(x,y){
	   index=(x+y*imageData2.width)*4;
	    return imageData2.data[index];
    }
	function getVerde(x,y){
			index=(x+y*imageData2.width)*4;
			return imageData2.data[index+1];
	}
	function getAzul(x,y){
			index=(x+y*imageData2.width)*4;
			return imageData2.data[index+2];
  }
  function getPixel(x, y){
  r = getRojo(x,y);
  g = getVerde(x,y);
  b = getAzul(x,y);
}

  function setPixel(x, y, r, g, b, a){
	index = (x + y * imageData2.width) *4;
	imageData2.data[index+0] = r;
	imageData2.data[index+1] = g;
	imageData2.data[index+2] = b;
	imageData2.data[index+3] = a;
}

function blancoYNegro(){
  getContexData();
	for (var x = 0; x < width; x++){
		for (var y = 0; y < height; y++){
      getPixel(x,y);
			 var Color = Math.round((r+g+b)/3);
			setPixel(x, y, Color, Color, Color, 255);
		}
	}
	ctx2.putImageData(imageData2, 0, 0);
}
function cargarImagen(){
  var image1 = new Image();
  image1.src="Imagenes/japish.jpg";
  image1.onload = function(){
    ctx2.drawImage(image1, 0, 0, width, height);
    imageData2 = ctx2.getImageData(0, 0, width, height);
  }

}
function sepia(){
  getContexData();
  for (var x = 0; x < width; x++){
		for (var y = 0; y < height; y++){
      getPixel(x,y);
      var r1 =  Math.round((0.393*r)+(0.769*g)+(0.189*b));
      var g1= Math.round((0.349*r)+(0.686*g)+(0.168*b));
      var b1 =Math.round((0.272*r)+(0.534*g)+(0.131*b));
      setPixel(x, y, r1, g1, b1, 255);
    }
  }
ctx2.putImageData(imageData2, 0, 0);
}
function invertir(){
  getContexData();
  for (var x = 0; x < width; x++){
    for (var y = 0; y < height; y++){
      getPixel(x,y);
      setPixel(x, y,255-r,255-g,255-b, 255);
    }
  }
  ctx2.putImageData(imageData2, 0, 0);
}
function binarizacion(){
  getContexData();
  for (var x = 0; x < width; x++){
    for (var y = 0; y < height; y++){
      getPixel(x,y);
       var Color = Math.round((r+g+b)/3);
      if (Color < 127){
        setPixel(x,y,0,0,0,255);
      }
      else {
        setPixel(x,y,255,255,255,255);
      }
    }
  }
  ctx2.putImageData(imageData2, 0, 0);
}
function original(){
  ctx2.putImageData(imageData2, 0, 0);
}
function cambioelsig(x,y){
  if (y < height){
    getPixel(x,y);
    var color = Math.round((r+g+b)/3);
    var colorsig =  Math.round((getRojo(x,y+1)+ getVerde(x,y+1)+ getAzul(x,y+1))/3);
    if ((color -colorsig) < 10){
      return false;
    }
    else{
      return true;
    }
  }
}
function cambioelsigx(x,y){
  if (x < width){
    getPixel(x,y);
    var color = Math.round((r+g+b)/3);
    var colorsig =  Math.round((getRojo(x+1)+ getVerde(x+1,y)+ getAzul(x+1,y))/3);
    if ((color -colorsig) < 10){
      return false;
    }
    else{
      return true;
    }
  }
}
function deteccionDeBordes(){
  getContexData();
  for (var x = 0; x < width; x++){
    for (var y = 0; y < height; y++){
      if (cambioelsig(x,y)){
          setPixel(x,y,255,255,255,255);
      }
      else{
        setPixel(x,y,0,0,0,255);
      }
      if (cambioelsigx(x,y)){
        setPixel(x,y,255,255,255,255);
    }
    else{
      setPixel(x,y,0,0,0,255);
    }
    }
  }
  ctx2.putImageData(imageData2, 0, 0);
}

function saturar(){
  getContexData();
  var level = 10;
  var cantidad = document.getElementById('valor').value;
  if (cantidad !=0){level = cantidad};
    for (var x = 1; x < width; x++){//ancho
    for (var y = 1; y < height; y++){//alto
        getPixel(x,y);
        r1 = ((((r / 255) - 0.5) * level) + 0.5) * 255;
        g1 = ((((g / 255) - 0.5) * level) + 0.5) * 255;
        b1 = ((((b / 255) - 0.5) * level) + 0.5) * 255;
        setPixel(x,y,r1,g1,b1,255);

    }
  }
    document.getElementById("demo").innerHTML = cantidad;
    ctx2.putImageData(imageData2, 0, 0);
}

function blur(){
    getContexData();
  for (var x = 1; x < width; x++){//ancho
    for (var y = 1; y < height; y++){//alto
      if((x+1<width)&&(x-1>=0)&&(y+1<height)&&(y-1>=0)){
          var Rojo = (getRojo(x-1,y-1)+getRojo(x-1,y-1)+getRojo(x+1,y-1)+getRojo(x-1,y)+getRojo(x,y)+getRojo(x+1,y)+getRojo(x-1,y+1)+getRojo(x,y+1)+getRojo(x+1,y+1))/9;
          var Verde=(getVerde(x-1,y-1)+getVerde(x-1,y-1)+getVerde(x+1,y-1)+getVerde(x-1,y)+getVerde(x,y)+getVerde(x+1,y)+getVerde(x-1,y+1)+getVerde(x,y+1)+getVerde(x+1,y+1))/9;
          var Azul= (getAzul(x-1,y-1)+getAzul(x-1,y-1)+getAzul(x+1,y-1)+getAzul(x-1,y)+getAzul(x,y)+getAzul(x+1,y)+getAzul(x-1,y+1)+getAzul(x,y+1)+getAzul(x+1,y+1))/9;
          setPixel(x,y,Rojo,Verde,Azul,255);
        }
    }
  }

  ctx2.putImageData(imageData2, 0, 0);
}
function mostrarvalor(){
  document.getElementById("demo").innerHTML = saturBtm.value;
}
function guardarImagen() {
  var link = window.document.createElement( 'a' );
  var url = canvas.toDataURL();
  var filename = 'image.png';
  link.setAttribute( 'href', url );
  link.setAttribute( 'download', filename );
  link.style.visibility = 'hidden';
  window.document.body.appendChild( link );
  link.click();
  window.document.body.removeChild( link );
}

function mueveRaton(event){
     if(estoyDibujando){
        if (herramienta == "goma"){
          ctx2.strokeStyle='#FFFFFF';
          ctx2.lineWidth = 30;
        }
        if (herramienta == "lapiz"){
          ctx2.strokeStyle= '#000000'
          ctx2.lineWidth= 1;
        }
         ctx2.lineTo(event.clientX-350,event.clientY);
         ctx2.stroke();
     }

}
function levantaRaton(){
    if (estoyDibujando= true){
     ctx2.closePath();
     estoyDibujando = false;
     }

}
function pulsaRaton(event){
    estoyDibujando=true;
     ctx2.beginPath();
     ctx2.moveTo(event.clientX-350,event.clientY);

}
function escribir(){
  herramienta="lapiz";

}
function borrar(){
  herramienta="goma";

}
function nuevolienzo(){
   //clearRect(0, 0, canvas.width, canvas.height);
   ctx2.clearRect(0, 0, canvas.width, canvas.height);


}
var bynBtm = document.getElementById('blancoynegro');
bynBtm.addEventListener('click',blancoYNegro);
var imgdefBtm = document.getElementById('imgdef');
imgdefBtm.addEventListener('click',cargarImagen);
var sepiaBtm = document.getElementById('sepia');
sepiaBtm.addEventListener('click',sepia);
var invBtm = document.getElementById('invertido');
invBtm.addEventListener('click',invertir);
var binBtm = document.getElementById('binario');
binBtm.addEventListener('click',binarizacion);
var bordesBtm =document.getElementById('deteccionbordes');
bordesBtm.addEventListener('click',deteccionDeBordes);
var satBtm = document.getElementById('saturacion');
satBtm.addEventListener('click',saturar);
var origBtm = document.getElementById('original');
origBtm.addEventListener('click', original);
var blurBtm = document.getElementById('blur');
blurBtm.addEventListener('click',blur);
var saturBtm = document.getElementById('valor');
saturBtm.addEventListener('change',mostrarvalor);
var bajarBtm = document.getElementById('dowload');
bajarBtm.addEventListener('click',guardarImagen);
var lapizBtm = document.getElementById('lapiz');
lapizBtm.addEventListener('click',escribir);
var borrarBtm = document.getElementById('goma');
borrarBtm.addEventListener('click',borrar);
var newBtm = document.getElementById('nuevo');
newBtm.addEventListener('click',nuevolienzo);

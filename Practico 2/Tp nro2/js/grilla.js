var columnas = 7;
var filas = 6;
function Grilla(){
  this.Matrix = new Array(columnas);
  for (var i = 0; i < this.Matrix.length; i++) {
    this.Matrix[i] = new Array(filas);
    for (var j = 0; j < this.Matrix[i].length; j++) {
      this.Matrix[i][j] = 0;
    }
  }
}
// ----- funcionalidades de la grilla
Grilla.prototype.cargarGrilla = function (x, y, ctx, offsetX, offsetY, celda){
var ficha = new Ficha((x*celda)+offsetX,(y*celda)+offsetY,"#FFFFFF",celda,"");
var Grilla = true;
  if (this.Matrix[x][y] == 1) {
    ficha.setImg("imagenes/caritafeliz.png");
    ficha.dibujarFicha(ctx,Grilla);
  }
  else if (this.Matrix[x][y] == 2){
    ficha.setImg("imagenes/carita aun mas feliz.png");
    ficha.dibujarFicha(ctx,Grilla);
  }
  else {
      ficha.dibujarFicha(ctx,Grilla);
  }
}
Grilla.prototype.enLaGrilla = function (x,y) {
  // verifica en que columna de la grilla cayo la ficha si es que es un mouseup valido.
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext('2d');
  var celda = ((2/3)*ctx.canvas.height)/filas;
  var offsetX = (1/4)*ctx.canvas.width;
  var offsetY = (1/3)*ctx.canvas.height-10;
  for (var col = 0; col < columnas; col++) {
        if ((((col*celda)+offsetX)<= x && ((col+1)*celda)+ offsetX >= x) && (offsetY>= y)){
            return col;
        }
  }
  return -1;
};
Grilla.prototype.dibujarGrilla = function() {
  //--dibuja la grilla principal
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
    var celda = ((2/3)*ctx.canvas.height)/filas;
    var offsetX = (1/4)*ctx.canvas.width;
    var offsetY = (1/3)*ctx.canvas.height-10;//se le resta 10 para que los circulos queden separados del borde
      for (var x = 0; x <= columnas; x++) {
          for (var y = 0; y <= filas; y++) {
             if ((x<columnas)&&(y<filas)) {
                this.cargarGrilla(x,y,ctx,offsetX,offsetY,celda);
            }

        }
    }
};

Grilla.prototype.setValor = function (x,y,valor){
  //ubica la ficha
if ((x < columnas) && (y < filas)) {
      this.Matrix[x][y] = valor;
  }
  else {

  }
};

Grilla.prototype.getPosi = function (x){
  //calcula el ultimo espacio libre de la columna
   for (y = filas-1; y < this.Matrix[x].length; y--) {
     if (y< 0){return -1}; // en caso de que la grilla este llena
    if (this.Matrix[x][y] == 0){
        return y;
      }
    }
    return -1;
  };
Grilla.prototype.reiniciar = function () { //--formatea a 0 la grilla logica.
  for (var i = 0; i < this.Matrix.length; i++) {
    this.Matrix[i] = new Array(filas);
    for (var j = 0; j < this.Matrix[i].length; j++) {
      this.Matrix[i][j] = 0;
    }
  }
};
Grilla.prototype.verificarDiagonales= function(jugador){
  for (x = 0; x < this.Matrix.length; x++) {
    for (i = 0; i < this.Matrix[x].length; i++) {
      if(this.Matrix[x][i] == jugador){
        if((x+3 < this.Matrix.length) &&(i-3>0)&&(i<this.Matrix[x].length)){ // busca una vertical asendente
          if ((this.Matrix[x+1][i-1] == jugador) && (this.Matrix[x+2][i-2] == jugador) && (this.Matrix[x+3][i-3] == jugador)) {
            return true;
          }
        }
        if ((x+3 < this.Matrix.length)&&(i+3<this.Matrix[x].length)){ // busca una desendente
            if ((this.Matrix[x+1][i+1] == jugador) && (this.Matrix[x+2][i+2] == jugador) && (this.Matrix[x+3][i+3] == jugador)) {
              return true;
            }
        }
      }
    }
  }
  return false
}
Grilla.prototype.verificarHorizontales = function (jugador) {
  for (x = 0; x < this.Matrix.length; x++) {
    for (i = 0; i < this.Matrix[x].length; i++) {
      if ((this.Matrix[i][x] == jugador) && (i < this.Matrix.length -3) ){ //
          if ((this.Matrix[i+1][x] == jugador) && (this.Matrix[i+2][x] == jugador) && (this.Matrix[i+3][x] == jugador)) {
            return true;
          }
      }
    }
  }
  return false;
};
Grilla.prototype.verificarVerticales = function (jugador) {
  for (x = 0; x < this.Matrix.length; x++) {
    for (i = 0; i < this.Matrix[x].length; i++) {
      if ((this.Matrix[x][i] == jugador) && (i+3 < this.Matrix[x].length)){
        if ((this.Matrix[x][i+1] == jugador) && (this.Matrix[x][i+2] == jugador) && (this.Matrix[x][i+3] == jugador)){
          return true;
        }
      }

    }
  }
  return false;
};
Grilla.prototype.verificarVictoria = function(jugador){ //El valor del jugador 1, 2
  if (this.verificarDiagonales(jugador)||this.verificarVerticales(jugador)||this.verificarHorizontales(jugador)){
    return true;
  }

  return false;
}

function Ficha (paramPosX, paramPosY, paramColor,diametro,source){
  this.PosX = paramPosX;
  this.PosY = paramPosY;
  this.color = paramColor;
  this.radio = (diametro/2);
  this.source = source;
}

//-------------funcionalidades de fichas
Ficha.prototype.setImg = function(source){
  this.source=source;
}
Ficha.prototype.dibujarFicha = function (ctx,Grilla){
  //-- dibujas las fichas, todas, en caso de que venga de la grilla las dibuja mas grandes
  ctx.fillStyle = this.color;
  var that = this;
  if (that.source != ""){
    var img = new Image();
    img.src = that.source;
    ctx.beginPath();
    if (Grilla){
      img.onload = function(){
        ctx.drawImage(img,that.PosX,that.PosY,that.radio*2,that.radio*2);
      }
      ctx.closePath();
      ctx.stroke();
    }else {
      img.onload = function(){
        ctx.drawImage(img,that.PosX,that.PosY,30,30);
      }
      ctx.closePath();
      ctx.stroke();
    }

  }
  else{
    ctx.beginPath();
    M = Math.floor ((Math.sqrt(((this.radio*2)*(this.radio*2)) + ((this.radio*2)*(this.radio*2))))/2)-12;
    ctx.arc(M+this.PosX,M+this.PosY,this.radio, 0, Math.PI *2);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
  }

}
Ficha.prototype.dibFichaMov = function (x,y,ctx){
  //-- dibuja la ficha en movimiento del jugador.
  var that = this;
  var img = new Image();
  img.src = that.source;
  ctx.beginPath();
  img.onload = function(){
    ctx.drawImage(img,x,y,30,30);
  }
  ctx.closePath();
  ctx.stroke();
}
Ficha.prototype.seleccion = function (x,y,ficha) {
  //verifica que si las coordenadas x,y pertenecen a esa ficha.
  var hipotenusa = Math.floor(Math.sqrt(((x - ficha.PosX) * (x - ficha.PosX)) + ((y - ficha.PosY) * (y - ficha.PosY))));
  if ((hipotenusa) <= (ficha.radio)){
    return true;
  } else {
    return false;
  }

};

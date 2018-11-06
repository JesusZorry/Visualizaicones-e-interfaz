var nave = [];
nave["left"] = 500;
nave["top"]= 500;
nave["velocidad"] = 10;
nave["vidas"] = 3;
nave["puntaje"]= 0;
nave["nombre"]= "";
nave["posicion"]=-1;
var asteroides,asteroidePlano,spaceShipLife;
var choque;
var comenzo = false;
var empiezaG = false;
var hScore=[];
var hScoreN=[];
$(document).keydown(function(e){

  if((e.keyCode===32)&&(comenzo)){
      shootMissile();
  }
  if (e.keyCode === 39) {
      if ((nave["left"] < 800)&&(nave["left"]>=200)){
      nave["left"] = nave["left"] + nave["velocidad"] ;
      document.getElementById('nave').style.left = nave["left"] + "px";
      }
  }
  if (e.keyCode === 37) {
    if (nave["left"]> 200){
      nave["left"] = nave["left"] - nave["velocidad"] ;
      document.getElementById('nave').style.left = nave["left"] + "px";
      }
  }
  if (e.keyCode === 38) {
    if (nave["top"]> 0){
      nave["top"] = nave["top"] - nave["velocidad"] ;
      document.getElementById('nave').style.top = nave["top"] + "px";
    }
  }
  if (e.keyCode === 40) {
    if (nave["top"]<520){
      nave["top"] = nave["top"] + nave["velocidad"] ;
      document.getElementById('nave').style.top = nave["top"] + "px";
    }
  }
});
function shootMissile(){
 if (($(".misiles").length)&&!($(".misile").length)){
   $(".fondo").append('<div class="misile" id = "missile"></div>');
   document.getElementById('missile').style.left = nave["left"] + "px";
   document.getElementById('missile').style.top = nave["top"] + "px";
   $(".misile").one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
   function(e) {
     $(".misile").remove();
   });
  }
}
function letsplay(){
  if (empiezaG){
    if (!comenzo){
      comenzo = true;
      gameItems();
    }
    function gameItems(){
      asteroides = setInterval(function(){
          $(".ast").append('<div class="asteroide" id="aste"></div>');
          posLeft= Math.floor(Math.random()*599);
          posLeft = posLeft + 200;
          document.getElementById('aste').style.left= posLeft + "px";
          $(".asteroide").one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
          function(e) {
            $(".asteroide").remove();
          });
      },5000);
      asteroidePlano = setInterval(function(){
          $(".ast").append('<div class="asteroidePlano" id="asteP"></div>');
          posLeftP= Math.floor(Math.random()*599);
          posLeftP= posLeftP + 200;
          document.getElementById('asteP').style.left= posLeftP + "px";
          $(".asteroidePlano").one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
          function(e) {
            $(".asteroidePlano").remove();
          });
      },8000);
      choque = setInterval(function(){
        if ($(".asteroide").length){
          var asteroide=$(".asteroide").position();
          var nave2= $("#nave").position();
          if(((nave2.left - asteroide.left < 100)&&(nave2.left-asteroide.left > -50))&&((nave2.top-asteroide.top<50)&&(nave2.top-asteroide.top > -10))){
              colicion();
            }
        }
      },100);
      choquePlano = setInterval(function(){
        if ($(".asteroidePlano").length){
          var asteroideP=$(".asteroidePlano").position();
          var nave3= $("#nave").position();
          if(((nave3.left - asteroideP.left < 100)&&(nave3.left-asteroideP.left > -50))&&((nave3.top-asteroideP.top<50)&&(nave3.top-asteroideP.top > -10))){
              colicionP();
            }
        }
      },100);
      exploteAste= setInterval(function(){
        if (($(".misile").length)&&($(".asteroidePlano").length)){
          var misil = $(".misile").position();
          var asteroideP = $(".asteroidePlano").position();
            if(((misil.left-asteroideP.left<50)&&(misil.left-asteroideP.left>0))&&((misil.top-asteroideP.top<100))){
                exploteAsteP();
            }
          }
        if ( (($(".misile").length)&&($(".asteroide").length))) {
          var misil = $(".misile").position();
          var asteroide = $(".asteroide").position();
          if(((misil.left-asteroide.left<100)&&(misil.left-asteroide.left>0))&&((misil.top-asteroide.top<100))){
                exploteAsteG();
          }

        }
      },100);
      spaceShipLife = setInterval(function(){
        $(".ship").append('<div class="spaceship" id="shipL"></div>');
        posLeftSL= Math.floor(Math.random()*599);
        posLeftSL=posLeftSL + 200;
        document.getElementById('shipL').style.left= posLeftSL + "px";
        $(".spaceship").one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
        function(e) {
          $(".spaceship").remove();
        });
      },12000);
      takeShip = setInterval(function(){
          if ($("#shipL").length){
            var shipSpace = $("#shipL").position();
            var nave4= $("#nave").position();
            if(((nave4.left - shipSpace.left < 100)&&(nave4.left-shipSpace.left > -10))&&((nave4.top-shipSpace.top<50)&&(nave4.top-shipSpace.top > 0))){
              pickUpShip();
              nave["puntaje"] += 100;
              $(".puntaje").html(nave["puntaje"]);
              }
        }

      },100);
    }
    function pickUpShip() {
      var shipSpace = $("#shipL").position();
      clearInterval(spaceShipLife);
      $('#shipL').removeClass("spaceship");
      document.getElementById('shipL').style.top = (shipSpace.top+20) + "px";
      document.getElementById('shipL').style.left = (shipSpace.left+20) + "px";
      $('#shipL').addClass("coin");
      $('#shipL').one('webkitAnimationEnd oanimationend msAnimationEnd animationend',function(e){
        $('#shipL').removeClass("coin");
        $('#shipL').remove();
      });
    }
    function exploteAsteG(){
      var asteroideG=$(".asteroide").position();
      $('#aste').removeClass("asteroide");
      document.getElementById('aste').style.top = (asteroideG.top-50) + "px";
      document.getElementById('aste').style.left = (asteroideG.left-20) + "px";
      $('#aste').addClass("explocion");
      $('#aste').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e){
        $('#aste').removeClass("explocion");
        $("#aste").remove();
        });
      var misilST = $(".misile").position();
      $("#missile").removeClass("misile");
      document.getElementById('missile').style.top = (misilST.top-70) + "px"
      document.getElementById('missile').style.left = (misilST.left-70) + "px"
      $("#missile").addClass("explocion");
      $('#missile').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e){
        $('#missile').removeClass("explocion");
        $("#missile").remove();
        });
        nave["puntaje"] += 50;
        $(".puntaje").html(nave["puntaje"]);
    }
    function exploteAsteP(){
      var asteroideP=$(".asteroidePlano").position();
      $('#asteP').removeClass("asteroidePlano");
      document.getElementById('asteP').style.top = (asteroideP.top-50) + "px";
      document.getElementById('asteP').style.left = (asteroideP.left-20) + "px";
      $('#asteP').addClass("explocion");
      $('#asteP').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e){
        $('#asteP').removeClass("explocion");
        $("#asteP").remove();
        });
      var misilST = $(".misile").position();
      $("#missile").removeClass("misile");
      document.getElementById('missile').style.top = (misilST.top-70) + "px"
      document.getElementById('missile').style.left = (misilST.left-70) + "px"
      $("#missile").addClass("explocion");
      $('#missile').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e){
        $('#missile').removeClass("explocion");
        $("#missile").remove();
        });
        nave["puntaje"] += 150;
        $(".puntaje").html(nave["puntaje"]);
    }

    function restarVida(){
      if (nave["vidas"] < 2){
          comenzo=true;
          clearInterval(asteroidePlano);
          clearInterval(asteroides);
          clearInterval(spaceShipLife);
          clearInterval(choquePlano);
          clearInterval(choque);
          clearInterval(takeShip);
          clearInterval(exploteAste);
          empiezaG=false;
          if ($("#shipL").length){$('#shipL').remove()};
          if  ($(".asteroidePlano").length){$("#asteP").remove()};
            if ($(".asteroide").length){$('#aste').remove()};
          $(".Loss").append('<div class="perdiste" id="GOB"></div>');
          document.getElementById('GOB').style.left= (nave["left"]-77) + "px";
          document.getElementById('GOB').style.top= nave["top"] + "px";
          $('#GOB').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e){
            $('#GOB').remove();
              endGame();
          });
      }
      else{
        nave["vidas"]--;
        $(".vidas").html(nave["vidas"]);
      }

    }
    function resetPosi(){
      $("#nave").removeClass("explocion");
      $("#nave").addClass("nave");
      clearInterval(asteroidePlano);
      clearInterval(asteroides);
      clearInterval(spaceShipLife);
      comenzo = false;
      restarVida();
      nave["left"] = 500;
      nave["top"]= 500;
      document.getElementById('nave').style.left= nave["left"] + "px";
      document.getElementById('nave').style.top = nave["top"] + "px";

    }
    function colicionP(){
        clearInterval(asteroidePlano);
        var asteroideP=$(".asteroidePlano").position();
        $('#asteP').removeClass("asteroidePlano");
        document.getElementById('asteP').style.top = asteroideP.top + "px";
        $('#asteP').addClass("explocion");
        $('#asteP').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e){
          $('#asteP').removeClass("explocion");
            $("#asteP").remove();
        });
        $("#nave").removeClass("nave");
        document.getElementById('nave').style.left = (nave["left"]-50) + "px";
        $("#nave").addClass("explocion");
        $("#nave").one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e){
            resetPosi();
        });

    }

    function colicion(){
        clearInterval(asteroides);
        var asteroide=$(".asteroide").position();
        $('#aste').removeClass("asteroide");
        document.getElementById('aste').style.top = asteroide.top + "px";
        $('#aste').addClass("explocion");
        $('#aste').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e){
          $('#aste').removeClass("explocion");
          $("#aste").remove();
        });
        $("#nave").removeClass("nave");
        document.getElementById('nave').style.left = (nave["left"]-50) + "px";
        $("#nave").addClass("explocion");
        $("#nave").one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e){
            resetPosi();
        });

    }

}
}
function posiHScore(puntos){
  for (var i = 0; i < hScore.length; i++) {
    if (puntos>= hScore[i]){
      return (i);
    }
  }
}
function cargarHScore( i, puntaje){
  if (i< 5){
    var aux = hScore[i];
    hScore[i]= puntaje;
    cargarHScore((i+1),aux);
  }
}
function cargarHScoreN( i, nombre){
  if (i< 5){
    var aux = hScoreN[i];
    hScoreN[i]= nombre;
    cargarHScoreN((i+1),aux);
  }
}
function endGame(){
    $(".main").hide();
    if (0<= posiHScore(nave["puntaje"])){
      $('.congratz').show();
      nave["posicion"] = posiHScore(nave["puntaje"]);
      cargarHScore( posiHScore(nave["puntaje"]),nave["puntaje"]);
    }
    else{$(".gameOver").show();}
};
function generarhScore(){
 for (var i = 0; i < 5; i++) {
   if (0<=posiHScore(i*10)){
     cargarHScore(posiHScore(i*10), (i*10));
     cargarHScoreN(posiHScore(i*10),"UNK");
   }
   else{
     hScore[i]=0;
     hScoreN[i]= "DOE"
   };
  }
}
function mostrartabla(){
  for (var i = 0; i < hScore.length; i++) {
    document.getElementById(('p'+i)).innerHTML = (i+1) + " - "+ hScoreN[i]+ "- Puntos: " + hScore[i];
  }
}
$("#name").click(function(){
  if ((document.getElementById('newName').value)!=""){
    cargarHScoreN(nave["posicion"],(document.getElementById('newName').value));
    $(".gameOver").show();
    $('.congratz').hide();
    document.getElementById('newName').value = "";
    document.getElementById('nuevoRecord').innerHTML="NUEVO RECORD!";
}
  else {
    document.getElementById('nuevoRecord').innerHTML = "INGRESE SU NICKNAME"
  }
  if(  document.getElementById('again').innerHTML == "JUGAR"){
    document.getElementById('again').innerHTML = "VOLVER A JUGAR" ;
  }
  mostrartabla();
})
function resetAll(){
  nave["left"] = 500;
  nave["top"]= 500;
  nave["vidas"] = 3;
  nave["puntaje"]= 0;
  nave["nombre"]= "";
  nave["posicion"]=-1;
  console.log(nave["left"] +" , "+nave["top"]+ " vel " + nave["velocidad"] );
  $(".puntaje").html(nave["puntaje"]);
  $(".vidas").html(nave["vidas"]);
  document.getElementById('nave').style.left= nave["left"] + "px";
  document.getElementById('nave').style.top = nave["top"] + "px";
}
$('.again').click(function(){
      $(".gameOver").hide();
      $(".main").show();
      if(nave["puntaje"]>-1){resetAll()};
      if (hScore.length==0){generarhScore()};
      empiezaG=true;
      comenzo=false;
      letsplay();
});
$("#play").click(function(){
  $(".intro").hide();
  $(".main").show();
  if (hScore.length==0){generarhScore()};
  empiezaG=true;
  comenzo=false;
    letsplay();

})
$('#controles').click(function(){
  $('.botones').hide();
  $('.controles').show();
})
$('#back').click(function(){
  $('.controles').hide();
  $('.botones').show();
})
$('#scores').click(function(){
  $(".intro").hide();
  $(".gameOver").show();
  if (hScore.length==0){generarhScore()}
  mostrartabla();
  if(  document.getElementById('again').innerHTML == "VOLVER A JUGAR"){
    document.getElementById('again').innerHTML = "JUGAR";
  }
  else {
    document.getElementById('again').innerHTML  ="VOLVER A JUGAR";
  }

})
$('#menuIni').click(function(){
  $(".gameOver").hide();
    $(".intro").show();
})

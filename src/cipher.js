const cipher = {
  encode: (offset , string) => {
      let textoCifrado = "";
      for (let caracter of string.toUpperCase()){
          let caracterCode = caracter.charCodeAt(0);
          if(caracterCode<65 || caracterCode>90){
              textoCifrado += caracter;
          }else{
              let caracterDesplazado = (((caracterCode - 65) + offset) % 26) + 65;
              textoCifrado += String.fromCharCode(caracterDesplazado);
          }
      }return textoCifrado
  }, 

  decode: (offset, string) => {
      let textoDescifrado = "";
      for (let caracter2 of string.toUpperCase()){
          let caracterCode2 = caracter2.charCodeAt(0);
          if(caracterCode2<65 || caracterCode2>90){
              textoDescifrado += caracter2;
          }else{
              let caracterPosicionOK = (((caracterCode2 + 65) - offset) % 26) + 65;
              textoDescifrado += String.fromCharCode(caracterPosicionOK);
          }
      }return textoDescifrado
  }

};

export default cipher; 

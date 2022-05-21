function desCript(stringAsc,posLista=0){
    var listaCript = [
           123, 56,162,151, 37,158,159,150,101, 88,
           160,162, 25, 32, 77,144,160,161,108, 67,
           100, 83, 44,132,152,156,125,101,100, 99
         ] ;
    var stringRet = "";
    var str="";
    var i=0
    var j=3 ;
    var part1=0;
    var codasc=0
    
    stringAsc=stringAsc.trim()
     
    // console.log('posLista',posLista);

 // 'A'.charCodeAt()=65  -->asc('A') do xHb 
 //  String.fromCharCode(65) = A --> chr(65) do xHb
 //console.log('stringAsc ',stringAsc)
 while (i < stringAsc.length){
    //str=stringAsc.substring(i,j)
    //str()
    str+=String.fromCharCode((parseInt(stringAsc.substring(i,j))));
    i+=3;
    j+=3;
 };
 
 //trocar brancos por nulo str= str.replace((/^\s+|\s+$/gm,'');
 str=str.trim();
 console.log ('str: '+str,str.length);

 j=1
 for (i=0;i<str.length;i++){
    if (posLista > 29){
       posLista = 0  
    };
    part1=(str.substring(i,j)).charCodeAt();
    console.log('part1 '+part1)
    codasc=part1-listaCript[posLista];
    console.log('codasc '+codasc)
    stringRet += String.fromCharCode(codasc);
    posLista++
    j++
 }
  
 console.log('Senha Descriptografada: '+ stringRet);
 return stringRet
 };

 module.exports={ desCript } //module.exports


/**
個別にテキストグラフィック化
"create each text outlines"

使い方：
テキストフレームまたは範囲選択して実行。
テキストフレーム内の各文字、選択範囲の各文字を個別にグラフィック化。
ちょっと位置をずらして複製します。
グラフィック化後のオブジェクトのオーバープリントは勝手にオフにします。

動作確認：OS10.4.11 InDesign CS3

milligramme(mg)
www.milligramme.cc
*/      

var docObj = app.documents[0];
var selObj = docObj.selection[0]
switch(selObj.constructor.name){
	case "Word":
	case "Character":
	case "TextStyleRange":
	case "Line":
	case "Text":
	case "Paragraph":
	case "TextColumn":
	case "TextFrame": break;
	default : 
		$.writeln("exit because of excluded object");
		exit();
	}
var charObj  = selObj.characters;
var outTxArr = new Array();

for(i=0; i < charObj.length; i++){
	var outTex;
	//スペースなどの無形の字はエラーになるのではじく。
	try{
		outTex = charObj[i].createOutlines (false)
		}catch(e){}
	if(outTex !== undefined){
		outTxArr.push(outTex[0]);
		}
	}

for(j=0; j < outTxArr.length; j++){
	
	outTxArr[j].move(undefined,[2, 2]); //ずらしたくなければコメントアウト
	//元の塗り色線色をバックアップ
	var currentFillColor   = outTxArr[j].fillColor;
	var currentStrokeColor = outTxArr[j].strokeColor;
	//オーバープリントオフにする処理、簡易版
	outTxArr[j].fillColor   = "Paper";
	outTxArr[j].fillColor   = currentFillColor;
	outTxArr[j].strokeColor = "Paper";
	outTxArr[j].strokeColor = currentStrokeColor;
	}
//グループ化しておく
docObj.pages[0].groups.add(outTxArr);
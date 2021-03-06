/*
疑似補色
"invert cmyk colors"

使い方：
オブジェクトを選択して実行
選択中のオブジェクトの補色オブジェクトとスウォッチを作成します。
特色、塗りなし、白、黒、レジストレーションは処理しません。
CMYK→RGB→補色RGB→CMYK変換しているので、厳密な補色ではありませんので実行後に調整してください。
同じ色のオブジェクトで実行すると同名補色スウォッチの上書きをしません。増えます。

動作確認：OS10.4.11 InDesign CS3

milligramme
www.milligramme.cc
*/
var doc = app.documents[0];
var selObj = doc.selection;
if(selObj.length! = 0){
for(var i = 0; i<selObj.length; i++){
	var currentColor = selObj[i].fillColor;
	if(currentColor.model =  = ColorModel.PROCESS){
		var baseSwatch = doc.swatches.itemByName(currentColor.name);
		if(currentColor.name == "None" || currentColor.name == "Paper" || currentColor.name == "Black" || currentColor.name == "Registration"){
			alert("塗りなし、白、黒、レジストレーションは無視します");
			continue;
		}
		else{
			//現在の色を一時的にRGBスウォッチとして複製
			var tempRGBSwatch = baseSwatch.duplicate();
			tempRGBSwatch.space = ColorSpace.RGB;
			//RGB各色を補色にする
			var invR16 = parseInt(tempRGBSwatch.colorValue[0]^255,10);
			var invG16 = parseInt(tempRGBSwatch.colorValue[1]^255,10);
			var invB16 = parseInt(tempRGBSwatch.colorValue[2]^255,10);
			
			var invRGB = doc.colors.add({space: ColorSpace.RGB, colorValue: [invR16,invG16,invB16]});
			var invCMYK = invRGB;
			invCMYK.space = ColorSpace.CMYK;
			invCMYKname = 
				"C = " + parseInt(invCMYK.colorValue[0]) +
				" M = " + parseInt(invCMYK.colorValue[1]) + 
				" Y = " + parseInt(invCMYK.colorValue[2]) + 
				" K = " + parseInt(invCMYK.colorValue[3]);
			try{
				invCMYK.name = invCMYKname;
			}catch(e){};
			tempRGBSwatch.remove();//一時スウォッチを削除
			//確認用にオブジェクトを複製して塗る
			var invObj = selObj[i].duplicate();
			invObj.move(undefined,[5,5]);
			invObj.fillColor = invCMYK;
		}
	}
}
}

var db;   // 建立全域變數


// Web SQL Database


db = openDatabase("myDb", "1.0", "my First Db", 2*1020 * 1024);

var d = new Date();
var n = d.getTime();
var fName = n;

function dbInsert() {  // 新增資料
        if (!db){
            alert('資料庫尚未建立！');
            return;
        }
		var righteye = document.getElementById("ctRe").value;
		var lefteye = document.getElementById("ctLe").value;
		var cname = document.getElementById("ctName").value;
		var cpy = document.getElementById("ctCpy").value;
		var hhh = document.getElementById("ctHl").value;
		var color = document.getElementById("ctColor").value;
		var sDate = document.getElementById("Datepicker1").value;
		var price = document.getElementById("ctPrice").value;
		var memo = document.getElementById("memo").value;
		
		if (cname==""){
			alert('請輸入名稱！');
			return
		}
		if (color==0){
			alert('請選擇顏色！');
			return
		}
		if (hhh==0){	
			alert('請選擇週期！');
			return
			}
	if(hhh==1){
				var date2 = new Date(sDate);
				date2.setDate(date2.getDate()+1);
				hhh = date2;
				var date21 = new Date();
				var pMonth = hhh.getMonth()+1;
				var pDate = hhh.getDate();
				if (pMonth < 10) { pMonth = '0' + pMonth; }
				if (pDate < 10) { pDate = '0' + pDate; }
				var today = date2.getFullYear() + "-" + (pMonth) + "-" + (pDate);
				hhh = today;
				}
	if(hhh==2){
				var date2 = new Date(sDate);
				date2.setDate(date2.getDate()+7);
				hhh = date2;
				var date21 = new Date();
				var pMonth = hhh.getMonth()+1;
				var pDate = hhh.getDate();
				if (pMonth < 10) { pMonth = '0' + pMonth; }
				if (pDate < 10) { pDate = '0' + pDate; }
				var today = date2.getFullYear() + "-" + (pMonth) + "-" + (pDate);
				hhh = today;
				}
			
		if(hhh==3){
				var date2 = new Date(sDate);
				date2.setDate(date2.getDate()+14);
				hhh = date2;
				var date21 = new Date();
				var pMonth = hhh.getMonth()+1;
				var pDate = hhh.getDate();
				if (pMonth < 10) { pMonth = '0' + pMonth; }
				if (pDate < 10) { pDate = '0' + pDate; }
				var today = date2.getFullYear() + "-" + (pMonth) + "-" + (pDate);
				hhh = today;
				}	
		if(hhh==4){
				var date2 = new Date(sDate);
				date2.setDate(date2.getDate());
				hhh = date2;
				var date21 = new Date();
				var pMonth = hhh.getMonth()+1;
				var pDate = hhh.getDate();
				if (pMonth < 10) { pMonth = '0' + pMonth; }
				if (pDate < 10) { pDate = '0' + pDate; }
				var today = date2.getFullYear()+1 + "-" + (pMonth) + "-" + (pDate);
				hhh = today;
				}	
		db.transaction(function(t) {
			
			t.executeSql("INSERT INTO table01 (username,company,memo,dt,hl,pname,color,Left,Right) VALUES (?,?,?,?,?,?,?,?,?)",
			
			[cname, cpy, memo, sDate, hhh, fName, color, lefteye, righteye],
			function() { alert('資料新增成功!！');window.location.href="index.html";},
			function() { alert("資料新增失敗!"); });
					
					
			
		});
		
		
    }


function dbDrop() {  // 刪除資料表
	
	if (confirm("警告！是否確定清除資料？")){
		db = openDatabase("myDb", "1.0", "my First Db", 2*1020 * 1024);
        db.transaction(function(t) {
	        t.executeSql("DROP TABLE table01");
			alert("資料表已清除");
			window.location.reload();
        });
		
	}
	else{
		return;
		}
		    }
			
			
// Camera
function takePhoto() { 
	 sessionStorage.removeItem('imagepath');
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 100, destinationType: Camera.DestinationType.FILE_URI });
}

function onPhotoDataSuccess(imageURI) { 
        // Uncomment to view the base64 encoded image data
        // console.log(imageData);

        // Get image handle
        //
        var imgProfile = document.getElementById('showPhoto');

        // Show the captured photo
        // The inline CSS rules are used to resize the image
        //
        imgProfile.src = imageURI;
        if(sessionStorage.isprofileimage==1){
            getLocation();
        }
        movePic(imageURI);
}


// Called if something bad happens.
// 
function onFail(message) {
    alert('Failed because: ' + message);
}

function movePic(file){ 
    window.resolveLocalFileSystemURI(file, resolveOnSuccess, resOnError); 
} 

function resolveOnSuccess(entry){ 
    
    //new file name
    var newFileName = n + ".jpg";
    var myFolderApp = "EyeCares";

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) {      
    //The folder is created if doesn't exist
    fileSys.root.getDirectory( myFolderApp,
                    {create:true, exclusive: false},
                    function(directory) {
                        entry.moveTo(directory, newFileName,  successMove, resOnError);
                    },
                    resOnError);
                    },
    resOnError);
	
}

//Callback function when the file has been moved successfully - inserting the complete path
function successMove(entry) {
    //Store imagepath in session for future use
    // like to store it in database
    sessionStorage.setItem('imagepath', entry.fullPath);
}

function resOnError(error) {
    alert(error.code);
}


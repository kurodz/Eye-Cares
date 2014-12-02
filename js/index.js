// Database
var db = openDatabase("myDb", "1.0", "my First Db", 2*1020 * 1024);

function dbCreate() {  // 建立資料庫
		db = openDatabase("myDb", "1.0", "my First Db", 2*1020 * 1024);
           if ( db != null ) {
              db.transaction(function(t) {
                 t.executeSql("create table if not exists table01 (id INTEGER PRIMARY KEY , username VARCHAR(24), company VARCHAR(24), memo VARCHAR(24) , dt DATETIME , hl DATETIME , pname INTEGER , color INTEGER, Left INTERGER, Right INTERGER)", null,
                 function() {},
                 function(tx, err) { alert("建立資料庫失敗!"); 
			  });
           });
        } 
	}

function dbShow(){  // 顯示全部資料
        if (!db){
            alert('資料庫尚未建立！');
            return;
        }
        db.transaction(function(t) {
            t.executeSql("SELECT * FROM table01", [], function(t, r) {				
				
				
				var data = "你總共有："+ r.rows.length + " 組<br><hr><br>";
				if(r.rows.length==0){data="您還沒有輸入資料";}			
                for (var i = 0, c = r.rows.length; i < c; i++) {
					data +=  "<tr><td><a href='file:///sdcard/ppl/"+r.rows.item(i).pname+".jpg' data-lightbox='file'>"+"<img src='file:///sdcard/ppl/"+r.rows.item(i).pname+".jpg' onerror='imgError(this);' width=100 height=140/></a></td>" + "<td>"+
					r.rows.item(i).id + "</td>" + "<td>"+r.rows.item(i).username + "</td>" + "<td>" + r.rows.item(i).color + "</td>" + "<td>" + r.rows.item(i).hl + "</td>";
					
                }
              showResult(data);
			  
            });
			
        });    
		
    }
	
	
function showResult(msg)  {
    $("#myModal").html("<table id='example' class='display' cellspacing='0' width='100%'><thead><tr><th>圖片</th><th>編號</th><th>名稱</th><th>顏色</th><th>更換日期</th></tr></thead>"+msg+"</table>");
$('#example').dataTable();
    // Define the Dialog and its properties.
    
	
	 
}





function imgError(image) {
    image.onerror = "";
    image.src = "ppl/nopic.jpg";
	image.style.width = "50px";
	image.style.height = "50px";
	image.id ="nopic";
	$('#nopic').unwrap();
	$('#nopic').wrap("<a href='ppl/nopic.jpg' data-lightbox='file'></a>");
		 
    return true;
}


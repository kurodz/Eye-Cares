// Database
var db = openDatabase("myDb", "1.0", "my First Db", 2*1020 * 1024);



function dbShow(){  // 顯示全部資料
		
	db = openDatabase("myDb", "1.0", "my First Db", 2*1020 * 1024);
	
        if (!db){
            alert('資料庫尚未建立！');
            return;
        }
        db.transaction(function(t) {
            t.executeSql("SELECT * FROM table01", [], function(t, r) {				
				var data = "你總共有："+ r.rows.length + " 組<br><hr><br>";
				if(r.rows.length==0){data="您還沒有輸入資料";}			
                for (var i = 0, c = r.rows.length; i < c; i++) {
					data +=  "<tr><td><a href='file:///sdcard/EyeCares/"+r.rows.item(i).pname+".jpg' data-lightbox='file'>"+"<img id='profileimg' src='file:///sdcard/EyeCares/"+r.rows.item(i).pname+".jpg' width=50 height=50 onerror='imgError(this);'/></a></td>" + "<td>"+
					r.rows.item(i).id + "</td>" + "<td>"+r.rows.item(i).username + "</td>" + "<td>" + r.rows.item(i).color + "</td>" + "<td>" + r.rows.item(i).hl + "</td><td>"+r.rows.item(i).company+"</td><td>"+r.rows.item(i).Left+"</td><td>"+r.rows.item(i).Right+"</td><td>"+r.rows.item(i).memo+"</td><td>"+r.rows.item(i).Price+"</td>";}
              showResult(data);
			  if(r.rows.length==0){}
			  else{
				$("table.dataTable tbody tr").on("swiperight",function(){  	
			    	$("tr:hover, tr.selected").css("color","red");
					
   					var ID = $(this).find("td:nth-child(2)").html();
   					if (confirm("警告！是否確定刪除資料？")){ //Delete Start
					db.transaction(function(tran) {
			tran.executeSql("DELETE FROM table01 WHERE id = ?",
			[ID],
			function() { window.location.reload();alert("資料已刪除!");},
			function() { alert("資料刪除失敗!"); });
		});
					}
				else{
					$("tr:hover, tr.selected").css("color","black");
						}
							
				});//Delete end
				
				$("table.dataTable tbody tr").on("swipeleft",function(){  	
			    	$("tr:hover, tr.selected").css("color","green");
					
   					var ID = $(this).find("td:nth-child(2)").html();
					
					
   			if (confirm("是否加到我的最愛？")){ //Favor
			db.transaction(function(t) {
            t.executeSql("SELECT * FROM table01 where id=?", [ID], function(t, r) {				
				var cname = r.rows.item(0).username;
				var cpy = r.rows.item(0).company;
                var memo = r.rows.item(0).memo;
				var sDate = r.rows.item(0).dt;
				var hhh = r.rows.item(0).hl;
				var fName = r.rows.item(0).pname;
				var color = r.rows.item(0).color;
              	var lefteye = r.rows.item(0).Left;
				var righteye = r.rows.item(0).Right; 
				db.transaction(function(t) {
			
			t.executeSql("INSERT INTO favor (username,company,memo,dt,hl,pname,color,Left,Right) VALUES (?,?,?,?,?,?,?,?,?)",
			
			[cname, cpy, memo, sDate, hhh, fName, color, lefteye, righteye],
			function() { alert('已加到我的最愛!！');},
			function() { alert("資料新增失敗!"); });
					
					
			
		});
				
				
            });
        });    
					
					}
				else{
					$("tr:hover, tr.selected").css("color","black");
						}
							
				});

				
				
				}
            });
			
        });    
		
    } //dbShow End
	
	
function showResult(msg)  {
    $("#myModal").html("<table id='example' class='display' cellspacing='0' width='100%'><thead><tr><th>圖片</th><th>編號</th><th>名稱</th><th>顏色</th><th>更換日期</th><th>廠商</th><th>左眼</th><th>右眼</th><th>備註</th><th>價格</th></tr></thead>"+msg+"</table>");
$('#example').dataTable();
    // Define the Dialog and its properties.
    
	
	 
}





function imgError(image) {
    image.onerror = "";
    image.src = "images/nopic.jpg";
	image.style.width = "50px";
	image.style.height = "50px";
	$(image).unwrap();
	$(image).wrap("<a href='images/nopic.jpg' data-lightbox='file'></a>");
		 
    return true;
} 

  
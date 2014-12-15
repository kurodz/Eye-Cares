// index JS



function dbCreate() {  // 建立資料庫
		db = openDatabase("myDb", "1.0", "my First Db", 2*1020 * 1024);
             if ( db != null ) {db.transaction(function(t) {t.executeSql("create table if not exists table01 (id INTEGER PRIMARY KEY , username VARCHAR(24), company VARCHAR(24), memo VARCHAR(24) , dt DATETIME , hl DATETIME , pname INTEGER , color INTEGER, Left INTERGER, Right INTERGER, Price INTERGER)", null,
                 function() {},
                 function(tx, err) { alert("建立資料庫失敗!"); 
			  });
			  
           });
		   db.transaction(function(t) {t.executeSql("create table if not exists favor (id INTEGER PRIMARY KEY , username VARCHAR(24), company VARCHAR(24), memo VARCHAR(24) , dt DATETIME , hl DATETIME , pname INTEGER , color INTEGER, Left INTERGER, Right INTERGER, Price INTERGER)", null,
                 function() {},
                 function(tx, err) { alert("建立資料庫失敗!"); 
			  });
			  
           });
        } 
	}
	
	
//Local Notification

function notifi(){  
		    db.transaction(function(t) {
			var date = new Date();
			var currentMonth = date.getMonth()+1;
			var currentDate = date.getDate();
			if (currentMonth < 10) { currentMonth = '0' + currentMonth; }
			if (currentDate < 10) { currentDate = '0' + currentDate; }
			var today = date.getFullYear() + "-" + (currentMonth) + "-" + (currentDate);
			var now = "'"+today+"'";
			var hh11 = "SELECT * FROM table01 WHERE hl = " +now ;
            t.executeSql(hh11  , [], function(t, r) {	
               
			    if(r.rows.length>0){
					
					window.plugin.notification.local.add({ 
					title: 'Eye Cares',
					message: '有隱形眼鏡到期了！!' });						
																			}
            });
			
        });    
    }	
	
	
function dbDrop() {  // 刪除資料表
	
	if (confirm("警告！是否確定清除資料？")){
		db = openDatabase("myDb", "1.0", "my First Db", 2*1020 * 1024);
        db.transaction(function(t) {
	        t.executeSql("DROP TABLE table01");
			t.executeSql("DROP TABLE favor");
			alert("資料表已清除");
			window.location.href="#Main";
        });

	}
	else{
		return;
		}
		    }
	
	
	


//pushwoosh

function initPushwoosh()
{
    var pushNotification = window.plugins.pushNotification;
 
    //set push notifications handler
    document.addEventListener('push-notification', function(event) {
        var title = event.notification.title;
        var userData = event.notification.userdata;
                                 
        if(typeof(userData) != "undefined") {
            console.warn('user data: ' + JSON.stringify(userData));
        }
                                     
        alert(title);
    });
 
    //initialize Pushwoosh with projectid: "GOOGLE_PROJECT_ID", appid : "PUSHWOOSH_APP_ID". This will trigger all pending push notifications on start.
    pushNotification.onDeviceReady({ projectid: "539085958441", appid : "ACBD2-D35F7" });
 
    //register for pushes
    pushNotification.registerDevice(
        function(status) {
            var pushToken = status;
            console.warn('push token: ' + pushToken);
        },
        function(status) {
            console.warn(JSON.stringify(['failed to register ', status]));
        }
    );
}

function init() {
    document.addEventListener("deviceready", initPushwoosh, true);
 
    //rest of the code
}

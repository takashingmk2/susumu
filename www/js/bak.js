
  $.ajax({
   type: "POST",
   url: "http://exout.net/~kashima_dollars/postinfo.php",
   data:
   "session_id="+"g25j1p2op290ujovpp20ojgaw0uwa05ik29"+
   "&user_id="+"1"+
   "&title="+title+
   "&content="+content+
   "&ido="+"100"+
   "&keido="+"200"+
   "&image="+"bbs.img",
   success: function(msg){
     alert(msg);
 	 }
 	});
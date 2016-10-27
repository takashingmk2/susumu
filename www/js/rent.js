/*Rental**************/

//記事投稿
function rentWrite(){
  var title = $("#rent-title").val();
	var content = $("#rent-content").val();
  
  var sendData = {
    session_id:_session_id,
    user_id:_user_id,
    title:title,
    content:content,
    ido:ido,
    keido:keido,
    limit:"3",
    image:"rent.img"
  };
  
	$.ajax({
    type: "POST",
    url:_domain+"/kashikari/post",
    data:sendData,
    success: function(msg){
      myNavigator.popPage();
      rentList()
    }
 	});
}

//記事リスト
function rentList(){
  //$("#load-dialog").show();
  console.log("start!");
  //console.log(_domain+"/keiji?longitude=80&latitude=70");
  var sendData = {
    ido:ido,keido:keido
  };
  $.ajax({
    type: "GET",
    url:_domain+"/kashikari/list-all",
    //url:_domain+"/postinfo.php?type=rent-list",
    data:sendData,
    success: function(msg){
      console.log("success!");
      console.log(JSON.stringify(msg));
      
      $(".rent-list:visible").remove()
      $.each(msg,function(key,val){
        var listDom = $(".rent-list-seed:hidden").clone(true);//.html("List"+listCnt)
        //listDom.attr("hidden","false");
        listDom.attr("onclick","rentDetail("+val.kashikari_id+")");
        listDom.find(".list__item__title").html(val.title);
        //listDom.find(".list__item__subtitle").html(val.content);
        listDom.find(".date").html(formatDate(new Date(val.time)));
      
        listDom.fadeIn().css("display","");
        //var cloneDom = listDom.clone(true);
        listDom.prependTo($("#rent-lists"));
      });
    },
    error: function(err){
      console.log("ajax-error!<br>"+JSON.stringify(err));
    }
   });
  /******/
}

//詳細表示
function rentDetail(id){
  myNavigator.pushPage("page/rent/rent-detail.html", { animation : "slide"})
  /*console.log(id);
  var sendData = {
    kashikari_id:id
  }
  $.ajax({
    type: "GET",
    url: _domain+"/kashikari/detail",
    //url:_domain+"/postinfo.php?type=rent-content",
    data:sendData,
    success: function(msg){
      console.log(JSON.stringify(msg));
      myNavigator.pushPage("rent-detail.html", { animation : "slide"})
      .then(function(){
        ons.ready(function(){
          //画像読み込み
          //var detailImg = new Image();
          //detailImage.onload=function() {
            //ロード完了で画像を表示
          //  $("#image-box").children("img").attr({'src':url});
          //}
          //detailImage.src = url;
          $("#rent-detail-var").html(msg.title);
          $("#rent-detail-title").html(msg.title);
          $("#rent-detail-content").html(msg.content);
          switch(reply_flg){
            case 2:
              $("#rent-reply").html("申請中");
              break;
            case 3:
              $("#rent-reply").html("チャットへ");
              break;
            default:
              $("#rent-reply").attr("onclick","rentReply("+id+")");
              break;
          }
        })
      });
    },
    error: function(err){
      console.log("ajax-error!<br>"+JSON.stringify(err));
    }
  });*/
}

//貸す提案
function rentReply(){
  //ons.notification.confirm({message:"本当に貸しますか？",title:null,modifier:"ios"}).then(function(result){
  closeDialog("reply-msg");
  ons.notification.alert({messageHTML:"申請が承認されるまで<br>少々お待ちください。",title:null})
  $("#rent-reply").html("申請中")
}
//
function rentServerAgree(){
  
}

function chatOpen(id){
  console.log(id);
  /*
  var sendData = {
    keiji_id:id
  }
  //myNavigator.pushPage("rent-detail.html", { animation : "slide" , onTransitionEnd:rentDetailDom(sendData)});/*
  $.ajax({
    type: "GET",
    url: _domain+"/keiji/detail",
    //url:_domain+"/postinfo.php?type=rent-content",
    data:sendData,
    success: function(msg){
      console.log(JSON.stringify(msg));
      myNavigator.pushPage("rent-detail.html", { animation : "slide"})
      .then(function(){
        ons.ready(
          detailLoad(msg,id)
        )
      });
    }
  });*/
  myNavigator.pushPage("chat.html", { animation : "lift"})
  .then(function(){
    ons.ready(function(){
    $(".chat-title #userName").html("太郎");
    })
  })
}
/*******************/
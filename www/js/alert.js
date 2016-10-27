/* AlertPage **************************/
function agreeBtn(id){
  var dom = $($(".agreeBtn")[id]);
  if(dom.hasClass('active')){
  //承認
  dom.toggleClass("btn-success");
  dom.toggleClass("btn-secondary");
  dom.html("未承認");
  dom.toggleClass("active");
  }else{
  //未承認
  ons.notification.confirm({message:"本当に承認しますか？",title:null,modifier:"ios"}).then(function(result){
    if(result){
      dom.toggleClass("btn-success");
      dom.toggleClass("btn-secondary");
      dom.html("チャットへ");
      dom.toggleClass("active");
      dom.attr("onclick","chatOpen(1)");
      //チャットボタン作成
      /*var chatDom = dom.clone(true);
      listDom.prependTo($("#bbs-lists"));
      dom.clone()*/
    }else{
      
    }
  });
  }
}

//記事リスト
function alertList(){
  //$("#load-dialog").show();
  console.log("start!");
  //console.log(_domain+"/keiji?longitude=80&latitude=70");
  var sendData = {
  };
  $.ajax({
    type: "GET",
    url:_domain+"/alert/list-all",
    //url:_domain+"/postinfo.php?type=alert-list",
    data:sendData,
    success: function(msg){
      console.log("success!");
      console.log(JSON.stringify(msg));
      
      $.each(msg,function(key,val){
        var listDom = $(".alert-list-seed:hidden").clone(true);//.html("List"+listCnt)
        //listDom.attr("hidden","false");
        listDom.attr("onclick","alertDetail("+val.keiji_id+")");
        listDom.find(".list__item__title").html(val.title);
        listDom.find(".list__item__subtitle").html(val.content);
        listDom.fadeIn().css("display","");
        //var cloneDom = listDom.clone(true);
        listDom.prependTo($("#alert-lists"));
      });
    },
    error: function(err){
      console.log("ajax-error!<br>"+JSON.stringify(err));
    }
   });
  /******/
}

/*************************************/
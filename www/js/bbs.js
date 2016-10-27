/*BBS****************/

function imgUp(evt){
  var file = $("#bbsImg").files;
   
  var reader = new FileReader();
  
  console.log(reader.readAsBinaryString(file, "Shift_JIS"));
}

//記事投稿
function bbsWrite(){
  var title = $("#bbs-title").val();
    var content = $("#bbs-content").val();
	//var location = getLocation();
	//alert(location.ido);
  console.log("bbsWrite");
  var sendData = {
    title:title,
    content:content,
    ido:"300",
    keido:"300",
    image:"hanabi1.jpg"
  };
	$.ajax({
   type: "POST",
   //url: _domain+"postinfo.php",
   url:"https://it2-sotuken.herokuapp.com/keiji/post",
   data:sendData,
   success: function(msg){
     console.log("Success!");
     //console.log("aaa");
     //alert(msg);
      console.log(JSON.stringify(msg));
    //console.log(msg);
    }
 	});
  myNavigator.popPage();
  bbsList();
}

function bbsReply(id){
  $.ajax({
     type: "GET",
     url: _domain+"/keiji/detail",
     //url:_domain+"/postinfo.php?type=bbs-content",
    data:{keiji_id:id},
    success: function(msg){
      myNavigator.pushPage("page/bbs/bbs-reply.html", { animation : "lift"}).then(function(){
        ons.ready(function(){
          console.log(JSON.stringify(msg));
          $("#bbs-reply-var").html(msg.title);
          $("#bbs-reply-content").html(brReplace(msg.content));
          $("#bbs-reply-btn").attr("onclick","bbsReplyPost("+id+")");
          //var cloneDom = listDom.clone(true);
        })
      })
    }
  });
}


//記事リスト
function bbsList(){/*
  var listDom = $(".bbs-list:first").clone(true);//.html("List"+listCnt)
  listDom.attr("onclick","bbsContent("+listCnt+")");
  listDom.find(".keijiban_id").attr('id',listCnt);
  listDom.find(".list__item__title").html("title"+listCnt);
  listDom.find(".list__item__subtitle").html("content"+listCnt);
  listDom.prependTo($("#bbs-lists"));
  return listCnt++;*/
  //$("#load-dialog").show();
  console.log("start!");
  //console.log(_domain+"/keiji?longitude=80&latitude=70");
  var sendData = {
    ido:"300",keido:"300"
  };
  $.ajax({
   type: "POST",
   url:"https://it2-sotuken.herokuapp.com/keiji/list-all",
   //url:_domain+"/postinfo.php?type=bbs-list",
   //url:"https://it2-sotuken.herokuapp.com/DBtest",
   data:sendData,
   xhrFields:{withCredentials: true},
   success: function(msg){
    console.log("success!");
    console.log(JSON.stringify(msg));
    //console.log(JSON.parse(msg));
    //console.log(JSON.stringify(msg));
    //alert(msg);
    $(".bbs-list:visible").remove()
    $.each(msg,function(key,val){
      var listDom = $(".bbs-list-seed:hidden").clone(true);//.html("List"+listCnt)
      listDom.attr("id",val.keiji_id);
      //listDom.attr("hidden","false");
      listDom.css("display","flex");
      listDom.attr("onclick","bbsDetail("+val.keiji_id+")");
      listDom.find(".list__item__title").html(val.title);
      //listDom.find(".list__item__subtitle").html(val.content);
      listDom.find(".date").html(formatDate(new Date(val.time)));
      listDom.fadeIn().css("display","");
      //var cloneDom = listDom.clone(true);
      listDom.prependTo($("#bbs-lists"));
    });
    },
    error: function(err){
      console.log("ajax-error!<br>"+JSON.stringify(err));
    }
 	});
  /******/
}

//詳細表示
function bbsDetail(id){
  console.log(id);
  var sendData = {
    keiji_id:id
  }
  //myNavigator.pushPage("bbs-detail.html", { animation : "slide" , onTransitionEnd:bbsDetailDom(sendData)});/*
  $.ajax({
    type: "GET",
    url: _domain+"/keiji/detail",
    //url:_domain+"/postinfo.php?type=bbs-content",
    data:sendData,
    success: function(msg){
      console.log(JSON.stringify(msg));
      myNavigator.pushPage("page/bbs/bbs-detail.html", { animation : "slide"})
      .then(function(){
        ons.ready(
          bbsDetailDom(msg,id)
        )
      });
    }
  }); 
}

function bbsDetailDom(msg,id){
  $("#bbs-detail-var").html(msg.title);
  $("#bbs-detail-title").html(msg.title);
  $("#bbs-detail-content").html(brReplace(msg.content));
  $("#bbs-detail-reply").attr("onclick","bbsReply("+id+")")
  $(".bbs-list-update").attr("onclick","bbsCmtUpdate("+id+")");
  $("#bbs-detail-date").html(formatDate(new Date(msg.time)));
  //画像読み込み
  //var detailImg = new Image();
  //detailImage.onload=function() {
    //ロード完了で画像を表示
  //  $("#image-box").children("img").attr({'src':url});
  //}
  //detailImage.src = url;
  
  $(".bbs-cmt-list[id!='seed']").remove()
  $.each(msg['comment'],function(key,val){
      
    var listDom = $(".bbs-cmt-list:first").clone(true);//.html("List"+listCnt)

    listDom.css("display","flex");
    //listDom.attr("hidden","false");
    //listDom.find(".image").html(val.image);
    listDom.find(".bbs-cmt-cmt").html(brReplace(val.comment));
     //listDom.find(".bbs-cmt-cmt").prepend(brReplace(val.time))//TODO:
    //var cloneDom = listDom.clone(true);
    listDom.prependTo($("#bbs-cmt-lists"));
    
  }); 
    
}


function bbsReplyPost(id){
  var comment = $("#bbs-reply-cmt").val();
  console.log("start!");
  var sendData = {
    keiji_id:id,
    comment:comment
  };
	$.ajax({
    type: "POST",
    url:"https://it2-sotuken.herokuapp.com/keiji/comment",
    data:sendData,
    success: function(msg){
      console.log("Success!");
      console.log(JSON.stringify(msg));
      myNavigator.popPage().then(function(){
        $.ajax({
          type: "GET",
          url: _domain+"/keiji/detail",
          data:{keiji_id:id},
          success: function(data){
            console.log(JSON.stringify(data));
                bbsDetailDom(data,id)     
          }
        });
      });
    },
    error: function(msg){
      console.log("error/".msg);
    }
 	});
}

function bbsCmtUpdate(id){
  $.ajax({
    type: "GET",
    url: _domain+"/keiji/detail",
    data:{keiji_id:id},
    success: function(data){
      console.log(JSON.stringify(data));
      detailLoad(data,id)     
    },
    error: function(msg){
      console.log("ajax-error!<br>"+JSON.stringify(err));
    }
  });
}

//地点登録
function locationRegi(id){
  var cnt;
  var compFlg = 0;
  //３つの地点の中にNullがあるか調べる
  for(cnt=0;cnt<3;cnt++){
    if(region.name[cnt]==""){
      t_region = region;
      t_region.name[cnt] = $("#location-regi .place").val();
      t_region.ido[cnt] = "100";
      t_region.keido[cnt] = "200";
      
      locationEditAll(t_region);
      ons.notification.alert({message:"登録が完了しました。",title:null});
      closeDialog('location-regi');
      return true;
    }
  }
  closeDialog('location-regi');
  ons.notification.alert({messageHTML:"登録できる数が<br>限界に達しました。",title:null,collback:locationSelect()})
}

function locationSelect(){
  var cnt;
  locationEdit(1);
  $(".location-list[id!='seed']").remove()
  for(cnt=0;cnt<3;cnt++){
    if(region.ido[cnt]){
      $(".onoffswitch-checkbox").prop("checked",false);
      var listDom = $("#location-seed #seed").clone(true);//.html("List"+listCnt)
      listDom.css("display","flex");
      listDom.attr("id","location"+cnt);
      if(region.checked[cnt]=="1"){
        listDom.find(".check").prop("checked",true);
      }
      listDom.find(".edit-name").val(region.name[cnt]);
      listDom.find(".edit-name").attr("onkeyup","locationName("+cnt+")");
      listDom.find(".check-name").html(region.name[cnt]);
      listDom.find(".location_key").attr("id",cnt+1);
      listDom.find(".del-btn").attr("onclick","locationDelete("+cnt+")");
      listDom.find(".check").attr("onchange","locationActive("+cnt+")");
      //listDom.find(".check").attr("onchange","locationaChecked("+cnt+")");
      listDom.appendTo($("#location-lists"));
    }
  }
  document.getElementById("location-select.html").show();
}

function locationName(id){
  var t_region = region;
  //console.log($(".location-list .name"))
  t_region.name[id] = $(".location-list .name")[id+2].value;
  $(".location-list .name")[id+3].innerHTML = $(".location-list .name")[id+2].value;
  return region = t_region;
}

function locationaChecked(id){
  var t_region = region;
  //console.log($(".location-list .name"))
  if($(".location-list .check")[id+1].checked){
    t_region.checked[id] = 0;
    $(".location-list .check")[id+1].checked = false;
  }else{
    t_region.checked[id] = 1;
    $(".location-list .check")[id+1].checked = true;
  }
  return region = t_region;
}

function locationDelete(key){
  var t_region = region;
  t_region.name[key] = "";
  t_region.ido[key] = "";
  t_region.keido[key] = "";
  $("#location"+key).remove()
  return region = t_region;
}

function locationActive(key){
  console.log("locacheck"+key)
  var t_region = region;
  if($('#location'+key+' .check').prop("checked")){
    t_region.checked[key] = "1";
  }else{
    t_region.checked[key] = "0";  
  }
  return region = t_region;
}

function locationEdit(flg){
  //$("#location-toggle").is(":checked")
  if(!$('#location-toggle').prop("checked")||flg == 1){
    $("#location-lists .edit-name, .del-btn").css("display","none");
    $("#location-lists .check-name, .check").css("display","flex");
  }else{
    $("#location-lists .edit-name, .del-btn").css("display","flex");
    $("#location-lists .check-name, .check").css("display","none");
  }
}

function locationEditAll(h_region){
  t_region = h_region;
  var sendData = {
    t_region
  }
  closeDialog('location-select.html')
  /*
  $.ajax({
    type: "POST",
    url: _domain+"/keiji/region/edit-all",
    data:sendData,
    success: function(msg){
      closeDialog('location-select.html')
     },
    error: function(err){
      console.log("ajax-error!<br>"+JSON.stringify(err));
     }
  });*/
}

//Refresh
function bbdRefresh(event){
  console.log('change');/*
  var pullHook = $('#refresh');
  var message = '';
  switch (event.state) {
    case 'initial':
      message = 'Pull to refresh';
      break;
    case 'preaction':
      message = 'Release';
      break;
    case 'action':
      message = 'Loading...';
      break;
  }
  pullHook.innerHTML = message;

  pullHook.onAction = function(done) {
    setTimeout(done, 1000);
  }*/
}

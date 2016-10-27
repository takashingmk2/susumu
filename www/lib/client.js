
//var socket = io.connect('http://172.18.93.199:3000');
//var socket = io.connect('http://172.18.93.146:8080/');
//var socket = io.connect('http://192.168.179.5:8080/');

var userId = "user_" + Math.floor((Math.random() * 100) + 1);
ons.ready(function () {
    $("#userName").text(userId);
});

jQuery.fn.extend({
    live: function (event, callback) {
        if (this.selector) {
            jQuery(document).on(event, this.selector, callback);
        }
    }
});
socket.on('messageToClient', function (msg) {  
    if (msg.userId == userId)
        insertMessage(msg.content, msg.chatId);
    else
        fakeMessage(msg.content);
});
var $messages = $('.messages-content'),
    d, h, m,
    i = 0;

function updateScrollbar(chatId) {
    // Scroll
    if (chatId) {
        $('.messages-content ').animate({
            scrollTop: $("." + chatId).offset().top
        }, 'slow');
    } else {
        $('.messages-content ').animate({
            scrollTop: $(".loading").offset().top
        }, 'slow');
    }

}

function setDate() {
    d = new Date()
    if (m != d.getMinutes()) {
        m = d.getMinutes();
        $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
    }
}

function insertMessage(msg, chatId) {
    $('<div class="message message-personal ' + chatId + '">' + msg + '</div>').appendTo($('.messages-content')).addClass('new');
    setDate();
    $('.message-input').val(null);
    updateScrollbar(chatId);
    setTimeout(function () {
        //fakeMessage();
    }, 1000 + (Math.random() * 20) * 100);
}


$('.message-submit').live('click', function () {
    var chatId = "chat_" + Math.floor((Math.random() * 100) + 1);
    msg = $('.message-input').val();
    if ($.trim(msg) == '') {
        return false;
    }
    $('.message-input').focus()
    socket.emit('messageToServer', { content: $.trim(msg), chatId: chatId, userId: userId });
});


$(window).on('keydown', function (e) {
    var chatId = "chat_" + Math.floor((Math.random() * 200) + 1);
    if (e.which == 13) {
        msg = $('.message-input').val();
        if ($.trim(msg) == '') {
            return false;
        }
        socket.emit('messageToServer', { content: $.trim(msg), chatId: chatId, userId: userId });
        return false;
    }
})
var timeout;
function timeoutFunction() {
    typing = false;
    socket.emit("messageTyping", false);
}

$('.message-input').live('keyup', function (e) {
    if (e.which != 13) {
        typing = true;
        socket.emit('messageTyping', { type: 1, userId: userId });
        clearTimeout(timeout);
        timeout = setTimeout(timeoutFunction, 1000);
    }
});

socket.on('messageTypingClient', function (data) {
    if (data.type) {
        if (data.userId != userId) {
            if (!$.trim($('.loading').html()).length)
                $('<div class="message loading new"><figure class="avatar"><img src="http://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80_4.jpg" /></figure><span></span></div>').appendTo($('.messages-content'));
        }
    } else {
        $('.message.loading').remove();
    }
});


function fakeMessage(msg) {
    if ($('.message-input').val() != '') {
        return false;
    }
    var chatIdFake = "chat_" + Math.floor((Math.random() * 500) + 4);
    $('<div class="message loading new ' + chatIdFake + '"><figure class="avatar"><img src="http://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80_4.jpg" /></figure><span></span></div>').appendTo($('.messages-content'));
    updateScrollbar(chatIdFake);
    //updateScrollbar(chatIdFake);
    $('.message.loading').remove();

    $('<div class="message new ' + chatIdFake + '"><figure class="avatar"><img src="http://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80_4.jpg" /></figure>' + msg + '</div>').appendTo($('.messages-content')).addClass('new');
    setDate();
    updateScrollbar(chatIdFake);
}



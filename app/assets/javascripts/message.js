$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="messages" data-message-id="${message.id}">
         <div class="messages__box">
           <div class="messages__box__name">
             ${message.user_name}
           </div>
           <div class="messages__box__time">
             ${message.created_at}
           </div>
         </div>
         <div class="lower-message">
           <p class="lower-message__text">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} >
       </div>`
     return html;
   } else {
     var html =
      `<div class="messages" data-message-id="${message.id}">
         <div class="messages__box">
           <div class="messages__box__name">
             ${message.user_name}
           </div>
           <div class="messages__box__time">
             ${message.created_at}
           </div>
         </div>
         <div class="lower-message">
           <p class="lower-message__text">
             ${message.content}
           </p>
         </div>
       </div>`
     return html;
   };
 }
$('#new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    var html = buildHTML(data);
    $('.main-message').append(html);
    $('.main-message').animate({ scrollTop: $('.main-message')[0].scrollHeight});
    $('form')[0].reset();
    $('.from__input__right').prop('disabled', false);
  })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
  });
})

var reloadMessages = function() {
  //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
  var last_message_id = $('.messages:last').data("message-id");
  console.log(last_message_id)
  $.ajax({
    //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
    url: "api/messages",
    //ルーティングで設定した通りhttpメソッドをgetに指定
    type: 'get',
    dataType: 'json',
    //dataオプションでリクエストに値を含める
    data: {id: last_message_id}
  })
  .done(function(messages) {
    if (messages.length !== 0) {
    var insertHTML = '';
    $.each(messages, function(i, message) {
      insertHTML += buildHTML(message)
    });
    $('.main-message').append(insertHTML);
    $('.main-message').animate({ scrollTop: $('.main-message')[0].scrollHeight});
  }
  })
  .fail(function() {
    alert('error');
  });
};
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});
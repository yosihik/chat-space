$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="messages">
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
         <img src=${message.image} class = "lower-message__image" >
       </div>`
     return html;
   } else {
     var html =
      `<div class="messages">
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
});
$(document).ready(function() {
  $(".post-container").on("click", "button.fa.fa-sort-desc.vote-button.upvote-button", function(event){
    event.preventDefault();
    var button = this
    var buttonId = this.name;
    var ajaxVote = $.ajax({
      url: '/posts/'+buttonId+'/vote',
      type: 'post'
    });
    ajaxVote.done(function(response){
      var postIdentity = JSON.parse(response);
      var updatedPoints = postIdentity.points;
      $("article#"+postIdentity.id).children("p").children(".points").text(updatedPoints);
    });
    ajaxVote.done(function(response){
      $(button).css("color", "red");
    })
  });
  $(".post-container").on("click", "a.delete", function(event){
    event.preventDefault();
    var articleId = $(this).closest("article")[0].id;
    $.ajax({
      url: '/posts/'+articleId,
      type: 'delete'
    }).done(function(response){
      var deleteIdentity = JSON.parse(response);
      $("article#"+deleteIdentity.id).hide();
    })
  });
  $("form#posts").on("submit", function(event){
    event.preventDefault();
    var title = $("form#posts").serialize()
    var postRequest = $.ajax({
      url: '/posts',
      type: 'post',
      data: title
    })
    postRequest.done(function(response){
      $("div.new-posts").html(response)
    });
    postRequest.fail(function(response){
      alert("Status Code: " + response.status + ". Error: Title cannot be empty!");
    })
  })
});

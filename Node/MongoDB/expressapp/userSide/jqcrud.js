$(function () {
  loadRecipie();
  $("#recipie").on("click", ".btn-danger", handleDelete);
  $("#recipie").on("click", ".btn-warning", handleUpdate);
  $("#addBtn").click(addRecipie);
  $("#updateSave").click(function () {
    var id = $("#updateID").val();
    var title = $("#updateTitle").val();
    var body = $("#updateBody").val();
    $.ajax({
      url: "https://usman-recipes.herokuapp.com/api/recipes/" + id,
      data: { title, body },
      method: "PUT",
      success: function () {
        // console.log(response);
        loadRecipie();
        $("#updateModal").modal("hide");
      },
    });
  });
});

function handleUpdate() {
  // console.log("edit clicked");
  var btn = $(this);
  var parentDiv = btn.closest(".recipie");
  let id = parentDiv.attr("data-id");
  $.get(
    "https://usman-recipes.herokuapp.com/api/recipes/" + id,
    function (response) {
      $("#updateID").val(response._id);
      $("#updateTitle").val(response.title);
      $("#updateBody").val(response.body);
      $("#updateModal").modal("show");
    }
  );
} //end handleUpdate()

function addRecipie() {
  var title = $("#title").val();
  var body = $("#body").val();
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/recipes",
    method: "POST",
    data: { title, body },
    success: function (response) {
      console.log(response);
      loadRecipie();
      $("#addRecipie").modal("hide");
    },
  });
} //end addRecipie()
function handleDelete() {
  var btn = $(this);
  var parentDiv = btn.closest(".recipie");
  let id = parentDiv.attr("data-id");
  console.log(id);
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/recipes/" + id,
    method: "DELETE",
    error: function () {
      var recipie = $("#recipie");
      recipie.empty();
      recipie.append("An Error has been occured");
    },
    success: function () {
      loadRecipie();
    },
  });
  //you can use spinner to show this is requesting
  // console.log("handle Delete");
} //end handleDelete()
function loadRecipie() {
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/recipes",
    method: "GET",
    success: function (response) {
      console.log(response);
      var recipie = $("#recipie");
      recipie.empty();
      for (var i = 0; i < response.length; i++) {
        var rec = response[i];
        recipie.append(
          `<div class="recipie" data-id="${rec._id}"><h3>${rec.title}</h3><p><button class="btn btn-danger btn-sm float-right">Delete</button><button class="ml-3 btn btn-warning btn-sm float-right">Edit</button>${rec.body}</p></div>`
        );
      }
    },
  });
} //end loadRecipie()

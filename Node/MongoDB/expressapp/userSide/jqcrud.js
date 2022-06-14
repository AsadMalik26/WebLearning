$(function () {
  loadRecipie();
  $("#recipie").on("click", ".btn-danger", handleDelete);
  $("#recipie").on("click", ".btn-warning", handleUpdate);
  $("#addBtn").click(addRecipie);

  $("#updateSave").click(function () {
    console.log("Update Save clicked");
    var id = $("#updateID").val();
    var title = $("#updateTitle").val();
    var price = $("#updatePrice").val();
    var description = $("#updateBody").val();

    $.ajax({
      url: "http://localhost:3030/api/expense/" + id,
      data: { title: title, price: price, description: description },
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
  console.log("edit clicked");
  var btn = $(this);
  var parentDiv = btn.closest(".recipie");
  let id = parentDiv.attr("data-id");
  $.get("http://localhost:3030/api/expense/" + id, function (response) {
    $("#updateID").val(response._id);
    $("#updateTitle").val(response.title);
    $("#updatePrice").val(response.price);
    $("#updateBody").val(response.description);
    $("#updateModal").modal("show");
  });
} //end handleUpdate()

function addRecipie() {
  var title = $("#title").val();
  var body = $("#body").val();
  $.ajax({
    url: "http://localhost:3030/api/expense",
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
    url: "http://localhost:3030/api/expense/" + id,
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
    url: "http://localhost:3030/",
    method: "GET",
    success: function (response) {
      console.log(response);
      var recipie = $("#recipie");
      recipie.empty();
      for (var i = 0; i < response.length; i++) {
        var rec = response[i];
        recipie.append(
          `<div class="recipie" data-id="${rec._id}"><h3>${rec.title}</h3><h5>Rs. ${rec.price}</h5><p><button class="btn btn-danger btn-sm float-right">Delete</button><button class="ml-3 btn btn-warning btn-sm float-right">Edit</button>${rec.description}</p></div>`
        );
      }
    },
  });
} //end loadRecipie()

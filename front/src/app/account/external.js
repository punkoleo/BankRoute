define(["require", "exports"], function(require, exports){
  var dataTable = null;
  exports.loadDataTable = function (dataJson) {
    if(dataTable == null) {
      dataTable = $('#table_transactions').DataTable({
        paging: false,
        info: false
      });
    } else {
      dataTable.rows().remove().draw();
    }


    $.each( dataJson, function( index, value ){
      dataTable.row.add([
        value.date,
        value.emailEmetteur,
        value.emailDestinataire,
        value.somme+" €",
      ]).draw(false);
    });


  }
});

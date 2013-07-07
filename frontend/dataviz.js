google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart);

function drawChart() {
  var data__ = [['Button', 'Count']];
  $.getJSON('latest.json', function(data) {
    $.each(data, function(key, val) {
      data__.push([key, val]);
    });

    var data_ = google.visualization.arrayToDataTable(data__);

    var options = {
      title: 'HALT',
      hAxis: {title: '', titleTextStyle: {color: 'red'}}
    };
    var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
    chart.draw(data_, options);
  });
}
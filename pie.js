


window.onload = function() {

    chrome.storage.sync.get(['total','limit'],function(budget){

        //calculation of percentages
    var totalSpentPercent = 100 * (parseInt(budget.total)/parseInt(budget.limit));
    var amountLeftPercent = 100 - totalSpentPercent;

    //color picker based on percentage left to spend
    if (amountLeftPercent <=15){var color = "#e8442c";}
    else if(amountLeftPercent > 15 && amountLeftPercent <= 49){var color = "yellow";}
    else {var color = "#65ea56"; }
   
    CanvasJS.addColorSet("colors",
                [//colorSet Array
                color,
                "#4741fc"                          
                ]);   
    
    var chart = new CanvasJS.Chart("piechart", {
        animationEnabled: true,
        
        colorSet: "colors",
       
        data: [{
            type: "pie",
            startAngle: 240,
            yValueFormatString: "##0.00\"%\"",
            indexLabel: "{label} {y}",
            dataPoints: [
                {y: amountLeftPercent, label: "Left"},
                {y: totalSpentPercent, label: "Spent"}
                
               
            ]
        }]
    });
    chart.render();
    })  
}



$(function(){

   
    // much simpler code compared to updateTotal function below
    chrome.storage.sync.get(['total','limit'],function(budget){
        $('#total').text(budget.total);
        $('#limit').text(budget.limit);
        $('#left').text(budget.limit - budget.total);
       
    })



    $('#spendAmount').click(function(){
        // chrome storage is asynchrnous in nature, which means that we have to 
        // specify a callback function. That callback function will accept an 
        // object ->budget

        // create chrome storage to see if value is already within it
        // array of items is being requested
        chrome.storage.sync.get(['total', 'limit'],function(budget){
            // initialize newTotal variable to 0
            var newTotal = 0;
            // if a total is already in existance, add it to the new total
            // if other words, if (budget.total) evaluates to true
            if (budget.total){
                newTotal += parseInt(budget.total);
            }

            var amount = $('#amount').val();
            // if amount is present, proceed with adding it to the new total
            if(amount){
                newTotal += parseInt(amount);
            }

            var currentAmountLeft = parseFloat(budget.limit) - newTotal; 
            //this contains a call back function that determines whether the 
            // user exceeded their limit
            chrome.storage.sync.set({'total': newTotal},function(){

                
                if (newTotal && budget.total>= budget.limit){
                    // object that will hold notification
                    var notifOptions = {
                            type: 'basic',
                            iconUrl: 'images/icon48.png',
                            title: 'Limit reached',
                            message: 'You have exceeded your limit!'
                    };
                    chrome.notifications.create('limitNotif', notifOptions);
                }
            });
            chrome.notifications.clear('limitNotif');
            // will update new total on html popup
            $('#total').text(newTotal);
            // will update the new amount to empty
            $('#amount').val('');
            $('#left').text(currentAmountLeft);

            pie_function();
        })
    })
})

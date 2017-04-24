function getContent(){
    var Airtable = require('airtable');

    var base = new Airtable({apiKey: 'keyYg3bQhyi6DluED'}).base('appvNGSfhlxZpmAed');

    base('content').select({
        maxRecords: 20,
        view: "Grid view", 
        sort: [{field: "order", direction: "asc"}]
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            console.log(JSON.stringify(record))

            var button = $('<a></a>')
            .text(record.get('buttonText'))
            .click(function(){
                $('#display-container').empty(); 
                $('#display-container').html(record.get('content'));
            })

            var button2 = $('<a></a>')
            .text(record.get('buttonText'))
            .click(function(){
                $('#display-container').empty(); 
                $('#display-container').html(record.get('content'));
            })

            var li = $('<li></li>').html(button);
            var li2 = $('<li></li>').html(button2);

            $('#nav-desk').append(li);
            $('#nav-mobile').append(li2);
            

            if (record.get('name') == 'index'){
                $('#display-container').html(record.get('content'));
            }
        });

        
    $('#progressBar').hide();
    fetchNextPage();

    }, function done(err) {
        if (err) { console.error(err); return; }
    });
}
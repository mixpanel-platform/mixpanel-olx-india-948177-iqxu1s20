var params = {
    from: moment().subtract(30,'days'),    // get today's date
    to: moment(),      // get today's date
    type: 'unique',    // analysis type for the data, can be 'general', 'unique', or 'average'
    unit: 'day',       // level of granularity of the data, can be 'minute', 'hour', 'day', or 'month'
};
//run query to get installs data for the last month
MP.api.segment('App_install', params).done(function(installsResults) {
    console.log("installs today results", installsResults.values());
    //store results of install data for the last month
    var installs = installsResults.values()
    // get just today's installs for header panel
    console.log("params", moment().format("YYYY-MM-DD"))
    var today = moment().format("YYYY-MM-DD")
    var todaysInstalls = addCommas(installs.App_install[today])
    // replace text in header pannel to show today's installs
    $('#installs-today').text(todaysInstalls)

    //graph monthly data using MPChart
    var newInstalls = $('#new-installs-chart').MPChart({chartType: 'line'});   //create the chart and attach to the new installs data                            
    newInstalls.MPChart('setData', installsResults.values()); // Set the chart's data
    $("#new-installs").show()           //display chart header

});
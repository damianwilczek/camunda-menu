/**
 * Created by Damian on 26.02.2016.
 */


/* JSON.parse(localStorage.getItem("data")) = web.data */
$(function(){
    $('a[title]').tooltip();
});
var web = {
    data: {},
    url: "//camunda.com/givemesomefood/index.php",
    interval: null,
    initialize: function(){
        this.downloadData();
    },
    content: {
        downloadData: function() {
            $.ajax({
                type: "GET", url: this.url , success: function (msg) {
                    if (msg != 'error') {
                        web.data = JSON.parse(msg);
                    }
                }
            });
        },
        uploadData: function() {
            $.ajax({
                type: "POST", url: this.url, data: this.data
            });
        }
    },
    location: {
        getLocation: function(){
            var data = JSON.parse(localStorage.getItem("data"));
            var HTML = '';
            $.each(data.Location, function( key, value) {
                HTML +=  '<li class="list-group-item borderless"><p>' + value.name + ' <button type="button" onclick="removeLocation('+key+')" class="btn btn-danger" style="float: right;"><span class="glyphicon glyphicon-trash"></span></button></p></li>';
            });
            document.getElementById('showLocations').innerHTML = HTML;
        },
        setLocation: function(value){
            var data = JSON.parse(localStorage.getItem("data"));
            var id = 0;
            $.each(data.Location, function( key ) {
                id = parseInt(key) + 1;
            })
            data.Location[id] = new Object();
            data.Location[id].name = value;
            document.getElementById('newLocation').value = '';
            localStorage.setItem("data", JSON.stringify(data));
            uploadData();
            getLocation();
        },
        removeLocation: function(id){
            var data = JSON.parse(localStorage.getItem("data"));
            $.each(data.Location, function( key ) {
                if(id == key) {
                    delete data.Location[key];
                }
            });
            if(data.currentLocationId == id) {
                setLocationOption(0);
            }
            $.each(data.Food, function( key, value) {
                if(value.location == id) {
                    delete data.Food[key];
                }
            });
            localStorage.setItem("data", JSON.stringify(data));
            uploadData();
            getLocation();
        },
        setOption: function(v){
            web.data.currentLocationId = v;
            loadDashboard();
        }
    },
    dashboard: {
        load: function(){
            clearInterval(web.interval);
            var data = JSON.parse(localStorage.getItem("data"));
            var location = (typeof data.Location[data.currentLocationId] !== 'undefined')?data.Location[data.currentLocationId].name:'<button onclick="getSettings();" data-toggle="tab"  class="btn btn-primary"><span class="glyphicon glyphicon-trash"></span> Set Location</button>';
            var amount = data.amount !== null?data.amount:0;
            document.getElementById('countCustomers').parentElement.style.color = (data.done == true)?'greenyellow':'dodgerblue';
            document.getElementById('time').innerHTML = data.time;
            document.getElementById('dashboardLocation').innerHTML = location;
            document.getElementById('dashboardAmount').innerHTML = '<sub>/' + amount + '</sub>';
            autoRefresh = setInterval(function(){ getSelected(); }, 2000);
            uploadData();
        }
    },
    setMemberAmount: function(v){
        var data = JSON.parse(localStorage.getItem("data"));
        data.amount = v;
        localStorage.setItem("data", JSON.stringify(data));
        uploadData();
        loadDashboard();
    },


    getSettings: function(){
        clearInterval(autoRefresh);
        $('.nav-tabs a[href="#settings"]').tab('show');
        var data = JSON.parse(localStorage.getItem("data"));
        var HTML_Location = '<option selected disabled>Select location...</option>';
        $.each(data.Location, function( key, value) {
            var selected = (data.currentLocationId == key)?'selected':'';
            HTML_Location +=  '<option '+ selected +' value="'+key+'">' + value.name +'</option>';
        });
        i = 1;
        HTML_Amount = '<option selected disabled>Anzahl der Teilnehmer...</option>';
        while (i <= 12) {
            var selected = (data.amount == i)?'selected':'';
            HTML_Amount +=  '<option '+selected+' value="'+i+'">'+i+'</option>';
            i++;
        }

        document.getElementById('locationOptions').innerHTML = HTML_Location;
        document.getElementById('MemberAmount').innerHTML = HTML_Amount;

    },
    getFoodLocations: function(){
        clearInterval(autoRefresh);
        var data = JSON.parse(localStorage.getItem("data"));
        var HTML_Location = '<option selected disabled>First select location...</option>';
        $.each(data.Location, function( key, value) {
            HTML_Location +=  '<option value="'+key+'">' + value.name +'</option>';
        });
        document.getElementById('foodLocationOptions').innerHTML = HTML_Location;
        document.getElementById('FoodList').innerHTML = '';
        document.getElementById('addfoodForm').style.display = 'none';
    },
    getFood: function(id) {
        var data = JSON.parse(localStorage.getItem("data"));
        var HTML = '';
        $.each(data.Food, function( key, value) {
            if(value.location == parseInt(id)) {
                HTML += '<li class="list-group-item borderless"><p>DE: '+value.nameDE+' <br />EN: '+ value.nameEN +'<button onclick="removeFood('+key+', '+value.location+');" type="button" class="btn btn-danger" style="float: right;margin-top: -15px;"><span class="glyphicon glyphicon-trash"></span></button></p></li>';
            }
        });
        document.getElementById('addfoodForm').style.display = 'block';
        document.getElementById('FoodList').innerHTML = HTML;
    },
    removeFood: function(id, location){
        var data = JSON.parse(localStorage.getItem("data"));
        $.each(data.Food, function( key ) {
            if(id == key) {
                delete data.Food[key]
            }
        });
        localStorage.setItem("data", JSON.stringify(data));
        uploadData();
        getFood(location);
    },
    setFood: function(nameDE, nameEN, location){
        var data = JSON.parse(localStorage.getItem("data"));
        var id = 0, sumId = 1;

        $.each(data.Food, function (key, value) {
            if (value.location == parseInt(location)) {
                id = parseInt(key) + 1;
            }
            sumId = parseInt(key) + 1;
        });

        data.Food[sumId] = new Object();
        data.Food[sumId].nameDE = nameDE;
        data.Food[sumId].nameEN = nameEN;
        data.Food[sumId].id = id;
        data.Food[sumId].location = location;

        document.getElementById('newFoodDE').value = '';
        document.getElementById('newFoodEN').value = '';
        localStorage.setItem("data", JSON.stringify(data));
        uploadData();
        getFood(location);
    },
    getSelected: function() {
        refreshData();
        var data = JSON.parse(localStorage.getItem("data"));
        var HTML = ''; var foodId = '';var countCustomers = 0;
        $.each(data.selectedFood, function( key, value) {
            foodId = value.selected.replace('foodID_', '');
            $.each(data.Food, function( keyt, valuet) {
                if(valuet.id == foodId && data.currentLocationId == valuet.location){
                    countCustomers++;
                    HTML += '<li class="list-group-item borderless"><span class="badge" style="background-color: dodgerblue;">3</span>' + valuet.nameDE + ' </li>';
                }
            });
        });
        document.getElementById('removevote').style.display = (countCustomers > 0) ? 'block' : 'none';
        document.getElementById('selectedFood').innerHTML = HTML;
        document.getElementById('countCustomers').innerHTML = countCustomers;

    },
    removeVotes: function() {
        clearInterval(autoRefresh);
        var data = JSON.parse(localStorage.getItem("data"));
        $.each(data.selectedFood, function( key, value) {
            delete data.selectedFood[key];
        });
        data.amount = 0;
        data.time = '00:00';
        data.done = false;
        localStorage.setItem("data", JSON.stringify(data));
        uploadData();
        autoRefresh = setInterval(function(){ getSelected(); }, 2000);
    },
    copyName: function(inputID, outputID){
        var inValue = document.getElementById(inputID).value;
        var outValue = document.getElementById(outputID).value;

        if(outValue.length == 0){
            document.getElementById(outputID).value = inValue;
        }


    },
    save: function(){
        var data = JSON.parse(localStorage.getItem("data"));
        var filename = 'giveMeSomeFood_' + new Date().toJSON().slice(0,10) + '.json'

        if(typeof data === "object"){
            data = JSON.stringify(data, undefined, 4)
        }

        var blob = new Blob([data], {type: 'text/json'}),
            e    = document.createEvent('MouseEvents'),
            a    = document.createElement('a')

        a.download = filename
        a.href = window.URL.createObjectURL(blob)
        a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(e)
    },
    handleFile: function() {
        var file = document.getElementById('backupFile').files[0];
        var reader = new FileReader();

        reader.onload = (function(theFile) {
            return function(e) {
                // Render thumbnail.
                var data = e.target.result;
                localStorage.setItem("data", data);
                console.log(data);
            };
        })(file);

        // Read in the image file as a data URL.
        reader.readAsText(file);
        uploadData();
        location.reload();
    }
}
web.initialize();
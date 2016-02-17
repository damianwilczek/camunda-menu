
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="utf-8">
    <meta name="robots" content="noindex">

    <title>Camunda Training - Menu</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
    <link href="css/style.css" rel="stylesheet" >
    <script src="js/jquery.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <!--<script src="https://www.dropbox.com/static/api/dropbox-datastores-1.0-latest.js"></script>-->
</head>
<body onload="loadDashboard();">
<section style="background:#efefe9;">
    <div class="container">
        <div class="row">
            <div class="board">
                <div class="board-inner">
                    <ul class="nav nav-tabs" id="myTab">
                        <div class="liner"></div>
                        <li class="active"><a onclick="loadDashboard();" href="#dashboard" data-toggle="tab" title="Dashboard"><span class="round-tabs one"><i class="glyphicon glyphicon-home"></i></span></a></li>
                        <li><a href="#response" data-toggle="tab" title="Response"><span class="round-tabs two"><i class="glyphicon glyphicon-heart"></i></span></a></li>
                        <li><a href="#locations" onclick="getLocation()" data-toggle="tab" title="Locations"><span class="round-tabs three"><i class="glyphicon glyphicon-map-marker"></i></span> </a></li>
                        <li><a href="#gerichte" onclick="getFoodLocations();" data-toggle="tab" title="Gerichte"><span class="round-tabs four"><i class="glyphicon glyphicon-apple"></i></span></a></li>
                        <li><a href="#settings" onclick="getSettings();" data-toggle="tab" title="App settings"><span class="round-tabs five"><i class="glyphicon glyphicon-cog"></i></span></a></li>
                    </ul>
                </div>
                <div class="tab-content">
                    <div class="tab-pane fade in active" id="dashboard">
                        <h3 class="head text-center">Dashboard</h3>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="row">
                                    <div class="col-md-12">
                                        <h4 class="text-center">Ausgewaehlte Location</h4>
                                        <h3 style="font-size: 3em;color: dodgerblue;" class="head text-center" id="dashboardLocation">joe'y pizza</h3>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <h4 class="text-center">Uhrzeit</h4>
                                        <h3 style="font-size: 3em;color: dodgerblue;" class="head text-center">14:00</h3>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="row">
                                    <div class="col-md-12">
                                        <h4 class="text-center">Teilnehmern geantwortet</h4>
                                        <h3 style="font-size: 12em;color: dodgerblue;" class="head text-center">0<span id="dashboardAmount"></span></h3>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">

                                    </div>
                                </div>
                                <br /><br /><br />
                            </div>

                        </div>

                    </div>
                    <div class="tab-pane fade" id="response">
                        <h3 class="head text-center">Ausgewaehlte Gerichte</h3>

                        <div class="row">
                            <div class="col-md-2"></div>
                            <div class="col-md-8">
                                <ul class="list-group">
                                    <li class="list-group-item borderless">
                                        <span class="badge" style="background-color: dodgerblue;">3</span>
                                        Pizza 1
                                    </li>

                                <li class="list-group-item borderless">
                                    <span class="badge" style="background-color: dodgerblue;">2</span>
                                    Pizza 2
                                </li>

                                <li class="list-group-item borderless">
                                    <span class="badge" style="background-color: dodgerblue;">6</span>
                                    Pizza 3
                                </li>
                                </ul>
                            </div>
                            <div class="col-md-2"></div>
                        </div>

                    </div>
                    <div class="tab-pane fade" id="locations">
                        <h3 class="head text-center">Locations</h3>
                        <div class="row">
                            <div class="col-md-2"></div>
                            <div class="col-md-8">
                                <ul class="list-group" id="showLocations">

                                </ul>
                            </div>
                            <div class="col-md-2"></div>
                        </div>
                        <div class="row">
                            <div class="col-md-1"></div>
                            <div class="col-md-10">
                                <div class="input-group">
                                    <span class="input-group-addon" id="location-prefix">New location name:</span>
                                    <input type="text" class="form-control" id="newLocation" aria-describedby="location-prefix" placeholder="Type the new location name">
                                     <span class="input-group-btn"><button onclick="setLocation(document.getElementById('newLocation').value)"  class="btn btn-success" type="button">Add!</button></span>
                                </div> <br /><br /><br />
                            </div>
                            <div class="col-md-1"></div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="gerichte">
                        <h3 class="head text-center">Gerichte</h3>
                        <div class="row">
                            <div class="col-md-1"></div>
                            <div class="col-md-10">
                                <div class="form-group">
                                    <select class="form-control" id="foodLocationOptions" onchange="getFood(this.value);"></select>
                                </div>
                            </div>
                            <div class="col-md-1"></div>
                        </div>
                        <div class="row">
                            <div class="row">
                                <div class="col-md-2"></div>
                                <div class="col-md-8">
                                    <ul class="list-group" id="FoodList">

                                    </ul>
                                </div>
                                <div class="col-md-2"></div>
                            </div>
                            <div class="row" id="addfoodForm" style="display: none">
                                <div class="col-md-1"></div>
                                <div class="col-md-10">
                                    <div class="input-group">
                                        <span class="input-group-addon" id="location-prefix">Gericht hinzufügen:</span>
                                        <input type="text" class="form-control" id="newFood" placeholder="Type the new dish name" aria-describedby="location-prefix">
                                        <span class="input-group-btn"><button onclick="setFood(document.getElementById('newFood').value, document.getElementById('foodLocationOptions').value)" class="btn btn-success" type="button">Add!</button></span>
                                    </div> <br /><br /><br />
                                </div>
                                <div class="col-md-1"></div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="settings">
                        <h3 class="head text-center">App settings</h3>
                        <div class="row">
                            <div class="col-md-1"></div>
                            <div class="col-md-10">
                                <div class="form-group">
                                    <select class="form-control" id="locationOptions" onchange="setLocationOption(this.value)">

                                    </select>
                                    <br />
                                    <select class="form-control" id="MemberAmount" onchange="setMemberAmount(this.value)"></select>
                                </div>
                            </div>
                            <div class="col-md-1"></div>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                </div>

            </div>
        </div>
    </div>
</section>

<script type="text/javascript">

    var datatabaseFile = "http://essen.loc/database.json";
    var JSONdata = null;
    $.getJSON(datatabaseFile, function(data){
        //localStorage.setItem("data", JSON.stringify(data));
    });

    $(function(){
        $('a[title]').tooltip();
    });

    function setLocationOption(v){
        var data = JSON.parse(localStorage.getItem("data"));
        data.currentLocationId = v;
        localStorage.setItem("data", JSON.stringify(data));
        loadDashboard();
    }
    function setMemberAmount(v){
        var data = JSON.parse(localStorage.getItem("data"));
        data.amount = v;
        localStorage.setItem("data", JSON.stringify(data));
        loadDashboard();
    }
    function loadDashboard(){
        var data = JSON.parse(localStorage.getItem("data"));
        var location = (typeof data.Location[data.currentLocationId] !== 'undefined')?data.Location[data.currentLocationId].name:'<button onclick="getSettings();" data-toggle="tab"  class="btn btn-primary"><span class="glyphicon glyphicon-trash"></span> Set Location</button>';
        var amount = data.amount !== null?data.amount:0;

        document.getElementById('dashboardLocation').innerHTML = location;
        document.getElementById('dashboardAmount').innerHTML = '<sub>/' + amount + '</sub>';
    }

    function getLocation(){
        var data = JSON.parse(localStorage.getItem("data"));
        var HTML = '';
        $.each(data.Location, function( key, value) {
            HTML +=  '<li class="list-group-item borderless"><p>' + value.name + ' <button type="button" onclick="removeLocation('+key+')" class="btn btn-danger" style="float: right;"><span class="glyphicon glyphicon-trash"></span></button></p></li>';
        });
        document.getElementById('showLocations').innerHTML = HTML;
    }

    function setLocation(value){
        var data = JSON.parse(localStorage.getItem("data"));
        var id = 0;
        $.each(data.Location, function( key ) {
           id = parseInt(key) + 1;
        })
        data.Location[id] = new Object();
        data.Location[id].name = value;
        document.getElementById('newLocation').value = '';
        localStorage.setItem("data", JSON.stringify(data));
        getLocation();
    }

    function removeLocation(id){
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
        getLocation();
    }

    function getSettings(){
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

    }

    function getFoodLocations(){
        var data = JSON.parse(localStorage.getItem("data"));
        var HTML_Location = '<option selected disabled>First select location...</option>';
        $.each(data.Location, function( key, value) {
            HTML_Location +=  '<option value="'+key+'">' + value.name +'</option>';
        });
        document.getElementById('foodLocationOptions').innerHTML = HTML_Location;
        document.getElementById('FoodList').innerHTML = '';
        document.getElementById('addfoodForm').style.display = 'none';
    }

    function getFood(id) {
        var data = JSON.parse(localStorage.getItem("data"));
        var HTML = '';
        $.each(data.Food, function( key, value) {
            if(value.location == parseInt(id)) {
                HTML += '<li class="list-group-item borderless"><p>'+value.name+'<button onclick="removeFood('+key+', '+value.location+');" type="button" class="btn btn-danger" style="float: right;"><span class="glyphicon glyphicon-trash"></span></button></p></li>';
            }
        });
        document.getElementById('addfoodForm').style.display = 'block';
        document.getElementById('FoodList').innerHTML = HTML;
    }

    function removeFood(id, location){
        var data = JSON.parse(localStorage.getItem("data"));
        $.each(data.Food, function( key ) {
            if(id == key) {
                delete data.Food[key]
            }
        });
        localStorage.setItem("data", JSON.stringify(data));
        getFood(location);
    }

    function setFood(name, location){
        var data = JSON.parse(localStorage.getItem("data"));
        var id, sumId = 0;
        $.each(data.Food, function( key, value ) {
            if(value.location == parseInt(location)) {
                id = parseInt(key) + 1;
            }
            sumId = parseInt(key) +1;
        });
        data.Food[sumId] = new Object();
        data.Food[sumId].name = name;
        data.Food[sumId].id = id;
        data.Food[sumId].location = location;

        document.getElementById('newFood').value = '';
        localStorage.setItem("data", JSON.stringify(data));
        getFood(location);
    }
</script>
</body>
</html>

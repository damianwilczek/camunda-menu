
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
</head>
<body onload="loadDashboard();">
<section style="background:#efefe9;">
    <div class="container">
        <div class="row">
            <div class="board">
                <div class="board-inner">
                    <ul class="nav nav-tabs" id="myTab">
                        <div class="liner"></div>
                        <li class="active"><a href="#dashboard" data-toggle="tab" title="Dashboard"><span class="round-tabs one"><i class="glyphicon glyphicon-home"></i></span></a></li>
                        <li><a href="#response" data-toggle="tab" title="Response"><span class="round-tabs two"><i class="glyphicon glyphicon-heart"></i></span></a></li>
                        <li><a href="#locations" data-toggle="tab" title="Locations"><span class="round-tabs three"><i class="glyphicon glyphicon-map-marker"></i></span> </a></li>
                        <li><a href="#gerichte" data-toggle="tab" title="Gerichte"><span class="round-tabs four"><i class="glyphicon glyphicon-apple"></i></span></a></li>
                        <li><a href="#settings" data-toggle="tab" title="App settings"><span class="round-tabs five"><i class="glyphicon glyphicon-cog"></i></span></a></li>
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
                                <ul class="list-group">
                                    <li class="list-group-item borderless">
                                        <p>Joey's Pizza
                                                <button type="button" class="btn btn-danger" style="float: right;">
                                                    <span class="glyphicon glyphicon-trash"></span>
                                                </button>
                                            </p>
                                    </li>

                                    <li class="list-group-item borderless">
                                        <p>Markthalle
                                            <button type="button" class="btn btn-danger" style="float: right;">
                                                <span class="glyphicon glyphicon-trash"></span>
                                            </button>
                                        </p>
                                    </li>
                                </ul>
                            </div>
                            <div class="col-md-2"></div>
                        </div>
                        <div class="row">
                            <div class="col-md-1"></div>
                            <div class="col-md-10">
                                <div class="input-group">
                                    <span class="input-group-addon" id="location-prefix">New location name:</span>
                                    <input type="text" class="form-control" id="newLocation[]" aria-describedby="location-prefix">
                                     <span class="input-group-btn"><button class="btn btn-success" type="button">Add!</button></span>
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
                                    <select class="form-control" onchange="getFood(this.value);">
                                        <option selected disabled>First select location...</option>
                                        <option value="1">Joey's Pizza</option>
                                        <option value="2">Markthalle</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-1"></div>
                        </div>
                        <div class="row" id="foodList" style="display: none">
                            <div class="row">
                                <div class="col-md-2"></div>
                                <div class="col-md-8">
                                    <ul class="list-group">
                                        <li class="list-group-item borderless">
                                            <p>Pizza1
                                                <button type="button" class="btn btn-danger" style="float: right;">
                                                    <span class="glyphicon glyphicon-trash"></span>
                                                </button>
                                            </p>
                                        </li>

                                        <li class="list-group-item borderless">
                                            <p>Pizza2
                                                <button type="button" class="btn btn-danger" style="float: right;">
                                                    <span class="glyphicon glyphicon-trash"></span>
                                                </button>
                                            </p>
                                        </li>

                                        <li class="list-group-item borderless">
                                            <p>Pizza3
                                                <button type="button" class="btn btn-danger" style="float: right;">
                                                    <span class="glyphicon glyphicon-trash"></span>
                                                </button>
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                                <div class="col-md-2"></div>
                            </div>
                            <div class="row">
                                <div class="col-md-1"></div>
                                <div class="col-md-10">
                                    <div class="input-group">
                                        <span class="input-group-addon" id="location-prefix">Gericht hinzufügen:</span>
                                        <input type="text" class="form-control" id="newLocation[]" aria-describedby="location-prefix">
                                        <span class="input-group-btn"><button class="btn btn-success" type="button">Add!</button></span>
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
                                    <select class="form-control" onchange="setLocation(this.value)">
                                        <option selected disabled>Select location...</option>
                                        <option value="1">Joey's Pizza</option>
                                        <option value="2">Markthalle</option>
                                    </select>
                                    <br />
                                    <select class="form-control" onchange="setMemberAmount(this.value)">
                                        <option selected disabled>Anzahl der Teilnehmer...</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                    </select>
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
    $(function(){
        $('a[title]').tooltip();
    });
    function getFood(id){
        document.getElementById('foodList').style.display = 'block';
    }
    function setLocation(v){
        locations = new Array("Joey's Pizza", "Markthalle");
        localStorage.setItem("location", locations[v-1]);
        loadDashboard();
    }
    function setMemberAmount(v){
        localStorage.setItem("amount", v);
        loadDashboard();
    }
    function loadDashboard(){
        document.getElementById('dashboardLocation').innerHTML = localStorage.getItem("location");
        document.getElementById('dashboardAmount').innerHTML = '<sub>/' + localStorage.getItem("amount") + '</sub>';
    }
</script>
</body>
</html>

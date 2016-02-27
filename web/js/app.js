/**
 * Created by Damian on 26.02.2016.
 */

$(function(){
    $('a[title]').tooltip();
});
var web = {
    data: {
        "Location": {},
        "Food": {},
        "time": "00:00",
        "currentLocationId": "5",
        "amount": "10",
        "done": false,
        "selectedFood": {}
    },
    url: "https://camunda.com/givemesomefood/index.php",
    interval: 0,
    initialize: function(){
        this.bindEvents();
    },
    bindEvents: function () {
        window.onload = web.content.download;
        this.func.getId('menuDashboard').addEventListener('click', this.func.interval, false);
        this.func.getId('menuResponse').addEventListener('click', this.func.interval, false);
        this.func.getId('menuLocations').addEventListener('click', this.location.get, false);
        this.func.getId('menuDishes').addEventListener('click', this.food.getLocations, false);
        this.func.getId('menuSettings').addEventListener('click', this.settings.get, false);
        this.func.getId('removevote').addEventListener('click', this.response.remove, false);
        this.func.getId('setLocation').addEventListener('click', function () {
            web.location.set(web.func.getVal('newLocation'))
        });
        this.func.getId('addFoodButton').addEventListener('click', function () {
            web.food.set(web.func.getVal('newFoodDE'), web.func.getVal('newFoodEN'), web.func.getVal('foodLocationOptions'))
        });
        this.func.getId('backupData').addEventListener('click', this.file.save, false);
        this.func.getId('restore').addEventListener('click', this.file.open, false);
        this.func.getId('choseBackup').addEventListener('click', function () {
            web.func.getId('backupFile').click()
        });
        this.func.getId('foodLocationOptions').addEventListener('change', function () {
            web.food.get(web.func.getVal('foodLocationOptions'))
        });
        this.func.getId('newFoodDE').addEventListener('change', function () {
            web.func.copyName('newFoodDE', 'newFoodEN')
        });
        this.func.getId('newFoodEN').addEventListener('change', function () {
            web.func.copyName('newFoodEN', 'newFoodDE')
        });
        this.func.getId('locationOptions').addEventListener('change', function () {
            web.settings.setOption(web.func.getVal('locationOptions'))
        });
        this.func.getId('MemberAmount').addEventListener('change', function () {
            web.settings.setMemberAmount(web.func.getVal('MemberAmount'))
        });
        this.func.getId('backupFile').addEventListener('change', this.file.getName, false);
    },
    func: {
        getId: function (id) {
            return document.getElementById(id);
        },
        getVal: function (id) {
            return this.getId(id).value;
        },
        setVal: function (id, val) {
            this.getId(id).value = val;
        },
        copyName: function (inputID, outputID) {
            var inValue = document.getElementById(inputID).value;
            var outValue = document.getElementById(outputID).value;

            if (outValue.length == 0) {
                document.getElementById(outputID).value = inValue;
            }
        },
        loadAll: function () {
            web.dashboard.get();
            web.response.get();
        },
        interval: function () {
            clearInterval(web.interval);
            web.interval = setInterval(function () {
                web.content.download();
            }, 5000);
        }
    },
    content: {
        download: function () {
            $.ajax({
                type: "GET", url: web.url, success: function (msg) {
                    if (msg != 'error') {
                        web.data = JSON.parse(msg);
                        web.func.loadAll();
                    }
                }
            });
        },
        upload: function () {
            clearInterval(web.interval);
            var data = {action: "add", data: JSON.stringify(web.data)};
            $.ajax({
                type: "POST", url: web.url, data: data
            });
        }
    },
    location: {
        get: function () {
            var HTML = '';
            $.each(web.data.Location, function (key, value) {
                HTML += '<li class="list-group-item borderless"><p>' + value.name + ' <button type="button" onclick="web.location.remove(' + key + ')" class="btn btn-danger" style="float: right;"><span class="glyphicon glyphicon-trash"></span></button></p></li>';
            });
            web.func.getId('showLocations').innerHTML = HTML;
        },
        set: function (value) {
            var id = 0;
            $.each(web.data.Location, function (key) {
                id = parseInt(key) + 1;
            });
            web.data.Location[id] = {};
            web.data.Location[id].name = value;
            web.func.getId('newLocation').value = '';
            this.get();
            web.content.upload();
        },
        remove: function (id) {
            $.each(web.data.Location, function (key) {
                if(id == key) {
                    delete web.data.Location[key];
                }
            });
            if (web.data.currentLocationId == id) {
                this.setOption(0);
            }
            $.each(web.data.Food, function (key, value) {
                if(value.location == id) {
                    delete web.data.Food[key];
                }
            });
            this.get();
            web.content.upload();
        }
    },
    dashboard: {
        get: function () {
            var location = (typeof web.data.Location[web.data.currentLocationId] !== 'undefined') ? web.data.Location[web.data.currentLocationId].name : '<button onclick="web.settings.get();" data-toggle="tab"  class="btn btn-primary"><span class="glyphicon glyphicon-trash"></span> Set Location</button>';
            var amount = web.data.amount !== null ? web.data.amount : 0;
            web.func.getId('countCustomers').parentElement.style.color = (web.data.done == true) ? 'greenyellow' : 'dodgerblue';
            web.func.getId('time').innerHTML = web.data.time;
            web.func.getId('dashboardLocation').innerHTML = location;
            web.func.getId('dashboardAmount').innerHTML = '<sub>/' + amount + '</sub>';
        }
    },
    settings: {
        get: function () {
            $('.nav-tabs a[href="#settings"]').tab('show');
            var HTML_Location = '<option selected disabled>Select location...</option>';
            $.each(web.data.Location, function (key, value) {
                var selected = (web.data.currentLocationId == key) ? 'selected' : '';
                HTML_Location += '<option ' + selected + ' value="' + key + '">' + value.name + '</option>';
            });
            var i = 1;
            var HTML_Amount = '<option selected disabled>Anzahl der Teilnehmer...</option>';
            while (i <= 12) {
                var selected = (web.data.amount == i) ? 'selected' : '';
                HTML_Amount += '<option ' + selected + ' value="' + i + '">' + i + '</option>';
                i++;
            }

            web.func.getId('locationOptions').innerHTML = HTML_Location;
            web.func.getId('MemberAmount').innerHTML = HTML_Amount;

        },
        setOption: function (v) {
            web.data.currentLocationId = v;
            web.dashboard.get();
            web.content.upload();
        },
        setMemberAmount: function (v) {
            web.data.amount = v;
            web.dashboard.get();
            web.content.upload();
        }
    },
    food: {
        get: function (id) {
            var HTML = '';
            $.each(web.data.Food, function (key, value) {
                if (value.location == parseInt(id)) {
                    HTML += '<li class="list-group-item borderless"><p>DE: ' + value.nameDE + ' <br />EN: ' + value.nameEN + '<button onclick="web.food.remove(' + key + ', ' + value.location + ');" type="button" class="btn btn-danger" style="float: right;margin-top: -15px;"><span class="glyphicon glyphicon-trash"></span></button></p></li>';
                }
            });
            web.func.getId('addfoodForm').style.display = 'block';
            web.func.getId('FoodList').innerHTML = HTML;
        },
        set: function (nameDE, nameEN, location) {
            var id = 0, sumId = 1;

            $.each(web.data.Food, function (key, value) {
                if (value.location == parseInt(location)) {
                    id = parseInt(key) + 1;
                }
                sumId = parseInt(key) + 1;
            });

            web.data.Food[sumId] = {};
            web.data.Food[sumId].nameDE = nameDE;
            web.data.Food[sumId].nameEN = nameEN;
            web.data.Food[sumId].id = id;
            web.data.Food[sumId].location = location;

            web.func.getId('newFoodDE').value = '';
            web.func.getId('newFoodEN').value = '';
            this.get(location);
            web.content.upload();
        },
        remove: function (id, location) {
            $.each(web.data.Food, function (key) {
                if (id == key) {
                    delete web.data.Food[key]
                }
            });
            this.get(location);
            web.content.upload();
        },
        getLocations: function () {
            var HTML_Location = '<option selected disabled>First select location...</option>';
            $.each(web.data.Location, function (key, value) {
                HTML_Location += '<option value="' + key + '">' + value.name + '</option>';
            });
            web.func.getId('foodLocationOptions').innerHTML = HTML_Location;
            web.func.getId('FoodList').innerHTML = '';
            web.func.getId('addfoodForm').style.display = 'none';
        }
    },
    response: {
        get: function () {
            var HTML = '';
            var foodId = '';
            var countCustomers = 0;
            $.each(web.data.selectedFood, function (key, value) {
                foodId = value.selected.replace('foodID_', '');
                $.each(web.data.Food, function (keyt, valuet) {
                    if (valuet.id == foodId && web.data.currentLocationId == valuet.location) {
                        countCustomers++;
                        HTML += '<li class="list-group-item borderless"><span class="badge" style="background-color: dodgerblue;">3</span>' + valuet.nameDE + ' </li>';
                    }
                });
            });
            web.func.getId('removevote').style.display = (countCustomers > 0) ? 'block' : 'none';
            web.func.getId('selectedFood').innerHTML = HTML;
            web.func.getId('countCustomers').innerHTML = countCustomers;
        },
        remove: function () {
            $.each(web.data.selectedFood, function (key) {
                delete web.data.selectedFood[key];
            });
            web.data.amount = 0;
            web.data.time = '00:00';
            web.data.done = false;
            web.response.get();
            web.content.upload();
        }
    },
    file: {
        save: function () {
            var blob = new Blob([JSON.stringify(web.data, undefined, 4)], {type: 'text/json'}),
                e = document.createEvent('MouseEvents'),
                a = document.createElement('a');

            a.download = 'giveMeSomeFood_' + new Date().toJSON().slice(0, 10) + '.json';
            a.href = window.URL.createObjectURL(blob);
            a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
            e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(e);
        },
        open: function () {
            var file = web.func.getId('backupFile').files[0];
            var reader = new FileReader();
            reader.onload = (function () {
                return function (e) {
                    web.data = e.target.result;
                    web.content.upload();
                };
            })(file);

            reader.readAsText(file);
            location.reload();
        },
        getName: function () {
            web.func.setVal('backupName', web.func.getId('backupFile').files[0].name);
        }
    }
};
web.initialize();
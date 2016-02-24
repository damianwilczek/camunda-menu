/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        this.getData();
        this.getFood();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {

    },
    getData: function(){
        $.ajax({
            type: "GET", url: "https://www.system-solution.it/test.php", success: function (msg) {
                if (msg != 'error') {
                    var data = JSON.parse(msg);
                    localStorage.removeItem("data");
                    localStorage.setItem("data", JSON.stringify(data));
                }
            }
        });
    },
    saveData: function(){
        var data = JSON.parse(localStorage.getItem("data"));
        var food = localStorage.getItem("selectedFood");
        var count = 1;
        $.each(data.selectedFood, function( key ) {
            count = parseInt(key) + 1;
        });
        data.selectedFood[count] = new Object();
        data.selectedFood[count].selected = food;
        localStorage.setItem("data", JSON.stringify(data));

        app.uploadData();
    },
    uploadData: function(){
        var data = { action: "add", data: localStorage.getItem("data") };
        $.ajax({
            type: "POST", url: "https://www.system-solution.it/test.php", data: data, success: function (msg) {
                console.log(msg);
            }
        });
    },
    getFood: function() {
        localStorage.removeItem('selectedFood');
        var data = JSON.parse(localStorage.getItem("data"));
        var HTML = '';
        $.each(data.Food, function( key, value) {
            if(value.location == data.currentLocationId) {
                HTML += ' <tr onclick="app.selectFood(this.firstElementChild.lastElementChild.id)"><td class="left"><label id="foodID_'+ value.id +'"><img src="res/check-default.png" /></label></td><td class="right">' + value.name + '</td></tr>';
            }
        });
        document.getElementById('foodList').innerHTML = HTML;
    },
    selectFood: function (id) {
       if (localStorage.getItem("selectedFood") !== null) {

            var foodSelected = localStorage.getItem('selectedFood');

            if(id == foodSelected) return false;

            var oldElement = document.getElementById(foodSelected);
            oldElement.parentElement.style.backgroundColor = '';
            oldElement.lastElementChild.setAttribute('src', "res/check-default.png");
            oldElement.parentElement.parentElement.lastElementChild.style.backgroundColor = '';

       }

        var newElement = document.getElementById(id);
        var button = document.getElementById('orderFood');

        newElement.parentElement.style.backgroundColor = '#1ea184';
        newElement.lastElementChild.setAttribute('src', "res/check-active.png");
        newElement.parentElement.parentElement.lastElementChild.style.backgroundColor = '#e9f6f3';

        button.style.backgroundColor = '#1ea184';
        button.disabled = false
        button.value = id;

        $("#buttonDiv").css('top', eval($('#'+id).offset().top - 234));

        localStorage.setItem('selectedFood', id);
    },
    removeSelected: function(){
        var button = document.getElementById('orderFood');
        var oldElement = document.getElementById(button.value);

        oldElement.parentElement.style.backgroundColor = '';
        oldElement.lastElementChild.setAttribute('src', "res/check-default.png");
        oldElement.parentElement.parentElement.lastElementChild.style.backgroundColor = '';
        button.style.backgroundColor = '';
        button.disabled = true
        button.value = '';

        app.saveData();

        localStorage.removeItem('selectedFood');
        $("#buttonDiv").css('top', 0);
        $('body').animate({scrollTop: 0}, 500);

    }
};

app.initialize();
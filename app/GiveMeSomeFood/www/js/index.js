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
            type: "GET", url: "https://camunda.com/givemesomefood/index.php", success: function (msg) {
                if (msg != 'error') {
                    var data = JSON.parse(msg);
                    localStorage.removeItem("data");
                    localStorage.setItem("data", JSON.stringify(data));
                }
            }
        });
    },
    uploadData: function(){
        var data = { action: "add", data: localStorage.getItem("data") };
        $.ajax({
            type: "POST", url: "https://camunda.com/givemesomefood/index.php", data: data, success: function (msg) {
                console.log(msg);
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
    getFood: function() {
        localStorage.removeItem('selectedFood');
        var data = JSON.parse(localStorage.getItem("data"));
        var selectedLang = localStorage.getItem("lang");
        var HTML = '';var count = 0;var alt = '';var dishName = '';
        $.each(data.Food, function( key, value) {
            if(value.location == data.currentLocationId) {
                alt = (count%2)?'alt':'';
                dishName = (selectedLang == 'EN')?value.nameEN:value.nameDE;
                HTML += ' <tr class="' + alt + '" onclick="app.selectFood(this.firstElementChild.lastElementChild.id)"><td class="left"><label id="foodID_'+ value.id +'"><img src="res/check-default.png" /></label></td><td class="right">' + dishName + '</td></tr>';
                count++;
            }
        });
        var menuTitle = (selectedLang == 'EN')?'LUNCH MENU':'MITTAGSMENÜ';
        var buttonTitle = (selectedLang == 'EN')?'CONFIRM CHOICE':'AUSWAHL BUCHEN';

        document.getElementById('orderFood').innerHTML = buttonTitle;
        document.getElementById('foodList').innerHTML = HTML;
        document.getElementById('showLocation').innerHTML = menuTitle + ' - ' + data.Location[data.currentLocationId].name;
    },
    selectFood: function (id) {
        app.initialize();
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

    },
    setLanguage: function(lang){
        var selectedLang = (typeof lang === 'undefined')?'DE':lang;
        localStorage.setItem('lang', selectedLang);
        app.getFood();
    },
    setTime: function(){
            var data = JSON.parse(localStorage.getItem("data"));
            var time = document.getElementById('time').value;
            data.time = time;
            document.getElementById('currentTime').innerHTML = time;
            localStorage.setItem("data", JSON.stringify(data));
            app.uploadData();
    },
    setMemberAmount: function (v){
        var data = JSON.parse(localStorage.getItem("data"));
        data.amount = v;
        document.getElementById('currentAmount').innerHTML = v;
        document.getElementById('Allcustomers').innerHTML = v;
        localStorage.setItem("data", JSON.stringify(data));
        app.uploadData();
    },
    moveOnMax: function (field, nextFieldID) {
        if (field.value.length == 1) {
            document.getElementById(nextFieldID).focus();
        }
        app.checkPin();
    },
    checkPin: function(){
        if(document.getElementById('pin').value == '1234') {
            document.getElementById('trainerAuth').style.display = 'none';
            document.getElementById('trainerBody').style.display = 'block';
            document.getElementById('trainerFooter').style.display = 'block';

            var data = JSON.parse(localStorage.getItem("data"));

            document.getElementById('time').value = data.time;
            document.getElementById('currentTime').innerHTML = data.time;

            i = 1;
            HTML_Amount = '<option selected disabled>Anzahl der Teilnehmer...</option>';
            while (i <= 12) {
                var selected = (data.amount == i)?'selected':'';
                HTML_Amount +=  '<option '+selected+' value="'+i+'">'+i+'</option>';
                i++;
            }
            document.getElementById('MemberAmount').innerHTML = HTML_Amount;

            document.getElementById('currentAmount').innerHTML = data.amount;
            document.getElementById('Allcustomers').innerHTML = data.amount;

            var customers = 0;
            $.each(data.selectedFood, function( key, value) {
                customers++;
            });
            document.getElementById('amount').innerHTML = customers;
        }
    },
    closeTrainerSettings: function() {
        document.getElementById('trainerAuth').style.display = 'block';
        document.getElementById('trainerBody').style.display = 'none';
        document.getElementById('trainerFooter').style.display = 'none';
        document.getElementById('pin').value = '';
    },
    applyOrder: function(){
        var data = JSON.parse(localStorage.getItem("data"));
        data.done = true;
        localStorage.setItem("data", JSON.stringify(data));
        app.uploadData();
    }
};

app.initialize();
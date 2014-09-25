"use strict";angular.module("tojoApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","angular-sortable-view"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("tojoApp").controller("MainCtrl",["$scope","todos",function(a,b){a.todos=b,b.onInitialized=function(){a.$apply()},a.update=function(b,c){13!==b.keyCode||b.shiftKey?8!==b.keyCode||c.content?c.set("content",c.content):(b.preventDefault(),c.deleteRecord(),a.todos.syncDown()):b.preventDefault()},a.newTodo={content:""},a.addNewTodo=function(c){13!==c.keyCode||c.shiftKey||(c.preventDefault(),b.insert(a.newTodo),a.newTodo={content:""})},a.output=function(){b.snapshot().forEach(function(a){console.log(a.get("content"))})}}]),angular.module("tojoApp").controller("AboutCtrl",["$scope",function(a){a.todos=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("tojoApp").directive("contenteditable",["$sce",function(a){return{restrict:"A",require:"?ngModel",scope:{model:"=ngModel"},link:function(b,c,d,e){e&&(b.$watch("model",function(){b.$eval(d.ngModel+" = model")}),b.$watch(d.ngModel,function(a){b.model=a}),c.bind("blur keyup change",function(){b.$apply(function(){var a=c.html();d.stripBr&&"<br>"===a&&(a=""),e.$setViewValue(a)})}),e.$render=function(){c.html(a.getTrustedHtml(e.$viewValue||""))})}}}]),angular.module("tojoApp").service("todos",function(){if(this.onInitialized=null,this._snapshot=[{content:"Do thing 1"},{content:"Do thing 2"},{content:"http://vitalets.github.io/angular-xeditable/"}],this.snapshot=function(){return this._snapshot},this.data=null,this.backlog=[],this.insert=function(a){this.data?(this.data.insert(a),this.syncDown()):this.backlog.push(a)},this.syncDown=function(){this.data&&(this._snapshot=this.data.query().map(function(a){return $.extend(a,{raw:a._rawFieldValues(),content:a._rawFieldValues().content})}))},this.syncUp=function(){if(this.data){for(var a=0;a<this.backlog.length;++a)this.data.insert(this.backlog[a]);this.backlog=[]}},this.dropbox=new Dropbox.Client({key:"dg7kh1gl7wv9gj2",secret:"hp1rh6n8ia9fabr",token:"05PF-9qnGb8AAAAAAAAABEI3DKas5jHeRJcOMxH_U-I4a-JLcDkTS-ww3tTiEkWu"}),this.dropbox.isAuthenticated()){var a=this.dropbox.getDatastoreManager();a.openDefaultDatastore(angular.bind(this,function(a,b){a&&console.log("Error opening the datastore: "+a),this.data=b.getTable("todos"),console.log("connected"),this.syncUp(),this.syncDown(),this.onInitialized&&this.onInitialized()}))}});
!function(){"use strict";function s(s,e,a,n,r,o){r("baseController",{$scope:s});var t=this;t.classId=n.id,t.nursery={},t["class"]={},t.isNew=0==t.classId,t.isBusy=!0,e.get("/Api/Nursery/"+s.outerId).then(function(s){if(angular.copy(s.data,t.nursery),!t.isNew)for(var e=0,a=t.nursery.classes.length;a>e;e++)t.nursery.classes[e].id==t.classId&&angular.copy(t.nursery.classes[e],t["class"])},function(){toastr.error("Nepodarilo sa načítať informácie o triede")})["finally"](function(){t.isBusy=!1}),t.saveClass=function(s){s&&(t.isBusy=!0,t.isNew?e.post("/Api/Class/"+t.nursery.id,t["class"]).then(function(s){toastr.success("Trieda "+t["class"].name+" bola úspešne vytvorená"),a.path("#/")},function(){toastr.error("Triedu sa nepodarilo vytvoriť")})["finally"](function(){t.isBusy=!1}):e.put("/Api/Class/"+t.nursery.id,t["class"]).then(function(s){toastr.success("Zmeny v triede "+t["class"].name+" boli úspešne uložené"),a.path("#/")},function(){toastr.error("Triedu sa nepodarilo uložiť")})["finally"](function(){t.isBusy=!1}))},t.deleteClassModal=function(){s.deleteModalTarget="triedu "+t["class"].name;var e=o.open({templateUrl:"/app/Common/deleteModal.html",controller:"deleteModalController",scope:s});e.result.then(function(){t.deleteClass()})},t.deleteClass=function(){t.isBusy=!0;var a=t["class"].name;e["delete"]("/Api/Class/"+t["class"].id).then(function(){toastr.success("Trieda "+a+" bola vymazaná"),s.back()},function(s){toastr.error("Triedu sa nepodarilo vymazať")})["finally"](function(){t.isBusy=!1})}}s.$inject=["$scope","$http","$location","$routeParams","$controller","$uibModal"],angular.module("nursery-app").controller("classEditController",s)}();
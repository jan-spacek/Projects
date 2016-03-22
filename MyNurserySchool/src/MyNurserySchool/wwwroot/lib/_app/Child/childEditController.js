!function(){"use strict";function e(e,i,a,l,s){l("baseController",{$scope:e});var t=this;t.childId=a.id,t.child={},t.classId=0,t.isNew=0==t.childId,e.attendance=[{id:0,name:"Žiadateľ"},{id:1,name:"Dochádzajúci"},{id:2,name:"Odstúpený"}],t.classes=[],i.get("/Api/Nursery/"+e.outerId).then(function(i){for(var a=0;a<i.data.classes.length;a++)t.classes.push({id:i.data.classes[a].id,name:i.data.classes[a].name});e.classes=t.classes},function(){toastr.error("Nepodarilo sa načítať informácie o škôlke")})["finally"](function(){t.isBusy=!1}),t.isNew||(t.isBusy=!0,i.get("/Api/Child/"+t.childId).then(function(e){angular.copy(e.data,t.child),t.classId=t.child.classId},function(){toastr.error("Nepodarilo sa načítať informácie o dieťati")})["finally"](function(){t.isBusy=!1})),t.saveChild=function(a){a&&(t.isBusy=!0,t.child.nurseryId=e.outerId,t.isNew?i.post("/Api/Child/",t.child).then(function(i){toastr.success("Dieťa "+t.child.firstName+" "+t.child.lastName+" bolo úspešne vytvorené"),e.back()},function(){toastr.error("Dieťa sa nepodarilo vytvoriť")})["finally"](function(){t.isBusy=!1}):(null==t.child.classId&&(t.child.classId=t.classId),i.put("/Api/Child/",t.child).then(function(i){toastr.success("Zmeny v dieťati "+t.child.firstName+" "+t.child.lastName+" boli úspešne uložené"),e.back()},function(){toastr.error("Dieťa sa nepodarilo uložiť")})["finally"](function(){t.isBusy=!1})))},t.deleteChildModal=function(){e.deleteModalTarget="dieťa "+t.child.firstName+" "+t.child.lastName;var i=s.open({templateUrl:"/app/Common/deleteModal.html",controller:"deleteModalController",scope:e});i.result.then(function(){t.deleteChild()})},t.deleteChild=function(){t.isBusy=!0,i["delete"]("/Api/Child/"+t.child.id).then(function(){toastr.success("Dieťa bolo vymazané"),e.back()},function(e){toastr.error("Dieťa sa nepodarilo vymazať")})["finally"](function(){t.isBusy=!1})}}e.$inject=["$scope","$http","$routeParams","$controller","$uibModal"],angular.module("nursery-app").controller("childEditController",e)}();
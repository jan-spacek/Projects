!function(e){"use strict";e.module("app.controls",[])}(angular),function(e){"use strict";e.module("app.nurseries",["app.controls","ngRoute","ui.bootstrap"]).config(["$routeProvider",function(e){e.when("/",{controller:"NurseriesListController",controllerAs:"vm",templateUrl:"/app/Nurseries/nurseries-list.view.html"}),e.when("/edit/:id",{controller:"NurseryEditController",controllerAs:"vm",templateUrl:"/app/Nurseries/nursery-edit.view.html"}),e.when("/users",{controller:"UsersListController",controllerAs:"vm",templateUrl:"/app/Nurseries/users-list.view.html"}),e.otherwise({redirectTo:"/"})}])}(angular),function(e){"use strict";e.module("app.nursery",["app.controls","ngRoute","mgcrea.ngStrap","ui.bootstrap"]).config(["$routeProvider",function(e){e.when("/",{controller:"NurseryDetailController",controllerAs:"vm",templateUrl:"/app/Nursery/nursery-detail.view.html"}),e.when("/edit",{controller:"NurseryEditController",controllerAs:"vm",templateUrl:"/app/Nursery/nursery-edit.view.html"}),e.when("/class/:id/edit",{controller:"ClassEditController",controllerAs:"vm",templateUrl:"/app/Class/class-edit.view.html"}),e.when("/class/:id",{controller:"ClassDetailController",controllerAs:"vm",templateUrl:"/app/Class/class-detail.view.html"}),e.when("/employee/:id/edit",{controller:"EmployeeEditController",controllerAs:"vm",templateUrl:"/app/Employee/employee-edit.view.html"}),e.when("/employee/:id",{controller:"EmployeeDetailController",controllerAs:"vm",templateUrl:"/app/Employee/employee-detail.view.html"}),e.when("/child/:id/edit",{controller:"ChildEditController",controllerAs:"vm",templateUrl:"/app/Child/child-edit.view.html"}),e.when("/child/:id",{controller:"ChildDetailController",controllerAs:"vm",templateUrl:"/app/Child/child-detail.view.html"}),e.when("/employees",{controller:"EmployeesListController",controllerAs:"vm",templateUrl:"/app/Lists/employees-list.view.html"}),e.when("/children",{controller:"ChildrenListController",controllerAs:"vm",templateUrl:"/app/Lists/children-list-all.view.html"}),e.when("/children/waiting",{controller:"ChildrenListController",controllerAs:"vm",templateUrl:"/app/Lists/children-list-waiting.view.html"}),e.when("/children/archive",{controller:"ChildrenListController",controllerAs:"vm",templateUrl:"/app/Lists/children-list-archived.view.html"}),e.otherwise({redirectTo:"/"})}])}(angular),function(e){"use strict";function t(t,n,o,r,l,s){function i(){n.get("/Api/Class/"+a.child.classId).then(function(e){a.classTitle=e.data.name},function(){toastr.error("Nepodarilo sa načítať informácie o škôlke")})["finally"](function(){a.isBusy=!1})}s("BaseController",{$scope:t});var a=this;a.childId=r.id,a.child={},a.newNote={},a.attendanceStates=["Žiadateľ","Docházdajúci","Odstúpený"],a.isBusy=!0,n.get("/Api/Child/"+a.childId).then(function(t){e.copy(t.data,a.child),a.classId=a.child.classId,a.child.description=a.child.description?l.trustAsHtml(a.child.description.replace(/(\r\n|\n|\r)/gm,"<br />")):null,a.child.contacts=a.child.contacts?l.trustAsHtml(a.child.contacts.replace(/(\r\n|\n|\r)/gm,"<br />")):null,i();for(var n=0;n<a.child.notes.length;n++)null!=a.child.notes[n].text&&(a.child.notes[n].text=l.trustAsHtml(a.child.notes[n].text.replace(/(\r\n|\n|\r)/gm,"<br />")))},function(){toastr.error("Nepodarilo sa načítať informácie o dieťati")})["finally"](function(){a.isBusy=!1}),a.deleteChild=function(){a.isBusy=!0,n["delete"]("/Api/Child/"+a.child.id).then(function(){toastr.success("Dieťa bolo vymazané"),o.path("#/class/"+a.classId)},function(e){toastr.error("Dieťa sa nepodarilo vymazať")})["finally"](function(){a.isBusy=!1})},a.saveNote=function(){a.isBusy=!0,a.newNote.childId=a.childId,n.post("/Api/Note/",a.newNote).then(function(e){a.child.notes.push(e.data),a.child.notes[a.child.notes.length-1].text=l.trustAsHtml(a.child.notes[a.child.notes.length-1].text.replace(/(\r\n|\n|\r)/gm,"<br />")),toastr.success("Poznámka bola zapísaná"),a.newNote={}},function(e){toastr.error("Poznámku sa nepodarilo zapísať")})["finally"](function(){a.isBusy=!1})},a.deleteNote=function(e){a.isBusy=!0,n["delete"]("/Api/Note/"+e).then(function(){for(var t=0;t<a.child.notes.length;t++){var n=a.child.notes[t];n.id==e&&a.child.notes.splice(t,1)}toastr.success("Poznámka bola vymazaná")},function(e){toastr.error("Poznámku sa nepodarilo vymazať")})["finally"](function(){a.isBusy=!1})}}t.$inject=["$scope","$http","$location","$routeParams","$sce","$controller"],e.module("app.nursery").controller("ChildDetailController",t)}(angular),function(e){"use strict";function t(t,n,o,r,l){r("BaseController",{$scope:t});var s=this;s.childId=o.id,s.child={},s.classId=0,s.isNew=0==s.childId,t.attendance=[{id:0,name:"Žiadateľ"},{id:1,name:"Dochádzajúci"},{id:2,name:"Odstúpený"}],s.classes=[],n.get("/Api/Nursery/"+t.outerId).then(function(e){for(var n=0;n<e.data.classes.length;n++)s.classes.push({id:e.data.classes[n].id,name:e.data.classes[n].name});t.classes=s.classes},function(){toastr.error("Nepodarilo sa načítať informácie o škôlke")})["finally"](function(){s.isBusy=!1}),s.isNew||(s.isBusy=!0,n.get("/Api/Child/"+s.childId).then(function(t){e.copy(t.data,s.child),s.classId=s.child.classId},function(){toastr.error("Nepodarilo sa načítať informácie o dieťati")})["finally"](function(){s.isBusy=!1})),s.saveChild=function(e){e&&(s.isBusy=!0,s.child.nurseryId=t.outerId,s.isNew?n.post("/Api/Child/",s.child).then(function(e){toastr.success("Dieťa "+s.child.firstName+" "+s.child.lastName+" bolo úspešne vytvorené"),t.back()},function(){toastr.error("Dieťa sa nepodarilo vytvoriť")})["finally"](function(){s.isBusy=!1}):(null==s.child.classId&&(s.child.classId=s.classId),n.put("/Api/Child/",s.child).then(function(e){toastr.success("Zmeny v dieťati "+s.child.firstName+" "+s.child.lastName+" boli úspešne uložené"),t.back()},function(){toastr.error("Dieťa sa nepodarilo uložiť")})["finally"](function(){s.isBusy=!1})))},s.deleteChildModal=function(){t.deleteModalTarget="dieťa "+s.child.firstName+" "+s.child.lastName;var e=l.open({templateUrl:"/app/common/templates/delete-modal.template.html",controller:"DeleteModalController",scope:t});e.result.then(function(){s.deleteChild()})},s.deleteChild=function(){s.isBusy=!0,n["delete"]("/Api/Child/"+s.child.id).then(function(){toastr.success("Dieťa bolo vymazané"),t.back()},function(e){toastr.error("Dieťa sa nepodarilo vymazať")})["finally"](function(){s.isBusy=!1})}}t.$inject=["$scope","$http","$routeParams","$controller","$uibModal"],e.module("app.nursery").controller("ChildEditController",t)}(angular),function(e){"use strict";function t(t,n,o,r,l,s){s("BaseController",{$scope:t});var i=this;i.classId=o.id,i["class"]={},i.children=[],i.isBusy=!0,n.get("/Api/Class/"+i.classId).then(function(t){e.copy(t.data,i["class"]);for(var n=0;n<i["class"].children.length;n++)i["class"].children[n].fullName=i["class"].children[n].firstName+" "+i["class"].children[n].lastName,i["class"].children[n].contacts&&(i["class"].children[n].contacts=r.trustAsHtml(i["class"].children[n].contacts.replace(/(\r\n|\n|\r)/gm,"<br />"))),i["class"].children[n].description&&(i["class"].children[n].description=r.trustAsHtml(i["class"].children[n].description.replace(/(\r\n|\n|\r)/gm,"<br />"))),1==i["class"].children[n].attendance&&i.children.push(i["class"].children[n])},function(e){toastr.error("Nepodarilo sa načítať dáta: "+e)})["finally"](function(){i.isBusy=!1})}t.$inject=["$scope","$http","$routeParams","$sce","$window","$controller"],e.module("app.nursery").controller("ClassDetailController",t)}(angular),function(){"use strict";function e(e,t,n,o,r,l){r("BaseController",{$scope:e});var s=this;s.classId=o.id,s.nursery={},s["class"]={},s.isNew=0==s.classId,s.isBusy=!0,t.get("/Api/Nursery/"+e.outerId).then(function(e){if(angular.copy(e.data,s.nursery),!s.isNew)for(var t=0,n=s.nursery.classes.length;n>t;t++)s.nursery.classes[t].id==s.classId&&angular.copy(s.nursery.classes[t],s["class"])},function(){toastr.error("Nepodarilo sa načítať informácie o triede")})["finally"](function(){s.isBusy=!1}),s.saveClass=function(e){e&&(s.isBusy=!0,s.isNew?t.post("/Api/Class/"+s.nursery.id,s["class"]).then(function(e){toastr.success("Trieda "+s["class"].name+" bola úspešne vytvorená"),n.path("#/")},function(){toastr.error("Triedu sa nepodarilo vytvoriť")})["finally"](function(){s.isBusy=!1}):t.put("/Api/Class/"+s.nursery.id,s["class"]).then(function(e){toastr.success("Zmeny v triede "+s["class"].name+" boli úspešne uložené"),n.path("#/")},function(){toastr.error("Triedu sa nepodarilo uložiť")})["finally"](function(){s.isBusy=!1}))},s.deleteClassModal=function(){e.deleteModalTarget="triedu "+s["class"].name;var t=l.open({templateUrl:"/app/common/templates/delete-modal.template.html",controller:"DeleteModalController",scope:e});t.result.then(function(){s.deleteClass()})},s.deleteClass=function(){s.isBusy=!0;var n=s["class"].name;t["delete"]("/Api/Class/"+s["class"].id).then(function(){toastr.success("Trieda "+n+" bola vymazaná"),e.back()},function(e){toastr.error("Triedu sa nepodarilo vymazať")})["finally"](function(){s.isBusy=!1})}}e.$inject=["$scope","$http","$location","$routeParams","$controller","$uibModal"],angular.module("app.nursery").controller("ClassEditController",e)}(),function(e){"use strict";function t(t,n,o,r,l,s){s("BaseController",{$scope:t});var i=this;i.employeeId=r.id,i.employee={},i.newNote={},i.attendanceStates=["Žiadateľ","Pracujúci","Odstúpený"],i.isBusy=!0,n.get("/Api/Employee/"+i.employeeId).then(function(t){e.copy(t.data,i.employee),i.employee.description=i.employee.description?l.trustAsHtml(i.employee.description.replace(/(\r\n|\n|\r)/gm,"<br />")):null;for(var n=0;n<i.employee.notes.length;n++)null!=i.employee.notes[n].text&&(i.employee.notes[n].text=l.trustAsHtml(i.employee.notes[n].text.replace(/(\r\n|\n|\r)/gm,"<br />")))},function(){toastr.error("Nepodarilo sa načítať informácie o zamestnancovi")})["finally"](function(){i.isBusy=!1}),i.deleteEmployee=function(){i.isBusy=!0,n["delete"]("/Api/Employee/"+i.employee.id).then(function(){toastr.success("Zamestnanec bol vymazaný"),o.path("#/")},function(e){toastr.error("Zamestnanca sa nepodarilo vymazať")})["finally"](function(){i.isBusy=!1})},i.saveNote=function(){i.isBusy=!0,i.newNote.employeeId=i.employeeId,n.post("/Api/Note/",i.newNote).then(function(e){i.employee.notes.push(e.data),i.employee.notes[i.employee.notes.length-1].text=l.trustAsHtml(i.employee.notes[i.employee.notes.length-1].text.replace(/(\r\n|\n|\r)/gm,"<br />")),toastr.success("Poznámka bola zapísaná"),i.newNote={}},function(e){toastr.error("Poznámku sa nepodarilo zapísať")})["finally"](function(){i.isBusy=!1})},i.deleteNote=function(e){i.isBusy=!0,n["delete"]("/Api/Note/"+e).then(function(){for(var t=0;t<i.employee.notes.length;t++){var n=i.employee.notes[t];n.id==e&&i.employee.notes.splice(t,1)}toastr.success("Poznámka bola vymazaná")},function(e){toastr.error("Poznámku sa nepodarilo vymazať")})["finally"](function(){i.isBusy=!1})}}t.$inject=["$scope","$http","$location","$routeParams","$sce","$controller"],e.module("app.nursery").controller("EmployeeDetailController",t)}(angular),function(e){"use strict";function t(t,n,o,r,l){r("BaseController",{$scope:t});var s=this;s.employeeId=o.id,s.employee={},s.isNew=0==s.employeeId,t.attendance=[{id:0,name:"Žiadateľ"},{id:1,name:"Pracujúci"},{id:2,name:"Odstúpený"}],t.employmentTypes=[{value:"Dohoda"},{value:"Plný úväzok"},{value:"Študentská dohoda"},{value:"Skrátený úväzok"},{value:"Živnosť"}],s.isNew||(s.isBusy=!0,n.get("/Api/Employee/"+s.employeeId).then(function(t){e.copy(t.data,s.employee)},function(){toastr.error("Nepodarilo sa načítať informácie o zamestnancovi")})["finally"](function(){s.isBusy=!1})),s.saveEmployee=function(e){e&&(s.isBusy=!0,s.isNew?n.post("/Api/Employee/"+t.outerId,s.employee).then(function(e){toastr.success("Zamestnanec "+s.employee.fullName+" bol úspešne vytvorený"),t.back()},function(){toastr.error("Zamestnanca sa nepodarilo vytvoriť")})["finally"](function(){s.isBusy=!1}):n.put("/Api/Employee/"+t.outerId,s.employee).then(function(e){toastr.success("Zmeny v zamestnancovi "+s.employee.fullName+" boli úspešne uložené"),t.back()},function(){toastr.error("Zamestnanca sa nepodarilo uložiť")})["finally"](function(){s.isBusy=!1}))},s.deleteEmployeeModal=function(){t.deleteModalTarget="zamestnanca "+s.employee.fullName;var e=l.open({templateUrl:"/app/common/templates/delete-modal.template.html",controller:"DeleteModalController",scope:t});e.result.then(function(){s.deleteEmployee()})},s.deleteEmployee=function(){s.isBusy=!0,n["delete"]("/Api/Employee/"+s.employee.id).then(function(){toastr.success("Zamestnanec bol vymazaný"),t.back()},function(e){toastr.error("Zamestnanca sa nepodarilo vymazať")})["finally"](function(){s.isBusy=!1})}}t.$inject=["$scope","$http","$routeParams","$controller","$uibModal"],e.module("app.nursery").controller("EmployeeEditController",t)}(angular),function(e){"use strict";function t(t,n,o,r,l){l("BaseController",{$scope:t});var s=this;s.children=[],s.attendantChildren=[],s.waitingChildren=[],s.archivedChildren=[],s.classes=[],s.isBusy=!0,t.sortType="birthDate",n.get("/Api/Nursery/"+t.outerId).then(function(e){for(var t=0;t<e.data.classes.length;t++)s.classes[e.data.classes[t].id]=e.data.classes[t].name},function(e){toastr.error("Nepodarilo sa načítať zoznam detí")})["finally"](function(){s.isBusy=!1}),n.get("/Api/Nursery/"+t.outerId+"/children").then(function(t){e.copy(t.data,s.children);for(var n=0;n<s.children.length;n++)s.children[n].fullName=s.children[n].firstName+" "+s.children[n].lastName,s.children[n].className=s.classes[s.children[n].classId],s.children[n].contacts&&(s.children[n].contacts=o.trustAsHtml(s.children[n].contacts.replace(/(\r\n|\n|\r)/gm,"<br />"))),s.children[n].description&&(s.children[n].description=o.trustAsHtml(s.children[n].description.replace(/(\r\n|\n|\r)/gm,"<br />"))),0==s.children[n].attendance?s.waitingChildren.push(s.children[n]):1==s.children[n].attendance?s.attendantChildren.push(s.children[n]):2==s.children[n].attendance&&s.archivedChildren.push(s.children[n])},function(e){toastr.error("Nepodarilo sa načítať zoznam detí")})["finally"](function(){s.isBusy=!1})}t.$inject=["$scope","$http","$sce","$window","$controller"],e.module("app.nursery").controller("ChildrenListController",t)}(angular),function(e){"use strict";function t(t,n,o,r){r("BaseController",{$scope:t});var l=this;l.employees=[],l.isBusy=!0,t.attendance=[{id:0,name:"Žiadateľ"},{id:1,name:"Pracujúci"},{id:2,name:"Odstúpený"}],n.get("/Api/Nursery/"+t.outerId+"/employees").then(function(t){e.copy(t.data,l.employees)},function(e){toastr.error("Nepodarilo sa načítať zoznam zamestnancov")})["finally"](function(){l.isBusy=!1})}t.$inject=["$scope","$http","$window","$controller"],e.module("app.nursery").controller("EmployeesListController",t)}(angular),function(e){"use strict";function t(t,n,o){var r=this;r.nurseries=[],r.isBusy=!0,t.get("/Api/Nurseries").then(function(t){e.copy(t.data,r.nurseries)},function(e){toastr.error("Nepodarilo sa načítať dáta: "+e)})["finally"](function(){r.isBusy=!1}),n.redirect=function(e){o.location.href=e}}t.$inject=["$http","$scope","$window"],e.module("app.nurseries").controller("NurseriesListController",t)}(angular),function(e){"use strict";function t(t,n,o,r,l){var s=this;s.id=t.id,s.nursery={},s.isNew=0==s.id,s.isNew||(s.isBusy=!0,n.get("/Api/Nursery/"+s.id).then(function(t){e.copy(t.data,s.nursery)},function(){toastr.error("Nepodarilo sa načítať informácie o škôlke")})["finally"](function(){s.isBusy=!1})),s.saveNursery=function(){s.isBusy=!0,s.isNew?n.post("/Api/Nursery",s.nursery).then(function(e){toastr.success("Bola vytvorená nová škôlka "+s.nursery.name),o.path("#/")},function(){toastr.error("Škôlku sa nepodarilo uložiť")})["finally"](function(){s.isBusy=!1}):n.put("/Api/Nursery/",s.nursery).then(function(e){toastr.success("Zmeny v škôlke "+s.nursery.name+" boli úspešne uložené"),o.path("#/")},function(){toastr.error("Škôlku sa nepodarilo uložiť")})["finally"](function(){s.isBusy=!1})},s.deleteNurseryModal=function(){l.deleteModalTarget="škôlku "+s.nursery.name;var e=r.open({templateUrl:"/app/common/templates/delete-modal.template.html",controller:"DeleteModalController",scope:l});e.result.then(function(){s.deleteNursery()})},s.deleteNursery=function(){s.isBusy=!0;var e=s.nursery.name;n["delete"]("/Api/Nursery/"+s.nursery.id).then(function(){toastr.success("Škôlka "+e+" bola vymazaná"),o.path("#/")},function(t){toastr.error("Škôlku "+e+" sa nepodarilo vymazať")})["finally"](function(){s.isBusy=!1})}}t.$inject=["$routeParams","$http","$location","$uibModal","$scope"],e.module("app.nurseries").controller("NurseryEditController",t)}(angular),function(e){"use strict";function t(e,t){e.ok=function(){t.close()},e.cancel=function(){t.dismiss("cancel")}}t.$inject=["$scope","$uibModalInstance"],e.module("app.nurseries").controller("UserEditModalController",t)}(angular),function(e){"use strict";function t(t,n,o,r){var l=this;l.users=[],l.roles=[],l.nurseries=[],l.isBusy=!0,t.get("/Api/Users").then(function(t){e.copy(t.data,l.users),l.getRoles()},function(e){toastr.error("Nepodarilo sa načítať dáta: "+e)})["finally"](function(){l.isBusy=!1}),l.getRoles=function(){t.get("/Api/Roles").then(function(t){e.copy(t.data,l.roles),l.getNurseries()},function(e){toastr.error("Nepodarilo sa načítať dáta: "+e)})["finally"](function(){l.isBusy=!1})},l.getNurseries=function(){t.get("/Api/Nurseries").then(function(t){e.copy(t.data,l.nurseries),l.joinData()},function(e){toastr.error("Nepodarilo sa načítať dáta: "+e)})["finally"](function(){l.isBusy=!1})},l.joinData=function(){_.each(l.users,function(e){e.nurseries=[],_.each(e.claims,function(t){if("Nursery"===t.claimType){var n=_.find(l.nurseries,function(e){return e.id===parseInt(t.claimValue)});e.nurseries.push({id:parseInt(t.claimValue),name:n.name})}}),e.userRoles=[],_.each(e.roles,function(t){var n=_.find(l.roles,function(e){return e.id==t.roleId});e.userRoles.push({id:n.id,name:n.name})})})},l.editModal=function(e){n.actualUser=e,n.roles=l.roles,n.nurseries=[],_.each(l.nurseries,function(e){n.nurseries.push({id:e.id,name:e.name})});var t=r.open({templateUrl:"/app/nurseries/user-edit-modal.template.html",controller:"UserEditModalController",scope:n});t.result.then(function(){})},l.generateModal=function(e){},l.deleteModal=function(e){n.deleteModalTarget="používateľa "+e.userName;var t=r.open({templateUrl:"/app/common/templates/delete-modal.template.html",controller:"DeleteModalController",scope:n});t.result.then(function(){})},n.redirect=function(e){o.location.href=e}}t.$inject=["$http","$scope","$window","$uibModal"],e.module("app.nurseries").controller("UsersListController",t)}(angular),function(e){"use strict";function t(t,n,o,r,l,s){function i(e){o.get("/Api/Class/"+a.nursery.classes[e].id).then(function(t){for(var n=0;n<t.data.children.length;n++)1==t.data.children[n].attendance&&a.nursery.classes[e].children.push(t.data.children[n])},function(){toastr.error("Nepodarilo sa načítať informácie o triede")})}s("BaseController",{$scope:t});var a=this;a.nursery={},a.isBusy=!0,t.sortType="title",t.sortReverse=!0,o.get("/Api/Nursery/"+t.outerId).then(function(t){if(e.copy(t.data,a.nursery),a.nursery.classes.length>0){a.isBusy=!0;for(var n=0;n<a.nursery.classes.length;n++)i(n)}},function(){toastr.error("Nepodarilo sa načítať informácie o škôlke")})["finally"](function(){a.isBusy=!1})}t.$inject=["$scope","$routeParams","$http","$location","$window","$controller"],e.module("app.nursery").controller("NurseryDetailController",t)}(angular),function(e){"use strict";function t(t,n,o,r){r("BaseController",{$scope:t});var l=this;l.nursery={},l.isBusy=!0,n.get("/Api/Nursery/"+t.outerId).then(function(t){e.copy(t.data,l.nursery)},function(){toastr.error("Nepodarilo sa načítať informácie o škôlke")})["finally"](function(){l.isBusy=!1}),l.saveNursery=function(e){e&&(l.isBusy=!0,n.put("/Api/Nursery/",l.nursery).then(function(e){toastr.success("Zmeny v škôlke "+l.nursery.name+" boli úspešne uložené"),o.path("#/")},function(){toastr.error("Škôlku sa nepodarilo uložiť")})["finally"](function(){l.isBusy=!1}))}}t.$inject=["$scope","$http","$location","$controller"],e.module("app.nursery").controller("NurseryEditController",t)}(angular),function(e){"use strict";function t(e,t){e.redirect=function(e){t.location.href=e},e.back=function(){t.history.back()},e.back2=function(){t.history.go(-2)},e.exportAction=function(t){switch(t){case"excel":e.$broadcast("export-excel",{});break;case"doc":e.$broadcast("export-doc",{});break;default:console.log("no event caught")}}}t.$inject=["$scope","$window"],e.module("app.controls").controller("BaseController",t)}(angular),function(e){"use strict";function t(e,t){e.ok=function(){t.close()},e.cancel=function(){t.dismiss("cancel")}}t.$inject=["$scope","$uibModalInstance"],e.module("app.controls").controller("DeleteModalController",t)}(angular),function(e){"use strict";function t(e){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"/app/common/templates/back-button.template.html"}}t.$inject=["$window"],e.module("app.controls").directive("backButton",t)}(angular),function(e){"use strict";function t(){return{restrict:"E",transclude:!0,replace:!0,template:'<div id="backtop"><a title="Späť na začiatok"><i class="fa fa-2x fa-chevron-up"></a></div>',link:function(e,t){e.speed=600,e.currentYPosition=function(){return this.pageYOffset?this.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e.smoothScroll=function(){var t=e.currentYPosition(),n=0,o=n>t?n-t:t-n;if(100>o)return void scrollTo(0,n);var r=Math.round(e.speed/100),l=Math.round(o/25),s=n>t?t+l:t-l,i=0;if(n>t)for(var a=t;n>a;a+=l)setTimeout("window.scrollTo(0, "+s+")",i*r),s+=l,s>n&&(s=n),i++;else for(var c=t;c>n;c-=l)setTimeout("window.scrollTo(0, "+s+")",i*r),s-=l,n>s&&(s=n),i++},e.button=t.find("a"),e.button.on("click",function(){e.smoothScroll(),t.removeClass("show")}),window.addEventListener("scroll",function(){window.pageYOffset>0?t.addClass("show"):t.removeClass("show")})}}}e.module("app.controls").directive("backToTop",t)}(angular),function(e){"use strict";function t(e){return{restrict:"A",require:"ngModel",link:function(t,n,o,r){var l=function(e){void 0===e&&(e="");var t=e.replace(/[^-'\s]+/g,function(e){return e.charAt(0).toUpperCase()+e.substring(1)});return t!==e&&(r.$setViewValue(t),r.$render()),t};r.$parsers.push(l),l(e(o.ngModel)(t))}}}t.$inject=["$parse"],e.module("app.controls").directive("capitalizeAllFirst",t)}(angular),function(e){"use strict";function t(e){return{restrict:"A",require:"ngModel",link:function(t,n,o,r){var l=function(e){void 0===e&&(e="");var t=e.charAt(0).toUpperCase()+e.substring(1);return t!==e&&(r.$setViewValue(t),r.$render()),t};r.$parsers.push(l),l(e(o.ngModel)(t))}}}t.$inject=["$parse"],e.module("app.controls").directive("capitalizeFirst",t)}(angular),function(e){"use strict";function t(){return{restrict:"E",scope:{model:"="},templateUrl:"/app/common/templates/created-modified.template.html"}}e.module("app.controls").directive("createdModified",t)}(angular),function(e){"use strict";function t(t,n,o,r){return{restrict:"AE",scope:{selectedModel:"=",options:"=",extraSettings:"=",events:"=",searchFilter:"=?",translationTexts:"=",groupBy:"@"},template:function(e,t){var n=!!t.checkboxes,o=!!t.groupBy,r='<div class="multiselect-parent btn-group dropdown-multiselect">';r+='<button type="button" class="dropdown-toggle" ng-class="settings.buttonClasses" ng-click="toggleDropdown()">{{getButtonText()}}</button>',r+="<ul class=\"dropdown-menu dropdown-menu-form\" ng-style=\"{display: open ? 'block' : 'none', height : settings.scrollable ? settings.scrollableHeight : 'auto' }\" style=\"overflow: none\" >",r+='<li ng-hide="!settings.showCheckAll || settings.selectionLimit > 0"><a data-ng-click="selectAll()"><span class="glyphicon glyphicon-ok"></span>  {{texts.checkAll}}</a>',r+='<li ng-show="settings.showUncheckAll"><a data-ng-click="deselectAll();"><span class="glyphicon glyphicon-remove"></span>   {{texts.uncheckAll}}</a></li>',r+='<li ng-hide="(!settings.showCheckAll || settings.selectionLimit > 0) && !settings.showUncheckAll" class="divider"></li>',r+='<li ng-show="settings.enableSearch"><div class="dropdown-header"><input type="text" class="form-control" style="width: 100%;" ng-model="searchFilter" placeholder="{{texts.searchPlaceholder}}" /></li>',r+='<li ng-show="settings.enableSearch" class="divider"></li>',o?(r+='<li ng-repeat-start="option in orderedItems | filter: searchFilter" ng-show="getPropertyForObject(option, settings.groupBy) !== getPropertyForObject(orderedItems[$index - 1], settings.groupBy)" role="presentation" class="dropdown-header">{{ getGroupTitle(getPropertyForObject(option, settings.groupBy)) }}</li>',r+='<li ng-repeat-end role="presentation">'):r+='<li role="presentation" ng-repeat="option in options | filter: searchFilter">',r+='<a role="menuitem" tabindex="-1" ng-click="setSelectedItem(getPropertyForObject(option,settings.idProp))">',r+=n?'<div class="checkbox"><label><input class="checkboxInput" type="checkbox" ng-click="checkboxClick($event, getPropertyForObject(option,settings.idProp))" ng-checked="isChecked(getPropertyForObject(option,settings.idProp))" /> {{getPropertyForObject(option, settings.displayProp)}}</label></div></a>':"<span data-ng-class=\"{'glyphicon glyphicon-ok': isChecked(getPropertyForObject(option,settings.idProp))}\"></span> {{getPropertyForObject(option, settings.displayProp)}}</a>",r+="</li>",r+='<li class="divider" ng-show="settings.selectionLimit > 1"></li>',r+='<li role="presentation" ng-show="settings.selectionLimit > 1"><a role="menuitem">{{selectedModel.length}} {{texts.selectionOf}} {{settings.selectionLimit}} {{texts.selectionCount}}</a></li>',r+="</ul>",r+="</div>",e.html(r)},link:function(o,r,l){function s(e){var t={};return""===o.settings.externalIdProp?t[o.settings.idProp]=e:t[o.settings.externalIdProp]=e,t}function i(e){for(var t in e)delete e[t]}var a=r.children()[0];o.toggleDropdown=function(){o.open=!o.open},o.checkboxClick=function(e,t){o.setSelectedItem(t),e.stopImmediatePropagation()},o.externalEvents={onItemSelect:e.noop,onItemDeselect:e.noop,onSelectAll:e.noop,onDeselectAll:e.noop,onInitDone:e.noop,onMaxSelectionReached:e.noop},o.settings={dynamicTitle:!0,scrollable:!1,scrollableHeight:"300px",closeOnBlur:!0,displayProp:"name",idProp:"id",externalIdProp:"id",enableSearch:!1,selectionLimit:0,showCheckAll:!1,showUncheckAll:!1,closeOnSelect:!1,buttonClasses:"form-control",closeOnDeselect:!1,groupBy:l.groupBy||void 0,groupByTextProvider:null,smartButtonMaxItems:0,smartButtonTextConverter:e.noop},o.texts={checkAll:"Označ všetko",uncheckAll:"Odznač všetko",selectionCount:"checked",selectionOf:"/",searchPlaceholder:"Hľadaj...",buttonDefaultText:"Vyber si z možností",dynamicButtonTextSuffix:"checked"},o.searchFilter=o.searchFilter||"",e.isDefined(o.settings.groupBy)&&o.$watch("options",function(n){e.isDefined(n)&&(o.orderedItems=t("orderBy")(n,o.settings.groupBy))}),e.extend(o.settings,o.extraSettings||[]),e.extend(o.externalEvents,o.events||[]),e.extend(o.texts,o.translationTexts),o.singleSelection=1===o.settings.selectionLimit,o.singleSelection&&e.isArray(o.selectedModel)&&0===o.selectedModel.length&&i(o.selectedModel),o.settings.closeOnBlur&&n.on("click",function(t){for(var n=t.target.parentElement,r=!1;e.isDefined(n)&&null!==n&&!r;)_.contains(n.className.split(" "),"multiselect-parent")&&!r&&n===a&&(r=!0),n=n.parentElement;r||o.$apply(function(){o.open=!1})}),o.getGroupTitle=function(e){return null!==o.settings.groupByTextProvider?o.settings.groupByTextProvider(e):e},o.getButtonText=function(){if(o.settings.dynamicTitle&&(o.selectedModel.length>0||e.isObject(o.selectedModel)&&_.keys(o.selectedModel).length>0)){if(o.settings.smartButtonMaxItems>0){var t=[];return e.forEach(o.options,function(e){if(o.isChecked(o.getPropertyForObject(e,o.settings.idProp))){var n=o.getPropertyForObject(e,o.settings.displayProp),r=o.settings.smartButtonTextConverter(n,e);t.push(r?r:n)}}),o.selectedModel.length>o.settings.smartButtonMaxItems&&(t=t.slice(0,o.settings.smartButtonMaxItems),t.push("...")),t.join(", ")}var n;return n=o.singleSelection?null!==o.selectedModel&&e.isDefined(o.selectedModel[o.settings.idProp])?1:0:e.isDefined(o.selectedModel)?o.selectedModel.length:0,0===n?o.texts.buttonDefaultText:n+" "+o.texts.dynamicButtonTextSuffix}return o.texts.buttonDefaultText},o.getPropertyForObject=function(t,n){return e.isDefined(t)&&t.hasOwnProperty(n)?t[n]:""},o.selectAll=function(){o.deselectAll(!1),o.externalEvents.onSelectAll(),e.forEach(o.options,function(e){o.setSelectedItem(e[o.settings.idProp],!0)})},o.deselectAll=function(e){e=e||!0,e&&o.externalEvents.onDeselectAll(),o.singleSelection?i(o.selectedModel):o.selectedModel.splice(0,o.selectedModel.length)},o.setSelectedItem=function(t,n){var r=s(t),l=null;if(l=""===o.settings.externalIdProp?_.find(o.options,r):r,o.singleSelection)return i(o.selectedModel),e.extend(o.selectedModel,l),void o.externalEvents.onItemSelect(l);n=n||!1;var a=-1!==_.findIndex(o.selectedModel,r);!n&&a?(o.selectedModel.splice(_.findIndex(o.selectedModel,r),1),o.externalEvents.onItemDeselect(r)):!a&&(0===o.settings.selectionLimit||o.selectedModel.length<o.settings.selectionLimit)&&(o.selectedModel.push(l),o.externalEvents.onItemSelect(l))},o.isChecked=function(t){return o.singleSelection?null!==o.selectedModel&&e.isDefined(o.selectedModel[o.settings.idProp])&&o.selectedModel[o.settings.idProp]===s(t)[o.settings.idProp]:-1!==_.findIndex(o.selectedModel,s(t))},o.externalEvents.onInitDone()}}}t.$inject=["$filter","$document","$compile","$parse"],e.module("app.controls").directive("dropdownMultiselect",t)}(angular),function(e){"use strict";function t(){var e=function(e,t,n){e.$on("export-excel",function(e,n){t.tableExport({type:"excel",escape:!1})}),e.$on("export-doc",function(e,n){t.tableExport({type:"doc",escape:!1})})};return{restrict:"C",link:e}}e.module("app.controls").directive("exportTable",t)}(angular),function(e){"use strict";function t(){return{templateUrl:"/app/common/templates/wait-cursor.template.html"}}e.module("app.controls").directive("waitCursor",t)}(angular),function(e){"use strict";function t(){return function(e,t){return(1e6+e+"").slice(-t)}}e.module("app.controls").filter("numberFixedLen",t)}(angular),function(e){"use strict";function t(t){function n(n,o){return o=o?-1:1,n.map(function(n){var r=1,l=e.identity,s=!1;if(e.isFunction(n))l=n;else if(e.isString(n)&&("@"==n.charAt(0)&&(s=!0,n=n.substring(1)),"+"!=n.charAt(0)&&"-"!=n.charAt(0)||(r="-"==n.charAt(0)?-1:1,n=n.substring(1)),""!==n&&(l=t(n),l.constant))){var i=l();l=function(e){return e[i]}}return{get:l,descending:r*o,localeAware:s}})}function o(e){switch(typeof e){case"number":case"boolean":case"string":return!0;default:return!1}}function r(e,t){return"function"==typeof e.valueOf&&(e=e.valueOf(),o(e))?e:i(e)&&(e=e.toString(),o(e))?e:t}function l(e,t){var n=typeof e;return null===e?(n="string",e="null"):"string"===n?e=e.toLowerCase():"object"===n&&(e=r(e,t)),{value:e,type:n}}function s(t,n){var o=0;return"string"===t.type?o=t.value.toString().localeCompare(n.value.toString(),function(t){function n(n,o){return o=o?-1:1,n.map(function(n){var r=1,l=e.identity,s=!1;if(e.isFunction(n))l=n;else if(e.isString(n)&&("@"==n.charAt(0)&&(s=!0,n=n.substring(1)),"+"!=n.charAt(0)&&"-"!=n.charAt(0)||(r="-"==n.charAt(0)?-1:1,n=n.substring(1)),""!==n&&(l=t(n),l.constant))){var i=l();l=function(e){return e[i]}}return{get:l,descending:r*o,localeAware:s}})}function o(e){switch(typeof e){case"number":case"boolean":case"string":return!0;default:return!1}}function r(e,t){return"function"==typeof e.valueOf&&(e=e.valueOf(),o(e))?e:i(e)&&(e=e.toString(),o(e))?e:t}function l(e,t){var n=typeof e;return null===e?(n="string",e="null"):"string"===n?e=e.toLowerCase():"object"===n&&(e=r(e,t)),{value:e,type:n}}function s(e,t){var n=0;
return"string"===e.type?n=e.value.toString().localeCompare(t.value.toString(),"sk"):e.type===t.type?e.value!==t.value&&(n=e.value<t.value?-1:1):n=e.type<t.type?-1:1,n}function i(t){return e.isFunction(t.toString)&&t.toString!==Object.prototype.toString}return function(t,o,r){function i(e,t){return{value:e,predicateValues:c.map(function(n){return l(n.get(e),t)})}}function a(e,t){for(var n=0,o=0,r=c.length;r>o&&!(n=s(e.predicateValues[o],t.predicateValues[o],c[o].localeAware)*c[o].descending);++o);return n}if(!t||!e.isArray(t))return t;e.isArray(o)||(o=[o]),0===o.length&&(o=["+"]);var c=n(o,r);c.push({get:function(){return{}},descending:r?-1:1});var u=Array.prototype.map.call(t,i);return u.sort(a),t=u.map(function(e){return e.value})}}):t.type===n.type?t.value!==n.value&&(o=t.value<n.value?-1:1):o=t.type<n.type?-1:1,o}function i(t){return e.isFunction(t.toString)&&t.toString!==Object.prototype.toString}return function(t,o,r){function i(e,t){return{value:e,predicateValues:c.map(function(n){return l(n.get(e),t)})}}function a(e,t){for(var n=0,o=0,r=c.length;r>o&&!(n=s(e.predicateValues[o],t.predicateValues[o],c[o].localeAware)*c[o].descending);++o);return n}if(!t||!e.isArray(t))return t;e.isArray(o)||(o=[o]),0===o.length&&(o=["+"]);var c=n(o,r);c.push({get:function(){return{}},descending:r?-1:1});var u=Array.prototype.map.call(t,i);return u.sort(a),t=u.map(function(e){return e.value})}}t.$inject=["$parse"],e.module("app.controls").filter("orderBySk",t)}(angular);
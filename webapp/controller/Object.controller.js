sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast",
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel, History, MessageToast) {
	"use strict";

	return Controller.extend("cadmatv1.controller.Object", {

		/**
		 * Called when the worklist controller is instantiated.
		 * @public
		 */
		onInit: function () {

			// Set edit mode
            let oViewModel = new JSONModel({
					busy: false,
					delay: 0,
                    edit: false
				});

            let oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("object").attachPatternMatched(this._onObjectMatched, this);

            // Set edit mode
            this.getView().setModel(oViewModel, "objectView");
		},

		onGravar: function (oEvent) {
			// var m = this.getView().getModel();

			// if (!m.hasPendingChanges()) {
			// 	MessageToast.show("Sem mudanças para gravar.");
			// 	return;
			// }

			// this.getView().setBusy(true);

			// m.submitChanges({
			// 	success: function (oData, response) {

			// 		MessageToast.show("Mudanças realizadas.");
			// 		this.getView().setBusy(false);
			// 		var mensagem = JSON.parse(resposta.headers["sap-message"]);

			// 	}.bind(this),

			// 	error: function (oError) {

			// 		MessageToast.show("Aconteceu um erro.");
			// 		console.error(oError);
			// 		this.getView().setBusy(false);
			// 		var erro;
			// 		erro = JSON.parse(oError.responseText);
			// 	},
			// });

		},

		onCancelar: function (oEvent) {

			// Set edit mode
            let oViewModel = new JSONModel({
					busy: false,
					delay: 0,
                    edit: false
				});

            // Set edit mode
            this.getView().setModel(oViewModel, "objectView");

			// var m = this.getView().getModel();

			// if (!m.hasPendingChanges()) {
			// 	MessageToast.show("Sem mudanças para cancelar.");
			// 	return;
			// }

			// m.resetChanges();
		},

		/**
		 * Event handler  for navigating back.
		 * It there is a history entry we go one step back in the browser history
		 * If not, it will replace the current entry of the browser history with the worklist route.
		 * @public
		 */
		onNavBack: function () {
			var sPreviousHash = History.getInstance().getPreviousHash();

			if (sPreviousHash !== undefined) {
				history.go(-1);
			} else {
				this.getRouter().navTo("worklist", {}, true);
			}
		},

		/**
		 * Binds the view to the object path.
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
		 * @private
		 */
		_onObjectMatched: function (oEvent) {
            let sBukrs = oEvent.getParameter("arguments").Bukrs;
			let sMatnr = oEvent.getParameter("arguments").Matnr;
            let oView = this.getView();

            //Binding da página com o material
            oView.bindElement({
                path: "/MaterialSet(Bukrs='" + sBukrs + "',Matnr='" + sMatnr + "')",
                events: {
                    dataRequested: function () {
                        oView.setBusy(true);
                    },
                    dataReceived: function () {
                        oView.setBusy(false);
                    }
                }
            });
		},

		/**
		 * Binds the view to the object path.
		 * @function
		 * @param {string} sObjectPath path to the object to be bound
		 * @private
		 */
		_bindView: function (sObjectPath) {
			// var oViewModel = this.getModel("objectView"),
			// 	oDataModel = this.getModel();

			// this.getView().bindElement({
			// 	path: sObjectPath,
			// 	parameters: {
			// 		expand: "vendas"
			// 	},
			// 	events: {
			// 		change: this._onBindingChange.bind(this),
			// 		dataRequested: function () {
			// 			oDataModel.metadataLoaded().then(function () {
			// 				// Busy indicator on view should only be set if metadata is loaded,
			// 				// otherwise there may be two busy indications next to each other on the
			// 				// screen. This happens because route matched handler already calls '_bindView'
			// 				// while metadata is loaded.
			// 				oViewModel.setProperty("/busy", true);
			// 			});
			// 		},
			// 		dataReceived: function () {
			// 			oViewModel.setProperty("/busy", false);
			// 		}
			// 	}
			// });
		},

		_onBindingChange: function () {
			// var oView = this.getView(),
			// 	oViewModel = this.getModel("objectView"),
			// 	oElementBinding = oView.getElementBinding();

			// // No data for the binding
			// if (!oElementBinding.getBoundContext()) {
			// 	this.getRouter().getTargets().display("objectNotFound");
			// 	return;
			// }

			// var oResourceBundle = this.getResourceBundle(),
			// 	oObject = oView.getBindingContext().getObject(),
			// 	sObjectId = oObject.ClienteID,
			// 	sObjectName = oObject.Nome;

			// oViewModel.setProperty("/busy", false);

			// oViewModel.setProperty("/shareSendEmailSubject",
			// 	oResourceBundle.getText("shareSendEmailObjectSubject", [sObjectId]));
			// oViewModel.setProperty("/shareSendEmailMessage",
			// 	oResourceBundle.getText("shareSendEmailObjectMessage", [sObjectName, sObjectId, location.href]));
		},

		onPressAlterar: function (oEvent) {
			// Set edit mode
            let oViewModel = new JSONModel({
					busy: false,
					delay: 0,
                    edit: true
				});

            // Set edit mode
            this.getView().setModel(oViewModel, "objectView");
			
            // var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZMONITORVENDAS_SRV/");

			// //coletar valores do elemento da tela usando metodos get de propriedades
			// var clienteid = '0000000178';

			// var sPath = "/ClienteSet('" + clienteid + "')";


			// var dados = {
			// 	Nome: "Cristiano",
			// 	Telefone: "44566545",
			// 	UF: "PR",
			// 	Email: "oi@tchau.fui",
			// 	Status: "1"
			// };

			// oModel.update(sPath, dados, {

			// 	success: function (oDados, resposta) {

			// 	debugger
			// 	var mensagem = JSON.parse(resposta.headers["sap-message"]);

			// 	}.bind(this),

			// 	error: function (oError) {

			// 		debugger
			// 		var erro;
			// 		erro = JSON.parse(oError.responseText);


			// 	}.bind(this),


			// });

		},

		onValueHelpRequest: function (oEvent) {
			
			// 	var oView = this.getView();

			// if (!this._UFDialog) {
			// 	this._UFDialog = Fragment.load({
			// 		id: oView.getId(),
			// 		name: "cristianofiori.cadastroclientes.view.UFDialog",
			// 		controller: this
			// 	}).then(function (oDialog) {
			// 		oView.addDependent(oDialog);
			// 		return oDialog;
			// 	});
			// }

			// this._UFDialog.then(function(oDialog) {
				
			// 	oDialog.open();
			// });
		},

		closeUFDialog:function(){
			// this.byId("inpUf").setValue( this.byId("inpNewUf").getValue() );

			// this.byId("UfDialog").close();

		},


	});

});
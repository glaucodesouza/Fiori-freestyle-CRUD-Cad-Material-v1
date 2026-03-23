sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"sap/m/MessageBox"
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel, History, MessageBox) {
	"use strict";

	return Controller.extend("cadmatv1.controller.Create", {

		/**
		 * Called when the worklist controller is instantiated.
		 * @public
		 */
		onInit: function () {

            // let oRouter = this.getOwnerComponent().getRouter();
			// oRouter.getRoute("object").attachPatternMatched(this._onObjectMatched, this);

			// const oObjectViewModelLocal = this.getOwnerComponent().getModel("objectViewModelGlobal");
			// this.getView().setModel(oObjectViewModelLocal, "objectViewModelLocal");
			
		},

		onBeforeRendering:  function () {

		},

		onCancelar: function (oEvent) {

			// // Set edit mode
            // let oViewModel = new JSONModel({
			// 		busy: false,
			// 		delay: 0,
            //         edit: false
			// 	});

            // // Set edit mode
            // this.getView().setModel(oViewModel, "objectView");

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

		onGravar: function (oEvent) {

            // let oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZGCAD_MAT270_SRV/");

			// //coletar valores do elemento da tela usando metodos get de propriedades
			// let sBukrs = this.byId('txtBukrs').getText();
			// let sMatnr = this.byId('txtMatnr').getText();
			// let sMaktx = this.byId('txtMaktx').getValue();
			// let sMenge = this.byId('txtMenge').getValue();
			// let sMeins = this.byId('txtMeins').getValue();

			// let sPath = `/MaterialSet(Bukrs='` + sBukrs + `',Matnr='` + sMatnr + `')`;

			// let oDadosGravar = {
			// 	Bukrs: sBukrs,
			// 	Matnr: sMatnr,
			// 	Maktx: sMaktx,
			// 	Menge: sMenge,
			// 	Meins: sMeins
			// };

			// oModel.update(sPath, oDadosGravar, {
			// 	success: function (oDadosRetorno, resposta) {
			// 		MessageBox.success('Dados modificados com sucesso');
			// 	}.bind(this),
			// 	error: function (oError) {
			// 		MessageBox.error(`Erro ao gravar ` + oError.message);
			// 	}.bind(this),
			// });
		}

	});

});
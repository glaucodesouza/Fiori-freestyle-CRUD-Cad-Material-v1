sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History"
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel, History) {
	"use strict";

	return Controller.extend("cadmatv1.controller.Create", {

		/**
		 * Called when the worklist controller is instantiated.
		 * @public
		 */
		onInit: function () {

			this.limparTodosCamposTela();
			// //limpar valores
			// this.byId('txtBukrsCreate').setValue('');
			// this.byId('txtMatnrCreate').setValue('');
			// this.byId('txtMaktxCreate').setValue('');
			// this.byId('txtMengeCreate').setValue('');
			// this.byId('txtMeinsCreate').setValue('');
			
            // let oRouter = this.getOwnerComponent().getRouter();
			// oRouter.getRoute("object").attachPatternMatched(this._onObjectMatched, this);

			// const oObjectViewModelLocal = this.getOwnerComponent().getModel("objectViewModelGlobal");
			// this.getView().setModel(oObjectViewModelLocal, "objectViewModelLocal");
			
		},

		onBeforeRendering:  function () {

		},

		onCancelar: function (oEvent) {
			history.go(-1);
            // let sPreviousHash = History.getInstance().getPreviousHash();
            // if (sPreviousHash !== undefined) {
            //     // eslint-disable-next-line sap-no-history-manipulation
            //     history.go(-1);
            // } else {
            //     this.getRouter().navTo("TargetView1", {}, true);
            // }
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

			let oModel = this.getView().getModel();
            // let oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZGCAD_MAT270_SRV/");

			//coletar valores do elemento da tela usando metodos get de propriedades
			let sBukrs = this.byId('txtBukrsCreate').getValue();
			let sMatnr = this.byId('txtMatnrCreate').getValue();
			let sMaktx = this.byId('txtMaktxCreate').getValue();
			let sMenge = parseFloat(this.byId('txtMengeCreate').getValue().replaceAll(',', '.')).toPrecision(3);
			let sMeins = this.byId('txtMeinsCreate').getValue();

			let sPath = `/MaterialSet`;

			let oDadosGravar = {
				Bukrs: sBukrs,
				Matnr: sMatnr,
				Maktx: sMaktx,
				Menge: sMenge,
				Meins: sMeins
			};

			oModel.create(sPath, oDadosGravar, {
				success: function (oDadosRetorno, resposta) {
					this.limparTodosCamposTela();
					sap.m.MessageToast.show('Material criado com sucesso');
					history.go(-1);
				}.bind(this),
				error: function (oError) {
					sap.m.MessageToast.show(`Erro ao gravar ` + oError.message);
				}.bind(this),
			});
		},

		onValueHelpRequest: function (oEvent) {
			let oInput = oEvent.getSource();

			if (!this._oUnitDialog) {
				this._oUnitDialog = new sap.m.SelectDialog({
					title: "Selecionar Unidade de Medida",
					items: {
						path: "/UnidadeDeMedidaSHSet", // sua entidade OData
						template: new sap.m.StandardListItem({
							title: "{Msehi}",
							description: "{Msehl}"
						})
					},
					confirm: function (oEvent) {
						let oSelectedItem = oEvent.getParameter("selectedItem");
						if (oSelectedItem) {
							oInput.setValue(oSelectedItem.getTitle());
						}
					},
					cancel: function () {}
				});

				this.getView().addDependent(this._oUnitDialog);
			}

			this._oUnitDialog.open();
		},

		limparTodosCamposTela: function () {
			//limpar valores
			this.byId('txtBukrsCreate').setValue('');
			this.byId('txtMatnrCreate').setValue('');
			this.byId('txtMaktxCreate').setValue('');
			this.byId('txtMengeCreate').setValue('');
			this.byId('txtMeinsCreate').setValue('');
		}

	});

});
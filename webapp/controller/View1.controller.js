sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("cadmatv1.controller.View1", {
            onInit: function () {

            },
            /* -------------------------------------------------- */
            /* Métodos customizdos                                */
            /* -------------------------------------------------- */
            onSortItems: function (oEvent) {
                // let campo = 'Matnr';
                // let oSorter = new sap.ui.model.Sorter({
                //     path: campo,
                //     descending: true
                // });
                let oSorter = new sap.ui.model.Sorter("Matnr", true);

                let oTable = this.byId('table');
                let oItems = oTable.getBinding('items');
                oItems.sort(oSorter);
                
            },
            
            onSearchCustom: function(oEvent){

                // 1. Obter referências dos campos de input pelo ID definido no XML
                let sBukrs = this.byId("inputBukrs").getValue();
                let sMatnr = this.byId("inputMatnr").getValue();

                let aFilters = [];

                // 2. Validar e criar o filtro para Empresa (Bukrs)
                if (sBukrs && sBukrs.length > 0) {
                    aFilters.push(new Filter("Bukrs", FilterOperator.Contains, sBukrs));
                }

                // 3. Validar e criar o filtro para Material (Matnr)
                if (sMatnr && sMatnr.length > 0) {
                    aFilters.push(new Filter("Matnr", FilterOperator.Contains, sMatnr));
                }

                // 4. Se o evento veio do SearchField (SE O CAMPO DE BUSCA À DIREITA NA TOOLBAR DA TABLE), 
                // você também pode capturar esse valor se desejar um filtro global:
                let sQuery = oEvent.getParameter("query");
                if (sQuery && sQuery.length > 0) {
                    aFilters.push(new Filter("Matnr", FilterOperator.Contains, sQuery));
                }

                // 5. Aplicar os filtros na tabela
                let oTable = this.byId("table");
                let oBinding = oTable.getBinding("items");

                // 6. Se aFilters estiver vazio, ele limpará os filtros e mostrará tudo
                oBinding.filter(aFilters);

                // let aTableSearchState = [];
                // let sQuery = oEvent.getParameter('query');

                // if (sQuery && sQuery.length > 0) {
                //     aTableSearchState = [
                //         new Filter('Matnr', FilterOperator.Contains, sQuery)
                //     ];

                //     let oTable = this.byId('table');
                //     let oItems = oTable.getBinding('items');
                //     oItems.filter(aTableSearchState);
                // }

            },
            /* ------------------------------------------------------- */
            /* Ler Matnr da linha marcada, buscar no backend e filtrar */
            /* (APENAS PRA ESTUDO)                                     */
            /* NÃO É BOM NEM PRÁTICO                                   */
            /* ------------------------------------------------------- */
            onClienteReadSelected: function(){
                let oModel = this.getView().getModel();
                let oTable = this.byId("table");
                
                //aItems[i] = /MaterialSet(Bukrs='1000',Matnr='MAT0002')
                // let aItems = oTable.getSelectedContextPaths();

                let aSelectedItems = oTable.getSelectedItems();

                if (!!aSelectedItems && aSelectedItems.length > 1) {
                    sap.m.MessageToast.show('Selecionar apenas uma linha');
                    return;
                } else {

                    let aFilters = [];

                    aSelectedItems.forEach(function(oItem){
                        let oData = oItem.getBindingContext().getObject();
                        aFilters.push(
                            new Filter("Bukrs", FilterOperator.EQ, oData.Bukrs)
                        );
                        aFilters.push(
                            new Filter("Matnr", FilterOperator.EQ, oData.Matnr)
                        );
                    });

                    oModel.read("/MaterialSet", {
                        filters: aFilters,
                        success: function(oData){
                            let aFilters = [];
                            aFilters.push(
                                new Filter("Bukrs", FilterOperator.EQ, oData.results[0].Bukrs)
                            );
                            aFilters.push(
                                new Filter("Matnr", FilterOperator.EQ, oData.results[0].Matnr)
                            );
                            let oItems = oTable.getBinding('items');
                            oItems.filter(aFilters);
                            console.log(oData);
                        },
                        error: function(oError){
                            console.log(oError);
                        }
                    });
                }
            },
            /* ------------------------------------------------------- */
            /* Ler com Bind Aggregation                                */
            /* (APENAS PRA ESTUDO)                                     */
            /* NÃO É USUAL NEM PRÁTICO                                 */
            /* ------------------------------------------------------- */
            onClienteReadAllBindAggregation: function(){
                let oModel = this.getView().getModel();
                let oTable = this.byId('table');
                let bindingInfo = oTable.getBindingInfo('items');
                let aFilters = [];

                oTable.bindAggregation('items',{
                    model: bindingInfo.model,
                    path: '/MaterialSet',
                    template: bindingInfo.template,
                    sorter: [
                        new sap.ui.model.Sorter("Menge", true)
                    ],
                    filter: aFilters
                });
            },

            onLinePress: function (oEvent) {
                //2) NAVIGATION Set actions
                // Set mode show to Object page view
                // Pois a Navegação normal com clique no item wdo workitem,
                // deve setar o action com "show" (p/ Object Page).
                this.getOwnerComponent()
                .getModel("objectViewModelGlobal")
                .setProperty("/action", "show");

                // NAVIGATE: 
                // The source is the list item that got pressed
                let oItem = oEvent.getSource();

                this.getOwnerComponent().getRouter().navTo("object", {
                    Bukrs: oItem.getBindingContext().getProperty("Bukrs"),
                    Matnr: oItem.getBindingContext().getProperty("Matnr")
                });
		    },

            onCriarClientePress: function (oEvent) {
                //2) NAVIGATION Set actions
                // Set mode show to Object page view
                // Pois a Navegação normal com clique no item wdo workitem,
                // deve setar o action com "show" (p/ Object Page).
                this.getOwnerComponent()
                .getModel("objectViewModelGlobal")
                .setProperty("/action", "edit");

                // NAVIGATE: 
                this.getOwnerComponent().getRouter().navTo("create", {});
            },

            onDeletarClientePress: function(){

                let oModel = this.getView().getModel();
                let oTable = this.byId("table");
                let aSelectedItems = oTable.getSelectedItems();
                let sPath = ``;

                if (!aSelectedItems || aSelectedItems.length == 0) {
                    sap.m.MessageToast.show('Nenhuma linha selecionada!');
                    return;
                } else if (!!aSelectedItems && aSelectedItems.length > 1) {
                    sap.m.MessageToast.show('Selecionar apenas uma linha!');
                    return;
                } else {

                    aSelectedItems.forEach(function(oItem){
                        let oData = oItem.getBindingContext().getObject();
                        sPath = `/MaterialSet(Bukrs='${oData.Bukrs}',Matnr='${oData.Matnr}')`;
                    });

                    oModel.remove(sPath, {
                        success: function(oData){
                            sap.m.MessageToast.show('Material Deletado com sucesso!');
                        },
                        error: function(oError){
                            sap.m.MessageToast.show('Erro ao deletar Material!');
                        }
                    });
                }
            }
        });
    });

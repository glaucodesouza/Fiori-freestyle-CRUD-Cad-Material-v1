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
                let aTableSearchState = [];
                let sQuery = oEvent.getParameter('query');

                if (sQuery && sQuery.length > 0) {
                    aTableSearchState = [
                        new Filter('Matnr', FilterOperator.Contains, sQuery)
                    ];

                    let oTable = this.byId('table');
                    let oItems = oTable.getBinding('items');
                    oItems.filter(aTableSearchState);
                }

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

            }
        });
    });

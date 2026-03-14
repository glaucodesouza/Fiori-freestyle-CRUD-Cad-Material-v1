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

            }
        });
    });

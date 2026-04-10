sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
], function (Controller, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("app.controller.Main", {

        onInit: function () {
            var oModel = new JSONModel({
                accounts: []
            });
            this.getView().setModel(oModel);
        },

        onAddAccount: function () {

    var name = this.byId("nameInput").getValue();
    var balance = this.byId("balanceInput").getValue();

    if (!name || !balance) {
        sap.m.MessageToast.show("Please fill all fields");
        return;
    }

    if (isNaN(balance)) {
        sap.m.MessageToast.show("Balance must be number");
        return;
    }

    var oModel = this.getView().getModel();
    var data = oModel.getData();

    data.accounts.push({
        name: name,
        balance: balance
    });

    oModel.setData(data);

    // Clear inputs
    this.byId("nameInput").setValue("");
    this.byId("balanceInput").setValue("");
},
        onSearch: function (oEvent) {
    var query = oEvent.getParameter("newValue").toLowerCase();
    var oModel = this.getView().getModel();
    var data = oModel.getData();

    var filtered = data.accounts.filter(function (acc) {
        return acc.name.toLowerCase().includes(query);
    });

    oModel.setData({ accounts: filtered });
},
onDelete: function (oEvent) {
    var oItem = oEvent.getSource().getParent();
    var oTable = this.byId("accountTable");
    var oModel = this.getView().getModel();
    var data = oModel.getData();

    var index = oTable.indexOfItem(oItem);
    data.accounts.splice(index, 1);

    oModel.setData(data);
}
    });
});
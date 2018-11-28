/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'HomeDashboard.Application',

    name: 'HomeDashboard',

    requires: [
        // This will automatically load all classes in the HomeDashboard namespace
        // so that application classes do not need to require each other.
        'HomeDashboard.*'
    ],

    // The name of the initial view to create.
    mainView: 'HomeDashboard.view.main.Main'
});

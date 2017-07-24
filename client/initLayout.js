myApp = null;
$$ = Dom7;

initLayout = function()
{
    if(myApp == null)
    {
        myApp = new Framework7({
            materialRipple: false, //having some performance problems....
            showBarsOnPageScrollEnd: false,
            swipePanel: 'left',
            swipeout: false,
            panelsCloseByOutside: true
        });
    }
    else
    {
        myApp.init();
    }
}


Meteor.startup(function() {

  if(Meteor.isCordova) {
    screen.orientation.lock('portrait');

    // inappbilling.init(function(sucess){
    //   alert(sucess);
    //
    // }, function(error){
    //   alert(error);
    //
    // }, {}, "com.android.vending", "com.android.vending.billing.InAppBillingService.BIND", "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAj04w7tDMCBHMjYZZdBEmBN5Q70sIPonh5g17ZaxgCjaSv5qypSkswgl3eYvFfZ0qx2hs6gAp8nm1Ouno23lMHC+EL/7dbB7kMY1RSF6YW7JTomx369/9ViJINpR22gxICZCA+Sc1iVM4Tk/9lXXE1xol+z5GOnv0kxUADDxygjXWyJ8B/Q1nj5Y/1YQYplm4X/V1wWfP3j0cesl3GfEEm/ZlwhLiyKfyJf7go1lkAVXbiU9gtAiFxIhDsFGAQzOXG14o9rRjnScCnpo25Ot1FYZFco65fJUx0mTa1hzMMgQSfYUfKfcITGaikXoh6AaHtyciqNB1X71G2bUWlSy4uQIDAQAB")
    //
    // inappbilling.subscribe(function(success) {alert(success);
    // }, function(fail) {alert(fail)}, "premium")
    //
    // inappbilling.getPurchases(function(success) {alert(JSON.stringify(success))}, function(fail) {alert(fail)});

    BackBehaviour.attachToHardwareBackButton(true);

  }



});

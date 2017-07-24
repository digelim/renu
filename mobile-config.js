App.info({
  id: 'com.renu',
  name: 'Renu - Nubank + controle financeiro',
  description: 'Controle suas finanças com nubank',
  author: 'Diogo Angelim',
  email: 'diogoangelim@gmail.com',
  website: 'http://www.digelim.me',
  version: '0.0.7'
});

App.icons({
  android_mdpi: "icon/mipmap-mdpi/ic_launcher.png",
  android_hdpi: "icon/mipmap-hdpi/ic_launcher.png",
  android_xhdpi: "icon/mipmap-xhdpi/ic_launcher.png",
  android_xxhdpi: "icon/mipmap-xxhdpi/ic_launcher.png",
  android_xxxhdpi: "icon/mipmap-xxxhdpi/ic_launcher.png"
});

App.launchScreens({
  android_mdpi_portrait: "splash/320x480.png",
  android_mdpi_landscape: "splash/480x320.png",
  android_hdpi_portrait: "splash/480x800.png",
  android_hdpi_landscape: "splash/800x480.png",
  android_xhdpi_portrait: "splash/720x1280.png",
  android_xhdpi_landscape: "splash/1280x720.png"
});

App.setPreference('android-versionCode', '72');
App.setPreference('android-targetSdkVersion', '23');
App.setPreference('android-minSdkVersion', '19');

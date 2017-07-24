Accounts.onCreateUser((options, user) => {
  _.extend(user, {
    token: options.token,
    url: options.url
  });

  return user;
});



Accounts.registerLoginHandler("token", function(loginRequest) {

	if (!loginRequest.token) {
		return undefined;
	}

	var user = Meteor.users.find({token: loginRequest.token}).fetch()[0]

	if (!user) {
		return {
			userId: null,
			error: "no user found"
		}
	} else {
		var userId = user._id;

		var stampedToken = Accounts._generateStampedLoginToken();
		var hashStampedToken = Accounts._hashStampedToken(stampedToken);

		Meteor.users.update(userId, {
			$push: {
				'services.resume.loginTokens': hashStampedToken
			}
		});


		return {
			userId: userId,
			token: stampedToken.token
		};
	}

});

import {LoginManager, AccessToken, GraphRequest, GraphRequestManager} from 'react-native-fbsdk';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import Config from '@/config/AppConfig';


GoogleSignin.configure({
  scopes: Config.googleSignIn.scopes,
  // webClientId: Config.googleSignIn.webClient.id,
  // offlineAccess: false,
  iosClientId: Config.googleSignIn.iosClientId
});

const tag = 'Services::SocialApi';
export const facebookAuth = async () => {
  return new Promise(async (resolve) => {
    let result = {
      success: false,
      data: null,
      error: null
    };

    try {
      let loginResult = await LoginManager.logInWithPermissions(Config.facebookLogin.scopes);
      if (loginResult.isCancelled) {
        //alert('Request was cancelled');
        result.error = {
          name: e.name,
          message: e.message,
        };
        resolve(result);
      } else {
        //alert('Login was successful with permissions: ' + result.grantedPermissions.toString());
        // console.log(tag, 'FBAuth, Success:', loginResult);
        AccessToken.getCurrentAccessToken().then(
          (data) => {
            const {accessToken} = data;

            const _responseInfoCallback = (error: ?Object, res: ?Object) => {
              if (error) {
                //console.log('Error fetching data: ', error);
                result.error = {
                  name: error.name,
                  message: error.message,
                };
                resolve(result);

              } else {
                console.log('Success fetching data: ', res);
                result.data = res;
                result.success = true;
                resolve(result);
              }
            };

            // Create a graph request asking for user information with a callback to handle the response.
            const infoRequest = new GraphRequest(
              '/me',
              {
                accessToken,
                parameters: {
                  fields: {
                    string: 'email,name,birthday'
                  }
                }
              },
              // null,
              _responseInfoCallback,
            );
            // Start the graph request.
            new GraphRequestManager().addRequest(infoRequest).start();
          }
        );
      }
    } catch (e) {
      // console.log(tag, 'FBAuth, Ex:', e.message);
      result.error = {
        name: e.name,
        message: e.message,
      };
      resolve(result);
    }
  })
};

export const googleAuth = async () => {
  return new Promise(async (resolve) => {
    let result = {
      success: false,
      data: null,
      error: null
    };

   try {
      const hasPlayServices = await GoogleSignin.hasPlayServices();

      if (!hasPlayServices) {
        console.log(tag, 'GGAuth', 'Device doesn\'t have PlayServices');
      }

      let userInfo;
      if (GoogleSignin.isSignedIn()) {
        // userInfo = await GoogleSignin.getCurrentUser();
        await GoogleSignin.signOut();
      }

      userInfo = await GoogleSignin.signIn();

      const {user} = userInfo;
      console.log(tag, 'GGAuth', user);
      result.success = true;
      result.data = user;
      resolve(result);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log(tag, 'GGAuth', 'Cancelled');

      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log(tag, 'GGAuth', 'In progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log(tag, 'GGAuth', 'Play services not available');
      } else {
        // some other error happened
        console.log(tag, 'GGAuth', 'Other error', error.message);
      }

      result.error = {
        name: error.name,
        message: error.message
      };
      resolve(result);
    }
  })
};

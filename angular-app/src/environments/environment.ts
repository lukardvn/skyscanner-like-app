// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { domain, clientId, audience, serverUrl, redirectUri } from '../../auth_config.json'; //moze zahvaljujuci resolveJsonModule=true u tsconfig.json

export const environment = {
  production: false,
  //localUrl: 'http://localhost:8080', // kada se pokrece preko dockera i kubernetesa
  //localUrl: 'http://localhost:8085',
  //localCarUrl: 'http://localhost:8087'
  //localUrl: 'http://localhost:100/api/v1/namespaces/default/services/webapp-service/proxy', //kada se pokrece preko kub klastera
  //localCarUrl: 'http://localhost:100/api/v1/namespaces/default/services/microservice-service/proxy',
  localUrl: 'https://localhost:44383', //kada se pokrece LOKALNO BEZ DOCKERA
  localCarUrl: 'https://localhost:44323', //takodje lokalno, ali za car microservice
  
  agmApiKey: 'AIzaSyASLJKMtrL7p5SdyDdU-Syvft0gf4stec0',

  auth: {
    domain,
    clientId,
    //redirectUri: window.location.origin,
    redirectUri: redirectUri,
    audience
    //screen_hint: "signup"
  },
  
  dev: {
    serverUrl
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

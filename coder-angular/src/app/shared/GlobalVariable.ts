
 let BASE_URL;

 if (window.location.origin === 'http://localhost:4200'){
   BASE_URL = 'http://127.0.0.1';
 }
 else{
   BASE_URL = window.location.origin;
 }
 export const GlobalVariable = Object.freeze({
  // API_URL: 'http://127.0.0.1/coder_project/coder_api/public/api/',
   API_URL: BASE_URL + '/coder_project/coder_api/public/api/',

  // API_URL: 'http://127.0.0.1:8000/api/',

  // ... more of your variables
});


 let url;
 if (window.location.origin === '127.0.0.1'){
   url = window.location.origin;
 }

 export const GlobalVariable = Object.freeze({
  API_URL: 'http://127.0.0.1/coder_project/coder_api/public/api/',
  // API_URL: 'http://127.0.0.1:8000/api/',

  // ... more of your variables
});

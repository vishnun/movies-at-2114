import React from 'react';
// import { GoogleLogin } from 'react-google-login';
//
//
interface DriveLoginProps {
  onSuccess: (token: string) => void;
}
//
const DriveLogin: React.FC<DriveLoginProps> = ({ onSuccess }) => {
//   const responseGoogle = (response: any) => {
//       debugger
//     if (response.accessToken) {
//       onSuccess(response.accessToken);
//     } else {
//       console.error('Google Sign-In failed.');
//     }
//   };
//
//   return (
//     <div>
//       <h2>Google Drive Integration</h2>
//       <GoogleLogin
//         clientId="742371489419-9ueaesa8q5q7gnjumikkds0ah4o1fuu5.apps.googleusercontent.com"
//         buttonText="Login with Google"
//         onSuccess={responseGoogle}
//         onFailure={responseGoogle}
//         cookiePolicy={'single_host_origin'}
//       />
//     </div>
//   );
    return (<div>TEST</div>);
};
//
export default DriveLogin;

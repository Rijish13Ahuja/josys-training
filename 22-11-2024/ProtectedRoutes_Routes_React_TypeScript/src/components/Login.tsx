import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate, useParams } from "react-router-dom";

const Login: React.FC = () => 
{
    const [uid, setUserId]  = useState<string>("admin");
    const [pwd, setPassword]  = useState<string>("admin123");
    const [result, setResult]  = useState<string>(""); 

    let navigate = useNavigate();
    let location = useLocation();

    function loginButton_click()
    {  

      // Read data from querystring 
      const queryString = location.search; // returns the query string from the current url

      // let strReturnUrl  =  new URLSearchParams(search).get('key');
       let strReturnUrl:string | null =  new URLSearchParams(queryString).get('returnUrl');
  
       if(strReturnUrl == null)  strReturnUrl= "/";

        if(uid == "admin" && pwd == "admin123")
        {  
          // alert("Valid Credentials");

          // In real-time apps, we will get the token from the server
          // JWT token is the popular token generation library          
          let token = "ASJDFJF87ADF8745LK4598SAD7FAJSDF45JSDLFKAS";
          sessionStorage.setItem('AUTH_TOKEN', token);
          navigate(`${strReturnUrl}`);
        }
        else
        {
            setResult("Invalid User Id or Password");
        }
    }


  return (
    <>   
      <fieldset>
                <legend>User Login</legend>

                <label>User Id  : </label>
                <input type="text" value={uid} onChange={(event) => setUserId(event.target.value)} />
                <br/><br/>

                <label>Password  : </label>
                <input type="password"  value={pwd}  onChange={(event) => setPassword(event.target.value)} />
                <br/><br/>

                <input type="button"  onClick={loginButton_click}  value="Login"    />
                <p  style={{color : "red"}}>{result}</p>   
       </fieldset>  
    </>
  );

};

export default Login;

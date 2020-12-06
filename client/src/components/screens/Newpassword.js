import React,{useState,useContext,} from 'react'
import {Link,useHistory,useParams} from 'react-router-dom'
import M from 'materialize-css'
const SignIn  = ()=>{
    const history = useHistory()
    const [password,setPasword] = useState("")
    const [Confirm_password,setConfirm_pasword]=useState("")
    const {token} = useParams()
    console.log(token)
    const PostData = ()=>{
        if(password!=Confirm_password){
            M.toast({html:"Passwords Doesn't match",classes:"#c62828 red darken-3"})
            return
        }
        else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(password)){
            M.toast({
                html: `<p>The Password must be 8 characters long and must contain at least 1 lowercase,1 uppercase,1 numeric,1 special character</p><br/>`,
                classes:"#c62828 red darken-3"})
            return}
        fetch("/new-password",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                token
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{

               M.toast({html:data.message,classes:"#43a047 green darken-1"})
               history.push('/signin')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
   return (
      <div className="mycard">
          <div className="card auth-card input-field">
            <h2>Instagram</h2>
        
            <input
            type="password"
            placeholder="enter a new password"
            value={password}
            onChange={(e)=>setPasword(e.target.value)}
            />
            <input
            type="password"
            placeholder="Confirm password"
            value={Confirm_password}
            onChange={(e)=>setConfirm_pasword(e.target.value)}
            />
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
            onClick={()=>PostData()}
            >
               Update password
            </button>
    
        </div>
      </div>
   )
}


export default SignIn
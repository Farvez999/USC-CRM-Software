import { GoogleAuthProvider } from "firebase/auth";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import { useToken } from "../../hooks/useToken";

const Login = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const { logIN, googleLogin } = useContext(AuthContext)
    const [loginError, setLoginError] = useState('')

    const [loginUserEmail, setLoginUserEmail] = useState('')
    const [token] = useToken(loginUserEmail)


    let navigate = useNavigate();
    let location = useLocation();

    let from = location.state?.from?.pathname || "/";

    if (token) {
        navigate(from, { replace: true });
    }

    const handleLogin = data => {
        console.log(data)
        setLoginError(' ')
        logIN(data.email, data.password)
            .then((result) => {
                const user = result.user;
                console.log(user)
                setLoginUserEmail(data.email)
            })
            .catch((error) => {
                console.log(error.message)
                setLoginError(error.message)
            });
    }



    return (
        <div className='h-[400px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-xl text-center'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input {...register("email", { required: "Email Address is required" })} type="text" className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-500' role="alert">{errors.email?.message}</p>}
                    </div>


                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input {...register("password", { required: "Password Address is required", minLength: { value: 6, message: 'Passwor must be 6 characters or longer' } })} type="password" className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className='text-red-500' role="alert">{errors.password?.message}</p>}
                        <label className="label">
                            <span className="label-text">Forgot Password ?</span>
                        </label>
                    </div>


                    <input className='btn btn-accent w-full text-white' value="Login" type="submit" />
                    {
                        loginError && <p className='text-red-500'>{loginError}</p>
                    }
                    {/* <p>New to Doctors Portal <Link className='text-secondary' to="/signup">Create new Account</Link></p> */}
                    {/* <div className="divider">OR</div>
                    <button onClick={handleGoogleLogin} className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button> */}
                </form>
            </div>
        </div>
    );
};

export default Login;
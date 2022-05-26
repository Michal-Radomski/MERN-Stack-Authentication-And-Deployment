import axios from "axios";
import React from "react";
import {Link, RouteComponentProps} from "react-router-dom";

export interface LOGIN {
  email: string;
  password: string;
  error: string | null;
}

export interface ERROR extends Error {
  response: {
    data: {
      error: string;
    };
  };
}

const Login = (props: RouteComponentProps): JSX.Element => {
  const [data, setData] = React.useState<LOGIN>({
    email: "",
    password: "",
    error: null,
  });

  // console.log({data});

  const {email, password, error} = data;

  const handleChange = (event: {target: {name: string; value: string}}) => {
    setData({...data, [event.target.name]: event.target.value});
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      setData({...data, error: null});
      const res = await axios.post(
        "/auth/login",
        {email: email, password: password},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("token", res.data.token);
      props.history.push("/");
    } catch (error) {
      console.log({error});
      setData({...data, error: (error as ERROR).response.data.error});
    }
  };

  return (
    <div
      className="row"
      style={{
        margin: 0,
        position: "absolute",
        top: "10%",
        left: "50%",
        transform: "translate(-50%, 0)",
        minWidth: "800px",
        backgroundColor: "lightgrey",
      }}
    >
      <div className="col-sm-12" style={{paddingBottom: "15px"}}>
        <h4 className="text-muted text-center mb-5">Log into your account</h4>
        <div className="card p-5 shadow">
          <form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input className="form-control" type="email" name="email" value={email} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input className="form-control" type="password" name="password" value={password} onChange={handleChange} />
            </div>
            {error ? <p className="text-danger">{error}</p> : null}
            <div className="text-center">
              <button className="btn btn-primary" onClick={handleSubmit}>
                Login
              </button>
            </div>
          </form>
          <p className="mt-3 text-center">
            Not a user? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

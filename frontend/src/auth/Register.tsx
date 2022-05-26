import React from "react";
import axios from "axios";
import {Link, RouteComponentProps} from "react-router-dom";

import {LOGIN, ERROR} from "./Login";

interface REGISTER extends LOGIN {
  name: string;
}

const Register = (props: RouteComponentProps): JSX.Element => {
  const [data, setData] = React.useState<REGISTER>({
    name: "",
    email: "",
    password: "",
    error: null,
  });

  // console.log({data});

  const {name, email, password, error} = data;

  const handleChange = (event: {target: {name: string; value: string}}) => {
    setData({...data, [event.target.name]: event.target.value});
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      setData({...data, error: null});
      await axios.post(
        "/auth/register",
        {name: name, email: email, password: password},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      props.history.push("/login");
    } catch (error) {
      setData({...data, error: (error as ERROR).response.data.error});
    }
  };

  return (
    <div className="row">
      <div
        style={{
          margin: 0,
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translate(-50%, 0)",
          minWidth: "800px",
          backgroundColor: "whitesmoke",
        }}
      >
        <div className="col-sm-12" style={{paddingBottom: "15px"}}>
          <h4 className="text-muted text-center mb-5">Create an account</h4>
          <div className="card p-5 shadow">
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input className="form-control" type="name" name="name" value={name} onChange={handleChange} />
              </div>
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
                  Register
                </button>
              </div>
            </form>
            <p className="mt-3 text-center">
              Already registered as user? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

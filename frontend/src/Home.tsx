import React from "react";
import axios from "axios";
import {RouteComponentProps} from "react-router-dom";

interface USER {
  _id: string;
  name: string;
  email: string;
  password: string;
  save(): void;
}

const Home = (props: RouteComponentProps): JSX.Element => {
  // console.log({props});
  // const {history} = props;
  // console.log({history});
  const [user, setUser] = React.useState<USER | null>(null);

  // console.log({user});

  const getUser = async () => {
    const res = await axios.get("/auth", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setUser(res.data);
  };
  React.useEffect(() => {
    getUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    props.history.push("/login");
  };

  if (!localStorage.getItem("token")) {
    props.history.push("/login");
  }
  return (
    <div className="m-5">
      <div className="jumbotron">
        <p className="lead">Welcome {user && user.name}</p>
        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;

import axios from "axios";
import React, { useState, useEffect } from "react";
import "./GetUser.css";

import "./Input.css";

const GetUser = () => {
  const [users, setUsers] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  useEffect(() => {
    setLoading(true);
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      // console.log(res.data);
      setSearchedUsers(res.data);
      setUsers(res.data);
    });
    setTimeout(() => {
      setLoading(false);
    }, [1000]);
  }, []);
  const onChangeHandler = (event) => {
    if (event.target.value.length === 0) {
      setSearchedUsers(users);
    }
    const matchedUser = users.filter((user) => {
      return `${user.name}`
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setSearchedUsers(matchedUser);
    setSearchUser(event.target.value);
  };

  if (loading) {
    return (
      <h1
        style={{
          marginTop: "300px",
          color: "gray",
        }}
      >
        Loading...
      </h1>
    );
  }

  return (
    <React.Fragment>
      <div className="input-control">
        <label htmlFor="search">Search for User:</label>
        <input
          type="text"
          id="search"
          autoComplete="off"
          value={searchUser}
          onChange={onChangeHandler}
        />
      </div>
      <div className="table-control">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {searchedUsers.map((user) => {
              return (
                <tr>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default GetUser;

import React, { Component } from "react";
import "./UserList.css";

interface UserListProps {
  searchTerm: string;
}

interface UserListState {
  users: string[];
  filteredUsers: string[];
}

class UserList extends Component<UserListProps, UserListState> {
  constructor(props: UserListProps) {
    super(props);
    console.log("Constructor: Component is initializing.");
    this.state = {
      users: [],
      filteredUsers: [],
    };
  }

  static getDerivedStateFromProps(
    props: UserListProps,
    state: UserListState
  ): Partial<UserListState> | null {
    console.log("getDerivedStateFromProps: Syncing props with state.");
    const filteredUsers = props.searchTerm
      ? state.users.filter((user) =>
          user.toLowerCase().includes(props.searchTerm.toLowerCase())
        )
      : state.users;
    return { filteredUsers };
  }

  async componentDidMount() {
    console.log("componentDidMount: Fetching data after initial render.");
    const users = ["Rijish", "Parul", "Saransh", "Shivam"];
    this.setState({ users, filteredUsers: users });
  }

  render() {
    console.log("Render: Rendering component.");
    return (
      <div className="userlist-container">
        <h4 className="userlist-header">User List</h4>
        <ul className="userlist">
          {this.state.filteredUsers.map((user, index) => (
            <li key={index} className="userlist-item">
              {user}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default UserList;

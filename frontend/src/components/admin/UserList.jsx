const UserList = ({ users, selectedUser, onSelectUser }) => {
  return (
    <div className="space-y-2">
      <button
        onClick={() => onSelectUser(null)}
        className={`w-full text-left px-3 py-2 rounded ${
          !selectedUser
            ? 'bg-indigo-50 text-indigo-700'
            : 'hover:bg-gray-50'
        }`}
      >
        All Users
      </button>
      {users.map((user) => (
        <button
          key={user._id}
          onClick={() => onSelectUser(user)}
          className={`w-full text-left px-3 py-2 rounded ${
            selectedUser?._id === user._id
              ? 'bg-indigo-50 text-indigo-700'
              : 'hover:bg-gray-50'
          }`}
        >
          <div className="font-medium">{user.name}</div>
          <div className="text-sm text-gray-500">{user.email}</div>
        </button>
      ))}
    </div>
  );
};

export default UserList; 
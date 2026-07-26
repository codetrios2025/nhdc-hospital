const UserAvatar = ({ user, size = 42 }) => {
  const initials = () => {
    if (!user) return "A";

    const first = user.firstName ? user.firstName.charAt(0) : "";

    const last = user.lastName ? user.lastName.charAt(0) : "";

    return `${first}${last}`.toUpperCase();
  };

  if (user?.profileImage) {
    return (
      <img
        src={user.profileImage}
        alt={user.fullName}
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
    );
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "#E91E63",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: 600,
        fontSize: 16,
      }}
    >
      {initials()}
    </div>
  );
};

export default UserAvatar;

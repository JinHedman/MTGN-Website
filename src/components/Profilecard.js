const ProfileCard = ({ username, picture, funfact}) => {
    return (
      <div className="bg-indigo-300 shadow-md p-4 rounded-lg w-60 [transform-style = preserve-3d] group-hover:[transfrom:rotateY(180deg)]">
        <img
          src={picture}
          alt={username}
          className="h-32 w-32 mx-auto mb-4 rounded-full object-cover"
        />
        <h1 className="text-center text-xl font-semibold">{funfact}</h1>
        <h1 className="text-center text-xl font-semibold">{username}</h1>
      </div>
    );
  };
  
  export default ProfileCard;
  
import useRole from "../../hooks/useRole";
import useAuth from "../../hooks/useAuth";
import Title from "../../components/Title";

const DashboardHome = () => {
  const { user } = useAuth();
  const { role, isLoading } = useRole();

  if (isLoading) {
    return (
      <span className="bg-base-200 loading loading-infinity loading-xl min-h-screen"></span>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 text-base-content pt-24 min-h-screen bg-base-200">
      {role === "user" && (
        <div className="flex flex-col justify-center items-center text-base-content">
          <Title>Hello! {user?.displayName}</Title>
          <p className="font-semibold opacity-80 mt-12">
            You Can Register to multiple contest as u wish,
            <br /> Explore Your Participated Contests List in a tabular form
            <br /> And submit task to participated contest!!
            <br /> And Get the special prizes!!
            <br />
            Thank You...
          </p>
        </div>
      )}

      {role === "creator" && (
        <div className="text-center">
          <h2 className="text-xl mt-4 font-semibold">
            Hello! {user?.displayName}
          </h2>
          <p className="mt-2 font-semibold text-gray-600">
            You Can Create Contest,
            <br /> Explore Your Created Contests List in a tabular form
            <br /> And Declare a winner!!
            <br />
            Thank You...
          </p>
        </div>
      )}

      {role === "admin" && (
        <div className="text-center">
          <h2 className="text-xl font-semibold">Welcome {user?.displayName}</h2>
          <p className="mt-2 font-semibold text-gray-600">
            Here is the all user list logged in to your website
            <br />
            And the list of requested creator list
            <br />
            Go to left menu to accept a creator request
            <br />
            And you can manage users role as well!
            <br />
            Thanks!
          </p>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;

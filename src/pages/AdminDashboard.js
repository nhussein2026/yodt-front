import PostManagement from "./adminPages/PostManagment";
import ServiceManagement from "./adminPages/ServiceManagment";
import UserManagement from "./adminPages/UserManagement";
import VolunteeringManagement from "./adminPages/VolunteeringManagment";

const AdminDashboard = () => {
  return (
    <div>
      <UserManagement />
      {/* <ServiceManagement />
      <VolunteeringManagement />
      <PostManagement /> */}
    </div>
  );
};
export default AdminDashboard;

export const getPermissionsOfUser = (type) => {
  let permissions = [];
  let role = "";
  switch (type) {
    case "Patient":
      permissions = [
        "login",
        "register",
        "check-appoitments",
        "create-appointment",
      ];
      role = ["patient"];
      break;
    case "Doctor":
      permissions = [
        "update-appointments",
        "check-appoitments",
        "update-appointment-status",
      ];
      role = ["doctor"];
      break;
    case "Admin":
      permissions = [
        "check-appoitments",
        "update-appointments",
        "create-appointment",
        "manage-doctors",
        "manage-patients",
        "update-appointment-status",
      ];
      role = ["admin"];
      break;
    default:
      break;
  }
  return { permissions, role };
};

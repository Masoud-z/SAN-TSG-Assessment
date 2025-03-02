import { Link } from "react-router-dom";
import useCheckPermission from "../../core/utilities/permissionChecker";
import { Permissions } from "../../core/enums/permissions";

interface LinkWithPermissionProps {
  className?: string;
  title: string;
  permission: Permissions;
  to: string;
}

const LinkWithPermission = ({
  className,
  title,
  permission,
  to,
}: LinkWithPermissionProps) => {
  return (
    <>
      {useCheckPermission(permission) && (
        <Link to={to} className={className}>
          {title}
        </Link>
      )}
    </>
  );
};

export default LinkWithPermission;

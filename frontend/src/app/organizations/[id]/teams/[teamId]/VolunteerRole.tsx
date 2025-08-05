"use client";
import React, { useState } from "react";
import { editVolunteerRole, ITeam } from "../teams.service";
import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";

interface VolunteerRoleProps {
  roleId: number;
  roleName: string;
  teamId: number;
}

const VolunteerRole = ({ roleId, roleName, teamId }: VolunteerRoleProps) => {
  const [isEditingRole, setIsEditingRole] = useState(false);
  const [currentRoleId, setCurrentRoleId] = useState(roleId);
  const [currentRoleName, setCurrentRoleName] = useState(roleName);
  const [disableSave, setDisableSave] = useState(true);

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("New role name:", e.target.value);
    setCurrentRoleName(e.target.value);
    if (e.target.value !== roleName) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
    console.log("Input value changed to:", e.target.value);
  };

  const handleSaveRole = (roleId: number, roleName: string, teamId: number) => {
    console.log(
      "Saving role name '",
      currentRoleName,
      "' for original name '",
      roleName,
      "' and roleId",
      roleId
    );
    editVolunteerRole(teamId, roleId, currentRoleName)
      .then((response) => {
        if (response) {
          setCurrentRoleName(currentRoleName);
          setIsEditingRole(false);
        }
      })
      .catch((error) => {
        console.error("Error updating volunteer role:", error);
      });
  };

  const handleEditRole = (roleName: string) => {
    setIsEditingRole(true);
    setCurrentRoleName(roleName);
    setCurrentRoleId(roleId);
    console.log("Editing role:", roleName, roleId);
  };

  const handleCancelEdit = () => {
    setIsEditingRole(false);
    setCurrentRoleName(roleName); // Reset to original role name
  };

  const handleDeleteRole = () => {
    console.log("Delete role:", roleName);
    // API call to delete the role
  };

  return (
    <div className="flex-col gap-4">
      <div className="flex items-center">
        {isEditingRole ? (
          <Input
            placeholder={currentRoleName}
            value={currentRoleName}
            onChange={(e) => handleRoleChange(e)}
          />
        ) : (
          <div className="w-full">{currentRoleName}</div>
        )}
        {isEditingRole ? (
          <>
            <Button
              label="Save"
              onClick={() => handleSaveRole(roleId, roleName, teamId)}
              disabled={disableSave}
            />
            <Button label="Delete this role" onClick={handleDeleteRole} />
            <Button label="Cancel" onClick={handleCancelEdit} />
          </>
        ) : (
          <>
            <Button label="Edit" onClick={() => handleEditRole(roleName)} />
          </>
        )}
      </div>
    </div>
  );
};

export default VolunteerRole;

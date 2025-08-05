"use client";
import React, { useState } from "react";
import { editTeam, ITeam } from "../teams.service";
import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";

interface TeamNameProps {
  originalTeamName: string;
  organizationId: number;
  teamId: number;
}

const TeamName = ({
  originalTeamName,
  organizationId,
  teamId,
}: TeamNameProps) => {
  const [teamName, setTeamName] = useState(originalTeamName);
  const [disabledSave, setDisabledSave] = useState(true);
  const [editingTeamName, setEditingTeamName] = useState(false);

  const handleShowTeamNameInput = () => {
    setEditingTeamName(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("New team name:", e.target.value);
    setTeamName(e.target.value);
    setDisabledSave(false);
  };

  const handleSaveName = (
    organizationId: number,
    teamId: number,
    updatedTeamName: string
  ) => {
    editTeam(organizationId, teamId, teamName)
      .then((response) => {
        if (response.id) {
          setEditingTeamName(false);
        }
      })
      .catch((error) => {
        console.error("Error saving team name:", error);
      });
  };

  const handleCancelEdit = () => {
    setEditingTeamName(false);
    setTeamName(originalTeamName); // Reset to original name
  };

  return (
    <div className="w-full">
      <h1>{teamName}</h1>
      <div className="flex gap-2 items-center">
        <div>Team name: </div>
        {editingTeamName ? (
          <Input
            placeholder={teamName}
            value={teamName}
            onChange={(e) => handleNameChange(e)}
          />
        ) : (
          <div>{teamName}</div>
        )}
        {editingTeamName ? (
          <div className="flex gap-2">
            <Button
              disabled={disabledSave}
              label="Save name"
              onClick={() => handleSaveName(organizationId, teamId, teamName)}
            />
            <Button label="Cancel" onClick={handleCancelEdit} />
          </div>
        ) : (
          <Button label="Edit" onClick={handleShowTeamNameInput} />
        )}
      </div>
    </div>
  );
};

export default TeamName;

"use client";
import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";
import { createTeam, ITeam } from "../teams.service";
import { useState } from "react";
import { IToast, Toast } from "@/app/components/Toast";
import { Card } from "@/app/components/Card";

export const CreateTeamForm = ({ orgId }: { orgId: number }) => {
  const [toast, setToast] = useState<IToast>();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formEntries = Object.fromEntries(formData);
    const team: ITeam = {
      name: formEntries.name as string,
      organization_id: orgId,
    };
    createTeam(team, orgId)
      .then((response) => {
        if (!response.id) {
          throw new Error("Team creation failed");
        } else {
          setToast({ message: "Team created successfully", status: "success" });
          setTimeout(() => {
            window.location.href = `/organizations/${orgId}/teams/${response.id}`;
          }, 2000);
        }
      })
      .catch((error) => {
        setToast({ message: "Team creation failed", status: "error" });
        console.error("Error creating team:", error);
      });
  };
  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          status={toast.status}
          onClose={() => setToast(undefined)}
        />
      )}
      <Card classNames="max-w-100">
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            label="Team name"
            placeholder="Team name"
          />
          <Button label="Create team" name="submit" type="submit" />
        </form>
      </Card>
    </>
  );
};

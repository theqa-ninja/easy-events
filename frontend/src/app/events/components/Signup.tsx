'use client';
import { createSignup, getSignups, ISignup } from "../events.service";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";
import { BinaryRadioInput } from "@/app/components/BinaryRadioInput";
import { Button } from "@/app/components/Button";

export const Signup = ({ eventId } : { eventId: string }) => {
    const signupsData = getSignups(eventId);
    const userId = 1; // TODO: get user id from logged in user
    const signupData = signupsData && signupsData?.length > 0 && signupsData.find(signup => signup.user_id === userId);
    const signup: ISignup = {
        event_id: parseInt(eventId),
        user_id: userId || '',
        user_name: signupData && signupData?.user_name || '',
        user_email: signupData && signupData?.user_email || '',
        user_phone_number: signupData && signupData?.user_phone_number || '',
        user_is_over_18: signupData && signupData?.user_is_over_18 || false,
        notes: signupData && signupData?.notes || '',
    };
    const submitSignup =  (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const body = JSON.stringify(Object.fromEntries(formData));
        createSignup(eventId, JSON.parse(body));
        // TODO: show success or error message in Toast
    }
    return (
        <form onSubmit={submitSignup} className="flex flex-col gap-4 w-100">
            <Input type="text" name="name" placeholder="Name" defaultValue={signup.user_name} />
            <Input type="email" name="email" placeholder="Email" defaultValue={signup.user_email} />
            <Input type="tel" name="phone_number" placeholder="Phone number" defaultValue={signup.user_phone_number} />
            <BinaryRadioInput name="over-18" idA="yes" idB="no" labelA="Yes" labelB="No" question="Are you over 18 years old?" />
            <Textarea name="notes" placeholder="notes..." defaultValue={signup.notes} />

            <Button type="submit" label="Sign up" />
        </form>
    );
};
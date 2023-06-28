"use client";
import { LabelButton } from "@/components/Buttons";
import { sendConfirmEmail } from "@/services/AccountService";
import { errorToast, successToast } from "@/utils/toaster";
import { memo } from "react";

const ConfirmationButton = ({ email }: { email: string }) => {
  return (
    <LabelButton
      id="send-confirmation-btn"
      label="click here to send it again"
      className="text-xl text-violet-500 hover:text-secondary"
      onClick={() => {
        sendConfirmEmail(email, "aa")
          .then(() => {
            successToast("Confirmation email successfully sended, check your inbox or spam directory");
          })
          .catch(err => {
            errorToast(err);
          });
      }}
    />
  );
};
export default memo(ConfirmationButton);

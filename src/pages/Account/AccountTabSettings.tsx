import React from "react";
import { LabelInput } from "../../components/Inputs";
import { IUser } from "../../types/IUser";

const AccountTabSettings = ({ account }: { account?: IUser }) => {
  return (
    <React.Fragment>
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col gap-2 md:w-1/2">
          <LabelInput
            id="uname"
            name="uname"
            type="text"
            label="Name"
            size={40}
            value={account?.uname || ""}
            onChange={() => console.log(1)}
            bgColor="bg-violet-900 bg-opacity-25"
            // onChange={formik.handleChange}
            // onBlur={formik.handleBlur}
            // errors={
            //   formik.touched.cpassword && formik.errors.cpassword
            //     ? formik.errors.cpassword
            //     : undefined
            // }
          />
          <LabelInput
            id="email"
            name="email"
            type="email"
            label="Email"
            size={40}
            value={account?.email || ""}
            onChange={() => console.log(1)}
            bgColor="bg-violet-900 bg-opacity-25"
            disabled
            // onChange={formik.handleChange}
            // onBlur={formik.handleBlur}
            // errors={
            //   formik.touched.cpassword && formik.errors.cpassword
            //     ? formik.errors.cpassword
            //     : undefined
            // }
          />
        </div>
        {/* <div>.</div> */}
      </div>
    </React.Fragment>
  );
};

export default AccountTabSettings;

// import { PageProps } from "@/types/PageProps";

// type DialogNewLinkProps = {
//   isOpen: boolean;
//   page: PageProps;
//   setIsOpen: (value: boolean) => void;
//   savePage: (value: PageProps | undefined) => void;
//   addNewPage?: (page: PageProps) => void;
// };

// const DialogNewLink = ({ isOpen, page, setIsOpen, savePage }: DialogNewLinkProps) => {
//   // const formik = useFormik({
//   //   initialValues: {
//   //     url: "",
//   //     label: "",
//   //     icon: "",
//   //     embedded: "none",
//   //     isFolder: false,
//   //     folderOwner: "",
//   //   } as LinkProps,
//   //   validationSchema: yup.object({
//   //     label: yup.string().required("Label is a required field"),
//   //   }),
//   //   onSubmit: values => {
//   //     linkService
//   //       .createLink(values, page.pagename)
//   //       .then(response => {
//   //         successToast(response.message);
//   //         savePage(response.page);
//   //         setIsOpen(false);
//   //         formik.resetForm();
//   //       })
//   //       .catch(error => {
//   //         errorToast(error.message);
//   //         if (error.errors) formik.setErrors(error.errors);
//   //       })
//   //       .finally(() => formik.setSubmitting(false));
//   //   },
//   // });

//   return (
//     <div>test</div>
//     // <ZozDialog title="Inform your Link infos" isOpen={isOpen} setIsOpen={setIsOpen}>
//     //   <form onSubmit={formik.handleSubmit} className="flex w-full flex-col items-center">
//     //     <div className="mt-4 w-full">
//     //       <ZozRadioGroup
//     //         id="folder"
//     //         label="Type"
//     //         value={formik.values.isFolder ? "folder" : "link"}
//     //         options={[
//     //           {
//     //             value: "link",
//     //             component: <span>Link</span>,
//     //           },
//     //           {
//     //             value: "folder",
//     //             component: <span>Folder</span>,
//     //           },
//     //         ]}
//     //         onChange={(value: string) => {
//     //           formik.setFieldValue("isFolder", value === "folder");
//     //           formik.setFieldValue("embedded", "none");
//     //           formik.setFieldValue("url", "");
//     //           formik.setFieldValue("folderOwner", "");
//     //         }}
//     //       />
//     //     </div>
//     //     <div className="mt-4 w-full">
//     //       <ZozRadioGroup
//     //         id="embedded"
//     //         label="Embedded"
//     //         value={formik.values.embedded}
//     //         disabled={formik.values.isFolder}
//     //         options={[
//     //           {
//     //             value: "none",
//     //             component: <span>None</span>,
//     //           },
//     //           {
//     //             value: "spotify",
//     //             component: <span>Spotify</span>,
//     //             color: "#1ed760",
//     //           },
//     //           {
//     //             value: "youtube",
//     //             component: <span>Youtube</span>,
//     //             color: "#fe0000",
//     //           },
//     //           {
//     //             value: "soundcloud",
//     //             component: <span>Soundcloud</span>,
//     //             color: "#ff5500",
//     //           },
//     //         ]}
//     //         onChange={(value: string) => {
//     //           formik.setFieldValue("embedded", value);
//     //         }}
//     //       />
//     //     </div>
//     //     <div className="mt-4 w-full">
//     //       <AutoCompleteFolders
//     //         label="Inside Folder"
//     //         pagename={page.pagename}
//     //         selected={formik.values.folderOwner}
//     //         disabled={formik.values.isFolder}
//     //         setSelected={value => {
//     //           formik.setFieldValue("folderOwner", value);
//     //         }}
//     //       />
//     //     </div>
//     //     <div className="mt-4 w-full">
//     //       <ZozInput
//     //         id="label"
//     //         name="label"
//     //         type="text"
//     //         label="Label"
//     //         minSize={1}
//     //         size={30}
//     //         value={formik.values.label}
//     //         onChange={formik.handleChange}
//     //         onBlur={formik.handleBlur}
//     //         errors={formik.touched.label && formik.errors.label ? formik.errors.label : undefined}
//     //       />
//     //     </div>
//     //     <div className="mt-4 w-full">
//     //       <ZozInput
//     //         id="url"
//     //         name="url"
//     //         type="text"
//     //         label="Url"
//     //         minSize={1}
//     //         size={150}
//     //         value={formik.values.url}
//     //         onChange={formik.handleChange}
//     //         onBlur={formik.handleBlur}
//     //         disabled={formik.values.isFolder}
//     //       />
//     //     </div>

//     //     <button
//     //       type="submit"
//     //       className={
//     //         "group relative mt-20 flex w-full justify-center rounded border border-transparent " +
//     //         "text-3x1 px-4 py-2 font-medium hover:font-semibold " +
//     //         "bg-violet-700 text-white hover:bg-violet-900 "
//     //       }
//     //     >
//     //       {formik.values.isFolder ? "Add Folder" : "Add Link"}
//     //     </button>
//     //   </form>
//     // </ZozDialog>
//   );
// };

// export default DialogNewLink;

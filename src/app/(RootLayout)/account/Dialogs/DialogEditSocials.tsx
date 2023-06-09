// import React, { useEffect, useState } from "react";
// import { PageProps, PagePropsSocialMedia } from "@/types/PageProps";
// import { PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";
// import Dialog from "@/components/Dialogs";

// type DialogEditSocialsProps = {
//   isOpen: boolean;
//   page: PageProps;
//   setIsOpen: (value: boolean) => void;
//   savePage: (value: PageProps | undefined) => void;
//   addNewPage?: (page: PageProps) => void;
// };

// const DialogEditSocials = ({ isOpen, page, setIsOpen, savePage }: DialogEditSocialsProps) => {
//   const [items, setItems] = useState<PagePropsSocialMedia[]>();
//   const [mediaSelected, setMediaSelected] = useState<string>("discord");

//   useEffect(() => {
//     if (isOpen && page && page.socialMedias) {
//       setItems(Object.assign([], page.socialMedias));
//     }
//   }, [isOpen]);

//   // const formik = useFormik({
//   //   initialValues: {
//   //     username: "",
//   //   },
//   //   validationSchema: yup.object({
//   //     username: yup.string().required("Username is a required field"),
//   //   }),
//   //   onSubmit: values => {
//   //     if (values.username && items && items.length < 30) {
//   //       if (items?.some(item => item.key === mediaSelected)) {
//   //         errorToast("This account has already been added!");
//   //       } else {
//   //         const newItems = Object.assign([], items);
//   //         newItems?.push({
//   //           key: mediaSelected,
//   //           username: values.username,
//   //         });
//   //         setItems(newItems);
//   //       }
//   //       formik.resetForm();
//   //       formik.setSubmitting(false);
//   //     }
//   //   },
//   // });

//   return (
//     <Dialog title="Link your accounts" isOpen={isOpen} setIsOpen={setIsOpen}>
//       <form onSubmit={() => null} className="flex flex-col items-center">
//         {/* SOCIALS ADDED */}
//         <div className="relative mt-2 flex w-full flex-row flex-wrap gap-1 rounded-md bg-secondary/[0.2] p-4">
//           <div className="absolute bottom-0 right-1 text-sm">{items?.length || "0"}/30</div>
//           {/* {items && items.length > 0
//             ? items.map((item, idx) => (
//                 <div key={idx} className="flex flex-col outline-0">
//                   <PageIcon key={idx} media={item} />
//                   <div className="flex flex-col items-center">
//                     <XMarkIcon
//                       className="w-7 cursor-pointer font-bold text-red-700 hover:text-red-600"
//                       onClick={() => {
//                         const newItems = items.filter(value => {
//                           return !(item.key === value.key && item.username === value.username);
//                         });
//                         setItems(newItems);
//                       }}
//                     />
//                   </div>
//                 </div>
//               ))
//             : null} */}
//         </div>
//         {/* SOCIALS INPUTS */}
//         <div className="mt-4 w-full">
//           {/* <ZozAutoComplete
//             id="social"
//             name="social"
//             type="text"
//             label="Account"
//             selected={mediaSelected}
//             list={socialIconsList}
//             setSelected={setMediaSelected}
//           /> */}
//         </div>
//         <div className="mt-4 w-full">
//           {/* <ZozInput
//             id="username"
//             name="username"
//             type="text"
//             label="Username / Link "
//             minSize={1}
//             size={60}
//             value={formik.values.username}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             errors={formik.touched.username && formik.errors.username ? formik.errors.username : undefined}
//           /> */}
//         </div>
//         {/* {mediaSelected ? (
//           <div className="mt-4 w-full break-words text-gray-400">
//             {getSocialIcon(mediaSelected)?.url?.("") ? (
//               <React.Fragment>
//                 ↪ will open this url
//                 <br />
//                 <a
//                   className="group flex flex-row hover:text-gray-200"
//                   href={getSocialIcon(mediaSelected)?.url?.(formik.values.username)}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   {getSocialIcon(mediaSelected)?.url?.("")}
//                   <span className="group text-indigo-500 group-hover:text-indigo-400">
//                     <span className="flex group-hover:hidden">
//                       {formik.values.username || "😠 fill the required input"}
//                     </span>
//                     <span className="hidden group-hover:flex">
//                       {formik.values.username || "😡 fill the required input"}
//                     </span>
//                   </span>
//                 </a>
//               </React.Fragment>
//             ) : (
//               <React.Fragment>
//                 ↪ will be copied to clipboard:
//                 <br />
//                 <span
//                   className="group h-full cursor-pointer text-indigo-500"
//                   onClick={() => {
//                     successToast(`Copied: ${formik.values.username}`);
//                     if (navigator.clipboard) {
//                       navigator.clipboard.writeText(formik.values.username);
//                     }
//                   }}
//                 >
//                   <span className="flex group-hover:hidden">
//                     {formik.values.username || "😠 fill the required input"}
//                   </span>
//                   <span className="hidden group-hover:flex">
//                     {formik.values.username || "😡 fill the required input"}
//                   </span>
//                 </span>
//               </React.Fragment>
//             )}
//           </div>
//         ) : null} */}
//         <button
//           type="submit"
//           className={
//             "w-18 group relative mt-4 flex flex-row items-center justify-center rounded " +
//             "text-3x1 px-4 py-2 font-medium hover:font-semibold " +
//             "bg-violet-700 text-white hover:bg-violet-900 "
//           }
//         >
//           <PlusIcon className="w-6" />
//           Add
//         </button>

//         {/* <button
//           type="button"
//           className={
//             "group relative mt-20 flex w-full justify-center rounded border border-transparent " +
//             "text-3x1 px-4 py-2 font-medium hover:font-semibold " +
//             "bg-violet-700 text-white hover:bg-violet-900 "
//           }
//           onClick={() => {
//             if (items)
//               pageService
//                 .saveSocialMedia(items, page.pagename)
//                 .then(response => {
//                   successToast(response.message);
//                   savePage(response.page);
//                   setIsOpen(false);
//                 })
//                 .catch(error => {
//                   errorToast(error.message);
//                 });
//           }}
//         >
//           Save
//         </button> */}
//       </form>
//     </Dialog>
//   );
// };

// export default DialogEditSocials;

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-duplicate-props */
import { Button, Input, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";

import { Formik } from "formik";
import { object, string } from "yup";
import useAuthCalls from "../services/useAuthCalls";

const EditModal = ({ showModal, setShowModal, user }) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);
  const { editProfile } = useAuthCalls();

  let editSchema = object({
    email: string().email("Lütfen geçerli bir email giriniz"),
    username: string("Lütfen geçerli bir username giriniz"),
    firstName: string().required("Lütfen adınızı giriniz"),
    lastName: string().required("Lütfen soyadınızı giriniz"),
    password: string()
      .required("Şifre zorunludur.")
      .min(8, "Şifre en az 8 karakter içermelidir")
      .max(16, "Şifre en fazLa 16 karakter içermelidir")
      .matches(/\d+/, "Şifre en az bir rakam içermelidir")
      .matches(/[a-z]/, "Şifre en az bir küçük harf içermelidir")
      .matches(/[A-Z]/, "Şifre en az bir büyük harf içermelidir")
      .matches(
        /[@$!%*?&]+/,
        "Şifre en az bir özel karakter (@$!%*?&) içermelidir"
      ),
  });

  return (
    <div className="w-full h-full fixed top-0 left-0 bg-black/50 flex justify-center items-center">
      <h1>Edit Modal</h1>
      <Formik
        initialValues={{
          email: user?.email || "",
          password: user?.password || "",
          username: user?.username || "",
          firstName: user?.firstName || "",
          lastName: user?.lastName || "",
        }}
        validationSchema={editSchema}
        onSubmit={(values, actions) => {
          console.log("values :>> ", values);
          editProfile(user._id, values);
          actions.resetForm();
          actions.setSubmitting(false);
          setShowModal(!showModal);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,

          /* and other goodies */
        }) => (
          <form
            onSubmit={handleSubmit}
            className=" text-left bg-blue-100 p-4 rounded-lg shadow-2xl w-[50%] md:w-[40%] "
          >
            <div className="mb-3">
              <label htmlFor="username">
                <Typography
                  variant="small"
                  className="mb-1 block font-medium text-gray-900"
                >
                  Your UserName
                </Typography>
              </label>
              <Input
                id="username"
                color="gray"
                size="lg"
                type="text"
                name="username"
                placeholder="xxxxx"
                className="w-full placeholder:opacity-100 focus:border-t-purple-500 bg-white border-t-blue-gray-500"
                labelProps={{
                  className: "hidden",
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
              />
              {errors.username && touched.username ? (
                <p className="text-red-500 text-sm">{errors.username}</p>
              ) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="email">
                <Typography
                  variant="small"
                  className="mb-1 block font-medium text-gray-900"
                >
                  Your Email
                </Typography>
              </label>
              <Input
                id="email"
                color="gray"
                size="lg"
                type="email"
                name="email"
                placeholder="name@mail.com"
                className="w-full placeholder:opacity-100 focus:border-t-purple-500 bg-white border-t-blue-gray-500"
                labelProps={{
                  className: "hidden",
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email ? (
                <p className="text-red-500 text-sm">{errors.email}</p>
              ) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="password">
                <Typography
                  variant="small"
                  className="mb-1 block font-medium text-gray-900"
                >
                  Password
                </Typography>
              </label>
              <Input
                size="lg"
                id="password"
                placeholder="Enter Your New Password ***"
                labelProps={{
                  className: "hidden",
                }}
                className="w-full placeholder:opacity-100 focus:border-t-purple-500 bg-white border-t-blue-gray-500"
                type={passwordShown ? "text" : "password"}
                icon={
                  <i onClick={togglePasswordVisiblity}>
                    {passwordShown ? (
                      <EyeIcon className="h-5 w-5" />
                    ) : (
                      <EyeSlashIcon className="h-5 w-5" />
                    )}
                  </i>
                }
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password ? (
                <p className="text-red-500 text-sm">{errors.password}</p>
              ) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="firstName">
                <Typography
                  variant="small"
                  className="mb-1 block font-medium text-gray-900"
                >
                  Your FirstName
                </Typography>
              </label>
              <Input
                id="firstName"
                color="gray"
                size="lg"
                type="text"
                name="firstName"
                placeholder="xxxxx"
                className="w-full placeholder:opacity-100 focus:border-t-purple-500 bg-white border-t-blue-gray-500"
                labelProps={{
                  className: "hidden",
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
              />
              {errors.firstName && touched.firstName ? (
                <p className="text-red-500 text-sm">{errors.firstName}</p>
              ) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="firstName">
                <Typography
                  variant="small"
                  className="mb-1 block font-medium text-gray-900"
                >
                  Your LastName
                </Typography>
              </label>
              <Input
                id="lastName"
                color="gray"
                size="lg"
                type="text"
                name="lastName"
                placeholder="xxxxx"
                className="w-full placeholder:opacity-100 focus:border-t-purple-500 bg-white border-t-blue-gray-500"
                labelProps={{
                  className: "hidden",
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
              />
              {errors.lastName && touched.lastName ? (
                <p className="text-red-500 text-sm">{errors.lastName}</p>
              ) : null}
            </div>
            <div className="flex flex-col md:flex-row  gap-2">
              <Button
                type="submit"
                color="green"
                size="lg"
                className="hover:opacity-70 mt-4"
                fullWidth
              >
                Edit Your Profile
              </Button>
              <Button
                type="button"
                color="orange"
                size="lg"
                fullWidth
                className="hover:opacity-70 mt-4"
                onClick={() => setShowModal(!showModal)}
              >
                Close Modal
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default EditModal;

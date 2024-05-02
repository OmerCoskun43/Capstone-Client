import { useState } from "react";
import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { object, string } from "yup";
import useAuthCalls from "../services/useAuthCalls";

export function Register() {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

  const { register } = useAuthCalls();

  let registerSchema = object({
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
    <section className="flex flex-col justify-center items-center  gap-3 lg:flex-row text-center p-4 md:p-6">
      <div className="w-[95%] h-auto   lg:w-[40%] border-2 border-black rounded-lg p-2 bg-blue-gray-50">
        <Typography variant="h4" color="blue-gray" className="mb-2">
          Register
        </Typography>
        <Formik
          initialValues={{
            email: "",
            password: "",
            username: "",
            firstName: "",
            lastName: "",
          }}
          validationSchema={registerSchema}
          onSubmit={(values, actions) => {
            // console.log("values :>> ", values);
            register(values);
            actions.resetForm();
            actions.setSubmitting(false);
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
            <form onSubmit={handleSubmit} className=" text-left">
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
                  placeholder="********"
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
              <Button
                type="submit"
                color="gray"
                size="lg"
                className="mt-4"
                fullWidth
              >
                Register
              </Button>

              <Typography
                variant="small"
                color="gray"
                className="mt-4 text-center font-normal"
              >
                Do you have an account?{" "}
                <Link to="/login" className="font-medium text-gray-900">
                  Sign In
                </Link>
              </Typography>
            </form>
          )}
        </Formik>
      </div>
      <div className="w-[95%] lg:w-[40%]  ">
        <img
          src="https://source.unsplash.com/random"
          alt="image"
          className="h-[34.5rem] rounded-lg w-full object-center"
        />
      </div>
    </section>
  );
}

export default Register;

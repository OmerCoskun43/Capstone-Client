/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-duplicate-props */
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import { Formik } from "formik";
import { object, string } from "yup";
import useBlogCalls from "../services/useBlogCalls";

const EditModal = ({ showModal, setShowModal, blog }) => {
  const { editBlog } = useBlogCalls();

  let editSchema = object({
    title: string("Lütfen geçerli bir title giriniz"),
    content: string("Lütfen geçerli bir content giriniz"),
    image: string("Lütfen geçerli bir image URL giriniz"),
  });
  console.log("blog :>> ", blog);

  return (
    <div className="w-full h-full fixed top-0 left-0 z-10 bg-black/50 flex flex-col justify-center items-center">
      <h1 className="text-3xl text-center text-red-600 bg-white rounded-lg px-3 py-1">
        Edit Blog
      </h1>
      <Formik
        initialValues={{
          title: blog?.title || "",
          content: blog?.content || "",
          image: blog?.image || "",
        }}
        validationSchema={editSchema}
        onSubmit={(values, actions) => {
          //   console.log("values :>> ", values);
          editBlog(blog._id, values);
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
              <label htmlFor="title">
                <Typography
                  variant="small"
                  className="mb-1 block font-medium text-gray-900"
                >
                  Your Title
                </Typography>
              </label>
              <Input
                id="title"
                color="gray"
                size="lg"
                type="text"
                name="title"
                placeholder="xxxxx"
                className="w-full placeholder:opacity-100 focus:border-t-purple-500 bg-white border-t-blue-gray-500"
                labelProps={{
                  className: "hidden",
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
              {errors.title && touched.title ? (
                <p className="text-red-500 text-sm">{errors.title}</p>
              ) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="content">
                <Typography
                  variant="small"
                  className="mb-1 block font-medium text-gray-900"
                >
                  Your content
                </Typography>
              </label>
              <Textarea
                id="content"
                color="gray"
                size="lg"
                type="text"
                name="content"
                placeholder="xxxxx"
                className="w-full placeholder:opacity-100 focus:border-t-purple-500 bg-white border-t-blue-gray-500"
                labelProps={{
                  className: "hidden",
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.content}
              ></Textarea>
              {errors.content && touched.content ? (
                <p className="text-red-500 text-sm">{errors.content}</p>
              ) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="image">
                <Typography
                  variant="small"
                  className="mb-1 block font-medium text-gray-900"
                >
                  Your LastName
                </Typography>
              </label>
              <Input
                id="image"
                color="gray"
                size="lg"
                type="text"
                name="image"
                placeholder="xxxxx"
                className="w-full placeholder:opacity-100 focus:border-t-purple-500 bg-white border-t-blue-gray-500"
                labelProps={{
                  className: "hidden",
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.image}
              />
              {errors.image && touched.image ? (
                <p className="text-red-500 text-sm">{errors.image}</p>
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
                Edit Your Blog
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

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-duplicate-props */
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import { useEffect } from "react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";

import { Formik } from "formik";
import { object, string } from "yup";
import useAuthCalls from "../services/useAuthCalls";
import useBlogCalls from "../services/useBlogCalls";
import { useSelector } from "react-redux";

const CreateBlog = () => {
  const { user } = useSelector((state) => state.auth);
  const { getCategories, createBlog } = useBlogCalls();
  const { categories } = useSelector((state) => state.blog);

  useEffect(() => {
    getCategories();
  }, []);

  let createSchema = object({
    title: string().required("Lütfen geçerli bir title giriniz"),
    content: string().required("Lütfen geçerli bir content giriniz"),
    image: string().required("Lütfen geçerli bir image url giriniz"),
    categoryId: string().required("Lütfen geçerli bir category giriniz"),
  });

  return (
    <div className="flex justify-center flex-col items-center pt-4">
      <h1 className="text-xl md:text-3xl text-center mb-4 text-red-600">
        Create Blog
      </h1>
      <Formik
        initialValues={{
          userId: user?._id,
          categoryId: "",
          title: "",
          content: "",
          image: "",
        }}
        validationSchema={createSchema}
        onSubmit={(values, actions) => {
          console.log("values :>> ", values);
          createBlog(values);
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
          <form
            onSubmit={handleSubmit}
            className=" text-left bg-blue-100 p-4 rounded-lg shadow-2xl w-[90%] md:w-[80%] "
          >
            <div className="mb-3">
              <label htmlFor="title">
                <Typography
                  variant="small"
                  className="mb-1 block font-medium text-gray-900"
                >
                  Title
                </Typography>
              </label>
              <Input
                id="title"
                color="gray"
                size="lg"
                type="text"
                name="title"
                placeholder="Title"
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
                  Content
                </Typography>
              </label>
              <Textarea
                id="content"
                color="gray"
                size="lg"
                rows={8}
                type="content"
                name="content"
                placeholder="content"
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
                  Image
                </Typography>
              </label>
              <Input
                size="lg"
                id="image"
                name="image"
                placeholder="Enter Your New image URL"
                labelProps={{
                  className: "hidden",
                }}
                className="w-full placeholder:opacity-100 focus:border-t-purple-500 bg-white border-t-blue-gray-500"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.image}
              />
              {errors.image && touched.image ? (
                <p className="text-red-500 text-sm">{errors.image}</p>
              ) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="Category">
                <Typography
                  variant="small"
                  className="mb-1 block font-medium text-gray-900"
                >
                  Category
                </Typography>
              </label>

              <select
                name="categoryId"
                id="categoryId"
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full placeholder:opacity-100 focus:border-t-purple-500 bg-white border-t-blue-gray-500 py-3 px-2 rounded-lg"
                value={values.categoryId}
              >
                <option value="" disabled>
                  Categories
                </option>
                {categories?.map((category) => (
                  <option
                    value={category._id}
                    key={category._id}
                    className="w-full"
                  >
                    {category.name}
                  </option>
                ))}
              </select>

              {errors.categoryId && touched.categoryId ? (
                <p className="text-red-500 text-sm">{errors.categoryId}</p>
              ) : null}
            </div>

            <div className="flex flex-col md:flex-row  gap-2">
              <Button
                type="submit"
                color="green"
                size="lg"
                className="hover:opacity-80 mt-4"
                fullWidth
              >
                Create Blog
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default CreateBlog;

// Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda suscipit, totam delectus cumque explicabo laudantium asperiores praesentium cum neque possimus ab ea expedita odit vero ratione eum id incidunt, cupiditate aperiam fugit voluptatibus. Cupiditate cumque odit, ratione ad iusto dolorem illo, quaerat sequi aperiam dolor possimus dicta doloribus alias ab incidunt ullam modi! Quidem beatae debitis totam accusamus provident sint eos, necessitatibus nulla consequatur incidunt numquam quam est voluptatum saepe voluptates harum commodi explicabo quisquam earum. Ab soluta repellat accusantium esse obcaecati ipsum tempore vel corrupti beatae amet, placeat nisi labore minima, minus natus. Porro aliquid omnis corporis, quo pariatur sapiente excepturi sint incidunt? Perferendis amet reprehenderit ullam, animi accusamus consequuntur asperiores cum quam dolores natus fugit exercitationem repudiandae, necessitatibus voluptatibus rerum. Doloremque, aliquam! Sit et officia accusantium quidem consectetur voluptatum ipsa. Facere debitis reprehenderit deleniti. Nemo, deleniti aperiam ad, animi quam unde rerum autem, placeat earum voluptatem sunt temporibus. Beatae accusantium repellat ipsam expedita eveniet corporis quae inventore fugit recusandae. Excepturi deleniti assumenda delectus! Laboriosam ab ipsum deleniti sed, praesentium repudiandae. Sapiente corporis assumenda incidunt? Tempore ex blanditiis, commodi dolores ullam aliquid nobis illo! Et atque, fugiat porro, reiciendis ea optio ex dicta facilis animi placeat quasi quidem voluptate!

import axios from "../../api/axios";

/*  CREATE  */
// FormData expected (name, category, status, description, image)
export const addSubCategory = (formData) => {
  return axios.post("/subcategories", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/*  GET ALL */
export const getSubCategories = () => {
  return axios.get("/subcategories");
};

/*  GET BY CATEGORY  */
export const getSubByCategory = (categoryId) => {
  return axios.get(`/subcategories/category/${categoryId}`);
};

/*  UPDATE  */
// image optional
export const updateSubCategory = (id, formData) => {
  return axios.put(`/subcategories/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/* DELETE  */
export const deleteSubCategory = (id) => {
  return axios.delete(`/subcategories/${id}`);
};

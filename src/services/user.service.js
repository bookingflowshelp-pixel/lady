import axiosInstance from "../utils/axiosInstance";

export const StaffregisterAPI = async (fullName, phone, email, password) => {
  if (typeof window === "undefined") return;
  try {
    const response = await axiosInstance.post("/api/user/register", {
      fullName,
      phone,
      email,
      password,
    });
    return response;
  } catch (error) {
    console.error("Error during user registration:", error);
    throw error;
  }
};

export const createCategoryAPI = async (form) => {
  try {
    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("slug", form.slug);
    formData.append("shortDescription", form.shortDescription || "");
    formData.append("metaTitle", form.metaTitle || "");
    formData.append("metaDescription", form.metaDescription || "");

    if (form.imageFile) {
      formData.append("image", form.imageFile);
    }

    const response = await axiosInstance.post(
      "/api/category/createcategory",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const createVideoAPI = async (payload) => {
  try {
    const formData = new FormData();

    formData.append("title", payload.title);
    formData.append("slug", payload.slug);
    formData.append("category", payload.category);   
    formData.append("tags", payload.tags || "");     
    formData.append("shortDescription", payload.shortDescription || "");
    formData.append("metaTitle", payload.metaTitle || "");
    formData.append("metaDescription", payload.metaDescription || "");
    formData.append("videoUrl", payload.videoUrl);
    formData.append("duration", payload.duration || "");
    formData.append("description", payload.description || "");

    if (payload.thumbnail) {
      formData.append("thumbnail", payload.thumbnail);
    }

    const response = await axiosInstance.post(
      "/api/video/createvideo", // your video create route
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error creating video:", error);
    throw error;
  }
};

export const getVideosAPI = async () => {
  try {
    const response = await axiosInstance.get("/api/video/getvideodashoard");
    return response;
  } catch (error) {
    console.error("Error during user registration:", error);
    throw error;
  }
};

export const getAllVideosAPI = async () => {
  try {
    const response = await axiosInstance.get("/api/video/getallvideo");
    return response;
  } catch (error) {
    console.error("Error during user registration:", error);
    throw error;
  }
};

export const deleteVideoAPI = async (id) => {
  if (typeof window === "undefined") return;
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("User is not logged in");
  }
  try {
    const response = await axiosInstance.post(
      "/api/video/deletevideo",
      {
        id,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error during user registration:", error);
    throw error;
  }
};

export const acceptVideoAPI = async (id) => {
  if (typeof window === "undefined") return;
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("User is not logged in");
  }
  try {
    const response = await axiosInstance.post(
      "/api/video/acceptvideo",
      {
        id,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error during user registration:", error);
    throw error;
  }
};

export const deleteCategoryAPI = async (id) => {
  if (typeof window === "undefined") return;
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("User is not logged in");
  }
  try {
    const response = await axiosInstance.post(
      "/api/category/deletecategory",
      {
        id,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error during user registration:", error);
    throw error;
  }
};

export const acceptCategoryAPI = async (id) => {
  if (typeof window === "undefined") return;
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("User is not logged in");
  }
  try {
    const response = await axiosInstance.post(
      "/api/category/acceptcategpry",
      {
        id,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error during user registration:", error);
    throw error;
  }
};

export const getCategoriesAPI = async () => {
  try {
    const response = await axiosInstance.get("/api/category/getcategorydashoard");
    return response;
  } catch (error) {
    console.error("Error during user registration:", error);
    throw error;
  }
};

export const getCategoryAPI = async () => {
  try {
    const response = await axiosInstance.get("/api/video/getallcategory");
    return response;
  } catch (error) {
    console.error("Error during user registration:", error);
    throw error;
  }
};

export const getlastBlogsAPI = async () => {
  try {
    const response = await axiosInstance.get("/api/blog/getlastBlogs");
    return response;
  } catch (error) {
    console.error("Error during user registration:", error);
    throw error;
  }
};

export const userLoginAPI = async (email, password) => {
  try {
    const response = await axiosInstance.post("/api/user/login", {
      email: email,
      password: password,
    });
    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const getallblogsAPI = async () => {
  try {
    const response = await axiosInstance.get("/api/blog/getallblogs");
    return response;
  } catch (error) {
    console.error("Error during user registration:", error);
    throw error;
  }
};

export const getblogsAPI = async () => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("User is not logged in");
  }
  try {
    const response = await axiosInstance.get("/api/blog/getblogs", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error during user registration:", error);
    throw error;
  }
};

export const getSingleBlogAPI = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/blog/${id}`);
    return response;
  } catch (error) {
    console.error("Error during user registration:", error);
    throw error;
  }
};

export const createBlogAPI = async (data) => {
  if (typeof window === "undefined") return;
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("User is not logged in");
  }
  const {
    postTitle,
    slug,
    category,
    tags,
    metaTitle,
    metaDescription,
    featuredImageAlt,
    content,
    featuredImage,
  } = data;

  try {
    const formData = new FormData();
    formData.append("postTitle", postTitle);
    formData.append("slug", slug);
    formData.append("category", category);
    formData.append("tags", tags);
    formData.append("metaTitle", metaTitle);
    formData.append("metaDescription", metaDescription);
    formData.append("featuredImageAlt", featuredImageAlt);
    formData.append("content", content);
    formData.append("featuredImage", featuredImage);

    const response = await axiosInstance.post("/api/blog/AddBlog", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error during blog creation:", error);
    throw error;
  }
};

export const rejectblogAPI = async (id) => {
  if (typeof window === "undefined") return;
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("User is not logged in");
  }
  try {
    const response = await axiosInstance.post(
      "/api/blog/delete",
      {
        id,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error during user registration:", error);
    throw error;
  }
};

export const acceptblogAPI = async (id) => {
  if (typeof window === "undefined") return;
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("User is not logged in");
  }
  try {
    const response = await axiosInstance.post(
      "/api/blog/accepctblog",
      {
        id,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error during user registration:", error);
    throw error;
  }
};

/* ================= GET ALL PUBLIC PRODUCTS ================= */
export const getAllProductsAPI = async () => {
  try {
    const response = await axiosInstance.get("/api/product/getallproducts");
    return response;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

/* ================= GET PRODUCTS (ADMIN / USER) ================= */
export const getProductsAPI = async () => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("User is not logged in");
  }

  try {
    const response = await axiosInstance.get("/api/product/getproducts", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

/* ================= GET SINGLE PRODUCT ================= */
export const getSingleProductAPI = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/product/${id}`);
    return response;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

/* ================= CREATE PRODUCT ================= */
export const createProductAPI = async (data) => {
  if (typeof window === "undefined") return;

  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("User is not logged in");
  }

  const {
    title,
    slug,
    price,
    discountPrice,
    category,
    tags,
    shortDescription,
    metaTitle,
    metaDescription,
    description,
    mainImage,
    gallery,
  } = data;

  try {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("price", price);
    formData.append("discountPrice", discountPrice);
    formData.append("category", category);
    formData.append("tags", tags);
    formData.append("shortDescription", shortDescription);
    formData.append("metaTitle", metaTitle);
    formData.append("metaDescription", metaDescription);
    formData.append("description", description);
    formData.append("mainImage", mainImage);

    gallery.forEach((img) => {
      formData.append("gallery", img);
    });

    const response = await axiosInstance.post(
      "/api/product/addproduct",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

/* ================= REJECT PRODUCT ================= */
export const rejectProductAPI = async (id) => {
  if (typeof window === "undefined") return;

  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("User is not logged in");
  }

  try {
    const response = await axiosInstance.post(
      "/api/product/delete",
      { id },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error rejecting product:", error);
    throw error;
  }
};

/* ================= ACCEPT PRODUCT ================= */
export const acceptProductAPI = async (id) => {
  if (typeof window === "undefined") return;

  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("User is not logged in");
  }

  try {
    const response = await axiosInstance.post(
      "/api/product/acceptproduct",
      { id },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error accepting product:", error);
    throw error;
  }
};

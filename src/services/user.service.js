import axiosInstance from "../utils/axiosInstance";

export const callToBackend = async (userId, transaction_id, plan_id) => {
  if (typeof window === "undefined") return;
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("User is not logged in");
  }
  try {
    const response = await axiosInstance.post(
      "/api/user/subscription/create",
      {
        userId,
        transaction_id,
        plan_id,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating subscription:", error);
    throw error;
  }
};

export const userRegisterAPI = async (name, email, password, phoneNumber) => {
  if (typeof window === "undefined") return;
  try {
    const response = await axiosInstance.post("/api/user/register", {
      name,
      email,
      password,
      phoneNumber,
    });
    return response;
  } catch (error) {
    console.error("Error during user registration:", error);
    throw error;
  }
};

export const internregisterAPI = async (fullName, phone, email, password) => {
  if (typeof window === "undefined") return;
  try {
    const response = await axiosInstance.post("/api/intern/register", {
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

export const StaffregisterAPI = async (fullName, phone, email, password) => {
  if (typeof window === "undefined") return;
  try {
    const response = await axiosInstance.post("/api/staff/register", {
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

export const DeleteAdmin = async (id) => {
  if (typeof window === "undefined") return;
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("User is not logged in");
  }
  try {
    const response = await axiosInstance.post(
      "/api/admin/delete",
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



export const createVideoAPI = async (data) => {
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
    iframeUrl,
    contactContent,
    featuredImage,
  } = data;

  try {
    const formData = new FormData();

    formData.append("postTitle", postTitle);
    formData.append("slug", slug);
    formData.append("category", category || "");
    formData.append("tags", tags || "");
    formData.append("metaTitle", metaTitle);
    formData.append("metaDescription", metaDescription);
    formData.append("featuredImageAlt", featuredImageAlt || "");

    // ✅ VIDEO FIELDS
    formData.append("iframeUrl", iframeUrl);
    formData.append("contactContent", contactContent);

    // ✅ IMAGE
    formData.append("featuredImage", featuredImage);

    const response = await axiosInstance.post("/api/video/add", formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error during video creation:", error);
    throw error;
  }
};

export const sendinternappliAPI = async (formData) => {
  try {
    const response = await axiosInstance.post(
      "/api/intern/sendinternappli",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error during blog creation:", error);
    throw error;
  }
};



export const getvideosAPI = async () => {
  try {
    const response = await axiosInstance.get("/api/video/getvideos");
    return response;
  } catch (error) {
    console.error("Error during user registration:", error);
    throw error;
  }
};

export const getallinternAPI = async () => {
  try {
    const response = await axiosInstance.get("/api/intern/getinterns");
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

export const getlastBlogsAPI = async () => {
  try {
    const response = await axiosInstance.get("/api/blog/getlastBlogs");
    return response;
  } catch (error) {
    console.error("Error during user registration:", error);
    throw error;
  }
};

export const getSingleBlogAPI = async (slug) => {
  console.log('====================================');
  console.log(slug);
  console.log('====================================');
  try {
    const response = await axiosInstance.get(`/api/video/${slug}`);
    return response;
  } catch (error) {
    console.error("Error during user registration:", error);
    throw error;
  }
};

export const getalladminAPI = async () => {
  if (typeof window === "undefined") return;
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("User is not logged in");
  }
  try {
    const response = await axiosInstance.get("/api/admin/getalladmins", {
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
export const getallListAPI = async () => {
  if (typeof window === "undefined") return;
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("User is not logged in");
  }
  try {
    const response = await axiosInstance.get("/api/task/getalllist", {
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

export const userLoginAPI = async (email, password) => {
  if (typeof window === "undefined") return;
  console.log(email, password);

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



export const rejectvideoAPI = async (id) => {
  if (typeof window === "undefined") return;
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("User is not logged in");
  }
  try {
    const response = await axiosInstance.post(
      "/api/video/delete",
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


export const acceptvideoAPI = async (id) => {
  if (typeof window === "undefined") return;
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("User is not logged in");
  }
  try {
    const response = await axiosInstance.post(
      "/api/video/accepctblog",
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

export const UpdateTaskStatusID = async (id, newStatus) => {
  if (typeof window === "undefined") return;
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("User is not logged in");
  }
  console.log(id, newStatus);

  try {
    const response = await axiosInstance.post(
      "/api/task/updatestatus",
      {
        id,
        newStatus,
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

export const getsendnewPasssword = async (id, otp, newPassword) => {
  if (typeof window !== "undefined")
    try {
      const response = await axiosInstance.post(
        `/api/user/forgot-password/${id}/${otp}`,
        { newPassword }
      );
      return response;
    } catch (error) {
      console.error("Error during user registration:", error);
      throw error;
    }
};

export const getsendEmail = async (email, option) => {
  if (typeof window === "undefined") return;

  let endpoint = "";
  switch (option) {
    case "password":
      endpoint = "/api/user/forgot-password";
      break;
    case "email":
      endpoint = "/api/user/change-email";
      break;
    default:
      throw new Error("Invalid option selected");
  }

  try {
    const response = await axiosInstance.post(endpoint, { email });
    return response;
  } catch (error) {
    console.error(`Error during ${option} update:`, error);
    throw error;
  }
};

// axios other domain https://backend-booking-as.vercel.app
import axios from "axios";

const otherDomainAxios = axios.create({
  baseURL: "https://backend-booking-as.vercel.app",
});

export const createbookingAPI = async (
  clientName,
  age,
  message,
  email,
  serviceType,
  phoneNumber,
  dateTime,
  gender,
  user
) => {
  console.log(
    clientName,
    age,
    message,
    email,
    serviceType,
    phoneNumber,
    dateTime,
    gender,
    user
  );

  try {
    const response = await otherDomainAxios.post(
      "/api/booking/createbookingbyid",
      {
        clientName,
        age,
        message,
        email,
        serviceType,
        phoneNumber,
        dateTime,
        gender,
        user,
      }
    );
    return response;
  } catch (error) {
    console.error("Error during user registration:", error);
    throw error;
  }
};

export const getallpricesAPI = async ({ user }) => {
  try {
    const response = await otherDomainAxios.post(
      "/api/price/getallpricesbyid",
      { user }
    );
    return response;
  } catch (error) {
    console.error("Error during user registration:", error);
    throw error;
  }
};

export const getProfileData = async (user) => {
  try {
    const response = await otherDomainAxios.post("/api/design/getProfileData", {
      user,
    });
    return response;
  } catch (error) {
    console.error("Error during user registration:", error);
    throw error;
  }
};

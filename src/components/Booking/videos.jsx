"use client";
import { useState } from "react";
import Select from "./Select";

import Addvideo from "./Addvideo/Addvideo";
import Showvideos from "./Showvideos/Showvideos";

const ManageVideo = () => {
  const [activeTab, setActiveTab] = useState("Add blog");
  const renderContent = () => {
    switch (activeTab) {
      case "Add Video":
        return <Addvideo />;
      case "Show Videos":
        return <Showvideos />;
      default:
        return <Addvideo />;
    }
  };

  return (
    <div className=" bg-gray-100   min-h-screen">
      <div>
        <Select activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      <div>{renderContent()}</div>
    </div>
  );
};

export default ManageVideo;

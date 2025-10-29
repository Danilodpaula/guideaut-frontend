import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

import { useI18n } from "../../../../shared/i18n";

const RecommendationsHome: React.FC = () => {
  const { translate } = useI18n();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center gap-6 min-h-[calc(100vh-56px)] bg-[var(--color-bg-layout)] text-[var(--color-text)] text-center transition-colors duration-300">
      <h1 className="text-[1.8rem] font-semibold tracking-wider text-[var(--color-text)] m-0">
        {translate({ id: "recommendations.home.title" })}
      </h1>

      <div className="grid gap-3 w-[220px]">
        <Button 
          className="font-medium tracking-wider"
          onClick={() => navigate("/recommendations/page")}
        >
          {translate({ id: "recommendations.button.access.page" })}
        </Button>
        <Button 
          className="font-medium tracking-wider"
          onClick={() => navigate("/")}
        >
          {translate({ id: "button.home" })}
        </Button>
      </div>
    </div>
  );
};

export default RecommendationsHome;

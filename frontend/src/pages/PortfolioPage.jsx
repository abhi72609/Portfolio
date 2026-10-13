import { useSearchParams } from "react-router-dom";
import TemplateRenderer from "../components/templates/TemplateRenderer";

const defaultPortfolioData = {
  name: "Alex Morgan",
  role: "Software Developer",
  about:
    "I build thoughtful digital experiences with clean code and purposeful design.",
  projects: [
    {
      id: 1,
      title: "Personal Portfolio",
      description:
        "A responsive portfolio showcasing my skills, projects, and experience.",
    },
    {
      id: 2,
      title: "Task Manager",
      description:
        "A simple productivity app designed to organize everyday work.",
    },
  ],
};

function PortfolioPage() {
  const [searchParams] = useSearchParams();

  const template = searchParams.get("template") || "minimal";

  return (
    <TemplateRenderer
      template={template}
      data={defaultPortfolioData}
    />
  );
}

export default PortfolioPage;

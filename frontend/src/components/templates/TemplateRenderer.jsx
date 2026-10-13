import MinimalTemplate from "./MinimalTemplate";
import DarkTemplate from "./DarkTemplate";
import ProfessionalTemplate from "./ProfessionalTemplate";
import CreativeTemplate from "./CreativeTemplate";
import EditorialTemplate from "./EditorialTemplate";

const templateComponents = {
  minimal: MinimalTemplate,
  dark: DarkTemplate,
  professional: ProfessionalTemplate,
  creative: CreativeTemplate,
  editorial: EditorialTemplate,
};

function TemplateRenderer({ template = "minimal", data = {} }) {
  const SelectedTemplate = templateComponents[template];

  if (!SelectedTemplate) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#070908] px-6 text-center text-white">
        <div>
          <h1 className="text-2xl font-bold">Template not found</h1>
          <p className="mt-2 text-white/60">
            Please select a valid portfolio template.
          </p>
        </div>
      </div>
    );
  }

  return <SelectedTemplate data={data} />;
}

export default TemplateRenderer;


import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import TemplateRenderer from "../components/templates/TemplateRenderer";
import { getMyPortfolio } from "../services/portfolio";

const defaultPortfolioData = {
  name: "",
  role: "",
  about: "",
  email: "",
  phone: "",
  location: "",
  website: "",
  projects: [],
  education: [],
  experience: [],
  skills: [],
};

function PortfolioPage() {
  const [searchParams] = useSearchParams();
  const requestedTemplate = searchParams.get("template") || "minimal";

  const [template, setTemplate] = useState(requestedTemplate);
  const [data, setData] = useState(defaultPortfolioData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadPortfolio() {
      try {
        const result = await getMyPortfolio();

        if (!active) return;

        const portfolioData = result.portfolio_data || {};

        console.log("Portfolio API response:", result);
        console.log("Portfolio data received:", portfolioData);

        setData({
          ...defaultPortfolioData,
          ...portfolioData,
          projects: Array.isArray(portfolioData.projects)
            ? portfolioData.projects
            : [],
          education: Array.isArray(portfolioData.education)
            ? portfolioData.education
            : [],
          experience: Array.isArray(portfolioData.experience)
            ? portfolioData.experience
            : [],
          skills: Array.isArray(portfolioData.skills)
            ? portfolioData.skills
            : [],
        });

        setTemplate(result.template || requestedTemplate);
      } catch (err) {
        if (active) {
          setError(err.message || "Unable to load your portfolio.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadPortfolio();

    return () => {
      active = false;
    };
  }, [requestedTemplate]);

  if (loading) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#070908] text-white">
        Loading your portfolio...
      </main>
    );
  }

  if (error) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#070908] px-5 text-center text-white">
        <div>
          <p className="text-red-300">{error}</p>
          <Link
            to="/create-portfolio"
            className="mt-5 inline-block rounded-xl bg-[#00C875] px-5 py-3 font-semibold text-black"
          >
            Return to editor
          </Link>
        </div>
      </main>
    );
  }

  return <TemplateRenderer template={template} data={data} />;
}

export default PortfolioPage;

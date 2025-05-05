import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="flex items-center justify-center px-4 py-2 bg-gray-900 text-gray-300">
      <p>{t("rights")}</p>
    </footer>
  );
};

export default Footer;

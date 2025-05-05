import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="relative z-10 flex items-center justify-center px-4 py-6 bg-gray-900 text-gray-300 min-h-[80px]">
      <p>{t("rights")}</p>
    </footer>
  );
};

export default Footer;

import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="relative z-10 bg-gray-800 text-gray-200 py-4 sm:py-6 mt-10">
      <div className="max-w-7xl mx-auto text-center px-4">
        <p className="text-xs sm:text-sm md:text-base">
          © 2025 <span className="text-red-600 font-semibold">{t("proyectMarvel")}</span>. {t("rights")}
        </p>
        <p className="mt-2 text-xxs sm:text-xs md:text-sm italic text-gray-300">
          {t("propiety")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
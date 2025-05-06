import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer class="bg-gray-800 text-gray-200 py-6 mt-10">
  <div class="max-w-7xl mx-auto text-center">
    <p class="text-sm">
      © 2025 <span class="text-red-600 font-semibold">{t("proyectMarvel")}</span>.{t("rights")}
    </p>
    <p class="mt-2 text-xs italic text-gray-300">
      {t("propiety")}
    </p>
  </div>
</footer>


  );
};

export default Footer;

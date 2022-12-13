import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./anglais.json";
import translationFR from "./francais.json";

const resources = {
  EN: {
    translation: translationEN
  },
  
  FR: {
    translation: translationFR
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "FR", // langue par defaut
    keySeparator: ".",  // pour supporter les imbrications avec des . => footer.p
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;
import "i18next";
import i18n from "i18next";

const resources = {
  en: {
    translation: {
      key: "hello world",
    },
  },
};
i18n.init({
  lng: "en", // if you're using a language detector, do not define the lng option
  debug: true,
  resources: resources,
});

export default i18n;

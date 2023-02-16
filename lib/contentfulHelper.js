// Functions containing the information on categorizing the information needed from contentful and displaying it on the application
// These functions looks at the contentful JSON file and retrieves the fields that is needed to be displayed on the application
// If you're unsure on how this function works, search .map function on react native to learn more.

// Gets the specified fields for places that will be used for display in the application
export function categorizeHistoricalSites(info) {
  return info.items.map((detail) => ({
    id: detail.sys.id,
    type: "Places",
    images: imagesForArticle(detail.fields.picture, info), //url, url, url...
    audio: audioForArticle(detail.fields.audioRecording, info),
    title: detail.fields.historicalTitle,
    description: detail.fields.importantInformation,
    location: {
      latitude: detail.fields.historicalLocation.lat,
      longitude: detail.fields.historicalLocation.lon,
    },
    people: peopleForArticle(detail.fields.importantPeople, info),
    people_id: peopleIdForArticle(detail.fields.importantPeople),
    cultures: cultureForArticle(detail.fields.culture, info),
    culture_id: cultureIdForArticle(detail.fields.culture),
    audiotitle: audioTitleForArticle(detail.fields.audioRecording, info),
  }));
}
// Gets the specified fields for people that will be used for display in the application
export function categorizeImportantPeople(infoPeople) {
  return infoPeople.items.map((detailPeople) => ({
    id: detailPeople.sys.id,
    type: "Peoples",
    images: imagesForArticlePeople(
      detailPeople.fields.importantPeoplePhoto,
      infoPeople
    ),
    title: detailPeople.fields.importantPeople,
    description: detailPeople.fields.importantPeopleDescription,
    site: monumentForArticle(detailPeople.fields.historicalSite, infoPeople),
    site_id: monumentIdForArticle(detailPeople.fields.historicalSite),
    cultures: cultureForArticle(detailPeople.fields.culture, infoPeople),
    culture_id: cultureIdForArticle(detailPeople.fields.culture),
  }));
}
// Gets the specified fields for tours that will be used for display in the application
export function categorizeTours(infoTours) {
  return infoTours.items.map((detailTours) => ({
    id: detailTours.sys.id,
    type: "Tours",
    images: imagesForTours(detailTours.fields.tourPictures, infoTours),
    title: detailTours.fields.tourName,
    description: detailTours.fields.tourDescription,
    article: historicalSiteForTours(
      detailTours.fields.historicalLocation,
      infoTours
    ),
    article_id: articleIdForTours(
      detailTours.fields.historicalLocation,
      infoTours
    ),
  }));
}
// Gets the specified fields for culture that will be used for display in the application
export function categorizeCultures(infoCulture) {
  return infoCulture.items.map((detailCulture) => ({
    id: detailCulture.sys.id,
    type: "Cultures",
    images: imagesForArticleCulture(
      detailCulture.fields.culturePictures,
      infoCulture
    ),
    title: detailCulture.fields.cultureTitle,
    description: detailCulture.fields.cultureDescriptionn,
    site: monumentForArticle(detailCulture.fields.historicalSite, infoCulture),
    site_id: monumentIdForArticle(detailCulture.fields.historicalSite),
    people: peopleForArticle(detailCulture.fields.importantPeople, infoCulture),
    people_id: peopleIdForArticle(detailCulture.fields.importantPeople),
  }));
}

//Image Functions

// Gets the image url files from contentful for places
export function imagesForArticle(imagesData = [], info) {
  const default_image =
    "https://images.ctfassets.net/medznjolzzmh/3jFhT4US4Ux9fBy3WTzAI5/51077eb2f33bbab55d102b289c5ce269/defaultImage.png?h=250";

  const relevantImages = imagesData.map((imageData) => {
    const imageAsset = info.includes.Asset.find(
      (assetData) => assetData.sys.id === imageData.sys.id
    );
    return "https:" + imageAsset.fields.file.url;
  });

  return relevantImages.length > 0 ? relevantImages : [default_image];
}
// Gets the image url files from contentful for people
export function imagesForArticlePeople(imagesDataPeople = [], infoPeople) {
  const default_imagePeople =
    "https://images.ctfassets.net/medznjolzzmh/3jFhT4US4Ux9fBy3WTzAI5/51077eb2f33bbab55d102b289c5ce269/defaultImage.png?h=250";
  const relevantImagesPeople = imagesDataPeople.map((imageDataPeople) => {
    const imageAssetPeople = infoPeople.includes.Asset.find(
      (assetDataPeople) => assetDataPeople.sys.id === imageDataPeople.sys.id
    );
    return "https:" + imageAssetPeople.fields.file.url;
  });

  return relevantImagesPeople.length > 0
    ? relevantImagesPeople
    : [default_imagePeople];
}
// Gets the image url files from contentful for culture
export function imagesForArticleCulture(imagesDataCulture = [], infoCulture) {
  const default_imageCulture =
    "https://images.ctfassets.net/medznjolzzmh/3jFhT4US4Ux9fBy3WTzAI5/51077eb2f33bbab55d102b289c5ce269/defaultImage.png?h=250";
  const relevantImagesCulture = imagesDataCulture.map((imageDataCulture) => {
    const imageAssetCulture = infoCulture.includes.Asset.find(
      (assetDataCulture) => assetDataCulture.sys.id === imageDataCulture.sys.id
    );
    return "https:" + imageAssetCulture.fields.file.url;
  });
  return relevantImagesCulture.length > 0
    ? relevantImagesCulture
    : [default_imageCulture];
}
// Gets the image url files from contentful for tours
export function imagesForTours(imagesTour = [], info) {
  const default_image =
    "https://images.ctfassets.net/medznjolzzmh/3jFhT4US4Ux9fBy3WTzAI5/51077eb2f33bbab55d102b289c5ce269/defaultImage.png?h=250";

  const relevantTourImages = imagesTour.map((imageTourData) => {
    const imageTourAsset = info.includes.Asset.find(
      (assetTourData) => assetTourData.sys.id === imageTourData.sys.id
    );
    return "https:" + imageTourAsset.fields.file.url;
  });
  return relevantTourImages.length > 0 ? relevantTourImages : [default_image];
}
// Reference Functions
// These are used to load up the associated historical information in the article that is being viewed when user clicks on a relevent historical figure or culture

// Gets the places title that are associated with the important people or culture
export function monumentForArticle(monumentsData = [], info) {
  const relevantMonument = monumentsData.map((monumentData) => {
    const monumentAsset = info.includes.Entry.find(
      (monumentLink) => monumentLink.sys.id === monumentData.sys.id
    );
    return monumentAsset.fields.historicalTitle;
  });

  return relevantMonument;
}
// Gets the places id that are associated with the important people or culture
export function monumentIdForArticle(monumentsData = []) {
  const relevantMonumentId = monumentsData.map((monumentData) => {
    return monumentData.sys.id;
  });
  return relevantMonumentId;
}
// Gets the people title that are associated with the important place or culture
export function peopleForArticle(peoplesData = [], info) {
  const relevantPeople = peoplesData.map((peopleData) => {
    const peopleAsset = info.includes.Entry.find(
      (peopleLink) => peopleLink.sys.id === peopleData.sys.id
    );
    return peopleAsset.fields.importantPeople;
  });
  return relevantPeople;
}
// Gets the people id that are associated with the important place or culture
export function peopleIdForArticle(peoplesData = []) {
  const relevantPeopleId = peoplesData.map((peopleData) => {
    return peopleData.sys.id;
  });
  return relevantPeopleId;
}
// Gets the culture title that are associated with the important place or people
export function cultureForArticle(culturesData = [], info) {
  const relevantCulture = culturesData.map((cultureData) => {
    const cultureAsset = info.includes.Entry.find(
      (cultureLink) => cultureLink.sys.id === cultureData.sys.id
    );
    return cultureAsset.fields.cultureTitle;
  });
  return relevantCulture;
}
// Gets the culture id that are associated with the important place or people
export function cultureIdForArticle(culturesData = []) {
  const relevantCultureId = culturesData.map((cultureData) => {
    return cultureData.sys.id;
  });
  return relevantCultureId;
}
// Gets the places title that are associated with the tour
export function historicalSiteForTours(historicalSitesData = [], info) {
  const relevantHistoricalSite = historicalSitesData.map(
    (historicalSiteData) => {
      const historicalSiteAsset = info.includes.Entry.find(
        (historicalSiteLink) =>
          historicalSiteLink.sys.id === historicalSiteData.sys.id
      );
      return historicalSiteAsset.fields.historicalTitle;
    }
  );
  return relevantHistoricalSite;
}
// Gets the places id that are associated with the tour
export function articleIdForTours(historicalSitesData = [], info) {
  const relevantHistoricalSiteId = historicalSitesData.map(
    (historicalSiteData) => {
      return historicalSiteData.sys.id;
    }
  );
  return relevantHistoricalSiteId;
}
// Gets the audio title that is associated with the place
export function audioTitleForArticle(audioTitleData = [], info) {
  const relevantAudiotitle = audioTitleData.map((audiotitleData) => {
    const audiotitleAsset = info.includes.Asset.find(
      (audioTitleLink) => audioTitleLink.sys.id === audiotitleData.sys.id
    );
    return audiotitleAsset.fields.title;
  });
  return relevantAudiotitle;
}
// Gets the audio id that is associated with the place
export function audioForArticle(audioRecordingData = [], info) {
  const relevantAudio = audioRecordingData.map((audioData) => {
    const audioAsset = info.includes.Asset.find(
      (audioLink) => audioLink.sys.id === audioData.sys.id
    );
    return "https:" + audioAsset.fields.file.url;
  });
  return relevantAudio;
}

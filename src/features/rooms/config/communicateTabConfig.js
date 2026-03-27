export const categoryFriendlyNames = {
  Knowledge: "Learn something new",
  Culture: "Explore culture and creativity",
  Lifestyle: "Enjoy everyday life",
  Growth: "Build your future",
  Other: "Anything & Everything",
}

export const getSections = (t) => [
  {
    key: "Knowledge",
    title: t.rooms.filters.categories?.knowledge || categoryFriendlyNames.Knowledge,
  },
  {
    key: "Culture",
    title: t.rooms.filters.categories?.culture || categoryFriendlyNames.Culture,
  },
  {
    key: "Lifestyle",
    title: t.rooms.filters.categories?.lifestyle || categoryFriendlyNames.Lifestyle,
  },
  {
    key: "Growth",
    title: t.rooms.filters.categories?.growth || categoryFriendlyNames.Growth,
  },
  {
    key: "Other",
    title: t.rooms.filters.categories?.other || categoryFriendlyNames.Other,
  },
]

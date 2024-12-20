export const locationDetails = [
  {
    label: "Name",
    type: "text",
    id: "fullname",

    displayErrorMessage(errors) {
      {
        if (errors.fullname)
          return <p className="text-red-500">{errors.fullname.message}</p>;
      }
    },
  },
  {
    label: "Mobile Number 1",
    type: "tel",
    id: "mobile",

    displayErrorMessage(errors) {
      {
        if (errors.mobile)
          return <p className="text-red-500">{errors.mobile.message}</p>;
      }
    },
  },
  {
    label: "Mobile Number 2",
    type: "tel",
    id: "home",

    displayErrorMessage(errors) {
      {
        if (errors.home)
          return <p className="text-red-500">{errors.home.message}</p>;
      }
    },
  },
  {
    label: "County",
    type: "text",
    id: "county",

    displayErrorMessage(errors) {
      {
        if (errors.county)
          return <p className="text-red-500">{errors.county.message}</p>;
      }
    },
  },
  {
    label: "City / Province",
    type: "text",
    id: "city",

    displayErrorMessage(errors) {
      {
        if (errors.city)
          return <p className="text-red-500">{errors.city.message}</p>;
      }
    },
  },
  {
    label: "Street / Community",
    type: "text",
    id: "community",

    displayErrorMessage(errors) {
      {
        if (errors.community)
          return <p className="text-red-500">{errors.community.message}</p>;
      }
    },
  },
];
